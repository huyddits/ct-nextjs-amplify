'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MinusCircleIcon,
  PlusIcon,
  SaveIcon,
  Trash2Icon,
  UsersIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectItem } from '@radix-ui/react-select';
import { ROUTES } from '@/utils/constants';

interface AthleteData {
  id: string;
  name: string;
}

interface Athlete {
  id: string;
  name: string;
}

interface Group {
  athletes: Athlete[];
}

interface Step {
  name: string;
  groups: Group[];
}

// This would typically come from your database
const availableAthletes: AthleteData[] = [
  { id: '1', name: 'Stevie Anderson' },
  { id: '2', name: 'Steve Johnson' },
  { id: '3', name: 'Stevy Williams' },
  { id: '4', name: 'Stephen Smith' },
  { id: '5', name: 'Stevie Taylor' },
  { id: '6', name: 'Steven Brown' },
  { id: '7', name: 'Stevy Martinez' },
  { id: '8', name: 'Steve Thompson' },
  { id: '9', name: 'Stevie Wilson' },
  { id: '10', name: 'Stefan Davis' },
  { id: '11', name: 'Stevy Rodriguez' },
  { id: '12', name: 'Steven Clark' },
  { id: '13', name: 'Stevie Garcia' },
  { id: '14', name: 'Steve White' },
  { id: '15', name: 'Stevy Lee' },
  { id: '16', name: 'Stephen Miller' },
  { id: '17', name: 'Stevie Thomas' },
  { id: '18', name: 'Steve Wright' },
  { id: '19', name: 'Stevy Turner' },
  { id: '20', name: 'Steven Jones' },
];

interface RoutineFormProps {
  id?: string;
}

