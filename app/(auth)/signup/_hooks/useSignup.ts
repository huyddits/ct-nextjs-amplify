import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { type InferType, object, string, ref, array } from 'yup';
import { UserApi } from '@/api';
import dayjs from 'dayjs';
import { AccountType, MeasurementUnit } from '@/utils/types';
import * as $v from '@/utils/validators';
import { ERROR_MESSAGES } from '@/utils/constants';
import { useLoading } from '@/hooks';
type UseSignupOptions = {
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
};

export const useSignup = (options: UseSignupOptions) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const formSchema = useMemo(() => {
    return object().shape({
      userType: string()
        .oneOf([AccountType.Athlete, AccountType.Coach])
        .required(ERROR_MESSAGES.SELECT),
      firstName: string()
        .required(ERROR_MESSAGES.INPUT)
        .matches($v.PATTERN.NAME, ERROR_MESSAGES.NAME)
        .max(50, 'First name cannot exceed 50 characters'),
      lastName: string()
        .required(ERROR_MESSAGES.INPUT)
        .matches($v.PATTERN.NAME, ERROR_MESSAGES.NAME)
        .max(50, 'Last name cannot exceed 50 characters'),
      email: string()
        .required(ERROR_MESSAGES.INPUT)
        .matches($v.PATTERN.EMAIL, ERROR_MESSAGES.EMAIL)
        .max(100, 'Email cannot exceed 100 characters'),
      password: string()
        .required(ERROR_MESSAGES.INPUT)
        .min(8, 'Password must be at least 8 characters')
        .matches($v.PATTERN.LOWERCASE, 'Password must contain at least one lowercase letter')
        .matches($v.PATTERN.UPPERCASE, 'Password must contain at least one uppercase letter')
        .matches($v.PATTERN.NUMBER, 'Password must contain at least one number')
        .matches($v.PATTERN.SPECIAL_CHAR, 'Password must contain at least one special character')
        .max(100, 'Password cannot exceed 100 characters'),
      confirmPassword: string()
        .required(ERROR_MESSAGES.INPUT)
        .oneOf(
          [ref('password')],
          'Passwords do not match. Please make sure both entries are identical.'
        ),
      dateOfBirth: string().required(ERROR_MESSAGES.INPUT),
      schoolName: string()
        .required(ERROR_MESSAGES.INPUT)
        .matches($v.PATTERN.NAME, ERROR_MESSAGES.NAME)
        .max(100, 'School Name cannot exceed 100 characters'),
      cheerType: string().required(ERROR_MESSAGES.SELECT),
      cheerStyle: string().required(ERROR_MESSAGES.SELECT),
      role: string().required(ERROR_MESSAGES.SELECT),
      equipment: array(string().required()).required(),
      measurementUnit: string().required(ERROR_MESSAGES.SELECT),
    });
  }, []);

  type FormType = InferType<typeof formSchema>;

  const DEFAULT_FORM: Required<FormType> = {
    cheerStyle: '',
    userType: AccountType.Athlete,
    firstName: '',
    cheerType: '',
    confirmPassword: '',
    dateOfBirth: '',
    email: '',
    lastName: '',
    password: '',
    schoolName: '',
    role: '',
    equipment: [],
    measurementUnit: '',
  };

  const {
    control,
    trigger,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      ...DEFAULT_FORM,
    },
    mode: 'onChange',
  });

  const onValid = async (data: FormType) => {
    if (!data.role || !data.measurementUnit) {
      return console.log('invalid', data);
    }
    try {
      startLoading();
      console.log({ data });
      const response = await UserApi.registerUser({
        school_name: data.schoolName,
        account_type: data.userType,
        cheer_style_id: Number(data.cheerStyle),
        cheer_type_id: Number(data.cheerType),
        date_of_birth: dayjs(data.dateOfBirth).toISOString(),
        email: data.email,
        equipment_ids: data.equipment.map(value => Number(value)),
        first_name: data.firstName,
        last_name: data.lastName,
        password: data.password,
        role_id: +data.role, // for coach role is 3
        measurement_unit_id: +data.measurementUnit,
      });
      console.log('🚀 ~ onValid ~ response:', response);
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };

  const onInvalid = (err: any) => {
    console.log(err);
  };

  const onSubmit = handleSubmit(onValid, onInvalid);

  const userType = useWatch({ control, name: 'userType' });
  const password = useWatch({ control, name: 'password' });
  const cheerType = useWatch({ control, name: 'cheerType' });

  // useEffect(() => {
  //   setValue('role', userType === AccountType.Coach ? AccountType.Coach : '');
  // }, [userType, setValue]);

  return {
    loading,
    isValid,
    userType,
    password,
    control,

    trigger,
    setValue,
    onSubmit,
  };
};
