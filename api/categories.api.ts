import axiosIns from '@/lib/axiosIns';
import { END_POINTS } from '@/utils/constants';
import {
  GetListCheerStylesResponse,
  GetListCheerTypesResponse,
  GetListEquipmentsResponse,
  GetListRolesResponse,
} from './types/categories';

export const getCheerStyles = () => {
  return axiosIns.get<GetListCheerStylesResponse>(END_POINTS.CHEER_STYLES);
};

export const getRoles = () => {
  return axiosIns.get<GetListRolesResponse>(END_POINTS.ROLES);
};

export const getCheerTypes = () => {
  return axiosIns.get<GetListCheerTypesResponse>(END_POINTS.CHEER_TYPES);
};

export const getEquipments = () => {
  return axiosIns.get<GetListEquipmentsResponse>(END_POINTS.EQUIPMENTS);
};

export const getMeasurementUnits = () => {
  return axiosIns.get<GetListEquipmentsResponse>(END_POINTS.MEASUREMENT_UNITS);
};
