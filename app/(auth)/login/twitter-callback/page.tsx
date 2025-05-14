import { Suspense } from 'react';
import TwitterCallbackPage from './TwitterCallbackPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TwitterCallbackPage />
    </Suspense>
  );
}
