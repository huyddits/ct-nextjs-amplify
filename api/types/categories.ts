import { ApiResponse } from '@/utils/types';

type RoleRecord = {
  // roleId: number;
  id: number;
  name: string;
};
type CheerTypeRecord = {
  // cheerTypeId: number;
  id: number;
  name: string;
};
type CheerStyleRecord = {
  // cheerStyleId: number;
  id: number;
  name: string;
};
type EquipmentRecord = {
  // equipmentId: number;
  id: number;
  name: string;
};

export type GetListEquipmentsResponse = ApiResponse<EquipmentRecord[], {}>;
export type GetListCheerStylesResponse = ApiResponse<CheerStyleRecord[], {}>;
export type GetListCheerTypesResponse = ApiResponse<CheerTypeRecord[], {}>;
export type GetListRolesResponse = ApiResponse<RoleRecord[], {}>;
