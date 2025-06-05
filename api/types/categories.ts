import { ApiResponse } from '@/utils/types';

type RoleRecord = {
  id: number;
  name: string;
  is_coach: boolean;
};
type CheerTypeRecord = {
  id: number;
  name: string;
};
type CheerStyleRecord = {
  id: number;
  name: string;
};
type EquipmentRecord = {
  id: number;
  name: string;
  type: string;
};

type MeasurementUnitRecord = {
  id: number;
  name: string;
};

export type GetListEquipmentsResponse = ApiResponse<EquipmentRecord[], {}>;
export type GetListCheerStylesResponse = ApiResponse<CheerStyleRecord[], {}>;
export type GetListCheerTypesResponse = ApiResponse<CheerTypeRecord[], {}>;
export type GetListRolesResponse = ApiResponse<RoleRecord[], {}>;
export type GetListMeasurementUnitsResponse = ApiResponse<MeasurementUnitRecord[], {}>;
