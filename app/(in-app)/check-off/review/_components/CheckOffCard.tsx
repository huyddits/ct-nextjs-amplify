'use client';
import { Download } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { AppInput, AppTextarea } from '@/components/compose';
import { CheckOffStatusEnum, CheckOffStudentReview } from '@/api/types/checkOff';
import * as yup from 'yup';
import { useUpdateCheckOffStudentReview } from '../_hooks/useGetCheckOffStudentReview';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { CHECKOFF_SCHEMA, useCheckOffForm } from '../_hooks/useCheckOffForm';
import { useAuthStore } from '@/store';

type Props = {
  data: CheckOffStudentReview;
  refetch: () => void; // Optional refetch function if needed
};

const statusOptions = [
  { label: 'Completed', value: CheckOffStatusEnum.Completed },
  { label: 'Not Completed', value: CheckOffStatusEnum.NotCompleted },
  { label: 'Excused', value: CheckOffStatusEnum.Excused },
];

export function CheckOffCard({ data: checkOff, refetch }: Props) {
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

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Video Player */}
      <div className="mb-6">
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          <video className="w-full h-full object-contain" controls playsInline preload="metadata">
            <source src={checkOff.media_link} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <a
            href={checkOff.media_link}
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
          <AppTextarea value={checkOff.note} textareaProps={{ readOnly: true }} />
        </div>

        {/* Status Selector Boxes */}
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
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
        {errors.status && <div className="error-message">{errors.status.message}</div>}

        {/* Feedback Textarea */}
        <Controller
          name="coach_review_note"
          control={control}
          render={({ field, formState: { errors } }) => (
            <AppTextarea
              errorMessage={errors.coach_review_note?.message}
              textareaProps={{ placeholder: 'Check Off Feedback', readOnly: isCompleted }}
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
