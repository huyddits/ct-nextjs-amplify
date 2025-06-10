import { CategoryApi } from '@/api';
import { useCategoriesStore } from '@/store';
import { useEffect, useState } from 'react';

export const useCategories = () => {
  const {
    roles,
    equipments,
    cheerTypes,
    cheerStyles,
    measurementUnits,
    setRoles,
    setEquipments,
    setCheerTypes,
    setCheerStyles,
    setMeasurementUnits,
  } = useCategoriesStore();
  const getRoles = async () => {
    if (roles.length) return;
    try {
      const response = await CategoryApi.getRoles();
      const { data, error } = response.data;
      if (!data) throw error;
      const roleItems = data.map(item => ({
        label: item.name,
        value: item.id.toString(),
        isCoach: item.is_coach,
      }));
      setRoles(roleItems);
    } catch (error) {
      console.log(error);
    }
  };

  const getCheerStyles = async () => {
    if (cheerStyles.length) return;
    try {
      const response = await CategoryApi.getCheerStyles();
      const { data, error } = response.data;
      if (!data) throw error;
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
  const getCheerTypes = async () => {
    if (cheerTypes.length) return;
    try {
      const response = await CategoryApi.getCheerTypes();
      const { data, error } = response.data;
      if (!data) throw error;
      const cheerTypeItems = data.map(({ name, id }) => ({
        label: name,
        value: id.toString(),
      }));
      setCheerTypes(cheerTypeItems);
    } catch (error) {
      console.log(error);
    }
  };

  const getMeasurementUnits = async () => {
    if (measurementUnits.length) return;
    try {
      const response = await CategoryApi.getMeasurementUnits();
      const { data, error } = response.data;
      if (!data) throw error;
      const measurementUnitItems = data.map(({ name, id }) => ({
        label: name,
        value: id.toString(),
      }));
      console.log('measurementUnitItems', measurementUnitItems);
      setMeasurementUnits(measurementUnitItems);
    } catch (error) {
      console.log(error);
    }
  };

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
