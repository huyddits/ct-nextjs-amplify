import { CategoryApi, StrengthApi } from '@/api';
import { useCategories, usePagination } from '@/hooks';
import { useAuthStore, useCategoriesStore, useStrengthStore } from '@/store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, InferType, object, string } from 'yup';
import { ERROR_MESSAGES } from '@/utils/constants';
import { useRouter } from 'next/navigation';

export type Exercise = {
  id: number;
  cues: string;
  description: string;
  name: string;
  difficulty: number;
  equipments: any[];
  exerciseId: number;
  filterExercise: string[];
  imageUrl: string;
  targetMuscles: string;
  videoUrl: string;
  sets?: { reps: number; rpe: number }[];
  isAdded?: boolean;
};

export type FilterForm = {
  exerciseName: string;
  roleId: string[];
  skillId: string[];
  problemId: string[];
  cheerTypeId: string[];
  equipmentIds: string[];
  programTypeId: string;
};

export type ProgramExercise = {
  exerciseId: number;
  sets: { reps: number; rpe: number }[];
};

export type ProgramForm = {
  name: string;
  type: string;
  trainingType: string;
  copied_at?: string;
  exercises: ProgramExercise[];
};

const schema = object().shape({
  programName: string().required(ERROR_MESSAGES.INPUT),
  trainingType: string().required(ERROR_MESSAGES.SELECT),
  exercises: array(
    object().shape({
      exerciseId: string().required(),
      sets: array(
        object().shape({
          reps: string().required(),
          rpe: string().required(),
        })
      ),
    })
  ),
});

type UseProgramFormOptions = {
  id?: string;
};

