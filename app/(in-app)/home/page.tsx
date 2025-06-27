import {
  StatisticOnTimeSection,
  StatisticOnValueSection,
  AlertSection,
  NotificationModal,
} from './_components';

export default function HomePage() {
  return (
    <div className="pt-4 pb-[80px] max-w-3xl mx-auto p-4">
      <StatisticOnTimeSection />
      <StatisticOnValueSection />
      <AlertSection />
      <div className="mt-8">
        <NotificationModal />
      </div>
    </div>
  );
}
