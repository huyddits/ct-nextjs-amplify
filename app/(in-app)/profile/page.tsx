import { SafeAreaDetection } from '@/app/_components';
import { ProfileForm } from './_components';

export default function ProfilePage() {
  return (
    <div>
      <ProfileForm />
      <SafeAreaDetection position="bottom" />
    </div>
  );
}
