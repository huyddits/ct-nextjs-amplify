'use client';

import { AppDatePicker, AppInput, AppTextarea } from '@/components/compose';
import { format } from 'date-fns';
import { SendIcon } from 'lucide-react';
import { useState } from 'react';
import { WhoCheckOff } from './_components';

export default function CheckOffNewPage() {
  const today = format(new Date(), 'MM/dd/yyyy');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="padding-top-pagePast padding-bottom-pagePast max-w-3xl mx-auto px-4">
      <div className="max-w-md mx-auto space-y-6 py-8">
        <div className="space-y-2">
          <h2 className="text-center font-medium text-lg">Today's Date</h2>
          <div className="border-2 bg-white rounded-lg p-1 text-center">{today}</div>
        </div>
        <div className="space-y-2">
          <h2 className="text-center font-medium text-lg">When is skill check due?</h2>
          {/* <Controller */}
          {/* // name="dueDate"
          // control={control}
          // render={({ field, fieldState: { error } }) => ( */}
          <AppDatePicker
            label=""
            dateFormat="MM/dd/yyyy"
            placeholder="Select due date"
            minDate={new Date()}
            value={dueDate ? format(dueDate, 'MM/dd/yyyy') : ''}
            onChange={setDueDate}
            fullWidth
            required
          />
          {/*)}
         /> */}
        </div>
        <div className="space-y-2">
          <h2 className="text-center font-medium text-lg">What skill or challenge is due?</h2>
          <AppInput
            label=""
            inputProps={{
              placeholder: 'Enter skill or challenge',
              className: 'text-center border-2  rounded-lg p-1 text-center ',
            }}
            size="lg"
            fullWidth
            required
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-center font-medium text-lg">Any notes or comments?</h2>
          <AppTextarea
            label=""
            textareaProps={{
              placeholder: 'Add notes here',
              className: 'min-h-[100px] border-2 rounded-lg p-3 text-lg',
            }}
            // errorMessage={error?.message}
          />
        </div>

        <button
          onClick={() => setOpen(true)}
          className="w-full border-2 rounded-lg p-3 flex items-center justify-between text-lg bg-white"
        >
          <span className="text-gray-400">Who is this check off for?</span>
          <SendIcon className="w-6 h-6 text-gray-700 scale-x-[-1]" />
        </button>
        {open && <WhoCheckOff onClose={() => setOpen(false)} />}
      </div>
    </div>
  );
}
