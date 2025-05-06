import {
  AwardIcon,
  BarChartIcon,
  UsersIcon,
  ShieldIcon,
  CheckCircleIcon,
} from "lucide-react";
import BenefitCard from "./BenefitCard";
export default function BenefitSection() {
  const listItems = [
    {
      title: "Elevate Your Performance",
      content:
        "Develop the specific strength needed to advance your stunting and tumbling",
      icon: <AwardIcon className="h-8 w-8 text-primary" />,
    },
    {
      title: "Track Your Progress",
      content: "Log workouts and see your strength gains over time",
      icon: <BarChartIcon className="h-8 w-8 text-primary" />,
    },
    {
      title: "Connect With Your Team",
      content: "Coaches and athletes stay connected with shared training data",
      icon: <UsersIcon className="h-8 w-8 text-primary" />,
    },
    {
      title: "Prevent Injuries",
      content: "Build strength in the right areas to protect your body",
      icon: <ShieldIcon className="h-8 w-8 text-primary" />,
    },
    {
      title: "Get Training Programs",
      content:
        "Access training plans designed specifically for cheerleading skills",
      icon: <AwardIcon className="h-8 w-8 text-primary" />,
    },
    {
      title: "Learn Proper Technique",
      content: "Access tutorials to master form and execution",
      icon: <CheckCircleIcon className="h-8 w-8 text-primary" />,
    },
  ];
  return (
    <section>
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
          What You Can Do With Cheer Trainer
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {listItems.map((item) => (
            <BenefitCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
