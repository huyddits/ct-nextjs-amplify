export interface ApiResponse<T, K> {
  status: string;
  message: string;
  data: T;
  error: {
    code: string;
    details: K;
  };
}
