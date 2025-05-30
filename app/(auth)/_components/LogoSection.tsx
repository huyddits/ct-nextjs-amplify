import React from 'react';
import { Logo } from '@/app/_components';
interface LogoSectionProps {
  description: string;
}

export default function LogoSection(props: LogoSectionProps) {
  return (
    <div className="text-center mb-8">
      <Logo />
      <h1 className="text-2xl font-bold text-primary">Cheer Trainer</h1>
      <p className="text-gray-600 mt-2">{props.description}</p>
    </div>
  );
}
