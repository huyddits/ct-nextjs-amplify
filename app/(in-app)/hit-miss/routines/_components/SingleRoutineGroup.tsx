import { Button } from '@/components/ui/button';
import { AppSelect } from '@/components/compose';
import { MinusCircleIcon, PlusIcon, Trash2Icon, UsersIcon } from 'lucide-react';
import { Controller, useFieldArray, useWatch } from 'react-hook-form';
import React, { useMemo } from 'react';
import { useGetListAthlete } from '../_hooks';
import { CreateRoutineSingleGroup } from '@/api/types/hitMiss';
import { useAuthStore } from '@/store';

interface SingleRoutineGroupProps {
  groupIndex: number;
  control: any;
  groupData: { id: string; sectionIndex: number };
  removeGroup: (groupIndex: number) => void;
}

export function SingleRoutineGroup({
  groupIndex,
  control,
  groupData,
  removeGroup,
}: SingleRoutineGroupProps) {
  const { info } = useAuthStore();
  const { data: athleteList, isLoading: isLoadingAthleteList } = useGetListAthlete(
    info?.coachCode || ''
  );

  const groups: CreateRoutineSingleGroup[] = useWatch({
    control,
    name: `sections.${groupData.sectionIndex}.groups`,
  });

  const athleteOptions = useMemo(() => {
    const selectedAthleteId = (groups ?? [])
      .map(group => group.users.map(user => (user as any).user_id).filter((id: string) => id))
      .flat();

    return (
      athleteList?.map(athlete => ({
        label: `${athlete.athlete.profile.first_name} ${athlete.athlete.profile.last_name}`,
        value: athlete.athlete_id,
        disabled: selectedAthleteId.includes(athlete.athlete_id),
      })) || []
    );
  }, [athleteList, groups]);
  const {
    fields: memberFields,
    append: appendMember,
    remove: removeMember,
  } = useFieldArray({
    control,
    name: `sections.${groupData.sectionIndex}.groups.${groupIndex}.users`,
  });

  const addMember = (user_id?: string) => {
    appendMember({ user_id });
  };

  return (
    <div className="relative border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <UsersIcon className="h-4 w-4 text-gray-600" />
          <div className="flex flex-col max-sm:justify-center sm:flex-row sm:items-center gap-1">
            <span className="text-sm font-medium text-gray-700">Group {groupIndex + 1}</span>
            <span className="text-xs text-gray-500">({memberFields.length} athletes)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            type="button"
            onClick={() => addMember()}
            disabled={memberFields.length >= 20}
          >
            <PlusIcon className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">Add</span>Athlete
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-4 text-gray-400 hover:text-red-600"
            type="button"
            onClick={() => removeGroup(groupIndex)}
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-3">
        {memberFields.map((member, memberIndex) => (
          <div key={member.id} className="flex items-start gap-2">
            <Controller
              control={control}
              name={`sections.${groupData.sectionIndex}.groups.${groupIndex}.users.${memberIndex}.user_id`}
              render={({ field, fieldState: { error } }) => (
                <AppSelect
                  className="w-full overflow-hidden max-sm:[&_input]:text-sm"
                  options={athleteOptions}
                  selectedValue={field.value}
                  onChangeSelected={field.onChange}
                  placeholder="Select Athlete"
                  errorMessage={error?.message}
                  loading={isLoadingAthleteList}
                  fullWidth
                  required
                />
              )}
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-red-600"
              type="button"
              onClick={() => removeMember(memberIndex)}
            >
              <MinusCircleIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
