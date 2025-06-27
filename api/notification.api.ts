import axiosIns from '@/lib/axiosIns';
import { END_POINTS } from '@/utils/constants';

export const subscribe = (payload: PushSubscription) => {
  return axiosIns.post(END_POINTS.NOTIFICATION_SUBSCRIBE_WEB, { subscription: payload });
};
