import {
  StatisticOnTimeSection,
  StatisticOnValueSection,
  AlertSection,
  PushSubscribeButton,
  PushTestNotificationButton,
} from './_components';

export default function Dashboard() {
  return (
    <div className="pt-4 pb-[80px] max-w-3xl mx-auto p-4">
      <StatisticOnTimeSection />
      <StatisticOnValueSection />
      <AlertSection />
      <div className="mt-8">
        <PushSubscribeButton />
        <PushTestNotificationButton />
      </div>
    </div>
  );
}
