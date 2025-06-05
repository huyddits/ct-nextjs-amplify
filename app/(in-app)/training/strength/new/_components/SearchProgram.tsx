import { useState } from 'react';
import { AppSelect, AppInput } from '@/components/compose';
import { SearchIcon } from 'lucide-react';

export default function SearchProgramForm() {
  const [searchText, setSearchText] = useState('');
  const [role, setRole] = useState('');
  const [skillType, setSkillType] = useState('');
  const [problem, setProblem] = useState('');

  const roleOptions = [
    { label: 'Base/Spotter', value: 'base' },
    { label: 'Flyer', value: 'flyer' },
    { label: 'Both', value: 'both' },
  ];

  const skillOptions = [
    { label: 'Strength', value: 'strength' },
    { label: 'Power', value: 'power' },
    { label: 'Endurance', value: 'endurance' },
  ];

  const problemOptions = [
    { label: 'Mobility', value: 'mobility' },
    { label: 'Stability', value: 'stability' },
    { label: 'Technique', value: 'technique' },
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
      <div className="mb-4">
        <AppInput
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          iconPosition="start"
          inputProps={{ placeholder: 'Search exercises...' }}
          icon={<SearchIcon className="w-5 h-5 text-gray-400" />}
        />
      </div>

      <div className="mb-3">
        <h3 className="text-sm text-gray-600 mb-1">What Role?</h3>
        <AppSelect
          placeholder="Select role"
          selectedValue={role}
          onChangeSelected={value => setRole(value)}
          options={roleOptions}
          fullWidth
        />
      </div>

      <div className="mb-3">
        <h3 className="text-sm text-gray-600 mb-1">What type of skill are you working on?</h3>
        <AppSelect
          placeholder="Select skill type"
          selectedValue={skillType}
          onChangeSelected={value => setSkillType(value)}
          options={skillOptions}
          fullWidth
        />
      </div>

      <div className="mb-3">
        <h3 className="text-sm text-gray-600 mb-1">What problem?</h3>
        <AppSelect
          placeholder="Select problem"
          selectedValue={problem}
          onChangeSelected={value => setProblem(value)}
          options={problemOptions}
          fullWidth
        />
      </div>
    </div>
  );
}
