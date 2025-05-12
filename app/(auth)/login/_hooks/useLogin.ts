import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { InferType, object, string } from 'yup';
import { AuthApi } from '@/api';
import { useAuthStore } from '@/store';
import { SocialProvider } from '@/utils/types';

type UseLoginOptions = {
  onSuccess?: (result: { token: string }) => void;
  onFailure?: () => void;
};
export const useLogin = (options: UseLoginOptions) => {
  const { setToken } = useAuthStore();
  const DEFAULT_FORM = {
    email: '',
    password: '',
  };

  const formSchema = object().shape({
    email: string().email('Please enter a valid email').required('Please enter your email'),
    password: string().required('Please enter your password'),
  });

  type FormPayload = InferType<typeof formSchema>;

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: { ...DEFAULT_FORM },
  });

  const password = useWatch({ control, name: 'password', defaultValue: '' });

  const onValid = async (data: FormPayload) => {
    console.log(data);
    try {
      const response = await AuthApi.login(data);
      const accessToken = response.data.data.access_token;
      setToken(accessToken);
      options?.onSuccess?.({ token: accessToken });
    } catch (error) {
      console.log(error);
    }
  };
  const onInvalid = () => {};

  const onSubmit = handleSubmit(onValid, onInvalid);

  const loginWithProvider = async ({
    accessToken: accessTokenFromProvider,
    provider,
  }: {
    accessToken: string;
    provider: SocialProvider;
  }) => {
    try {
      const response = await AuthApi.loginSocial({
        provider,
        accessToken: accessTokenFromProvider,
      });
      const inAppAccessToken = response.data.data.token.access_token;
      setToken(inAppAccessToken);
      console.log('response', response);
      options?.onSuccess?.({ token: inAppAccessToken });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    control,
    password,
    onSubmit,
    loginWithProvider,
  };
};
