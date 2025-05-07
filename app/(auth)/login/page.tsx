import React from "react";
import { LogoSection, SignupLinkSection, LoginForm } from "./_components";
import { FooterSection } from "../_components";

export default function LoginPage() {
  return (
    <React.Fragment>
      <LogoSection />
      <LoginForm />
      <SignupLinkSection />
      <FooterSection />
    </React.Fragment>
  );
}
