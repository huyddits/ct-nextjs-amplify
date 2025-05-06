import { CheckCircle } from "lucide-react";
import FeatureCard from "./FeatureCard";
export default function FeatureSection() {
  const listItems = [
    {
      title: "Customized Training Plans",
      content:
        "Use pre-built programs or create your own based on skill deficits",
      icon: <CheckCircle className="mr-2 h-5 w-5" />,
    },
    {
      title: "Skill Check-Off System",
      content: "Track mastery of specific cheerleading skills",
      icon: <CheckCircle className="mr-2 h-5 w-5" />,
    },
    {
      title: "Routine Hit/Miss Tracking",
      content: "Record performance consistency in routines",
      icon: <CheckCircle className="mr-2 h-5 w-5" />,
    },
    {
      title: "Performance Metrics",
      content: "Measure and visualize your athletic development",
      icon: <CheckCircle className="mr-2 h-5 w-5" />,
    },
    {
      title: "Team Management",
      content: "Coaches can monitor progress of individuals and entire teams",
      icon: <CheckCircle className="mr-2 h-5 w-5" />,
    },
  ];
  return (
    <section>
      <div className="mb-12">
        <div className="grid md:grid-cols-2 gap-8">
          {listItems.map((item) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
