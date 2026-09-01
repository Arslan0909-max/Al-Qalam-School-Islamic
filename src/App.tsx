import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/home/HeroSection';
import { TrustStrip } from './components/home/TrustStrip';
import { AboutSection } from './components/home/AboutSection';
import { ProgramsSection } from './components/home/ProgramsSection';
import { WhyChooseUsSection } from './components/home/WhyChooseUsSection';
import { AdmissionsCTASection } from './components/home/AdmissionsCTASection';
import { GallerySection } from './components/home/GallerySection';
import { ContactSection } from './components/home/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#171717] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#3A0505]">
      {/* 1. Navigation Foundation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* 2. Hero Foundation */}
        <HeroSection />

        {/* 3. Values / Trust Strip */}
        <TrustStrip />

        {/* 4. About Foundation */}
        <AboutSection />

        {/* 5. Programs Foundation */}
        <ProgramsSection />

        {/* 6. Why Choose Us Foundation */}
        <WhyChooseUsSection />

        {/* 7. Admissions CTA Foundation */}
        <AdmissionsCTASection />

        {/* 8. Gallery Foundation */}
        <GallerySection />

        {/* 9. Contact Foundation */}
        <ContactSection />
      </main>

      {/* 10. Footer Foundation */}
      <Footer />
    </div>
  );
}
