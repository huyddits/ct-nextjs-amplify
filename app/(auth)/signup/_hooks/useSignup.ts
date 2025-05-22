import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { InferType, object, string, ref, array } from 'yup';
import { UserApi } from '@/api';
import dayjs from 'dayjs';
import { AccountType, MeasurementUnit } from '@/utils/types';
import { usePasswordStrength } from '../../_hooks';
import * as $v from '@/utils/validators';
type UseSignupOptions = {
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
};

export const useSignup = (options: UseSignupOptions) => {
  const formSchema = useMemo(() => {
    return object().shape({
      userType: string()
        .oneOf([AccountType.Athlete, AccountType.Coach])
        .required('Please select a user type'),
      firstName: string()
        .required('Please enter your first name')
        .matches(
          $v.PATTERN.NAME,
          'Please avoid using special characters like [@, #, !, *, $, %, ^, &, +] in this field.'
        )
        .max(50, 'First name cannot exceed 50 characters'),
      lastName: string()
        .required('Please enter your last name')
        .matches(
          $v.PATTERN.NAME,
          'Please avoid using special characters like [@, #, !, *, $, %, ^, &, +] in this field.'
        )
        .max(50, 'Last name cannot exceed 50 characters'),
      email: string()
        .required('Please enter your email')
        .test('is-email', 'Please enter a valid email', value => {
          if (!value) return false;
          return $v.isEmail(value);
        })
        .max(100, 'Email cannot exceed 100 characters'),
      password: string()
        .required('Please enter your password')
        .min(8, 'Password must be at least 8 characters')
        .matches($v.PATTERN.LOWERCASE, 'Password must contain at least one lowercase letter')
        .matches($v.PATTERN.UPPERCASE, 'Password must contain at least one uppercase letter')
        .matches($v.PATTERN.NUMBER, 'Password must contain at least one number')
        .matches($v.PATTERN.SPECIAL_CHAR, 'Password must contain at least one special character')
        .max(100, 'Password cannot exceed 100 characters'),
      confirmPassword: string()
        .required('Please confirm your password')
        .min(8, 'Password must be at least 8 characters')

        .max(100, 'Password cannot exceed 100 characters')
        .oneOf([ref('password')], 'Passwords must match'),
      dateOfBirth: string().required('Please enter your date of birth'),
      schoolName: string()
        .max(100, 'School Name cannot exceed 100 characters')
        .required('Please enter your school name'),
      cheerType: string().required('Please select type of cheer'),
      cheerStyle: string().required('Please select style of cheer'),
      role: string().required('Please select your role'),
      equipment: array(string().required()).required(),
      measurementUnit: string()
        .oneOf([MeasurementUnit.Imperial, MeasurementUnit.Metric, ''])
        .required('Please select your measurement unit'),
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
    try {
      console.log(data);
      const response = await UserApi.registerUser({
        account_type: data.userType,
        cheer_style_id: Number(data.cheerStyle),
        cheer_type_id: Number(data.cheerType),
        date_of_birth: dayjs(data.dateOfBirth).toISOString(),
        email: data.email,
        equipment_ids: data.equipment.map(value => Number(value)),
        first_name: data.firstName,
        last_name: data.lastName,
        password: data.password,
        role_id: +data.role,
        measurement_unit: data.measurementUnit as MeasurementUnit,
      });
      console.log('🚀 ~ onValid ~ response:', response);
      options?.onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  const onInvalid = (err: any) => {
    console.log(err);
  };

  const onSubmit = handleSubmit(onValid, onInvalid);

  const userType = useWatch({ control, name: 'userType' });
  const password = useWatch({ control, name: 'password' });

  useEffect(() => {
    setValue('role', userType === 'coach' ? 'coach' : '');
  }, [userType]);

  return {
    isValid,
    userType,
    password,
    control,
    trigger,
    onSubmit,
  };
};
