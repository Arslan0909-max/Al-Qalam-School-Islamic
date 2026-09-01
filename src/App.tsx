import React from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/home/HeroSection';
import { TrustStrip } from './components/home/TrustStrip';
import { AboutSection } from './components/home/AboutSection';
import { ProgramsSection } from './components/home/ProgramsSection';
import { WhyChooseUsSection } from './components/home/WhyChooseUsSection';
import { AdmissionsCTASection } from './components/home/AdmissionsCTASection';
import { FacilitiesSection } from './components/home/FacilitiesSection';
import { ContactSection } from './components/home/ContactSection';
import { Footer } from './components/Footer';

function AppContent() {
  const { isTransitioning, isRevealing, isUrdu } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#171717] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#3A0505] relative overflow-x-hidden">
      {/* 
        Maroon & Purple Royal Gradient Transition Screen (Apple-style processing experience)
        Eliminates harsh white flash with a rich, glowing atmosphere
      */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[100] pointer-events-none flex flex-col items-center justify-center transition-all duration-400 ease-out ${
          isTransitioning
            ? 'opacity-100 backdrop-blur-2xl bg-gradient-to-br from-[#1E0206] via-[#380614] to-[#220428]'
            : 'opacity-0 backdrop-blur-none bg-transparent pointer-events-none'
        }`}
        style={{
          boxShadow: isTransitioning ? 'inset 0 0 100px rgba(0,0,0,0.8)' : 'none',
        }}
      >
        {/* Soft Golden Ambient Glow */}
        <div className="absolute w-72 h-72 rounded-full bg-[#D4AF37]/15 blur-[90px] animate-maroon-pulse pointer-events-none" />

        {/* Minimalist Apple-grade Processing Spinner & Crest */}
        <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* Outer Soft Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-white/10" />
            {/* Spinning Gold Arc */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#F2C94C] border-r-[#D4AF37] animate-ios-spinner" />
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-semibold tracking-widest text-[#FAF8F3]/90 uppercase font-serif">
              {isUrdu ? 'القلم اسلامک اسکول' : 'Alqalam Islamic School'}
            </span>
            <span className="text-[11px] text-[#D4AF37]/80 tracking-wider">
              {isUrdu ? 'زبان تبدیل ہو رہی ہے...' : 'Switching Language...'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Page Layout with Apple iPhone Hello-to-Home Screen Wake-up Animation */}
      <div
        className={`flex flex-col min-h-screen ${
          isRevealing ? 'animate-ios-wake' : ''
        }`}
        style={{
          transformOrigin: '50% 15%',
        }}
      >
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

          {/* 8. Facilities & Campus Environment Foundation */}
          <FacilitiesSection />

          {/* 9. Contact Foundation */}
          <ContactSection />
        </main>

        {/* 10. Footer Foundation */}
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

