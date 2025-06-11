'use client';

import type React from 'react';

import {
  Play,
  Plus,
  ChevronLeft,
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useExercise, ExerciseSet as ExerciseSetType } from '../_hooks/useExercise';
import ExerciseHeader from './ExerciseHeader';
import ExercisePastWorkouts from './ExercisePastWorkouts.client';
import ExerciseSet from './ExerciseSet';
import ExerciseNote from './ExerciseNote.client';
import ExerciseNavigator from './ExerciseNavigator.client';
import ExerciseInstructionAndCues from './ExerciseInstructionAndCues';

interface PastWorkout {
  date: string;
  sets: ExerciseSetType[];
  note: string;
}

export default function StrengthExercise({ programId }: { programId: number }) {
  const {
    history,
    template,
    indicator,
    exerciseName,
    currentExercise,
    nextExerciseName,
    previousExerciseName,
    listExerciseInProgram,
    setIndicator,
    onCompleteWorkout,
    setListExerciseInProgram,
  } = useExercise({
    programId,
  });
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

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

  // Initialize sets and notes from global data
  // const [sets, setSets] = useState<Set[]>(globalWorkoutData[currentExercise].sets);
  // const [notes, setNotes] = useState(globalWorkoutData[currentExercise].notes);

  // Save current exercise data to global store
  // const saveExerciseData = useCallback(() => {
  //   // globalWorkoutData[currentExercise] = {
  //   //   sets: [...sets],
  //   //   notes: notes,
  //   // };
  // }, [currentExercise, sets, notes]);

  const toggleSetCompletion = (setIndex: number) => {
    setListExerciseInProgram(prev => {
      return prev.map((item, exerciseIndex) => {
        if (exerciseIndex !== indicator) return item;
        return {
          ...item,
          sets: item.sets.map((set, setIdx) => {
            if (setIdx !== setIndex) return set;
            return {
              ...set,
              completed: !set.completed,
            };
          }),
        };
      });
    });
  };

  const addSet = () => {
    setListExerciseInProgram(prev => {
      return prev.map((item, index) => {
        if (index !== indicator) return item;
        return {
          ...item,
          sets: [
            ...item.sets,
            { weight: 0, reps: template?.reps ?? 0, rpe: template?.rpe ?? 0, completed: false },
          ],
        };
      });
    });
  };

  const removeSet = (setIndex: number) => {
    setListExerciseInProgram(prev => {
      return prev.map((item, index) => {
        if (index !== indicator) return item;
        return {
          ...item,
          sets: item.sets.filter((_, i) => i !== setIndex),
        };
      });
    });
  };

  const updateSet = (setIndex: number, field: keyof ExerciseSetType, value: number) => {
    setListExerciseInProgram(prev => {
      return prev.map((item, exerciseIndex) => {
        if (exerciseIndex !== indicator) return item;
        return {
          ...item,
          sets: item.sets.map((set, index) => {
            if (index !== setIndex) return set;
            return {
              ...set,
              [field]: value,
            };
          }),
        };
      });
    });
  };

  useEffect(() => {
    console.log(listExerciseInProgram[indicator]?.sets);
  }, [listExerciseInProgram, indicator]);

  const handleNotesChange = (value: string) => {
    setListExerciseInProgram(prev =>
      prev.map((item, index) => {
        if (index !== indicator) return item;
        return {
          ...item,
          notes: value,
        };
      })
    );
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

  // function handleCompleteWorkout() {
  //   // Save all exercise data before navigating
  //   // Object.keys(globalWorkoutData).forEach(exerciseId => {
  //   //   // For each exercise, mark all sets as completed
  //   //   if (globalWorkoutData[exerciseId]) {
  //   //     globalWorkoutData[exerciseId].sets = globalWorkoutData[exerciseId].sets.map(set => ({
  //   //       ...set,
  //   //       completed: true, // Mark all sets as completed
  //   //     }));
  //   //   }
  //   // });

  //   // Here you would typically send the data to a server
  //   // console.log('Saving all workout data:', globalWorkoutData);
  //   onCompleteWorkout();
  //   // Navigate back to the program selector screen
  //   router.push('/program-selector');
  // }

  const navigateToPreviousExercise = () => {
    setIndicator(prev => prev - 1);
  };
  const navigateToNextExercise = () => {
    setIndicator(prev => prev + 1);
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content with Swipe Container */}
      <div
        ref={containerRef}
        className="pt-[56px] pb-[80px] px-4 container relative"
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

        <ExerciseHeader programId={programId} title={exerciseName} />
        <ExerciseNavigator
          showSwipeHint={showSwipeHint}
          nextExerciseName={nextExerciseName}
          previousExerciseName={previousExerciseName}
          onBack={navigateToPreviousExercise}
          onNext={navigateToNextExercise}
        />

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
            <ChevronRightIcon className="h-6 w-6 text-primary" />
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

        {currentExercise && (
          <ExerciseInstructionAndCues
            instructions={currentExercise.exerciseDescription}
            cues={currentExercise.exerciseCues}
          />
        )}

        {/* Sets - Now with completion toggle */}
        <div className="space-y-4 mb-6">
          {listExerciseInProgram[indicator]?.sets.map((set, index) => (
            <ExerciseSet
              key={index}
              index={index}
              set={set}
              removeSet={removeSet}
              toggleSetCompletion={toggleSetCompletion}
              updateSet={updateSet}
            />
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
                  <MinusIcon className="h-4 w-4" />
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
                  <PlusIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={addSet}
          size="lg"
          className="w-full text-primary font-medium mb-6"
        >
          <Plus className="h-5 w-5" />
          Add Set
        </Button>

        {listExerciseInProgram[indicator] && (
          <ExerciseNote
            value={listExerciseInProgram[indicator].notes}
            onTextChange={handleNotesChange}
          />
        )}

        <div className="mb-6">
          <Button
            onClick={onCompleteWorkout}
            className="w-full bg-primary hover:bg-primary/90 text-white "
          >
            Complete Workout
          </Button>
        </div>

        {/* Past Workouts */}
        {!!history?.length && <ExercisePastWorkouts pastWorkouts={history} />}
      </div>
    </div>
  );
}
