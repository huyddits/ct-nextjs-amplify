'use client';

import type React from 'react';

import Link from 'next/link';
import {
  ClipboardCheck,
  UserCircle2,
  Target,
  Dumbbell,
  Ruler,
  ArrowLeft,
  Play,
  Plus,
  X,
  Check,
  Minus,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useExercise } from '../_hooks/useExercise';
import ExerciseHeader from './ExerciseHeader';

interface Set {
  weight: number;
  reps: number;
  rpe: number;
  completed: boolean;
}

interface PastWorkout {
  date: string;
  sets: Set[];
  note: string;
}

interface ExerciseData {
  sets: Set[];
  notes: string;
}

// Mock global workout data store (in a real app, this would be context/redux/localStorage)
const globalWorkoutData: Record<string, ExerciseData> = {
  'barbell-squat': {
    sets: [
      { weight: 135, reps: 12, rpe: 7, completed: false },
      { weight: 155, reps: 10, rpe: 8, completed: false },
      { weight: 175, reps: 8, rpe: 8, completed: false },
    ],
    notes: '',
  },
  'leg-press': {
    sets: [
      { weight: 200, reps: 15, rpe: 6, completed: false },
      { weight: 220, reps: 12, rpe: 7, completed: false },
      { weight: 240, reps: 10, rpe: 8, completed: false },
    ],
    notes: '',
  },
  'leg-extension': {
    sets: [
      { weight: 80, reps: 15, rpe: 6, completed: false },
      { weight: 90, reps: 12, rpe: 7, completed: false },
      { weight: 100, reps: 10, rpe: 9, completed: false },
    ],
    notes: '',
  },
};

