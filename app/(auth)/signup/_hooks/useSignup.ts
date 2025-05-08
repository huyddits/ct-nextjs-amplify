import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { InferType, object, string } from 'yup';

export const useSignup = () => {
  const formSchema = useMemo(() => {
    return object().shape({
      userType: string().oneOf(['athlete', 'coach']).required('Please select a user type'),
      firstName: string().required('Please enter your first name'),
      lastName: string().required('Please enter your last name'),
      email: string().email('Please enter a valid email').required('Please enter your email'),
      password: string().required('Please enter your password'),
      confirmPassword: string().required('Please confirm your password'),
      dateOfBirth: string().required('Please enter your date of birth'),
      schoolName: string().required('Please enter your school name'),
      cheerType: string().required('Please select your cheer type'),
      cheerStyle: string().required('Please select your cheer style'),
      role: string().required('Please select your role'),
      equipment: string().notRequired().nonNullable(),
      measurementUnit: string().notRequired().nonNullable(),
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

  const { control, setValue, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      ...DEFAULT_FORM,
    },
    mode: 'onBlur',
  });

  const onValid = () => {};
  const onInvalid = () => {};

  const onSubmit = handleSubmit(onValid, onInvalid);

  const userType = useWatch({ control, name: 'userType' });

  useEffect(() => {
    setValue('role', userType === 'coach' ? 'coach' : 'athlete');
  }, [userType]);

  return {
    userType,
    control,
    onSubmit,
  };
};
