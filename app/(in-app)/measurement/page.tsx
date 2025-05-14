import { ROUTES } from '@/utils/constants';
import { redirect } from 'next/navigation';

export default function MeasurementPage() {
  return redirect(ROUTES.MEASUREMENT_NEW);
}
