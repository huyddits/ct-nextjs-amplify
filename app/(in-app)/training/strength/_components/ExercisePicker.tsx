'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ProgramTypeSelect, ProgramFilter, EquipmentFilter, ExerciseProgramSection } from '.';
import { Button } from '@/components/ui/button';
import { useProgramForm } from '../_hooks';
import { ROUTES } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/app/(in-app)/_components';
import { type Exercise } from '../_hooks';
import { useStrengthStore } from '@/store';
import { cn } from '@/lib/utils';

interface ExercisePickerProps {
  isNested?: boolean;
  programId?: number;
  onClose?: () => void;
}

export default function ExercisePicker({ isNested, programId, onClose }: ExercisePickerProps) {
  const router = useRouter();
  const { listExercises: listExercisesFromStore } = useStrengthStore();
  const {
    filterForm,
    programType,
    roleOptions,
    pageExercise,
    listExercises,
    problemOptions,
    skillTypeOptions,
    equipmentOptions,
    programTypeOptions,
    totalPagesExercise,
    setFilterForm,
    setProgramType,
    setPageExercise,
    loadMoreExercises,
    fetchListExcersises,
  } = useProgramForm({});
  const [errorMessage, setErrorMessage] = useState('');
  const onGoToProgramEditor = () => {
    if (!listExercisesFromStore) return;
    if (!listExercisesFromStore.length) {
      setErrorMessage('Please select at least one exercise');
      return;
    }

    router.push(`/${ROUTES.TRAINING_STRENGTH_PROGRAM}`);
  };

  useEffect(() => {
    isNested && fetchListExcersises();
  }, [isNested]);

  return (
    <div
      className={cn('padding-top-pagePast padding-bottom-pagePast container', isNested && 'p-0!')}
    >
      {!isNested && <PageHeader title={programId ? 'Edit Program' : 'Create Program'} allowBack />}
      <ProgramTypeSelect
        value={programType}
        options={programTypeOptions}
        onChangeSelected={setProgramType}
        className="mb-4"
      />
      <ProgramFilter
        role={filterForm.roleId}
        problem={filterForm.problemId}
        skillType={filterForm.skillId}
        roleOptions={roleOptions}
        skillOptions={skillTypeOptions}
        problemOptions={problemOptions}
        onChangeSearchText={value => {
          setPageExercise(1);
          setFilterForm(prev => ({ ...prev, exerciseName: value }));
        }}
        onChangeSelected={(field, value) => {
          setFilterForm(prev => {
            console.log(field, value);
            if (field === 'role') {
              return { ...prev, roleId: value };
            }
            if (field === 'skillType') {
              return { ...prev, skillId: value };
            }
            if (field === 'problem') {
              return { ...prev, problemId: value };
            }
            return { ...prev };
          });
        }}
      />

      <EquipmentFilter
        className="mb-8"
        equipmentOptions={equipmentOptions}
        onChangeEquipments={value => {
          setFilterForm(prev => ({ ...prev, equipmentIds: value.map(item => item.value) }));
        }}
        onApplyFilter={() => {
          setPageExercise(1);
          fetchListExcersises(1);
        }}
      />
      <ExerciseProgramSection
        listExcercises={listExercises}
        page={pageExercise}
        totalPages={totalPagesExercise}
        onUpdate={() => setErrorMessage('')}
        onLoadMore={loadMoreExercises}
      />

      {isNested ? (
        <Button className="w-full mb-8" size="lg" onClick={onClose}>
          Close
        </Button>
      ) : (
        <>
          <Button className="w-full" size="lg" onClick={onGoToProgramEditor}>
            Go to Program Editor
          </Button>
          {errorMessage && <span className="error-message">{errorMessage}</span>}
        </>
      )}
    </div>
  );
}
