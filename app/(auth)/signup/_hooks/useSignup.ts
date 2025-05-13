import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { InferType, object, string, ref } from 'yup';
import { UserApi } from '@/api';

type UseSignupOptions = {
  onSuccess?: () => void;
  onFailure?: () => void;
};

export const useSignup = (options: UseSignupOptions) => {
  const formSchema = useMemo(() => {
    return object().shape({
      userType: string().oneOf(['athlete', 'coach']).required('Please select a user type'),
      firstName: string()
        .required('Please enter your first name')
        .max(50, 'First name cannot exceed 50 characters'),
      lastName: string()
        .required('Please enter your last name')
        .max(50, 'Last name cannot exceed 50 characters'),
      email: string()
        .email('Please enter a valid email')
        .required('Please enter your email')
        .max(100, 'Email cannot exceed 100 characters'),
      password: string()
        .required('Please enter your password')
        .min(8, 'Password must be at least 8 characters')
        .max(100, 'Password cannot exceed 100 characters'),
      confirmPassword: string()
        .required('Please confirm your password')
        .min(8, 'Password must be at least 8 characters')

        .max(100, 'Password cannot exceed 100 characters')
        .oneOf([ref('password')], 'Passwords must match'),
      dateOfBirth: string().required('Please enter your date of birth'),
      schoolName: string().max(100, 'School Name cannot exceed 100 characters'),
      cheerType: string().required('Please select type of cheer'),
      cheerStyle: string().required('Please select style of cheer'),
      role: string().required('Please select your role'),
      equipment: string().notRequired().nonNullable(),
      measurementUnit: string().required('Please select your measurement unit'),
    });
  }, []);

  type FormType = InferType<typeof formSchema>;

  const DEFAULT_FORM: Required<FormType> = {
    cheerStyle: '',
    userType: 'athlete',
    firstName: '',
    cheerType: '',
    confirmPassword: '',
    dateOfBirth: '',
    email: '',
    lastName: '',
    password: '',
    schoolName: '',
    role: '',
    equipment: '',
    measurementUnit: '',
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      ...DEFAULT_FORM,
    },
    mode: 'onBlur',
  });

  const onValid = async (data: FormType) => {
    console.log(data);
    try {
      const response = await UserApi.registerUser({
        cheer_style_id: Number(data.cheerStyle),
        cheer_type_id: Number(data.cheerType),
        date_of_birth: data.dateOfBirth,
        email: data.email,
        equipment_ids: data.equipment ? [+data.equipment] : [],
        first_name: data.firstName,
        last_name: data.lastName,
        password: data.password,
        role_id: +data.role,
      });

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

  useEffect(() => {
    setValue('role', userType === 'coach' ? 'coach' : 'athlete');
  }, [userType]);

  return {
    isValid,
    userType,
    control,
    onSubmit,
  };
};
