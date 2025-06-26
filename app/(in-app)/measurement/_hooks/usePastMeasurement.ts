import { SelectOption } from '@/components/compose';
import { useMeasurementStore } from '@/store';
import { CACHE_KEY } from '@/utils/constants';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { useMeasurement } from '../new/_hook';
import { MeasurementApi } from '@/api';

type MeasurementItem = {
  measurementId: number;
  name: string;
  instruction: string;
  imperialUnit: string;
  metricUnit: string;
  thumbnailLink: string;
  videoLink: string;
  status: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

type MeasurementImprovement = {
  improvement: string;
  measurementUnit: string;
};

type MeasurementResult = {
  result: number;
  measurementUnit: string;
  createdAt: string;
  measurementName: string;
};

type MeasurementSessionResult = MeasurementResult & {
  measurementSessionId: number;
};

type MeasurementAllResult = MeasurementResult & {
  measurementId: number;
};

export default function usePastMeasurement() {
  const { measurementList: measurementListFromStore } = useMeasurement();
  const [selectedMeasurement, setSelectedMeasurement] = useState<string>();
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>();
  const measurementList = useMemo<SelectOption[]>(() => {
    return measurementListFromStore.map(item => ({
      value: item.measurementsId.toString(),
      label: item.name,
    }));
  }, [measurementListFromStore]);

  const fetchLastThreeMonths = async (): Promise<
    { results: MeasurementSessionResult[]; maxResult: number } | undefined
  > => {
    if (!selectedMeasurement) return;
    const response = await MeasurementApi.getLastThreeMonths({
      athlete_id: selectedAthleteId,
      measurement_id: +selectedMeasurement,
    });
    const { data, error } = response.data;
    if (error || !data) throw error;
    return {
      results: data.results.map(item => ({
        createdAt: item.created_at,
        measurementSessionId: item.measurement_session_id,
        measurementUnit: item.measurement_unit,
        result: item.result,
        measurementName: item.measurement.name,
      })),
      maxResult: data.max_result,
    };
  };

  const fetchLatestResult = async (): Promise<MeasurementSessionResult | undefined> => {
    if (!selectedMeasurement) return;
    const response = await MeasurementApi.getLatestResult({
      athlete_id: selectedAthleteId,
      measurement_id: +selectedMeasurement,
    });
    const { data, error } = response.data;
    if (error || !data) throw error;
    console.log('fetchLatestResult', data);
    return {
      createdAt: data.created_at,
      measurementSessionId: data.measurement_session_id,
      measurementUnit: data.measurement_unit,
      result: data.result,
      measurementName: data.measurement.name,
    };
  };

  const fetchImprovement = async (): Promise<MeasurementImprovement | undefined> => {
    if (!selectedMeasurement) return;
    const response = await MeasurementApi.getImprovement({
      athlete_id: selectedAthleteId,
      measurement_id: +selectedMeasurement,
    });
    const { data, error } = response.data;
    if (error || !data) throw error;
    console.log('fetchImprovement', data);
    return {
      improvement: data.improvement,
      measurementUnit: data.measurement_unit,
    };
  };

  const fetchThreeLatestResults = async (): Promise<MeasurementSessionResult[] | undefined> => {
    if (!selectedMeasurement) return;
    const response = await MeasurementApi.getThreeLatestResults({
      athlete_id: selectedAthleteId,
      measurement_id: +selectedMeasurement,
    });
    const { data, error } = response.data;
    if (error || !data) throw error;
    console.log('fetchThreeLatestResults', data);
    return data.map(item => ({
      createdAt: item.created_at,
      measurementSessionId: item.measurement_session_id,
      measurementUnit: item.measurement_unit,
      result: item.result,
      measurementName: item.measurement.name,
    }));
  };

  const fetchResultForAllMeasurements = async (): Promise<MeasurementAllResult[] | undefined> => {
    if (!selectedMeasurement) return [];
    const response = await MeasurementApi.getResultForAllMeasurements({
      athlete_id: selectedAthleteId,
      measurement_id: +selectedMeasurement,
    });
    const { data, error } = response.data;
    if (error || !data) throw error;
    console.log('fetchResultForAllMeasurements', data);
    return data.map(item => ({
      createdAt: item.created_at,
      measurementId: item.measurement_id,
      measurementName: item.measurement_name,
      measurementUnit: item.measurement_unit,
      result: item.result,
    }));
  };

  const { data: dataLastThreeMonths } = useSWR(
    [CACHE_KEY.PAST_MEASUREMENT_LAST_3_MONTHS, selectedMeasurement],
    fetchLastThreeMonths
  );

  const { data: dataImprovement } = useSWR(
    [CACHE_KEY.PAST_MEASUREMENT_IMPROVEMENT, selectedMeasurement],
    fetchImprovement
  );

  const { data: dataLatestResult } = useSWR(
    [CACHE_KEY.PAST_MEASUREMENT_LATEST_RESULT, selectedMeasurement],
    fetchLatestResult
  );

  const { data: dataThreeLatestResults } = useSWR(
    [CACHE_KEY.PAST_MEASUREMENT_THREE_LATEST_RESULTS, selectedMeasurement],
    fetchThreeLatestResults
  );

  const { data: dataResultForAll } = useSWR(
    [CACHE_KEY.PAST_MEASUREMENT_RESULT_FOR_ALL_MEASUREMENTS, selectedMeasurement],
    fetchResultForAllMeasurements
  );

  const onUpdateMeasurement = (value: string) => {
    setSelectedMeasurement(value);
  };

  useEffect(() => {
    setSelectedMeasurement(measurementList[0]?.value);
  }, [measurementList]);

  return {
    measurementList,
    selectedMeasurement,
    dataLastThreeMonths,
    dataLatestResult,
    dataImprovement,
    dataThreeLatestResults,
    dataResultForAll,
    onUpdateMeasurement,
  };
}
