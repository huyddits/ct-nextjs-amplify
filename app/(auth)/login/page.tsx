import React from 'react';
import { SignupLinkSection, LoginForm } from './_components';
import LogoSection from '../_components/LogoSection';
import { FooterSection } from '../_components';

export default function LoginPage() {
  return (
    <React.Fragment>
      <LogoSection description="Sign in to your account" />
      <LoginForm />
      <SignupLinkSection />
      <FooterSection />
    </React.Fragment>
  );
}
