import { StrengthApi } from '@/api';
import { useEffect } from 'react';
type UseExerciseOptions = { programId: number };
export const useExercise = async (options: UseExerciseOptions) => {
  const fetchListExercise = async () => {
    try {
      const response = await StrengthApi.getListExercisesInProgram(options.programId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListExercise();
  }, []);

  return {
    fetchListExercise,
  };
};
