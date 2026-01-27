import { LenisProvider } from "@/components/lenis-provider"

import { HeroSection } from "@/components/sections/hero-section"
import { ManifestoSection } from "@/components/sections/manifesto-section"
import { FeaturesSection } from "@/components/sections/features-section"
// import { ShowcaseSection } from "@/components/sections/showcase-section"
// import { CarouselSection } from "@/components/sections/carousel-section"
// import { InsightsSection } from "@/components/sections/insights-section"
// import { PricingSection } from "@/components/sections/pricing-section"
import { FooterSection } from "@/components/sections/footer-section"
import { CustomCursor } from "@/components/custom-cursor"
// import LoginPage from "./login/page"
// import SignupPage from "./signup/page"

export default function Home() {
  return (
    <LenisProvider>
      <main className="custom-cursor bg-background">
        <CustomCursor />
        <HeroSection />
        <ManifestoSection />
        <FeaturesSection />
        {/* <LoginPage />
        <SignupPage /> */}
        {/* <ShowcaseSection /> */}
        {/* <CarouselSection /> */}
        {/* <InsightsSection />
        <PricingSection /> */}
        <FooterSection />
      </main>
    </LenisProvider>
  )
}
