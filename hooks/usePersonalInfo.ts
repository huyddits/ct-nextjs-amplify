import { UserApi } from '@/api';
import { useAuthStore } from '@/store';
import { useEffect } from 'react';

export const usePersonalInfo = () => {
  const { info, setInfo } = useAuthStore();

  const handleGetPersonalInfo = async () => {
    try {
      const response = await UserApi.getPersonalInfo();
      const { data } = response.data;
      if (!data) {
        throw response.data.error;
      }
      setInfo({
        id: data.user_id,
        accountType: data.account_type,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        isActive: data.is_active,
        createdAt: data.created_at,
        profileId: data.profile?.profile_id ?? '',
        dateOfBirth: data.profile?.date_of_birth ?? '',
        measurementUnit: data.profile?.measurement_unit ?? '',
        roleId: data.profile?.role?.id ?? 0,
        roleName: data.profile?.role?.name ?? '',
        cheerTypeId: data.profile?.cheer_types?.[0]?.id ?? 0,
        cheerTypeName: data.profile?.cheer_types?.[0]?.name ?? '',
        cheerStyleId: data.profile?.cheer_styles?.[0]?.id ?? 0,
        cheerStyleName: data.profile?.cheer_styles?.[0]?.name ?? '',
        equipmentIds: data.equipments?.map(e => e.id) ?? [],
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetPersonalInfo();
  }, []);

  return { data: info };
};
