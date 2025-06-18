import { CategoryApi, StrengthApi } from '@/api';
import { useCategories, useLoading, usePagination } from '@/hooks';
import { useAuthStore, useCategoriesStore, useStrengthStore } from '@/store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, InferType, object, string } from 'yup';
import { ERROR_MESSAGES, ROUTES } from '@/utils/constants';
import { usePathname, useRouter } from 'next/navigation';
import { AccountType, ProgramType } from '@/utils/types';

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
  programName: string().required(ERROR_MESSAGES.INPUT).max(100, ERROR_MESSAGES.MAX_LENGTH(100)),
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
  const pathname = usePathname();
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
  } = usePagination();

  const { loading, startLoading, stopLoading } = useLoading();

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

  const { control, setValue, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
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

      setStrengthProblemTypes(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEquipments = async () => {
    if (equipments.length) return;
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

  const fetchListExcersises = useCallback(
    async (pageNumber?: number) => {
      try {
        const response = await StrengthApi.getListExercises(
          {
            page: pageNumber ?? pageExercise,
            limit: limitExercise,
          },
          {
            name: filterForm.exerciseName,
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
          }))
        );

        setTotalPagesExercise(meta?.totalPages || 0);
      } catch (error) {
        console.log(error);
      }
    },
    [
      pageExercise,
      limitExercise,
      filterForm.equipmentIds,
      filterForm.problemId,
      filterForm.roleId,
      filterForm.skillId,
      filterForm.cheerTypeId,
      filterForm.exerciseName,
    ]
  );

  const loadMoreExercises = useCallback(async () => {
    try {
      const response = await StrengthApi.getListExercises(
        {
          page: pageExercise + 1,
          limit: limitExercise,
        },
        {
          name: filterForm.exerciseName,
          cheer_type_id: filterForm.cheerTypeId.map(id => +id),
          equipments: filterForm.equipmentIds.map(id => +id),
          problem_id: filterForm.problemId.map(id => +id),
          role_id: filterForm.roleId.map(id => +id),
          stunt_id: filterForm.skillId.map(id => +id),
        }
      );

      const { data, error, meta } = response.data;
      if (!data) throw error;
      const newList = data.map(item => ({
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
      }));
      setPageExercise(prev => prev + 1);
      setListExercises(prev => [...prev, ...newList]);
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
    filterForm.exerciseName,
  ]);

  useEffect(() => {
    if (pathname === `/${ROUTES.TRAINING_STRENGTH_NEW}`) {
      fetchListExcersises(1);
    }
  }, [filterForm.exerciseName, pathname]);

  const fetchDetailProgram = async (programId: number) => {
    try {
      const response = await StrengthApi.getProgramDetail(programId);
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

      if (!options.id) {
        const newList = listExercisesFromStore.map(item => {
          const exercise = data.exercises.find(o => o.program_exercise_id === item.id);
          return {
            ...item,
            sets: exercise?.sets.map(set => ({ reps: set.rep, rpe: set.rpe })),
          };
        });
        setListExercisesFromStore(newList);
      } else {
        setListExercisesFromStore(
          data.exercises.map(item => ({
            cues: item.exercise.cues,
            description: item.exercise.description,
            difficulty: item.exercise.difficulty,
            equipments: item.exercise.equipment,
            exerciseId: item.exercise.exercise_id,
            filterExercise: item.exercise.filterExercise,
            imageUrl: item.exercise.image_url,
            name: item.exercise.name,
            targetMuscles: item.exercise.target_muscles,
            videoUrl: item.exercise.video_url,
            id: item.exercise.exercise_id,
            sets: item.sets.map(o => ({ reps: o.rep, rpe: o.rpe })),
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  type FormType = InferType<typeof schema>;
  const handleCreateProgram = async (data: FormType) => {
    console.log(data);
    try {
      startLoading();
      await StrengthApi.createProgram({
        name: data.programName,
        training_type: data.trainingType,
        type: programType,
        exercises: listExercisesFromStore.map(({ id, sets }) => {
          return {
            exercise_id: id,
            sets: sets?.map(set => ({ rep: set.reps, rpe: set.rpe })) ?? [],
          };
        }),
      });
      setListExercisesFromStore([]);
      toast.success('Program created successfully');
      router.push('/training/strength');
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };

  const handleUpdateProgram = async (data: FormType) => {
    if (!options.id) {
      return console.log('Program id not found');
    }
    try {
      startLoading();
      await StrengthApi.updateProgram({
        program_id: +options.id,
        name: data.programName,
        training_type: data.trainingType,
        type: programType,
        exercises: listExercisesFromStore.map(({ id, sets }) => {
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
    } finally {
      stopLoading();
    }
  };

  const onError = (err: any) => {
    console.log(err);
  };

  const onSubmitCreate = handleSubmit(handleCreateProgram, onError);

  const onSubmitUpdate = handleSubmit(handleUpdateProgram, onError);

  const onRemoveSetFromExercise = (exerciseId: number, setIndex: number) => {
    setListExercisesFromStore(prevExercises => {
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

  useEffect(() => {
    if (listExercisesFromStore.some(item => item.sets?.length === 0)) {
      setListExercisesFromStore(prevExercises => {
        return prevExercises.filter(ex => ex.sets?.length !== 0);
      });
    }
  }, [listExercisesFromStore]);

  const onRemoveExercise = (exerciseId: number) => {
    setListExercisesFromStore(prevExercises => {
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
    setListExercisesFromStore(prevExercises => {
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

  const onAddSetToExercise = (exerciseId: number) => {
    setListExercisesFromStore(prevExercises => {
      return prevExercises.map(exercise => {
        if (exercise.id !== exerciseId) return exercise;
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

  const isCoach = useMemo(() => {
    return info?.accountType === AccountType.Coach;
  }, [info?.accountType]);

  const programTypeOptions = useMemo(() => {
    return strengthProgramTypes.filter(item => {
      if (isCoach) return [ProgramType.MyPrograms, ProgramType.TeamPrograms].includes(item.value);
      return item.value === ProgramType.MyPrograms;
    });
  }, [strengthProgramTypes, isCoach]);

  useEffect(() => {
    if (!template || options.id) return;
    setListExercisesFromStore(prev =>
      prev.map(item => {
        if (!item.sets?.length) {
          const sets = [];
          for (let i = 0; i < template.sets; i++) {
            sets.push({ reps: template.reps, rpe: template.rpe });
          }
          item.sets = sets;
        }
        return item;
      })
    );
  }, [template, setListExercisesFromStore]);

  useEffect(() => {
    if (!options.id) return;
    fetchDetailProgram(+options.id);
  }, [options.id]);

  useEffect(() => {
    fetchEquipments();
    fetchProblemOptions();
    fetchSkillTypeOptions();
    fetchListTrainingTypes();
  }, []);

  useEffect(() => {}, [listExercisesFromStore]);

  return {
    control,
    template,
    filterForm,
    programName,
    programType,
    trainingType,
    pageExercise,
    listExercises,
    equipmentOptions,
    listExercisesFromStore,
    roleOptions: roles.filter(item => !item.isCoach),
    problemOptions: strengthProblemTypes,
    skillTypeOptions: strengthSkillTypes,
    programTypeOptions,
    totalPagesExercise,
    trainingTypeOptions: strengthTrainingTypes,
    setFilterForm,
    setProgramType,
    setPageExercise,
    setListExercises,
    setListExercisesFromStore,
    loadMoreExercises,
    fetchListExcersises,
    onSubmitCreate,
    onSubmitUpdate,
    onAddSetToExercise,
    onAddExercise,
    onRemoveExercise,
    onRemoveSetFromExercise,
    onUpdateSetFromExercise,
    loading,
  };
};
