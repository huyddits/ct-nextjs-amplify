'use client';
import { Download } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { AppInput, AppTextarea } from '@/components/compose';

interface CheckOff {
  video: string;
  athlete: string;
  task: string;
  athleteNotes: string;
}

export function CheckOffCard({ checkOff }: { checkOff: CheckOff }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      athlete: checkOff.athlete,
      task: checkOff.task,
      athleteNotes: checkOff.athleteNotes,
      status: 'not_completed', // default status
      feedback: '',
    },
  });

  const statusOptions = [
    { value: 'completed', label: 'Completed' },
    { value: 'not_completed', label: 'Not Completed' },
    { value: 'excused', label: 'Excused' },
  ];

  const onSubmit = (data: any) => {
    // handle save logic
    console.log(data);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Video Player */}
      <div className="mb-6">
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          <video className="w-full h-full object-contain" controls playsInline preload="metadata">
            <source src={checkOff.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Download Button */}
          <a
            href={checkOff.video}
            download
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
            aria-label="Download video"
            title="Download video"
          >
            <Download className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Form Content */}
      <form className="space-y-6 p-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Athlete Name */}
        <div className="flex items-center gap-2">
          <span className="font-medium min-w-[120px]">Athlete:</span>
          <Controller
            name="athlete"
            control={control}
            render={({ field }) => (
              <AppInput
                size="lg"
                {...field}
                className="flex-1 [&_input]:bg-gray-50 [&_input]:shadow-none [&_input]:border-none focus:ring-0"
              />
            )}
          />
        </div>

        {/* Check-Off Task (renamed from Skill/Challenge) */}
        <div className="flex items-center gap-2">
          <span className="font-medium min-w-[120px]">Check-Off Task:</span>
          <Controller
            name="task"
            control={control}
            render={({ field }) => (
              <AppInput
                {...field}
                size="lg"
                className="flex-1 [&_input]:bg-gray-50 [&_input]:shadow-none [&_input]:border-none focus:ring-0"
              />
            )}
          />
        </div>

        {/* Athlete's Notes (new field) */}
        <div className="space-y-2">
          <span className="font-medium">Athlete&rsquo;s Notes:</span>
          <Controller
            name="athleteNotes"
            control={control}
            render={({ field }) => <AppTextarea {...field} />}
          />
        </div>

        {/* Status Selector Boxes */}
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <div
              className="grid grid-cols-3 gap-2 mt-4"
              role="radiogroup"
              aria-label="Completion status"
            >
              {statusOptions.map(option => (
                <Button
                  key={option.value}
                  type="button"
                  onClick={() => field.onChange(option.value)}
                  variant={field.value === option.value ? 'default' : 'outline'}
                  aria-checked={field.value === option.value}
                  role="radio"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          )}
        />

        {/* Feedback Textarea */}
        <Controller
          name="feedback"
          control={control}
          render={({ field }) => (
            <AppTextarea textareaProps={{ placeholder: 'Check Off Feedback' }} {...field} />
          )}
        />

        {/* Save Button */}
        <Button type="submit" size="lg" className="w-full">
          Save Review
        </Button>
      </form>
    </div>
  );
}
