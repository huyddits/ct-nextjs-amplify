'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { AppInput } from '@/components/compose';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { TIME_UNIT } from '@/utils/constants';
import { CoachStudentItem } from '../_types';
import { useMeasurement } from '../_hook';

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
  const [errors, setErrors] = useState<{ [athletId: string]: string }>({});
  const { loading } = useMeasurement();

  useEffect(() => {
    if (open) {
      const initial: { [athletId: string]: string } = {};
      const initialErrors: { [athletId: string]: string } = {};
      athletes.forEach(a => {
        initial[a.athleteId] = '';
        initialErrors[a.athleteId] = '';
      });
      setResults(initial);
      setErrors(initialErrors);
    }
  }, [open, athletes]);

  const handleChange = (athletId: string, value: string) => {
    setResults(prev => ({ ...prev, [athletId]: value }));
  };

  const validateValue = (value: string) => {
    if (!value.trim()) return 'Result is required';

    const digits = value.replace(/\D/g, '');
    if (postfixUnit === TIME_UNIT.MINUTES || postfixUnit === TIME_UNIT.SECONDS) {
      if (digits.length < 2) return 'Format must be mm:ss';
    } else {
      const numeric = Number(value.replace(',', '.'));
      if (isNaN(numeric)) return 'Must be a number';
      if (numeric < 0 || numeric > 1000) return 'Value must be between 0 and 1000';
      return null;
    }
  };

  const formatOnBlur = (value: string): string => {
    const trimmed = value.trim();

    if (!trimmed) return '';

    const digits = trimmed.replace(/\D/g, '');
    const isTime = postfixUnit === TIME_UNIT.MINUTES || postfixUnit === TIME_UNIT.SECONDS;

    if (isTime) {
      if (digits.length <= 2) return digits.padStart(2, '0') + ':00';
      const minutes = digits.slice(0, 2);
      let seconds = digits.slice(2, 4);
      if (seconds.length === 1) seconds += '0';
      if (+seconds > 59) seconds = '59';
      return `${minutes}:${seconds}`;
    }

    const numericStr = trimmed.replace(/^0+(?=\d)/, '').replace(',', '.');
    return numericStr;
  };

  const handleSave = () => {
    const newErrors: { [athletId: string]: string } = {};
    let hasError = false;

    athletes.forEach(a => {
      const val = results[a.athleteId]?.trim() || '';
      const err = validateValue(val);
      if (err) {
        newErrors[a.athleteId] = err;
        hasError = true;
      } else {
        newErrors[a.athleteId] = '';
      }
    });

    setErrors(newErrors);

    if (hasError) return;

    const formatted = athletes.map(a => ({
      athletId: a.athleteId,
      result: results[a.athleteId]?.trim() || '',
    }));
    onSubmit(formatted);
    onClose();
  };

  const isFormValid =
    athletes.length > 0 &&
    athletes.every(a => {
      const value = results[a.athleteId]?.trim();
      const error = errors[a.athleteId];
      return value && !error;
    });

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
                    const digits = raw.replace(/\D/g, '').slice(0, 4);
                    let formatted = '';
                    if (digits.length <= 2) {
                      formatted = digits;
                    } else if (digits.length <= 4) {
                      const minutes = digits.slice(0, 2);
                      const seconds = digits.slice(2);
                      formatted = `${minutes}:${seconds}`;
                    }
                    handleChange(a.athleteId, formatted);
                  } else {
                    if (/^\d*\.?\d*$/.test(raw)) handleChange(a.athleteId, raw);
                  }
                }}
                onBlur={() => {
                  const raw = results[a.athleteId] || '';
                  const err = validateValue(raw);
                  setErrors(prev => ({ ...prev, [a.athleteId]: err || '' }));
                  if (!err) {
                    const formatted = formatOnBlur(raw);
                    handleChange(a.athleteId, formatted);
                  }
                }}
                errorMessage={errors[a.athleteId]}
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

        <Button
          className="w-full mt-4"
          onClick={handleSave}
          loading={loading}
          disabled={!isFormValid}
        >
          Save Result
        </Button>
      </DialogContent>
    </Dialog>
  );
}