export function RoutineForm({ id }: RoutineFormProps) {
  const params = useParams();
  const isEdit = !!id;
  console.log({ params });
  const [steps, setSteps] = useState<Step[]>([
    {
      name: '',
      groups: [
        {
          athletes: [
            { id: '1', name: 'Stevie Anderson' },
            { id: '2', name: 'Steve Johnson' },
            { id: '3', name: 'Stevy Williams' },
          ],
        },
        {
          athletes: [
            { id: '4', name: 'Stephen Smith' },
            { id: '5', name: 'Stevie Taylor' },
            { id: '6', name: 'Steven Brown' },
          ],
        },
        {
          athletes: [
            { id: '7', name: 'Stevy Martinez' },
            { id: '8', name: 'Steve Thompson' },
            { id: '9', name: 'Stevie Wilson' },
          ],
        },
      ],
    },
    {
      name: '',
      groups: [
        {
          athletes: [
            { id: '10', name: 'Stefan Davis' },
            { id: '11', name: 'Monica Geller' },
            { id: '12', name: 'Phoebe Buffay' },
          ],
        },
      ],
    },
  ]);

  const addStep = () => {
    setSteps([
      ...steps,
      {
        name: '',
        groups: [
          {
            athletes: [
              { id: '', name: '' },
              { id: '', name: '' },
              { id: '', name: '' },
            ],
          },
        ],
      },
    ]);
  };

  const addGroup = (stepIndex: number) => {
    const newSteps = [...steps];
    newSteps[stepIndex].groups.push({
      athletes: [
        { id: '', name: '' },
        { id: '', name: '' },
        { id: '', name: '' },
      ],
    });
    setSteps(newSteps);
  };

  const removeGroup = (stepIndex: number, groupIndex: number) => {
    const newSteps = [...steps];
    newSteps[stepIndex].groups = newSteps[stepIndex].groups.filter((_, i) => i !== groupIndex);
    setSteps(newSteps);
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...steps];
    if (direction === 'up' && index > 0) {
      [newSteps[index], newSteps[index - 1]] = [newSteps[index - 1], newSteps[index]];
    } else if (direction === 'down' && index < steps.length - 1) {
      [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
    }
    setSteps(newSteps);
  };

  const updateStepName = (index: number, name: string) => {
    const newSteps = [...steps];
    newSteps[index].name = name;
    setSteps(newSteps);
  };

  const updateAthlete = (
    stepIndex: number,
    groupIndex: number,
    athleteIndex: number,
    athleteId: string
  ) => {
    const newSteps = [...steps];
    const selectedAthlete = availableAthletes.find(a => a.id === athleteId);
    if (selectedAthlete) {
      newSteps[stepIndex].groups[groupIndex].athletes[athleteIndex] = {
        id: selectedAthlete.id,
        name: selectedAthlete.name,
      };
      setSteps(newSteps);
    }
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Here you would typically save the routine and navigate back
    console.log('Saving routine:', steps);
  };

  const addAthleteToGroup = (stepIndex: number, groupIndex: number) => {
    const newSteps = [...steps];
    newSteps[stepIndex].groups[groupIndex].athletes.push({ id: '', name: '' });
    setSteps(newSteps);
  };

  const removeAthleteFromGroup = (stepIndex: number, groupIndex: number, athleteIndex: number) => {
    const newSteps = [...steps];
    newSteps[stepIndex].groups[groupIndex].athletes = newSteps[stepIndex].groups[
      groupIndex
    ].athletes.filter((_, i) => i !== athleteIndex);
    setSteps(newSteps);
  };

  // Updated to only check within the current section
  const isAthleteSelected = (
    athleteId: string,
    currentStepIndex: number,
    currentGroupIndex: number,
    currentAthleteIndex: number
  ) => {
    // Only check groups within the current step/section
    const currentStep = steps[currentStepIndex];
    for (let groupIndex = 0; groupIndex < currentStep.groups.length; groupIndex++) {
      for (
        let athleteIndex = 0;
        athleteIndex < currentStep.groups[groupIndex].athletes.length;
        athleteIndex++
      ) {
        const athlete = currentStep.groups[groupIndex].athletes[athleteIndex];
        if (
          athlete.id === athleteId &&
          !(groupIndex === currentGroupIndex && athleteIndex === currentAthleteIndex)
        ) {
          return true; // Athlete is already used in this section
        }
      }
    }
    return false; // Athlete is not used in this section
  };
  return (
    <div>
      <div className="bg-white border-b border-gray-300 position-avoid-top-nav">
        <div className="flex items-center p-4">
          <Link href={`/${ROUTES.HIT_MISS_ROUTINES}`} className="text-gray-600">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <h1 className="text-lg font-semibold ml-4">{isEdit ? 'Edit Routine' : 'Add Routine'}</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto pt-[112px] pb-[140px] p-4">
        <Card className="mb-6 border-gray-300">
          <CardHeader>
            <CardTitle>
              <Input
                defaultValue=""
                placeholder="Enter Routine Name"
                className="text-xl font-bold"
              />
            </CardTitle>
          </CardHeader>
        </Card>

        {steps.map((step, stepIndex) => (
          <Card key={stepIndex} className="mb-6 border-gray-300 shadow-sm">
            <CardHeader className="flex flex-row items-center space-y-0">
              <div className="flex items-center space-x-2">
                <div className="flex flex-col">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => moveStep(stepIndex, 'up')}
                    disabled={stepIndex === 0}
                  >
                    <ChevronUpIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => moveStep(stepIndex, 'down')}
                    disabled={stepIndex === steps.length - 1}
                  >
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-none w-6 text-gray-600 font-medium">{stepIndex + 1}.</div>
              </div>
              <Input
                value={step.name}
                onChange={e => updateStepName(stepIndex, e.target.value)}
                placeholder="Enter Section Name"
                className="font-semibold"
              />
              <Button
                variant="ghost"
                size="icon"
                className="flex-none text-gray-400 hover:text-red-600 ml-2"
                onClick={() => removeStep(stepIndex)}
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {step.groups.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className="relative border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <UsersIcon className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Group {groupIndex + 1}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({group.athletes.length} athletes)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => addAthleteToGroup(stepIndex, groupIndex)}
                      >
                        <PlusIcon className="h-3 w-3 mr-1" />
                        Add Athlete
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-red-600"
                        onClick={() => removeGroup(stepIndex, groupIndex)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {group.athletes.map((athlete, athleteIndex) => (
                      <div key={athleteIndex} className="flex items-center gap-2">
                        <Select
                          value={athlete.id}
                          onValueChange={value =>
                            updateAthlete(stepIndex, groupIndex, athleteIndex, value)
                          }
                        >
                          <SelectTrigger className="text-sm flex-1">
                            <SelectValue placeholder="Select athlete" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableAthletes.map(availableAthlete => (
                              <SelectItem
                                key={availableAthlete.id}
                                value={availableAthlete.id}
                                disabled={isAthleteSelected(
                                  availableAthlete.id,
                                  stepIndex,
                                  groupIndex,
                                  athleteIndex
                                )}
                              >
                                {availableAthlete.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-600"
                          onClick={() =>
                            removeAthleteFromGroup(stepIndex, groupIndex, athleteIndex)
                          }
                        >
                          <MinusCircleIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full border-2 border-dashed border-gray-300 hover:border-gray-400"
                onClick={() => addGroup(stepIndex)}
                disabled={step.groups.length >= 3}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Group
              </Button>
            </CardContent>
          </Card>
        ))}

        <Button
          variant="outline"
          className="w-full mt-4 border-2 border-dashed border-gray-300 hover:border-gray-400"
          onClick={addStep}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </div>

      <div className="position-avoid-bottom-app">
        <div className="bg-white px-4 py-3 shadow-top">
          <div className="max-w-3xl mx-auto">
            <Button className="w-full shadow" size="lg" onClick={handleSave}>
              <SaveIcon className="h-5 w-5 mr-3" />
              Save Routine
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
