import { ROUTES } from '@/utils/constants';
import { redirect } from 'next/navigation';

export default function TrainingPage() {
  return redirect(`/${ROUTES.TRAINING_STRENGTH}`);
}
