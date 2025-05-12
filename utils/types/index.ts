export interface ApiResponse<T, K = undefined> {
  status: string;
  message: string;
  data: T;
  error: {
    code: string;
    details: K extends undefined ? unknown : K;
  };
}

export enum SocialProvider {
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE',
  Instagram = 'INSTAGRAM',
}
