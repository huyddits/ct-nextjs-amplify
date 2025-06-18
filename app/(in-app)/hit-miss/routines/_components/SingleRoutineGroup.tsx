import { Button } from '@/components/ui/button';
import { AppSelect } from '@/components/compose';
import { MinusCircleIcon, PlusIcon, Trash2Icon, UsersIcon } from 'lucide-react';
import { Controller, useFieldArray } from 'react-hook-form';
import React, { useMemo } from 'react';
import { useGetListAthlete } from '../_hooks';
import { usePersonalInfo } from '@/hooks';

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
  const { data: info } = usePersonalInfo();
  const { data: athleteList } = useGetListAthlete(info?.coachCode || '');

  const athleteOptions = useMemo(
    () =>
      athleteList?.map(athlete => ({
        label: `${athlete.athlete.profile.first_name} ${athlete.athlete.profile.last_name}`,
        value: athlete.athlete_id,
      })) || [],
    [athleteList]
  );
  const {
    fields: memberFields,
    append: appendMember,
    remove: removeMember,
  } = useFieldArray({
    control,
    name: `sections.${groupData.sectionIndex}.groups.${groupIndex}.members`,
  });

  const addMember = (memberId?: string) => {
    appendMember({ id: memberId });
  };
  return (
    <div className="relative border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <UsersIcon className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Group {groupIndex + 1}</span>
          <span className="text-xs text-gray-500">({memberFields.length} members)</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 text-xs"
            type="button"
            onClick={() => addMember()}
          >
            <PlusIcon className="h-3 w-3 mr-1" />
            Add Member
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400 hover:text-red-600"
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
              name={`sections.${groupData.sectionIndex}.groups.${groupIndex}.members.${memberIndex}.id`}
              render={({ field, fieldState: { error } }) => (
                <AppSelect
                  className="flex-1"
                  options={athleteOptions}
                  selectedValue={field.value}
                  onChangeSelected={field.onChange}
                  placeholder="Select Athlete"
                  errorMessage={error?.message}
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
