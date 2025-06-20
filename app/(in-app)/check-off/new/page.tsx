'use client';

import { AppDatePicker, AppInput, AppTextarea } from '@/components/compose';
import { format } from 'date-fns';
import { SendIcon } from 'lucide-react';
import { useState } from 'react';
import { WhoCheckOff } from './_components';
import { Controller, useWatch } from 'react-hook-form';
import { useCheckOffNew } from './_hook';

export default function CheckOffNewPage() {
  const today = format(new Date(), 'MM/dd/yyyy');
  const [open, setOpen] = useState(false);
  const { control, onSubmit, setValue, reset } = useCheckOffNew({
    onSuccess: () => {
      reset();
      setOpen(false);
    },
    onFailure: () => {},
  });
  const receivers = useWatch({ control, name: 'receivers' }) as { userId: string }[];

  return (
    <div className="padding-top-pagePast padding-bottom-pagePast max-w-3xl mx-auto px-4">
      <div className="max-w-md mx-auto space-y-6 py-8">
        <div className="space-y-2">
          <h2 className="text-center font-medium text-lg">Today's Date</h2>
          <Controller
            name="assignedDate"
            control={control}
            defaultValue={today}
            render={({ field }) => (
              <>
                <div className="border-2 bg-white rounded-lg p-1 text-center">{field.value}</div>
                <input type="hidden" {...field} />
              </>
            )}
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-center font-medium text-lg">When is skill check due?</h2>
          <Controller
            name="dueDate"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <AppDatePicker
                label=""
                dateFormat="MM/dd/yyyy"
                placeholder="Select due date"
                minDate={new Date()}
                value={field.value ?? ''}
                onChange={field.onChange}
                fullWidth
                required
                errorMessage={error?.message}
              />
            )}
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-center font-medium text-lg">What skill or challenge is due?</h2>
          <Controller
            name="assignedTask"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <AppInput
                label=""
                value={field.value}
                onChange={field.onChange}
                inputProps={{
                  placeholder: 'Enter skill or challenge',
                  className: 'text-center border-2 rounded-lg p-1 text-center',
                }}
                size="lg"
                fullWidth
                required
                errorMessage={error?.message}
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-center font-medium text-lg">Any notes or comments?</h2>
          <Controller
            name="note"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <AppTextarea
                label=""
                value={field.value}
                onChange={field.onChange}
                textareaProps={{
                  placeholder: 'Add notes here',
                  className: 'min-h-[100px] border-2 rounded-lg p-3 text-lg',
                }}
                errorMessage={error?.message}
              />
            )}
          />
        </div>

        <button
          onClick={() => setOpen(true)}
          className="w-full border-2 rounded-lg p-3 flex items-center justify-between text-lg bg-white"
        >
          <span className="text-gray-400">Who is this check off for?</span>
          <SendIcon className="w-6 h-6 text-gray-700 scale-x-[-1]" />
        </button>
        {open && (
          <WhoCheckOff
            onClose={() => setOpen(false)}
            receivers={receivers}
            onChangeReceivers={val => {
              setValue('receivers', val);
            }}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </div>
  );
}
