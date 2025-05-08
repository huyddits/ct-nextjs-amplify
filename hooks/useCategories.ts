import { CategoryApi } from '@/api';
import { useCategoriesStore } from '@/store';
import { useEffect, useState } from 'react';

export const useCategories = () => {
  const {
    cheerStyles,
    cheerTypes,
    equipments,
    measurementUnits,
    roles,
    setCheerStyles,
    setCheerTypes,
    setEquipments,
    setMeasurementUnits,
    setRoles,
  } = useCategoriesStore();
  const getRoles = async () => {
    try {
      const response = await CategoryApi.getRoles();
      const { data } = response.data;
      const roleItems = data.map(({ name, id }) => ({
        label: name,
        value: id.toString(),
      }));
      setRoles(roleItems);
    } catch (error) {
      console.log(error);
    }
  };

  const getCheerStyles = async () => {
    try {
      const response = await CategoryApi.getCheerStyles();
      const { data } = response.data;
      const cheerStyleItems = data.map(({ name, id }) => ({
        label: name,
        value: id.toString(),
      }));
      setCheerStyles(cheerStyleItems);
    } catch (error) {
      console.log(error);
    }
  };
  const getEquipments = async () => {
    const response = await CategoryApi.getEquipments();
    const { data } = response.data;
    const equipmentItems = data.map(({ name, id }) => ({
      label: name,
      value: id.toString(),
    }));
    setEquipments(equipmentItems);
  };
  const getCheerTypes = async () => {
    try {
      const response = await CategoryApi.getCheerTypes();
      const { data } = response.data;
      const cheerTypeItems = data.map(({ name, id }) => ({
        label: name,
        value: id.toString(),
      }));
      setCheerTypes(cheerTypeItems);
    } catch (error) {
      console.log(error);
    }
  };

  const getMeasurementUnits = async () => {};

  useEffect(() => {
    getEquipments();
    getRoles();
    getCheerStyles();
    getCheerTypes();
    getMeasurementUnits();
  }, []);

  return {
    roles,
    equipments,
    cheerTypes,
    cheerStyles,
    measurementUnits,
  };
};
