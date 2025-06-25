'use client';

import { useState, useEffect, useMemo } from 'react';
import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CoachStudentPayload } from '@/api/types/measurement';
import { useAuthStore } from '@/store';
import { CoachStudentItem } from '@/store/useMeasurement.store';
import { AppInput } from '@/components/compose';
import { useCheckOffNew } from '../_hook';
import { cn } from '@/lib/utils';

type Props = {
  onClose: () => void;
  receivers: { userId: string }[];
  onChangeReceivers: (value: { userId: string }[]) => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
};

export function WhoCheckOff({ onClose, receivers, onChangeReceivers, onSubmit }: Props) {
  const [selected, setSelected] = useState<CoachStudentItem[]>([]);
  const { info } = useAuthStore();
  const [search, setSearch] = useState('');
  const isSelected = (id: string) => receivers.some(s => s.userId === id);
  const { loading, coachStudentList, getCoachStudentList } = useCheckOffNew({});
  const handleSelectAll = () => {
    const all = coachStudentList
      .filter(item => !!item.athleteId)
      .map(item => ({ userId: item.athleteId! }));
    onChangeReceivers(all);
  };

  const handleDeselectAll = () => {
    onChangeReceivers([]);
  };

  const filteredList = useMemo(() => {
    return coachStudentList.filter(item => {
      const fullName = `${item.athlete.profile.firstName} ${item.athlete.profile.lastName}`;
      return fullName.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, coachStudentList]);
  const toggle = (student: CoachStudentItem) => {
    const id = student.athleteId;
    if (!id) return;
    const exists = receivers.some(r => r.userId === id);
    if (exists) {
      onChangeReceivers(receivers.filter(r => r.userId !== id));
    } else {
      onChangeReceivers([...receivers, { userId: id }]);
    }
  };

  useEffect(() => {
    if (!info?.coachCode) {
      return;
    }
    const payload: CoachStudentPayload = {
      coach_code: info.coachCode,
    };

    getCoachStudentList(payload);
  }, [info?.coachCode]);

  useEffect(() => {
    onChangeReceivers(selected.map(item => ({ userId: item.athleteId })));
  }, [selected]);

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md mx-auto rounded-xl p-4 relative shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="space-y-4 mt-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <AppInput
              label=""
              value={search}
              onChange={e => setSearch(e.target.value)}
              icon={<SearchIcon className="w-5 h-5 text-gray-400" />}
              inputProps={{
                placeholder: 'Search Team',
              }}
              fullWidth
              size="md"
            />
          </div>

          <div className="flex justify-between items-center text-green-700 font-medium text-sm px-1">
            <Button variant="link" size="sm" onClick={handleSelectAll}>
              Select All
            </Button>
            <span>{receivers.length} selected</span>
            <Button variant="link" size="sm" onClick={handleDeselectAll}>
              Deselect All
            </Button>
          </div>

          <div className="max-h-56 overflow-y-auto pr-1 space-y-2">
            {filteredList.map(item => {
              const name = `${item.athlete.profile.firstName} ${item.athlete.profile.lastName}`;
              const selectedItem = isSelected(item.athleteId);

              return (
                <div
                  key={item.athleteId}
                  className="flex items-center justify-between gap-3 group"
                  onClick={() => toggle(item)}
                >
                  <button
                    className={`cursor-pointer group-hover:bg-green-50 transition-all flex-1 text-left border-2 rounded-full py-2 px-4 ${
                      selectedItem ? 'bg-green-50 border-green-600' : 'border-green-600'
                    }`}
                  >
                    <span className="font-medium text-sm">{name}</span>
                  </button>

                  <div className="w-5 h-5 rounded-full border-2 border-green-600 flex items-center justify-center">
                    <div
                      className={cn('w-3 h-3 rounded-full bg-green-600 hidden', {
                        block: selectedItem,
                      })}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <Button type="button" className="w-full" size="lg" onClick={onSubmit} loading={loading}>
            Send Check Off
          </Button>
        </div>
      </div>
    </div>
  );
}
