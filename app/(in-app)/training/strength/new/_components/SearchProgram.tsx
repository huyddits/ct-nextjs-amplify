import { useState } from 'react';
import { AppSelect, AppInput } from '@/components/compose';

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
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400, left "
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
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
