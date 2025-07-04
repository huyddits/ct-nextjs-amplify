import { CategoryApi } from '@/api';
import { useCategoriesStore } from '@/store';
import { useEffect } from 'react';
import useSWR from 'swr';

const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

const fetchers = {
  roles: async () => {
    const response = await CategoryApi.getRoles();
    const { data, error } = response.data;
    if (!data) throw error;
    return data.map(item => ({
      label: item.name,
      value: item.id.toString(),
      isCoach: item.is_coach,
    }));
  },
  cheerStyles: async () => {
    const response = await CategoryApi.getCheerStyles();
    const { data, error } = response.data;
    if (!data) throw error;
    return data.map(({ name, id }) => ({
      label: name,
      value: id.toString(),
    }));
  },
  equipments: async () => {
    const response = await CategoryApi.getEquipments();
    const { data, error } = response.data;
    if (!data) throw error;
    return data.map(({ name, id }) => ({
      label: name,
      value: id.toString(),
    }));
  },
  cheerTypes: async () => {
    const response = await CategoryApi.getCheerTypes();
    const { data, error } = response.data;
    if (!data) throw error;
    return data.map(({ name, id }) => ({
      label: name,
      value: id.toString(),
    }));
  },
  measurementUnits: async () => {
    const response = await CategoryApi.getMeasurementUnits();
    const { data, error } = response.data;
    if (!data) throw error;
    return data.map(({ name, id }) => ({
      label: name,
      value: id.toString(),
    }));
  },
};

export const useCategories = () => {
  const { setRoles } = useCategoriesStore();

  const { data: roles } = useSWR('categories/roles', fetchers.roles, {
    dedupingInterval: ONE_HOUR,
  });

  const { data: cheerStyles } = useSWR('categories/cheerStyles', fetchers.cheerStyles, {
    dedupingInterval: ONE_HOUR,
  });

  const { data: equipments } = useSWR('categories/equipments', fetchers.equipments, {
    dedupingInterval: ONE_HOUR,
  });

  const { data: cheerTypes } = useSWR('categories/cheerTypes', fetchers.cheerTypes, {
    dedupingInterval: ONE_HOUR,
  });

  const { data: measurementUnits } = useSWR(
    'categories/measurementUnits',
    fetchers.measurementUnits,
    {
      dedupingInterval: ONE_HOUR,
    }
  );

  useEffect(() => {
    if (roles) setRoles(roles);
  }, [roles]);

  return {
    roles,
    equipments,
    cheerTypes,
    cheerStyles,
    measurementUnits,
  };
};
