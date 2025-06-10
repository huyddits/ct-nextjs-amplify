'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  ProgramTypeSelect,
  ProgramFilter,
  EquipmentFilter,
  ExerciseProgramSection,
} from './_components';
import { Button } from '@/components/ui/button';
import { useProgramForm } from '../_hooks';
import { ROUTES } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/app/(in-app)/_components';
import { type Exercise } from '../_hooks';

type ExposedHandle = { getValue: () => Exercise[] };

export default function CreateStrengthPage() {
  const router = useRouter();
  const listExercisesRef = useRef<ExposedHandle | null>(null);
  const {
    filterForm,
    programType,
    roleOptions,
    listExercises,
    problemOptions,
    skillTypeOptions,
    equipmentOptions,
    programTypeOptions,
    setFilterForm,
    setProgramType,
    setListExercisesFromStore,
    fetchListExcersises,
  } = useProgramForm();

  // const [programType, setProgramType] = useState('');
  const [selectedEquipments, setSelectedEquipment] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const onGoToProgramEditor = () => {
    const listUpdatedExercises = listExercisesRef.current?.getValue?.();
    if (!listUpdatedExercises) return;
    if (!listUpdatedExercises.length) {
      setErrorMessage('Please select at least one exercise');
      return;
    }
    setListExercisesFromStore(listUpdatedExercises);
    router.push(`/${ROUTES.TRAINING_STRENGTH_PROGRAM}`);
  };

  useEffect(() => {
    console.log('selectedEquipments', selectedEquipments);
  }, [selectedEquipments]);
  return (
    <div className="padding-top-pagePast padding-bottom-pagePast container">
      <PageHeader title="Create Program" allowBack />
      <ProgramTypeSelect
        value={programType}
        options={programTypeOptions}
        onChangeSelected={setProgramType}
        className="mb-4"
      />
      <ProgramFilter
        searchText={filterForm.exerciseName}
        role={filterForm.roleId}
        problem={filterForm.problemId}
        skillType={filterForm.skillId}
        roleOptions={roleOptions}
        skillOptions={skillTypeOptions}
        problemOptions={problemOptions}
        onChangeSearchText={value => {
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
          setSelectedEquipment(value.map(item => item.value));
        }}
        onApplyFilter={fetchListExcersises}
      />
      <ExerciseProgramSection
        ref={listExercisesRef}
        listExcercises={listExercises}
        onUpdate={() => setErrorMessage('')}
      />

      <Button className="w-full" size="lg" onClick={onGoToProgramEditor}>
        Go to Program Editor
      </Button>
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
}
