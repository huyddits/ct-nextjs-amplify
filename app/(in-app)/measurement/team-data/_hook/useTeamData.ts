import { MeasurementApi } from '@/api';
import {
  BaseFlyerAndBases,
  ImprovedItem,
  LatestResultItem,
  ResultForAllMeasurementsItem,
} from '../_types';
import { useEffect, useState } from 'react';
import { CoachStudentItem, MeasurementItem } from '../../new/_types';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { athletePayload, CoachStudentPayload, FlyerAndBasesPayLoad } from '@/api/types/measurement';
import { useAuthStore, useMeasurementStore } from '@/store';

type UseMeasurementFormOptions = {
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
};

const schema = object().shape({
  measurement: string().required(),
  athleteList: string(),
});

export const useTeamData = (options?: UseMeasurementFormOptions) => {
  const [basesSpotter, setbasesSpotter] = useState<BaseFlyerAndBases[]>([]);
  const [flyer, setflyer] = useState<BaseFlyerAndBases[]>([]);
  const [measurementList, setMeasurementList] = useState<MeasurementItem[]>([]);
  const [coachStudentList, setCoachStudentList] = useState<CoachStudentItem[]>([]);
  const [latestResult, setLatestResult] = useState<LatestResultItem>();
  const [improvement, setImprovement] = useState<ImprovedItem>();
  const [lastThreeMonths, setLastThreeMonths] = useState<LatestResultItem[]>([]);
  const [threeLatestResults, setThreeLatestResults] = useState<LatestResultItem[]>([]);
  const [resultForAllMeasurements, setResultForAllMeasurements] = useState<
    ResultForAllMeasurementsItem[]
  >([]);
  const { info } = useAuthStore();
  const {
    baseMeasurementList,
    coachStudent: coachStudentListFromStore,
    flyerList,
    basesSpotterList,
    refreshFlyer,
    refreshBasesSpotter,
    setRawMeasurementList,
    setCoachStudent,
    setFlyerList,
    setBasesSpotterList,
    setRefreshFlyer,
    setRefreshBasesSpotter,
  } = useMeasurementStore();
  const { control, setValue, getValues, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      measurement: '',
      athleteList: '',
    },
    mode: 'onChange',
  });
  const athleteId = watch('athleteList');
  const measurementId = watch('measurement');

  const getBasesSpotter = async (payload: FlyerAndBasesPayLoad) => {
    if (basesSpotterList.length > 0 && !refreshBasesSpotter) {
      setbasesSpotter(basesSpotterList);
      return;
    }
    try {
      const response = await MeasurementApi.getBasesSpotter(payload);
      const { data, error } = response.data;
      if (!data) throw error;
      const dataResponse = data.map(data => ({
        measurementName: data.measurementName,
        items: data.items.map(subData => ({
          name: subData.name,
          result: subData.result,
          measurementUnit: subData.measurement_unit,
        })),
      }));
      setbasesSpotter(dataResponse);
      setBasesSpotterList(dataResponse);
      setRefreshBasesSpotter(false);
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  const getFlyer = async (payload: FlyerAndBasesPayLoad) => {
    if (flyerList.length > 0 && !refreshFlyer) {
      setflyer(flyerList);
      return;
    }
    try {
      const response = await MeasurementApi.getFlyer(payload);
      const { data, error } = response.data;
      if (!data) throw error;
      const dataResponse = data.map(data => ({
        measurementName: data.measurementName,
        items: data.items.map(subData => ({
          name: subData.name,
          result: subData.result,
          measurementUnit: subData.measurement_unit,
        })),
      }));
      setflyer(dataResponse);
      setFlyerList(dataResponse);
      setRefreshFlyer(false);
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  const getMeasurementList = async () => {
    if (baseMeasurementList.length > 0) {
      setMeasurementList(baseMeasurementList);
      return;
    }
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
      setRawMeasurementList(dataResponse);
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  const getCoachStudentList = async (payload: CoachStudentPayload) => {
    if (coachStudentListFromStore.length > 0) {
      setCoachStudentList(coachStudentListFromStore);
      return;
    }
    try {
      const response = await MeasurementApi.getCoachStudentList(payload);
      const { data, error } = response.data;
      if (!data) throw error;

      const dataResponse = data.map(data => ({
        coachStudentId: data.coach_student_id,
        status: data.status,
        athleteId: data.athlete_id,
        athlete: {
          accountType: data.athlete.account_type,
          email: data.athlete.email,
          stripeCustomerId: data.athlete.stripe_customer_id,
          stripeSubscriptionId: data.athlete.stripe_subscription_id,
          isActive: data.athlete.is_active,
          profile: {
            profileId: data.athlete.profile.profile_id,
            firstName: data.athlete.profile.first_name,
            lastName: data.athlete.profile.last_name,
            schoolName: data.athlete.profile.school_name,
            dateOfBirth: data.athlete.profile.date_of_birth,
            coachCode: data.athlete.profile.coach_code,
          },
        },
      }));
      setCoachStudentList(dataResponse);
      setCoachStudent(dataResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const getLatestResult = async (payload: athletePayload) => {
    try {
      const response = await MeasurementApi.getLatestResult(payload);
      const { data, error } = response.data;
      if (!data) throw error;
      const dataResponse = {
        measurementSessionId: data.measurement_session_id,
        result: data.result,
        measurementUnit: data.measurement_unit,
      };
      setLatestResult(dataResponse);
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  const getImprovement = async (payload: athletePayload) => {
    try {
      const response = await MeasurementApi.getImprovement(payload);
      const { data, error } = response.data;
      if (!data) throw error;
      const dataResponse = {
        improvement: data.improvement,
        measurementUnit: data.measurement_unit,
      };
      setImprovement(dataResponse);
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  const getLastThreeMonths = async (payload: athletePayload) => {
    try {
      const response = await MeasurementApi.getLastThreeMonths(payload);
      const { data, error } = response.data;
      if (!data) throw error;
      const dataResponse = data.map(data => ({
        measurementSessionId: data.measurement_session_id,
        result: Number(data.result),
        measurementUnit: data.measurement_unit,
        createdAt: data.created_at,
      }));
      setLastThreeMonths(dataResponse);
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  const getThreeLatestResults = async (payload: athletePayload) => {
    try {
      const response = await MeasurementApi.getThreeLatestResults(payload);
      const { data, error } = response.data;
      if (!data) throw error;
      const dataResponse = data.map(data => ({
        measurementSessionId: data.measurement_session_id,
        result: data.result,
        measurementUnit: data.measurement_unit,
        createdAt: data.created_at,
      }));
      setThreeLatestResults(dataResponse);
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  const getResultForAllMeasurements = async (payload: athletePayload) => {
    try {
      const response = await MeasurementApi.getResultForAllMeasurements(payload);
      const { data, error } = response.data;
      if (!data) throw error;
      const dataResponse = data.map(data => ({
        measurementId: data.measurement_id,
        measurementName: data.measurement_name,
        result: data.result,
        measurementUnit: data.measurement_unit,
        createdAt: data.created_at,
      }));
      setResultForAllMeasurements(dataResponse);
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMeasurementList();
  }, []);

  useEffect(() => {
    const payload: FlyerAndBasesPayLoad = {
      page: 1,
      limit: 10,
    };
    getBasesSpotter(payload);
    getFlyer(payload);
  }, []);

  useEffect(() => {
    if (measurementList[0]) {
      setValue('measurement', measurementList[0].measurementsId.toString());
    }
  }, [measurementList, setValue]);

  useEffect(() => {
    if (!info?.coachCode) {
      console.log('coachCode is missing!');
      return;
    }
    const payload: CoachStudentPayload = {
      coach_code: info.coachCode,
    };

    getCoachStudentList(payload);
  }, [info?.coachCode]);

  useEffect(() => {
    if (!athleteId || !measurementId) return;

    const payload: athletePayload = {
      athlete_id: athleteId,
      measurement_id: Number(measurementId),
    };

    getLatestResult(payload);
    getImprovement(payload);
    getLastThreeMonths(payload);
    getThreeLatestResults(payload);
  }, [athleteId, measurementId]);

  useEffect(() => {
    if (!athleteId) return;

    const payload: athletePayload = {
      athlete_id: athleteId,
    };

    getResultForAllMeasurements(payload);
  }, [athleteId]);

  return {
    basesSpotter,
    getBasesSpotter,
    flyer,
    getFlyer,
    measurementList,
    getMeasurementList,
    coachStudentList,
    getCoachStudentList,
    latestResult,
    getLatestResult,
    improvement,
    getImprovement,
    lastThreeMonths,
    getLastThreeMonths,
    threeLatestResults,
    getThreeLatestResults,
    resultForAllMeasurements,
    getResultForAllMeasurements,
    control,
    setValue,
    getValues,
    watch,
  };
};
