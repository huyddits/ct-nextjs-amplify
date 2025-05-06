import {
  FooterSection,
  LogoSection,
  Signup,
  LoginLinkSection,
} from "./_components";

export const metadata = {
  title: "Cheer Trainer | Signup",
  description: "Create your account to join Cheer Trainer today.",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-4">
      <div className="max-w-md w-full mx-auto">
        <LogoSection />
        <Signup />
        <LoginLinkSection />
        <FooterSection />
      </div>
    </div>
  );
}
