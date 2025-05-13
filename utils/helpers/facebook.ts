declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}

export function initFacebookSDK(appId: string) {
  return new Promise(resolve => {
    if (window.FB) return resolve({});

    window.fbAsyncInit = function () {
      window.FB.init({
        appId,
        cookie: true,
        xfbml: false,
        version: process.env.NEXT_PUBLIC_FACEBOOK_API_VERSION,
      });
      resolve({});
    };

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    document.body.appendChild(script);
  });
}

export function loginViaFacebook(callback: (response: any) => void) {
  window.FB.login(callback, { scope: 'public_profile,email' });
}

// https://developers.facebook.com/docs/graph-api/reference/user/
export function fetchUserFacebookInfo(userID: string, onSuccess: (userInfo: any) => void) {
  window.FB.api(`/${userID}`, { fields: 'id,name,email,picture' }, onSuccess);
}
