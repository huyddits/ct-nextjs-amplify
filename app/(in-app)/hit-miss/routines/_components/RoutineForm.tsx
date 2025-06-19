'use client';

import Link from 'next/link';
import { ArrowLeftIcon, Loader2Icon, PlusIcon, SaveIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/utils/constants';
import { SingleRoutineSection } from './SingleRoutineSection';
import { useForm, useFieldArray, Controller, FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AppInput } from '@/components/compose';
import { toast } from 'react-toastify';
import { CreateRoutinePayload } from '@/api/types/hitMiss';
import {
  useCreateHitMissRoutine,
  useGetHitMissRoutineDetail,
  useUpdateHitMissRoutine,
} from '../_hooks';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

const schema = yup.object({
  name: yup.string().required('Routine name is required'),
  sections: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required('Section name is required'),
        groups: yup
          .array()
          .of(
            yup.object({
              users: yup
                .array()
                .of(yup.object({ user_id: yup.string().required('Member is required') }))
                .min(1, 'At least one member is required')
                .required(),
            })
          )
          .min(1, 'At least one group is required')
          .required(),
      })
    )
    .min(1, 'At least one section is required')
    .required(),
});
interface Props {
  id?: string;
}

export function RoutineForm({ id }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const {
    data: routine,
    isLoading: isLoadingRoutineDetail,
    isValidating,
  } = useGetHitMissRoutineDetail(id);
  const { trigger: createRoutine, isMutating: isCreating } = useCreateHitMissRoutine();
  const { trigger: updateRoutine, isMutating: isUpdating } = useUpdateHitMissRoutine();
  const { control, handleSubmit, setValue } = useForm<CreateRoutinePayload>({
    mode: 'onChange',
    resolver: yupResolver(schema) as any,
    defaultValues: {
      name: '',
      sections: [
        {
          name: '',
          groups: [{ users: [{ user_id: undefined }] }],
        },
      ],
    },
  });
  useEffect(() => {
    if (routine) {
      setValue('name', routine.name || '');
      setValue('sections', routine.sections);
    }
  }, [routine, setValue]);
  const isLoading = useMemo(() => isCreating || isUpdating, [isCreating, isUpdating]);
  const {
    fields: sectionFields,
    append: appendSection,
    remove,
    move,
  } = useFieldArray({
    control,
    name: 'sections',
  });

  const addSection = (user_id?: string) => {
    appendSection({ name: '', groups: [{ users: [{ user_id }] }] });
  };

  // Wrappers to match SingleRoutineSection's expected signature
  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) move(index, index - 1);
    if (direction === 'down' && index < sectionFields.length - 1) move(index, index + 1);
  };

  const removeSection = (index: number) => remove(index);

  const onInvalid = (errors: FieldErrors<CreateRoutinePayload>) => {
    // No section
    if (errors.sections && !Array.isArray(errors.sections)) {
      toast.error('At least one section is required.');
      return;
    }
    // If there are section errors, check for group errors
    if (Array.isArray(errors.sections)) {
      for (const section of errors.sections) {
        if (section && section.groups && !Array.isArray(section.groups)) {
          toast.error('Each section must have at least one group.');
          return;
        }
        // If there are group errors, check for member errors
        if (section && Array.isArray(section.groups)) {
          for (const group of section.groups) {
            if (group && group.users && !Array.isArray(group.users)) {
              toast.error('Each group must have at least one member.');
              return;
            }
          }
        }
      }
    }
  };

  const onSubmit = (data: CreateRoutinePayload) => {
    const body: CreateRoutinePayload = {
      name: data.name,
      sections: data.sections.map(section => ({
        name: section.name,
        groups: section.groups.map(group => ({
          users: group.users.map(user => {
            if (typeof user === 'object' && user !== null && 'user_id' in user) {
              return String(user.user_id);
            }
            return user;
          }),
        })),
      })),
    };

    if (isEdit) {
      updateRoutine({
        routine_id: Number(id),
        body,
      });
    } else {
      createRoutine(body, {
        onSuccess: () => {
          router.push(`/${ROUTES.HIT_MISS_ROUTINES}`);
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div className="bg-white border-b border-gray-300 position-avoid-top-nav">
        <div className="flex items-center p-4">
          <Link href={`/${ROUTES.HIT_MISS_ROUTINES}`} className="text-gray-600">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <h1 className="text-lg font-semibold ml-4">{isEdit ? 'Edit Routine' : 'Add Routine'}</h1>
        </div>
      </div>
      {isLoadingRoutineDetail || isValidating ? (
        <div className="flex items-center justify-center mt-96 gap-4">
          <Loader2Icon className="animate-spin size-8 text-primary" />
          Loading Routine...
        </div>
      ) : (
        <>
          <div className="max-w-3xl mx-auto pt-[112px] pb-[140px] p-4">
            <Card className="mb-6 border-gray-300">
              <CardHeader>
                <CardTitle>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field, fieldState: { error } }) => (
                      <AppInput
                        {...field}
                        inputProps={{ placeholder: 'Enter Routine Name' }}
                        className="text-xl font-bold"
                        errorMessage={error?.message}
                      />
                    )}
                  />
                </CardTitle>
              </CardHeader>
            </Card>

            {sectionFields.map((section, idx) => (
              <SingleRoutineSection
                key={section.id}
                idx={idx}
                totalSection={sectionFields.length}
                moveSection={moveSection}
                removeSection={removeSection}
                control={control}
              />
            ))}

            <Button
              variant="outline"
              className="w-full mt-4 border-2 border-dashed border-gray-300 hover:border-gray-400"
              type="button"
              onClick={() => addSection()}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Section
            </Button>
          </div>
          <div className="position-avoid-bottom-app">
            <div className="bg-white px-4 py-3 shadow-top">
              <div className="max-w-3xl mx-auto">
                <Button className="w-full shadow" size="lg" type="submit" loading={isLoading}>
                  {!isLoading && <SaveIcon className="h-5 w-5 mr-3" />}
                  Save Routine
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </form>
  );
}
