'use client';
import { Download } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { AppInput, AppTextarea } from '@/components/compose';
import { CheckOffStatusEnum, CheckOffStudentReview } from '@/api/types/checkOff';
import * as yup from 'yup';
import { useUpdateCheckOffStudentReview } from '../_hooks/useGetCheckOffStudentReview';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { CHECKOFF_SCHEMA, useCheckOffForm } from '../_hooks/useCheckOffForm';
import { useAuthStore } from '@/store';

type Props = {
  data: CheckOffStudentReview;
  onSubmit: () => void; // Optional refetch function if needed
};

const statusOptions = [
  { label: 'Completed', value: CheckOffStatusEnum.Completed, variant: 'default' },
  { label: 'Not Completed', value: CheckOffStatusEnum.NotCompleted, variant: 'red' },
  { label: 'Excused', value: CheckOffStatusEnum.Excused, variant: 'yellow' },
];

export function CheckOffCard({ data: checkOff, onSubmit: refetch }: Props) {
  const { info } = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useCheckOffForm(checkOff);

  const [finishReview, setFinishReview] = useState(false);
  const { trigger, isMutating } = useUpdateCheckOffStudentReview();
  const isCompleted =
    finishReview ||
    checkOff.status === CheckOffStatusEnum.Completed ||
    checkOff.status === CheckOffStatusEnum.Excused;

  const onSubmit = (formData: yup.InferType<typeof CHECKOFF_SCHEMA>) => {
    trigger(
      {
        submit_id: checkOff.submit_id,
        ...formData,
      },
      {
        onSuccess: () => {
          toast.success('Review updated successfully');
          refetch();
          setFinishReview(true);
        },
      }
    );
  };
  const previewComponent = useMemo(() => {
    const IMG_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.bmp', '.tiff'];
    if (checkOff.media_link && IMG_EXTENSIONS.some(ext => checkOff.media_link.endsWith(ext))) {
      return (
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          <img
            src={checkOff.media_link}
            alt="Check Off Media"
            className="size-full object-contain"
          />
          <a
            href={checkOff.media_link}
            download
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
            aria-label="Download image"
            title="Download image"
          >
            <Download className="h-5 w-5" />
          </a>
        </div>
      );
    }

    return (
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <video
          className="w-full h-full object-contain"
          controls
          playsInline
          preload="metadata"
          autoPlay={false}
        >
          <source src={checkOff.media_link} />
          Your browser does not support the video tag.
        </video>
        <a
          href={checkOff.media_link}
          download
          className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
          aria-label="Download video"
          title="Download video"
          target="_blank"
        >
          <Download className="h-5 w-5" />
        </a>
      </div>
    );
  }, [checkOff.media_link]);
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Video Player */}
      <div className="mb-6">{previewComponent}</div>

      {/* Form Content */}
      <form className="space-y-6 p-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Athlete Name */}
        <div className="flex items-center gap-2">
          <span className="font-medium min-w-[120px]">Athlete:</span>
          <AppInput
            size="lg"
            value={`${checkOff.athlete.profile.first_name} ${checkOff.athlete.profile.last_name}`}
            className="flex-1 [&_input]:bg-gray-50 [&_input]:shadow-none [&_input]:border-none focus:ring-0"
          />
        </div>

        {/* Check-Off Task (renamed from Skill/Challenge) */}
        <div className="flex items-center gap-2">
          <span className="font-medium min-w-[120px]">Check-Off Task:</span>
          <AppInput
            readonly
            value={checkOff.checkoff.assigned_task}
            size="lg"
            className="flex-1 [&_input]:bg-gray-50 [&_input]:shadow-none [&_input]:border-none focus:ring-0"
          />
        </div>

        {/* Athlete's Notes (new field) */}
        <div className="space-y-2">
          <span className="font-medium">Athlete&rsquo;s Notes:</span>
          <AppTextarea
            value={checkOff.note}
            textareaProps={{ readOnly: true, placeholder: "Athlete's notes...", className: 'mt-1' }}
          />
        </div>

        {/* Status Selector Boxes */}
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <div>
              <div
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4"
                role="radiogroup"
                aria-label="Completion status"
              >
                {statusOptions.map(option => (
                  <Button
                    key={option.value}
                    type="button"
                    onClick={() => !isCompleted && field.onChange(option.value)}
                    variant={field.value === option.value ? (option.variant as any) : 'outline'}
                    aria-checked={field.value === option.value}
                    role="radio"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
              {errors.status && <div className="mt-2 error-message">{errors.status.message}</div>}
            </div>
          )}
        />

        {/* Feedback Textarea */}
        <Controller
          name="coach_review_note"
          control={control}
          render={({ field, formState: { errors } }) => (
            <AppTextarea
              errorMessage={errors.coach_review_note?.message}
              textareaProps={{ placeholder: 'Enter check off feedback…', readOnly: isCompleted }}
              {...field}
            />
          )}
        />

        {/* Save Button */}
        <Button
          hidden={info?.roleName !== 'Coach'}
          type="submit"
          size="lg"
          className="w-full"
          loading={isMutating}
          disabled={isCompleted}
        >
          {isCompleted ? 'Review Completed' : 'Save Review'}
        </Button>
      </form>
    </div>
  );
}
