import { ROUTES } from '@/utils/constants';
import { redirect } from 'next/navigation';
export default function CheckOffPage() {
  return redirect(ROUTES.CHECK_OFF_NEW);
}
