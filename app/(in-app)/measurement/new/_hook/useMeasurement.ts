import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MeasurementApi } from '@/api';
import { AthleteItem, MeasurementItem } from '../_types';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMeasurementStore } from '@/store/useMeasurement.store';
import { array, object, string } from 'yup';

type UseMeasurementFormOptions = {
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
};

const schema = object().shape({
  measurement: string().required(),
});

export const useMeasurement = (options?: UseMeasurementFormOptions) => {
  const [measurementList, setMeasurementList] = useState<MeasurementItem[]>([]);
  const [athleteList, setAthleteList] = useState<AthleteItem[]>([]);
  const { setMeasurementListOptions } = useMeasurementStore();
  const { control, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      measurement: '',
    },
    mode: 'onChange',
  });

  const getMeasurementList = async () => {
    try {
      const response = await MeasurementApi.getMeasurementList();
      const { data, error } = response.data;
      if (!data) throw error;

      const dataResponse = data.map(data => ({
        measurementsId: data.measurement_id,
        name: data.name,
        instruction: data.instruction,
        imperialUnit: data.imperial_unit,
        metricUnit: data.metric_unit,
        thumbnailLink: data.thumbnail_link,
        videoLink: data.video_link,
      }));

      setMeasurementList(dataResponse);
      options?.onSuccess?.();
    } catch (error: any) {
      toast.error('Failed to load measurement');
      options?.onFailure?.(error?.message ?? 'Unknown error');
    }
  };

  // const getAthleteList = async () => {
  //   try {
  //     const response = await MeasurementApi.getAthleteList();
  //     const { data, error } = response.data;
  //     if (!data) throw error;
  //     const athleteResponse = data.map(data => ({
  //       athleteId: data.athlete_id,
  //       firstName: data.name,
  //       lastName: data.instruction,
  //       email: data.imperial_unit,
  //       avatarLink: data.metric_unit,
  //       measurementUnit: data.thumbnail_link,
  //     }));
  //     setAthleteList(dataResponse);
  //   } catch (error: any) {
  //     toast.error('Failed to load athletes');
  //     options?.onFailure?.(error?.message ?? 'Unknown error');
  //   }
  // };

  const measurement = useWatch({ control, name: 'measurement' });

  useEffect(() => {
    getMeasurementList();
  }, []);

  useEffect(() => {
    if (measurementList[0]) {
      setValue('measurement', measurementList[0].measurementsId.toString());
    }
  }, [measurementList, setValue]);

  useEffect(() => {
    // set title video
    // set
  }, [measurement]);

  return {
    measurementList,
    getMeasurementList,
    control,
  };
};
