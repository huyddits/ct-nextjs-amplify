'use client';

import { useEffect } from 'react';
import { initFacebookSDK, loginViaFacebook } from '@/utils/helpers';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { AuthApi } from '@/api';
import { useLogin } from '../(auth)/login/_hooks';
import { SocialProvider } from '@/utils/types';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/constants';

/**
 * https://developers.facebook.com/apps/1013685044250631/use_cases/customize/?use_case_enum=FB_LOGIN&selected_tab=quickstart&product_route=fb-login
 * FB.getLoginStatus((response) => { statusChangeCallback(response); })
 * status: 'connected'|'not_authorized'|'unknown'
 * authResponse: 'accessToken'|'expiresIn'|'signedRequest'|'userID' (available when status === 'connected')
 */

export function FacebookLogin() {
  const router = useRouter();
  const { loginWithProvider } = useLogin({
    onSuccess: () => {
      router.replace(ROUTES.HOME);
    },
  });
  useEffect(() => {
    initFacebookSDK(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!);
  }, []);

  const callbackLogin = (response: any) => {
    try {
      const { status, authResponse } = response;
      console.log('🚀 ~ login ~ status, authResponse:', status, authResponse);

      if (status === 'connected' && authResponse) {
        const { accessToken } = response.authResponse;

        // call api login via provider
        loginWithProvider({ accessToken, provider: SocialProvider.Facebook });
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant="outline" className="w-full" onClick={() => loginViaFacebook(callbackLogin)}>
      <Icon icon="simple-icons:facebook" color="#1877F2" />
      <span className="sr-only">Facebook</span>
    </Button>
  );
}
