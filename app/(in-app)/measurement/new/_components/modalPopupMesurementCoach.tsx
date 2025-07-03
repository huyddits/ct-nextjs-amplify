'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { AppInput } from '@/components/compose';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { TIME_UNIT } from '@/utils/constants';
import { CoachStudentItem } from '../_types';

type Props = {
  open: boolean;
  onClose: () => void;
  athletes: CoachStudentItem[];
  postfixUnit?: string;
  onSubmit: (results: { athletId: string; result: string }[]) => void;
};

export default function ModalPopupMesurementCoach({
  open,
  onClose,
  athletes,
  postfixUnit,
  onSubmit,
}: Props) {
  const [results, setResults] = useState<{ [athletId: string]: string }>({});

  // Reset form khi mở modal mới
  useEffect(() => {
    if (open) {
      const initial: { [athletId: string]: string } = {};
      athletes.forEach(a => {
        initial[a.athleteId] = '';
      });
      setResults(initial);
    }
  }, [open, athletes]);

  const handleChange = (athletId: string, value: string) => {
    setResults(prev => ({
      ...prev,
      [athletId]: value,
    }));
  };

  const handleFormat = (raw: string) => {
    const digits = raw.replace(/\D/g, '');
    if (digits.length <= 2) {
      return digits;
    } else {
      const minutes = digits.slice(0, 2);
      const seconds = digits.slice(2, 4);
      return `${minutes}:${seconds}`;
    }
  };

  const handleBlur = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) {
      return digits.padStart(2, '0') + ':00';
    } else {
      const minutes = digits.slice(0, 2);
      let seconds = digits.slice(2, 4);
      if (+seconds > 59) seconds = '59';
      return `${minutes}:${seconds}`;
    }
  };

  const handleSave = () => {
    const formatted = athletes.map(a => ({
      athletId: a.athleteId,
      result: results[a.athleteId]?.trim() || '',
    }));
    onSubmit(formatted);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogTitle>Set Record Result</DialogTitle>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {athletes.map(a => (
            <div key={a.athleteId}>
              <p className="font-semibold mb-1">
                {a.athlete.profile.firstName} {a.athlete.profile.lastName}
              </p>
              <AppInput
                value={results[a.athleteId] || ''}
                onChange={e => {
                  const raw = e.target.value;
                  if (postfixUnit === TIME_UNIT.MINUTES || postfixUnit === TIME_UNIT.SECONDS) {
                    handleChange(a.athleteId, handleFormat(raw));
                  } else {
                    if (/^\d*\.?\d*$/.test(raw)) handleChange(a.athleteId, raw);
                  }
                }}
                onBlur={() => {
                  if (postfixUnit === TIME_UNIT.MINUTES || postfixUnit === TIME_UNIT.SECONDS) {
                    const val = results[a.athleteId] || '';
                    handleChange(a.athleteId, handleBlur(val));
                  }
                }}
                postfix={postfixUnit}
                inputProps={{
                  placeholder: 'Enter measurement',
                  type: 'text',
                  className:
                    'appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
                }}
              />
            </div>
          ))}
        </div>

        <Button className="w-full mt-4" onClick={handleSave}>
          Save Result
        </Button>
      </DialogContent>
    </Dialog>
  );
}
