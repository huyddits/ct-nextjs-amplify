import { UserApi } from '@/api';
import { useAuthStore } from '@/store';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { useLoading } from './useLoading';

export const useAcknowledgement = () => {
  const { info, updateInfo } = useAuthStore();
  const { loading, startLoading, stopLoading } = useLoading();

  const acknowledgementCardio = useMemo(
    () => info?.acknowledgementCardio ?? true,
    [info?.acknowledgementCardio]
  );

  const acknowledgementStrength = useMemo(
    () => info?.acknowledgementStrength ?? true,
    [info?.acknowledgementStrength]
  );

  const acknowledgementFitness = useMemo(
    () => info?.acknowledgementFitness ?? true,
    [info?.acknowledgementFitness]
  );

  const updateAcknowledge = async (payload: {
    acknowledgementCardio: boolean;
    acknowledgementStrength: boolean;
    acknowledgementFitness: boolean;
  }) => {
    if (loading) return;
    try {
      startLoading();
      await UserApi.updateAcknowledge({
        cardio_acknowledgment: payload.acknowledgementCardio,
        fitness_acknowledgment: payload.acknowledgementFitness,
        strength_acknowledgment: payload.acknowledgementStrength,
      });
      toast.success('Acknowledgement updated successfully');
      updateInfo(payload);
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };

  return {
    loading,
    acknowledgementCardio: acknowledgementCardio,
    acknowledgementStrength: acknowledgementStrength,
    acknowledgementFitness: acknowledgementFitness,
    updateAcknowledge,
  };
};