export const useProgramForm = (options: UseProgramFormOptions) => {
  useCategories();
  const router = useRouter();
  const { info } = useAuthStore();
  const {
    programType,
    listExercises: listExercisesFromStore,
    setProgramType,
    tabs: strengthProgramTypes,
    setListExercises: setListExercisesFromStore,
  } = useStrengthStore();

  const {
    roles,
    equipments,
    strengthSkillTypes,
    strengthProblemTypes,
    strengthTrainingTypes,
    setEquipments,
    setStrengthSkillTypes,
    setStrengthProblemTypes,
    setStrengthTrainingTypes,
  } = useCategoriesStore();

  const {
    limit: limitExercise,
    page: pageExercise,
    totalPages: totalPagesExercise,
    setLimit: setLimitExercise,
    setPage: setPageExercise,
    setTotalPages: setTotalPagesExercise,
  } = usePagination(100);

  const [filterForm, setFilterForm] = useState<FilterForm>({
    exerciseName: '',
    roleId: [],
    skillId: [],
    problemId: [],
    cheerTypeId: [],
    programTypeId: '',
    equipmentIds: [],
  });

  const [listExercises, setListExercises] = useState<Exercise[]>([]); // base
  const [listSelectedExercises, setListSelectedExercises] = useState<
    Pick<Exercise, 'id' | 'name' | 'sets' | 'targetMuscles'>[]
  >([]);

  const { control, setValue, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      programName: '',
      trainingType: 'general',
    },
  });

  const trainingType = useWatch({ control, name: 'trainingType' });
  const programName = useWatch({ control, name: 'programName' });

  const fetchSkillTypeOptions = async () => {
    if (strengthSkillTypes.length) return;
    try {
      const response = await StrengthApi.getListSkillTypes({});
      const { data } = response.data;
      if (!data) throw new Error('Error fetching skill types');
      const result = data.map(({ name, stunt_id }) => ({
        label: name,
        value: stunt_id.toString(),
      }));
      setStrengthSkillTypes(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProblemOptions = async () => {
    if (strengthProblemTypes.length) return;
    try {
      const response = await StrengthApi.getListProblemTypes({});
      const { data } = response.data;
      if (!data) throw new Error('Error fetching problem types');
      const result = data.map(({ name, problem_id }) => ({
        label: name,
        value: problem_id.toString(),
      }));
      console.log('result', result);
      setStrengthProblemTypes(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEquipments = async () => {
    if (equipments.length) {
      console.log('equipments', equipments);
      return;
    }
    try {
      const response = await CategoryApi.getEquipments();
      const { data, error } = response.data;
      if (!data) throw error;
      const equipmentItems = data.map(({ name, id }) => ({
        label: name,
        value: id.toString(),
      }));
      setEquipments(equipmentItems);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchListTrainingTypes = async () => {
    if (strengthTrainingTypes.length) return;
    try {
      const response = await StrengthApi.getListTrainingTypes();
      const { data, error } = response.data;
      if (!data) throw error;
      setStrengthTrainingTypes(
        data.map(item => ({
          label: item.type
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          value: item.type,
          sets: item.sets,
          reps: item.rep,
          rpe: item.rpe,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchListExcersises = useCallback(async () => {
    try {
      const response = await StrengthApi.getListExercises(
        {
          page: pageExercise,
          limit: limitExercise,
        },
        {
          cheer_type_id: filterForm.cheerTypeId.map(id => +id),
          equipments: filterForm.equipmentIds.map(id => +id),
          problem_id: filterForm.problemId.map(id => +id),
          role_id: filterForm.roleId.map(id => +id),
          stunt_id: filterForm.skillId.map(id => +id),
        }
      );

      const { data, error, meta } = response.data;
      if (!data) throw error;

      setListExercises(
        data.map(item => ({
          cues: item.cues,
          description: item.description,
          difficulty: item.difficulty,
          exerciseId: item.exercise_id,
          filterExercise: item.filterExercise,
          id: item.exercise_id,
          imageUrl: item.image_url,
          name: item.name,
          targetMuscles: item.target_muscles,
          videoUrl: item.video_url,
          equipments: item.equipment,
          isAdded: listExercisesFromStore.some(storedItem => storedItem.id === item.exercise_id),
        }))
      );

      setTotalPagesExercise(meta?.totalPages || 0);
    } catch (error) {
      console.log(error);
    }
  }, [
    pageExercise,
    limitExercise,
    filterForm.equipmentIds,
    filterForm.problemId,
    filterForm.roleId,
    filterForm.skillId,
    filterForm.cheerTypeId,
  ]);

  const fetchDetailProgram = async (programId: number) => {
    try {
      const response = await StrengthApi.getProgramDetail(programId);
      console.log('response', response.data);
      const { data, error } = response.data;
      if (!data) throw error;

      // program meta
      setValue('programName', data.name);
      setValue('trainingType', data.training_type);
      setValue(
        'exercises',
        data.exercises.map(item => ({
          exerciseId: item.program_exercise_id.toString(),
          sets: item.sets.map(o => ({ reps: o.rep.toString(), rpe: o.rpe.toString() })),
        }))
      );

      // exercise
      setListSelectedExercises(
        data.exercises.map(item => {
          return {
            id: item.exercise.exercise_id,
            sets: item.sets.map(set => ({ reps: set.rep, rpe: set.rpe })),
            targetMuscles: item.exercise?.target_muscles,
            name: item.exercise?.name,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  type FormType = InferType<typeof schema>;
  const handleCreateProgram = async (data: FormType) => {
    console.log(data);
    try {
      await StrengthApi.createProgram({
        name: data.programName,
        training_type: data.trainingType,
        type: programType,
        exercises: listSelectedExercises.map(({ id, sets }) => {
          return {
            exercise_id: id,
            sets: sets?.map(set => ({ rep: set.reps, rpe: set.rpe })) ?? [],
          };
        }),
      });
      setListExercisesFromStore(listExercisesFromStore.map(item => ({ ...item, isAdded: false })));
      toast.success('Program created successfully');
      router.push('/training/strength');
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProgram = async (data: FormType) => {
    if (!options.id) {
      return console.log('Program id not found');
    }
    try {
      await StrengthApi.updateProgram({
        program_id: +options.id,
        name: data.programName,
        training_type: data.trainingType,
        type: programType,
        exercises: listSelectedExercises.map(({ id, sets }) => {
          return {
            exercise_id: id,
            sets: sets?.map(set => ({ rep: set.reps, rpe: set.rpe })) ?? [],
          };
        }),
      });
      toast.success('Program updated successfully');
      router.push('/training/strength');
    } catch (error) {
      console.log(error);
    }
  };

  const onError = (err: any) => {
    console.log(err);
  };

  const onSubmitCreate = handleSubmit(handleCreateProgram, onError);

  const onSubmitUpdate = handleSubmit(handleUpdateProgram, onError);

  const onRemoveSetFromExercise = (exerciseId: number, setIndex: number) => {
    setListSelectedExercises(prevExercises => {
      const newExercises = prevExercises.map(ex => {
        if (ex.id !== exerciseId) return ex;
        return {
          ...ex,
          sets: ex.sets?.filter((_, index) => index !== setIndex) ?? [],
        };
      });

      return newExercises;
    });
  };

  const onRemoveExercise = (exerciseId: number) => {
    setListSelectedExercises(prevExercises => {
      return prevExercises.filter(ex => ex.id !== exerciseId);
    });
  };

  const onAddExercise = () => {};

  const onUpdateSetFromExercise = (
    exerciseId: number,
    setIndex: number,
    field: 'reps' | 'rpe',
    value: number
  ) => {
    setListSelectedExercises(prevExercises => {
      const newExercises = prevExercises.map(ex => {
        if (ex.id !== exerciseId) return ex;
        return {
          ...ex,
          sets:
            ex.sets?.map((set, index) => {
              if (index !== setIndex) return set;
              return {
                ...set,
                [field]: value,
              };
            }) ?? [],
        };
      });
      return newExercises;
    });
  };

  const onAddSetToExercise = (exerciseIndex: number) => {
    setListSelectedExercises(prevExercises => {
      return prevExercises.map((exercise, index) => {
        if (index !== exerciseIndex) return exercise;
        return {
          ...exercise,
          sets: [...(exercise?.sets ?? []), { reps: template?.reps || 0, rpe: template?.rpe || 0 }],
        };
      });
    });
  };

  const equipmentOptions = useMemo(() => {
    return equipments.filter(item => info?.equipmentIds?.includes(Number(item.value)));
  }, [info?.equipmentIds, equipments]);

  const template = useMemo(() => {
    return strengthTrainingTypes.find(item => item.value === trainingType);
  }, [strengthTrainingTypes, trainingType]);

  useEffect(() => {
    if (!template || options.id) return;
    console.log('fill template values');
    const appliedTemplate = listExercisesFromStore.map(item => {
      const sets = [];
      for (let i = 0; i < template.sets; i++) {
        sets.push({ reps: template.reps, rpe: template.rpe });
      }
      item.sets = sets;
      return item;
    });
    console.log('template', { template, appliedTemplate, listExercisesFromStore });
    setListSelectedExercises(
      appliedTemplate.map(item => ({
        ...item,
        sets: item.sets ?? [],
      }))
    );
  }, [template, listExercisesFromStore, setListSelectedExercises]);

  useEffect(() => {
    if (!options.id) return;
    fetchDetailProgram(+options.id);
  }, [options.id]);

  useEffect(() => {
    fetchEquipments();
    fetchProblemOptions();
    fetchListExcersises();
    fetchSkillTypeOptions();
    fetchListTrainingTypes();
  }, []);

  useEffect(() => {
    console.log({ listExercisesFromStore, listExercises, listSelectedExercises });
  }, [listExercisesFromStore, listExercises, listSelectedExercises]);

  return {
    control,
    template,
    filterForm,
    programName,
    programType,
    trainingType,
    listExercises,
    equipmentOptions,
    listSelectedExercises,
    roleOptions: roles.filter(item => !item.isCoach),
    problemOptions: strengthProblemTypes,
    skillTypeOptions: strengthSkillTypes,
    programTypeOptions: strengthProgramTypes,
    trainingTypeOptions: strengthTrainingTypes,
    setFilterForm,
    setProgramType,
    setListExercises,
    setListExercisesFromStore,
    fetchListExcersises,
    onSubmitCreate,
    onSubmitUpdate,
    onAddSetToExercise,
    onAddExercise,
    onRemoveExercise,
    onRemoveSetFromExercise,
    onUpdateSetFromExercise,
  };
};
