import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { InferType, object, string } from 'yup';
import { AuthApi } from '@/api';
import { useAuthStore } from '@/store';
import { SocialProvider } from '@/utils/types';
import { END_POINTS, ERROR_MESSAGES } from '@/utils/constants';
import * as $v from '@/utils/validators';
import { useLoading } from '@/hooks';

type UseLoginOptions = {
  onSuccess?: (result: { token: string }) => void;
  onFailure?: () => void;
};
export const useLogin = (options: UseLoginOptions) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const { setToken } = useAuthStore();
  const DEFAULT_FORM = {
    email: '',
    password: '',
  };

  const formSchema = object().shape({
    email: string()
      .required(ERROR_MESSAGES.INPUT)
      .matches($v.PATTERN.EMAIL, ERROR_MESSAGES.EMAIL)
      .max(100, 'Email cannot exceed 100 characters'),
    password: string()
      .required(ERROR_MESSAGES.INPUT)
      .max(100, 'Password cannot exceed 100 characters'),
  });

  type FormPayload = InferType<typeof formSchema>;

  const { control, handleSubmit, trigger } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: { ...DEFAULT_FORM },
    mode: 'onChange',
  });

  const password = useWatch({ control, name: 'password', defaultValue: '' });

  const onValid = async (data: FormPayload) => {
    startLoading();
    try {
      const response = await AuthApi.login(data);
      if (response.data.data?.token) {
        const accessToken = response.data.data.token.access_token;
        setToken(accessToken);
        options?.onSuccess?.({ token: accessToken });
      } else {
        throw response.data.error;
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };
  const onInvalid = () => {};

  const onSubmit = handleSubmit(onValid, onInvalid);

  const loginWithProvider = async ({
    accessToken: accessTokenFromProvider,
    provider,
  }: {
    accessToken?: string;
    provider: SocialProvider;
  }) => {
    try {
      let inAppAccessToken = '';
      if (provider === SocialProvider.Twitter) {
        window.location.href =
          process.env.NEXT_PUBLIC_API_BASE_URL +
          '/' +
          process.env.NEXT_PUBLIC_API_VERSION +
          '/' +
          END_POINTS.AUTH_LOGIN_TWITTER;
        return;
      }

      const providerUsingAccessToken = [
        SocialProvider.Facebook,
        SocialProvider.Google,
        SocialProvider.Instagram,
      ];

      if (providerUsingAccessToken.includes(provider) && accessTokenFromProvider) {
        const response = await AuthApi.loginSocial({
          provider,
          accessToken: accessTokenFromProvider,
        });
        if (!response.data.data?.token) {
          throw response.data.error;
        }
        inAppAccessToken = response.data.data.token.access_token;
        setToken(inAppAccessToken);
      }

      if (inAppAccessToken) {
        options?.onSuccess?.({ token: inAppAccessToken });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loading,
    control,
    password,
    trigger,
    onSubmit,
    loginWithProvider,
  };
};
