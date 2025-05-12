// /pages/login.tsx
import crypto from 'crypto';
export function generateCodeVerifier(): string {
  const array = new Uint8Array(64);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export const initiateTwitterLogin = async () => {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // Save verifier in local/session storage or a secure cookie
  sessionStorage.setItem('code_verifier', codeVerifier);

  const twitterAuthURL =
    `https://twitter.com/i/oauth2/authorize?` +
    new URLSearchParams({
      response_type: 'code',
      client_id: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID!,
      redirect_uri: 'http://localhost:3000/api/auth/twitter/callback',
      scope: 'tweet.read users.read offline.access',
      state: 'someRandomState',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    }).toString();

  window.location.href = twitterAuthURL;
};
