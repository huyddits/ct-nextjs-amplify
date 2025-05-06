import { JSX } from "react";

export default function BenefitCard({
  title,
  content,
  icon,
}: {
  title: string;
  content: string;
  icon: JSX.Element;
}) {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="w-16 h-16 rounded-full bg-(--primary)/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{content}</p>
    </div>
  );
}
