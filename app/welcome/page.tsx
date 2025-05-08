import {
  HeroSection,
  AboutSection,
  FeatureSection,
  BenefitSection,
  CallToActionSection,
  FooterSection,
} from './_components';

export default function WelcomePage() {
  return (
    <div>
      <HeroSection />

      <main className="flex-1 container ">
        <AboutSection />
        <FeatureSection />
        <BenefitSection />
        <CallToActionSection />
      </main>

      <FooterSection />
    </div>
  );
}
