import { Card, CardHeader } from '@/components/ui/card';
import { AppInput } from '@/components/compose';
import { Button } from '@/components/ui/button';
import { PlusIcon, Trash2Icon, ChevronUpIcon, ChevronDownIcon } from 'lucide-react';
import { useFieldArray, Controller } from 'react-hook-form';
import { SingleRoutineGroup } from './SingleRoutineGroup';

type Props = {
  idx: number;
  totalSection: number;
  moveSection: (index: number, direction: 'up' | 'down') => void;
  removeSection: (index: number) => void;
  control: any;
};

export function SingleRoutineSection({
  idx,
  totalSection,
  moveSection,
  removeSection,
  control,
}: Props) {
  const {
    fields: groupFields,
    append: appendGroup,
    remove: removeGroup,
  } = useFieldArray({
    control,
    name: `sections.${idx}.groups`,
  });

  const addGroup = (user_id?: string) => {
    appendGroup({ users: [{ user_id }] });
  };

  return (
    <Card className="mb-6 border-gray-300 shadow-sm">
      <CardHeader className="flex flex-row space-y-0">
        <div className="flex space-x-2">
          <div className="flex flex-col my-auto -translate-y-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => moveSection(idx, 'up')}
              disabled={idx === 0}
            >
              <ChevronUpIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => moveSection(idx, 'down')}
              disabled={idx === totalSection - 1}
            >
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-none h-9 w-6 text-gray-600 font-medium my-auto">{idx + 1}.</div>
        </div>
        <Controller
          control={control}
          name={`sections.${idx}.name`}
          render={({ field, fieldState: { error } }) => (
            <AppInput
              {...field}
              inputProps={{ placeholder: 'Enter Section Name' }}
              className="flex-1"
              errorMessage={error?.message}
            />
          )}
        />
        <Button
          variant="link"
          size="icon"
          className="flex-none text-gray-400 hover:text-destructive"
          onClick={() => removeSection(idx)}
        >
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <div className="space-y-4 px-6">
        {groupFields.map((group, groupIndex) => (
          <SingleRoutineGroup
            key={group.id}
            groupIndex={groupIndex}
            control={control}
            groupData={{ ...group, sectionIndex: idx }}
            removeGroup={removeGroup}
          />
        ))}
        <Button
          variant="outline"
          className="w-full border-2 border-dashed border-gray-300 hover:border-gray-400"
          type="button"
          onClick={() => addGroup()}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Group
        </Button>
      </div>
    </Card>
  );
}
