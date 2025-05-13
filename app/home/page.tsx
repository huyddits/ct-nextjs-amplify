import {
  StatisticOnTimeSection,
  StatisticOnValueSection,
  AlertItemSection,
} from '../home/_components';

export default function Dashboard() {
  return (
    <div className="pt-4 pb-[80px] max-w-3xl mx-auto p-4">
      <StatisticOnTimeSection />
      <StatisticOnValueSection />
      <AlertItemSection />
    </div>
  );
}
