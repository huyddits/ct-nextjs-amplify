import React from 'react';
import { SignupForm, LoginLinkSection } from './_components';
import { LogoSection, FooterSection } from '../_components';
import { SafeAreaDetection } from '@/app/_components';

export const metadata = {
  title: 'Cheer Trainer | Signup',
  description: 'Create your account to join Cheer Trainer today.',
};

export default function SignupPage() {
  return (
    <React.Fragment>
      <SafeAreaDetection position="top" className="bg-transparent" />
      <LogoSection description="Create your account" />
      <SignupForm />
      <LoginLinkSection />
      <FooterSection />
    </React.Fragment>
  );
}
