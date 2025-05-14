import { ROUTES } from '@/utils/constants';
import { redirect } from 'next/navigation';

export default function InAppPage() {
  return redirect(ROUTES.HOME);
}
