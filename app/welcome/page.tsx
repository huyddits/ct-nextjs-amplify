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

      <main className="flex-1 container px-4 py-12">
        <AboutSection />
        <FeatureSection />
        <BenefitSection />
        <CallToActionSection />
      </main>

      <FooterSection />
    </div>
  );
}
