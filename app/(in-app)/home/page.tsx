import { RouteGuard } from '../_components';

export default function HomePage() {
  return (
    <div>
      <RouteGuard />
      <div>In App</div>
    </div>
  );
}
