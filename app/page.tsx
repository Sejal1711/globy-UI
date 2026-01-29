import { LenisProvider } from "@/components/lenis-provider"

import { HeroSection } from "@/components/sections/hero-section"
import { ManifestoSection } from "@/components/sections/manifesto-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { FooterSection } from "@/components/sections/footer-section"
import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/Navbar"
import { Upload } from "lucide-react"

export default function Home() {
  return (
    <LenisProvider>
      <main className="custom-cursor bg-background cursor-none">
        <CustomCursor />
        <Navbar />
        <HeroSection />
        <ManifestoSection />
        <FeaturesSection />
        <FooterSection />
      </main>
    </LenisProvider>
  )
}
