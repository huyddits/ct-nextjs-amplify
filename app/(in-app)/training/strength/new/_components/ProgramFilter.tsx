import { AppInput, SelectOption } from '@/components/compose';
import { SearchIcon } from 'lucide-react';
import AppMultipleSelect from '@/components/compose/AppMultipleSelect';

interface ProgramFilterProps {
  role: string[];
  problem: string[];
  skillType: string[];
  searchText: string;
  roleOptions: SelectOption[];
  skillOptions: SelectOption[];
  problemOptions: SelectOption[];
  onChangeSelected: (field: 'role' | 'skillType' | 'problem', value: string[]) => void;
  onChangeSearchText: (value: string) => void;
}

export default function ProgramFilter({
  role,
  problem,
  skillType,
  searchText,
  roleOptions,
  skillOptions,
  problemOptions,
  onChangeSelected,
  onChangeSearchText,
}: ProgramFilterProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
      <div className="mb-4">
        <AppInput
          value={searchText}
          onChange={e => onChangeSearchText(e.target.value)}
          iconPosition="start"
          inputProps={{ placeholder: 'Search exercises...' }}
          icon={<SearchIcon className="w-5 h-5 text-gray-400" />}
        />
      </div>

      <div className="mb-3">
        <AppMultipleSelect
          label="What Role?"
          placeholder="Select role"
          selectedValues={role}
          onChangeSelected={values => onChangeSelected('role', values)}
          options={roleOptions}
        />
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
