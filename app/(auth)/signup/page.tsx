import React from "react";
import { LogoSection, SignupForm, LoginLinkSection } from "./_components";
import { FooterSection } from "../_components";

export const metadata = {
  title: "Cheer Trainer | Signup",
  description: "Create your account to join Cheer Trainer today.",
};

export default function SignupPage() {
  return (
    <React.Fragment>
      <LogoSection />
      <SignupForm />
      <LoginLinkSection />
      <FooterSection />
    </React.Fragment>
  );
}
