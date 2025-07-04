'use client';
import { AppInput, SelectOption, AppMultipleSelect } from '@/components/compose';
import { SearchIcon } from 'lucide-react';
import { debounce } from '@/utils/helpers';
import { useRole } from '@/hooks';

interface ProgramFilterProps {
  role: string[];
  problem: string[];
  skillType: string[];
  roleOptions: SelectOption[];
  skillOptions: SelectOption[];
  problemOptions: SelectOption[];
  onChangeSelected: (field: 'role' | 'skillType' | 'problem', value: string[]) => void;
}

export default function ProgramFilter({
  role,
  problem,
  skillType,
  roleOptions,
  skillOptions,
  problemOptions,
  onChangeSelected,
}: ProgramFilterProps) {
  const { isCoach } = useRole();
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
      <div className="mb-3">
        {isCoach && (
          <AppMultipleSelect
            label="What Role?"
            placeholder="Select role"
            selectedValues={role}
            onChangeSelected={values => onChangeSelected('role', values)}
            options={roleOptions}
          />
        )}
      </div>

      <div className="mb-3">
        <AppMultipleSelect
          label="What type of skill are you working on?"
          placeholder="Select skill type"
          selectedValues={skillType}
          onChangeSelected={values => onChangeSelected('skillType', values)}
          options={skillOptions}
        />
      </div>

      <div className="mb-3">
        <AppMultipleSelect
          label="What problem?"
          placeholder="Select problem"
          selectedValues={problem}
          onChangeSelected={values => onChangeSelected('problem', values)}
          options={problemOptions}
        />
      </div>
    </div>
  );
}
