'use client';
import { Send, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, Form } from 'react-hook-form';
import { InferType } from 'yup';
import { toast } from 'react-toastify';
import AppInput from '@/components/compose/AppInput.client';
import AppSelect from '@/components/compose/AppSelect.client';
import AppTextarea from '@/components/compose/AppTextarea.client';
import { CHECKOFF_SUBMISSION_SCHEMA, useCheckoffSubmission } from './_hooks/useCheckoffForm';
import { useCheckOffSubmit } from './_hooks/useCheckOffStudent';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGetCheckOffStudentReview } from '../review/_hooks';
import { format, isPast } from 'date-fns';
import { stat } from 'fs';

export default function CheckOffSubmissionPage() {
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const {
    data: checkOffList,
    isLoading,
    isValidating,
    setSize,
    size,
    mutate: refetch,
  } = useGetCheckOffStudentReview(20);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useCheckoffSubmission();
  const [fileKey, setFileKey] = useState(0); // Reset key to force re-render on file change
  const { trigger: submitCheckOff, isMutating } = useCheckOffSubmit();
  const [selectedCheckOff, setSelectedCheckOff] = useState<any>();

  useEffect(
    () => () => {
      setSize(1);
    },
    []
  );

  const onSelect = (value: string, onChange: (value: string) => void) => {
    const parsedValue = JSON.parse(value);
    setSelectedCheckOff(parsedValue);
    setMediaFile(null);
    setMediaPreview(null);
    setFileKey(Math.random()); // Support re uploading the same file
    onChange(value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
    }
    setFileKey(Math.random());
  };

  const onSubmit = async (data: InferType<typeof CHECKOFF_SUBMISSION_SCHEMA>) => {
    // Validation checks
    if (!mediaFile) {
      toast.error('Please upload a video or image before submitting.');
      return;
    }

    const parsedCheckOff = JSON.parse(data.submit_id as unknown as string);

    if (parsedCheckOff?.due_date && isPast(new Date(parsedCheckOff.due_date))) {
      toast.error('This check-off is past its due date and cannot be submitted.');
      return;
    }

    const formData = new FormData();
    formData.append('file', mediaFile);
    formData.append('submit_id', String(parsedCheckOff?.submit_id));
    formData.append('note', data.note || '');
    await submitCheckOff(formData, {
      onSuccess: () => {
        toast.success('Check-off submitted successfully!');
        setMediaFile(null);
        setMediaPreview(null);
        setFileKey(Math.random()); // Reset file input
        setSelectedCheckOff(null);
        refetch(); // Refresh the check-off list
      },
    });
  };

  return (
    <div className="padding-top-pagePast padding-bottom-pagePast max-w-4xl mx-auto px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
        <div className="space-y-2 [&_label]:h-7 [&_label]:justify-center [&_label]:text-foreground [&_label]:text-lg [&_label]:font-medium">
          <Controller
            name="submit_id"
            control={control}
            render={({ field }) => (
              <AppSelect
                label="Select Check-Off to Submit"
                options={
                  (
                    checkOffList?.map(page =>
                      page.data?.map(option => ({
                        label: option.checkoff.assigned_task || '-',
                        value: JSON.stringify({
                          submit_id: option.submit_id,
                          due_date: option.due_date || '-',
                          note: option.note || '-',
                          status: option.status || '',
                        }),
                        disabled: !!option.status,
                      }))
                    ) || []
                  ).flat() as any
                }
                loading={isLoading}
                selectedValue={field.value}
                onChangeSelected={v => onSelect(v, field.onChange)}
                placeholder="Select a check-off..."
                errorMessage={errors.submit_id?.message}
                fullWidth
                fetchingMore={isValidating}
                infinite={() => {
                  if (size < (checkOffList?.at(-1)?.meta?.totalPages || 0) && !isValidating) {
                    setSize(size + 1);
                  }
                }}
              />
            )}
          />
        </div>

        <div className="space-y-2 [&_label]:h-7 [&_label]:justify-center [&_label]:text-foreground [&_label]:text-lg [&_label]:font-medium">
          <AppInput
            label="Due Date"
            value={
              selectedCheckOff?.due_date
                ? format(new Date(selectedCheckOff.due_date), 'dd/MM/yyyy')
                : ''
            }
            readonly
            inputProps={{
              placeholder: 'Select a check-off first',
              className: 'text-center',
            }}
            fullWidth
          />
        </div>

        <div className="space-y-2 [&_label]:h-7 [&_label]:justify-center [&_label]:text-foreground [&_label]:text-lg [&_label]:font-medium">
          <AppInput
            label="Instructions / Notes from Coach"
            value={selectedCheckOff?.note}
            readonly
            inputProps={{
              placeholder: 'Select a check-off to see notes',
              className: 'text-center',
            }}
            fullWidth
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-center font-medium text-lg">Upload Video/Image</h2>
          <div
            className={cn(
              'p-3 border-2 border-dashed border-primary rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 transition-colors'
            )}
            onClick={() => document.getElementById('media-upload')?.click()}
          >
            {mediaPreview ? (
              <div className="w-full">
                {mediaFile?.type.startsWith('video/') ? (
                  <video src={mediaPreview} className="w-full" controls />
                ) : (
                  <img
                    src={mediaPreview || '/placeholder.svg'}
                    alt="Preview"
                    className="w-full max-h-[300px] object-cover"
                  />
                )}
                <p className="text-center mt-2 text-sm text-gray-600">{mediaFile?.name}</p>
              </div>
            ) : (
              <>
                <div className="bg-primary text-white p-3 rounded-full mb-2">
                  <Upload className="h-6 w-6" />
                </div>
                <p className="text-center text-gray-600">Click to upload video or image</p>
                <p className="text-center text-xs text-gray-500 mt-1">
                  Supports MP4, MOV, JPG, PNG
                </p>
              </>
            )}
            <input
              key={fileKey}
              type="file"
              id="media-upload"
              className="hidden"
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="space-y-2 [&_label]:h-7 [&_label]:justify-center [&_label]:text-foreground [&_label]:text-lg [&_label]:font-medium">
          <Controller
            name="note"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <AppTextarea
                label="Notes about your submission"
                {...field}
                textareaProps={{
                  placeholder: 'Add any notes about your video/image submission...',
                  className: 'min-h-[100px]',
                }}
                errorMessage={error?.message}
              />
            )}
          />
        </div>

        <Button size="lg" type="submit" className="w-full" loading={isMutating}>
          {!isMutating && <Send className="size-5" />}
          Submit Check-Off
        </Button>
      </form>
    </div>
  );
}
