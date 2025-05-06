import { IconNode } from "lucide-react";
import { JSX } from "react";

export default function FeatureCard({
  title,
  content,
  icon,
}: {
  title: string;
  content: string;
  icon: JSX.Element;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
        {icon}
        {title}
      </h3>
      <p className="text-gray-600">{content} </p>
    </div>
  );
}