export default function StrengthExercise({ programId }: { programId: number }) {
  const {} = useExercise({ programId });
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [showAllPastWorkouts, setShowAllPastWorkouts] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Current exercise identifier
  const [currentExercise, setCurrentExercise] = useState('barbell-squat');

  interface ExerciseNavigation {
    [key: string]: {
      prev: string;
      next: string;
      name: string;
    };
  }

  // Exercise navigation mapping
  const exerciseNavigation = useMemo<ExerciseNavigation>(
    () => ({
      'barbell-squat': {
        prev: 'leg-press',
        next: 'leg-extension',
        name: 'Barbell Squat',
      },
      'leg-press': {
        prev: 'leg-extension',
        next: 'barbell-squat',
        name: 'Leg Press',
      },
      'leg-extension': {
        prev: 'barbell-squat',
        next: 'leg-press',
        name: 'Leg Extension',
      },
    }),
    []
  );

  // Timer states
  const [timerDuration, setTimerDuration] = useState(30); // in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const timerRef = useRef<NodeJS.Timeout>(null);

  // Timer constants
  const MIN_TIME = 15; // 30 seconds
  const MAX_TIME = 300; // 5 minutes
  const TIME_INCREMENT = 15; // 15 seconds

  // Update the mock data to include completed status and ensure whole number RPEs
  const allPastWorkouts: PastWorkout[] = [
    {
      date: 'Jan 24, 2023',
      sets: [
        { weight: 135, reps: 12, rpe: 7, completed: false },
        { weight: 155, reps: 10, rpe: 8, completed: false },
        { weight: 175, reps: 8, rpe: 8, completed: false },
      ],
      note: 'This felt easy today. Able to progress heavier weights.',
    },
    {
      date: 'Jan 17, 2023',
      sets: [
        { weight: 135, reps: 12, rpe: 7, completed: false },
        { weight: 145, reps: 12, rpe: 7, completed: false },
        { weight: 165, reps: 8, rpe: 8, completed: false },
      ],
      note: 'I was able to lift more than last session.',
    },
    {
      date: 'Jan 10, 2023',
      sets: [
        { weight: 135, reps: 12, rpe: 6, completed: false },
        { weight: 145, reps: 10, rpe: 7, completed: false },
        { weight: 155, reps: 8, rpe: 9, completed: false },
      ],
      note: 'Felt strong today. Focusing on form.',
    },
    {
      date: 'Jan 3, 2023',
      sets: [
        { weight: 125, reps: 12, rpe: 6, completed: false },
        { weight: 135, reps: 12, rpe: 7, completed: false },
        { weight: 145, reps: 10, rpe: 8, completed: false },
      ],
      note: 'First session of the year. Taking it easy to build back up.',
    },
  ];

  // Get past workouts based on current view state
  const pastWorkouts = showAllPastWorkouts ? allPastWorkouts : allPastWorkouts.slice(0, 2);

  // Initialize sets and notes from global data
  const [sets, setSets] = useState<Set[]>(globalWorkoutData[currentExercise].sets);
  const [notes, setNotes] = useState(globalWorkoutData[currentExercise].notes);

  // Save current exercise data to global store
  const saveExerciseData = useCallback(() => {
    globalWorkoutData[currentExercise] = {
      sets: [...sets],
      notes: notes,
    };
  }, [currentExercise, sets, notes]);

  // Load exercise data when changing exercises
  const loadExerciseData = (exerciseId: string) => {
    if (globalWorkoutData[exerciseId]) {
      setSets(globalWorkoutData[exerciseId].sets);
      setNotes(globalWorkoutData[exerciseId].notes);
    }
  };

  // Update current exercise when it changes
  useEffect(() => {
    loadExerciseData(currentExercise);
  }, [currentExercise]);

  const toggleSetCompletion = (index: number) => {
    const newSets = [...sets];
    newSets[index].completed = !newSets[index].completed;
    setSets(newSets);

    // Automatically save when a set is completed
    globalWorkoutData[currentExercise].sets = newSets;
  };

  const addSet = () => {
    // Copy the last set's values for convenience
    const lastSet = sets[sets.length - 1];
    const newSets = [
      ...sets,
      {
        ...lastSet,
        completed: false,
        rpe: Math.round(lastSet.rpe), // Ensure RPE is a whole number
      },
    ];
    setSets(newSets);

    // Automatically save when a set is added
    globalWorkoutData[currentExercise].sets = newSets;
  };

  const removeSet = (index: number) => {
    const newSets = sets.filter((_, i) => i !== index);
    setSets(newSets);

    // Automatically save when a set is removed
    globalWorkoutData[currentExercise].sets = newSets;
  };

  const updateSet = (index: number, field: keyof Set, value: number) => {
    const newSets = [...sets];
    if (field === 'rpe') {
      // Ensure RPE is between 1-10 and a whole number
      newSets[index][field] = Math.min(10, Math.max(1, Math.round(value)));
    } else if (field === 'weight' || field === 'reps') {
      newSets[index][field] = value;
    }
    setSets(newSets);

    // Automatically save when a set is updated
    globalWorkoutData[currentExercise].sets = newSets;
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);

    // Automatically save when notes are updated
    globalWorkoutData[currentExercise].notes = newNotes;
  };

  const handleTimerStart = () => {
    if (isTimerRunning) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setIsTimerRunning(false);
      setTimeRemaining(timerDuration);
    } else {
      setTimeRemaining(timerDuration);
      setIsTimerRunning(true);
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const incrementTime = () => {
    if (isTimerRunning) return;

    const newTime = Math.min(timerDuration + TIME_INCREMENT, MAX_TIME);
    setTimerDuration(newTime);
    setTimeRemaining(newTime);
  };

  const decrementTime = () => {
    if (isTimerRunning) return;

    const newTime = Math.max(timerDuration - TIME_INCREMENT, MIN_TIME);
    setTimerDuration(newTime);
    setTimeRemaining(newTime);
  };

  function handleCompleteWorkout() {
    // Save all exercise data before navigating
    Object.keys(globalWorkoutData).forEach(exerciseId => {
      // For each exercise, mark all sets as completed
      if (globalWorkoutData[exerciseId]) {
        globalWorkoutData[exerciseId].sets = globalWorkoutData[exerciseId].sets.map(set => ({
          ...set,
          completed: true, // Mark all sets as completed
        }));
      }
    });

    // Here you would typically send the data to a server
    console.log('Saving all workout data:', globalWorkoutData);

    // Navigate back to the program selector screen
    router.push('/program-selector');
  }

  const togglePastWorkoutsView = () => {
    setShowAllPastWorkouts(!showAllPastWorkouts);
  };

  const navigateToPreviousExercise = useCallback(() => {
    // Save current exercise data before navigating
    saveExerciseData();

    // Navigate to previous exercise
    const prevExercise = exerciseNavigation[currentExercise].prev;
    setCurrentExercise(prevExercise);

    // In a real app, you would use router.push but for this demo we're simulating navigation
    // router.push(`/${prevExercise}`)
  }, [currentExercise, exerciseNavigation, saveExerciseData]);

  const navigateToNextExercise = useCallback(() => {
    // Save current exercise data before navigating
    saveExerciseData();

    // Navigate to next exercise
    const nextExercise = exerciseNavigation[currentExercise].next;
    setCurrentExercise(nextExercise);

    // In a real app, you would use router.push but for this demo we're simulating navigation
    // router.push(`/${nextExercise}`)
  }, [currentExercise, exerciseNavigation, saveExerciseData]);

  // Hide swipe hint after user has interacted with it
  useEffect(() => {
    if (swipeDirection) {
      setShowSwipeHint(false);
    }
  }, [swipeDirection]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Handle swipe navigation
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchEndX.current = e.touches[0].clientX;
      setSwipeDirection(null);
      setSwipeProgress(0);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX.current) return;

      touchEndX.current = e.touches[0].clientX;
      const diff = touchEndX.current - touchStartX.current;

      // Calculate swipe progress as percentage (max 40% to limit movement)
      const progress = Math.min(Math.abs(diff) / window.innerWidth, 0.4);
      setSwipeProgress(progress);

      if (diff > 0) {
        setSwipeDirection('right');
      } else {
        setSwipeDirection('left');
      }
    };

    const handleTouchEnd = () => {
      if (!touchStartX.current || !touchEndX.current) return;

      const diff = touchEndX.current - touchStartX.current;
      const minSwipeDistance = 100; // Minimum distance to trigger navigation

      if (diff > minSwipeDistance) {
        // Navigate to previous exercise
        navigateToPreviousExercise();
      } else if (diff < -minSwipeDistance) {
        // Navigate to next exercise
        navigateToNextExercise();
      }

      // Reset
      touchStartX.current = null;
      touchEndX.current = null;
      setSwipeDirection(null);
      setSwipeProgress(0);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchmove', handleTouchMove);
      container.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentExercise, navigateToNextExercise, navigateToPreviousExercise]); // Re-attach listeners when current exercise changes

  // Calculate transform style based on swipe direction and progress
  const getSwipeStyle = () => {
    if (!swipeDirection) return {};

    const translateX =
      swipeDirection === 'right' ? `${swipeProgress * 100}px` : `${-swipeProgress * 100}px`;

    return {
      transform: `translateX(${translateX})`,
      transition: swipeProgress === 0 ? 'transform 0.3s ease-out' : 'none',
    };
  };

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get current exercise navigation info
  const currentNav = exerciseNavigation[currentExercise];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content with Swipe Container */}
      <div
        ref={containerRef}
        className="pt-[56px] pb-[80px] px-4 max-w-3xl mx-auto relative"
        style={getSwipeStyle()}
      >
        {/* Swipe Indicators */}
        {swipeDirection === 'right' && swipeProgress > 0.05 && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200/80 rounded-r-full p-3">
            <ArrowLeftIcon className="h-6 w-6 text-primary" />
          </div>
        )}
        {swipeDirection === 'left' && swipeProgress > 0.05 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-500! rounded-l-full p-3">
            <ArrowRightIcon className="h-6 w-6 text-primary" />
          </div>
        )}

        <ExerciseHeader programId={programId} title={currentNav.name} />

        {/* Exercise Navigation with Swipe Indicators */}
        <div className="flex justify-between text-primary text-base font-medium mb-4 relative">
          <button
            onClick={navigateToPreviousExercise}
            className="flex items-center hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {exerciseNavigation[currentNav.prev].name}
          </button>

          {/* Swipe Hint */}
          {showSwipeHint && (
            <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center pointer-events-none">
              <div className="bg-gray-100/90 px-3 py-1 rounded-full text-xs text-gray-600 flex items-center animate-pulse">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Swipe to navigate
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          )}

          <button onClick={navigateToNextExercise} className="flex items-center hover:underline">
            {exerciseNavigation[currentNav.next].name}
            <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
          </button>
        </div>

        {/* Swipe Indicators on Sides */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-10 opacity-30 hover:opacity-80 transition-opacity">
          <button
            onClick={navigateToPreviousExercise}
            className="bg-gray-200 p-3 rounded-r-full shadow-md"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>
        </div>

        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-10 opacity-30 hover:opacity-80 transition-opacity">
          <button
            onClick={navigateToNextExercise}
            className="bg-gray-200 p-3 rounded-l-full shadow-md"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-gray-100 rounded-lg mb-6">
          <button className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-4">
              <Play className="h-6 w-6 text-gray-600" />
            </div>
          </button>
        </div>

        {/* Instructions and Cues - Now stacked vertically */}
        <div className="space-y-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-medium mb-2">Instructions</h2>
            <p className="text-sm text-gray-600">
              Stand with feet shoulder-width apart. Keep your back straight and core engaged
              throughout the movement.
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h2 className="font-medium mb-1 text-sm">Cues</h2>
            <ul className="text-sm text-gray-600 space-y-0.5">
              <li>• Chest up, proud</li>
              <li>• Break at hips and knees together</li>
              <li>• Push knees out</li>
            </ul>
          </div>
        </div>

        {/* Sets - Now with completion toggle */}
        <div className="space-y-4 mb-6">
          {sets.map((set, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <button onClick={() => removeSet(index)} className="text-red-500">
                    <X className="h-5 w-5" />
                  </button>
                  <span className="font-medium">Set {index + 1}</span>
                </div>
                <button
                  onClick={() => toggleSetCompletion(index)}
                  className={`p-1.5 rounded-full transition-colors ${
                    set.completed ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Check className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Weight</label>
                  <input
                    type="number"
                    value={set.weight}
                    onChange={e => updateSet(index, 'weight', Number(e.target.value))}
                    className="w-full border rounded p-2 text-center"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Reps</label>
                  <input
                    type="number"
                    value={set.reps}
                    onChange={e => updateSet(index, 'reps', Number(e.target.value))}
                    className="w-full border rounded p-2 text-center"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">RPE</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    step="1"
                    value={set.rpe}
                    onChange={e => {
                      const value = Math.min(10, Math.max(1, Math.round(Number(e.target.value))));
                      updateSet(index, 'rpe', value);
                    }}
                    className="w-full border rounded p-2 text-center"
                    placeholder="1-10"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Simplified Timer with 15-second increments */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleTimerStart}
              className="bg-black text-white text-sm py-1.5 px-5 rounded"
            >
              {isTimerRunning ? 'Stop' : 'Start'}
            </button>

            <div className="flex items-center">
              {!isTimerRunning && (
                <button
                  onClick={decrementTime}
                  className="text-gray-500 p-1.5 rounded-full hover:bg-gray-100"
                  disabled={timerDuration <= MIN_TIME}
                >
                  <Minus className="h-4 w-4" />
                </button>
              )}

              <div className="mx-3 text-center">
                <div className="text-xl font-medium tabular-nums">
                  {formatTime(isTimerRunning ? timeRemaining : timerDuration)}
                </div>
              </div>

              {!isTimerRunning && (
                <button
                  onClick={incrementTime}
                  className="text-gray-500 p-1.5 rounded-full hover:bg-gray-100"
                  disabled={timerDuration >= MAX_TIME}
                >
                  <Plus className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Add Set Button */}
        <button
          onClick={addSet}
          className="flex items-center justify-center w-full text-primary font-medium py-2 mb-6"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Set
        </button>

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Notes</label>
          <Textarea
            placeholder="Add any notes about this workout..."
            className="min-h-[100px]"
            value={notes}
            onChange={handleNotesChange}
          />
        </div>

        {/* Complete Workout Button */}
        <Button
          onClick={handleCompleteWorkout}
          className="w-full bg-primary hover:bg-primary/90 text-white mb-6"
        >
          Complete Workout
        </Button>

        {/* Past Workouts */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="font-medium mb-4">Past Workouts</h2>

          <div className="space-y-6">
            {pastWorkouts.map((workout, workoutIndex) => (
              <div key={workoutIndex}>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{workout.date}</span>
                </div>
                <div className="space-y-2">
                  {workout.sets.map((set, setIndex) => (
                    <div key={setIndex} className="grid grid-cols-3 text-sm">
                      <div>Set {setIndex + 1}</div>
                      <div className="text-center">
                        {set.weight} lb × {set.reps}
                      </div>
                      <div className="text-right">RPE {Math.round(set.rpe)}</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2 border-l-2 border-gray-200 pl-3 italic">
                  Note: {workout.note}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={togglePastWorkoutsView}
            className="w-full text-primary font-medium mt-4 flex items-center justify-center"
          >
            {showAllPastWorkouts ? (
              <>
                <ChevronUpIcon className="h-4 w-4 mr-1" />
                Show less
              </>
            ) : (
              <>
                <ChevronDownIcon className="h-4 w-4 mr-1" />
                More past workouts
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
