import { object, string, array, InferType } from 'yup';
import { ERROR_MESSAGES } from '@/utils/constants';
import * as $v from '@/utils/validators';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AccountType } from '@/utils/types';
import { useAuthStore } from '@/store';
import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { DEFAULT_DATE_FORMAT } from '@/utils/formatter';
import { UserApi } from '@/api';
import { toast } from 'react-toastify';
import { useLoading } from '@/hooks';

const schema = object().shape({
  coachCode: string().default(''),
  firstName: string().required(ERROR_MESSAGES.INPUT).matches($v.PATTERN.NAME, ERROR_MESSAGES.NAME),
  lastName: string().required(ERROR_MESSAGES.INPUT).matches($v.PATTERN.NAME, ERROR_MESSAGES.NAME),
  email: string().required(ERROR_MESSAGES.INPUT).matches($v.PATTERN.EMAIL, ERROR_MESSAGES.EMAIL),
  dateOfBirth: string().required(ERROR_MESSAGES.INPUT),
  schoolName: string().required(ERROR_MESSAGES.INPUT).matches($v.PATTERN.NAME, ERROR_MESSAGES.NAME),
  cheerType: string().required(),
  cheerStyle: string().required(),
  role: string().required(),
  equipment: array(string().required()).required(),
  measurementUnit: string().required(ERROR_MESSAGES.SELECT),
});

type FormType = InferType<typeof schema>;

export const useProfileForm = () => {
  const { info, updateInfo } = useAuthStore();
  const { control, handleSubmit, trigger, setValue, getValues } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      coachCode: '',
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      schoolName: '',
      cheerType: '',
      cheerStyle: '',
      role: '',
      equipment: [],
      measurementUnit: '',
    },
  });

  const { loading, startLoading, stopLoading } = useLoading();
  const [isEditing, setIsEditing] = useState(false);
  const isCoach = useMemo(() => info?.accountType === AccountType.Coach, [info]);

  useEffect(() => {
    if (!info?.id) {
      return;
    }

    console.log(info, info.cheerStyleId);
    setValue('firstName', info.firstName);
    setValue('lastName', info.lastName);
    setValue('email', info.email);
    setValue('dateOfBirth', dayjs(info.dateOfBirth).format(DEFAULT_DATE_FORMAT));
    setValue('coachCode', info?.coachCode ?? '');
    setValue('measurementUnit', info.measurementUnitId.toString());
    setValue('schoolName', info.schoolName); // setValue('schoolName', info.schoolName);
    setValue('cheerType', info.cheerStyleId.toString());
    setValue('cheerStyle', info.cheerStyleId.toString());
    setValue('role', info.roleId.toString());
    setValue(
      'equipment',
      info.equipmentIds.map(item => item.toString())
    );
  }, [info]);

  const coachCode = useWatch({ control, name: 'coachCode' });

  const onValid = async (data: FormType) => {
    console.log(data);
    if (!data.measurementUnit) {
      return console.log('data.measurementUnit', data.measurementUnit);
    }
    startLoading();
    try {
      const response = await UserApi.updatePersonalInfo({
        cheer_style_id: Number(data.cheerStyle),
        cheer_type_id: Number(data.cheerType),
        date_of_birth: dayjs(data.dateOfBirth).toISOString(),
        first_name: data.firstName,
        last_name: data.lastName,
        measurement_unit_id: +data.measurementUnit,
        school_name: data.schoolName,
        role: Number(data.role),
        equipments: data.equipment.map(item => Number(item)),
        coach_code: data.coachCode,
      });
      const { data: dataResponse, error } = response.data;
      if (!data) throw error;

      updateInfo({
        dateOfBirth: dataResponse?.date_of_birth,
        email: dataResponse?.email,
        firstName: dataResponse?.first_name,
        lastName: dataResponse?.last_name,
        measurementUnitId: dataResponse?.measurement_unit.id,
        measurementUnitName: dataResponse?.measurement_unit.name,
        schoolName: dataResponse?.school_name,
        cheerStyleId: dataResponse?.cheer_styles?.[0].id,
        cheerStyleName: dataResponse?.cheer_styles?.[0]?.name,
        cheerTypeId: dataResponse?.cheer_types?.[0]?.id,
        cheerTypeName: dataResponse?.cheer_types?.[0]?.name,
        roleId: dataResponse?.role.id,
        roleName: dataResponse?.role.name,
        equipmentIds: dataResponse?.equipments.map(item => item.id),
      });

      toast.success('Update profile successfully');
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };

  const onError = (err: any) => {
    console.log('error', err);
  };

  const onSaveInfo = handleSubmit(onValid, onError);

  const onEnableEditing = () => {};

  const onToggle = () => {
    if (isEditing) {
      onSaveInfo();
    } else {
      setIsEditing(true);
    }
  };

  return {
    isCoach,
    loading,
    control,
    isEditing,
    coachCode,
    trigger,
    onToggle,
    onSaveInfo,
    onEnableEditing,
  };
};
