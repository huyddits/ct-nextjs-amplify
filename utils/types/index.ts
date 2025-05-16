export interface ApiResponse<T, K = undefined> {
  status: string;
  message: string;
  data?: T;
  error?: {
    code: string;
    details: K extends undefined ? unknown : K;
  };
}

export enum SocialProvider {
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE',
  Instagram = 'INSTAGRAM',
  Twitter = 'TWITTER',
}

export enum AccountType {
  Athlete = 'athlete',
  Coach = 'coach',
}

export enum MeasurementUnit {
  Imperial = 'imperial',
  Metric = 'metric',
}
