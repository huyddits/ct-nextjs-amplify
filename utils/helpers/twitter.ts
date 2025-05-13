// const TWITTER_AUTH_URL = 'https://twitter.com/i/oauth2/authorize';
// const TWITTER_SCOPE = ['tweet.read', 'users.read', 'offline.access'].join(' ');
// const TWITTER_STATE = 'twitter-increaser-state';
// const TWITTER_CODE_CHALLENGE = 'challenge';

// export const initiateTwitterLogin = async () => {
//   const twitterAuthURL =
//     TWITTER_AUTH_URL +
//     '?' +
//     new URLSearchParams({
//       response_type: 'code',
//       client_id: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID!,
//       // redirect_uri: process.env.NEXT_PUBLIC_API_BASE_URL + '/v1/auth/twitter/callback',
//       redirect_uri: process.env.NEXT_PUBLIC_API_BASE_URL + '/home',
//       scope: TWITTER_SCOPE,
//       state: TWITTER_STATE,
//       code_challenge: TWITTER_CODE_CHALLENGE,
//       code_challenge_method: 'plain',
//     }).toString();

//   window.location.href = twitterAuthURL;
// };
