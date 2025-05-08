import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { object, string } from 'yup';

export const useLogin = () => {
  const DEFAULT_FORM = {
    email: '',
    password: '',
  };

  const formSchema = object().shape({
    email: string().email('Please enter a valid email').required('Please enter your email'),
    password: string().required('Please enter your password'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
  });

  const password = useWatch({ control, name: 'password', defaultValue: '' });

  const onValid = () => {};
  const onInvalid = () => {};

  const onSubmit = handleSubmit(onValid, onInvalid);

  return {
    control,
    password,
    onSubmit,
  };
};
