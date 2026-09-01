import React from 'react';
import { ArrowRight, Calendar, Sparkles, BookOpen, GraduationCap, HeartHandshake, ShieldCheck } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button, PrimaryButton, SecondaryButton } from '../ui/Button';
import { IslamicStar, AlqalamLogoBadge, CornerOrnament } from '../ui/GeometricDecoration';
import { ScrollReveal } from '../ui/ScrollReveal';
import { TRUST_BADGES, SITE_CONFIG } from '../../constants/siteData';

export const HeroSection: React.FC = () => {
  return (
    <div id="home" className="relative overflow-hidden bg-[#FAF8F3] pt-8 pb-16 md:py-20 lg:py-24 border-b border-[#D4AF37]/20">
      {/* Subtle Islamic Geometric Grid Texture */}
      <div className="absolute inset-0 bg-islamic-grid pointer-events-none" aria-hidden="true" />

      {/* Decorative Minimal Gold Accents with soft depth */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#650B0B]/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT COLUMN: Large Editorial Typography & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7 text-left">
            {/* Minimalist Gold Rule Kicker */}
            <ScrollReveal direction="down" delay={0}>
              <div className="flex items-center gap-3 group cursor-default">
                <div className="w-12 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-16"></div>
                <span className="text-[12px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold transition-colors duration-300 group-hover:text-[#B8860B]">
                  Alqalam Islamic School • Khalabat Township (KTS), Haripur
                </span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal direction="up" delay={20}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl serif text-[#650B0B] leading-[1.1] tracking-tight font-bold">
                Nurturing Faith.
                <br />
                <span className="text-[#3A0505] relative inline-block transition-transform duration-500 hover:translate-x-1">
                  Building Excellence.
                </span>
              </h1>
            </ScrollReveal>

            {/* Supporting paragraph */}
            <ScrollReveal direction="up" delay={40}>
              <p className="text-base sm:text-lg md:text-xl text-[#666666] leading-relaxed max-w-xl font-normal">
                {SITE_CONFIG.heroDescription}
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal direction="up" delay={60}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <PrimaryButton
                  size="lg"
                  asLink
                  href="#about"
                  icon={<ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />}
                  className="px-8 py-4 text-[13px] font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
                >
                  Explore Our School
                </PrimaryButton>

                <SecondaryButton
                  size="lg"
                  asLink
                  href="#admissions"
                  className="px-8 py-4 text-[13px] font-bold uppercase tracking-widest hover:bg-[#650B0B] hover:text-[#FAF8F3] hover:scale-[1.02] active:scale-95 transition-all duration-300"
                >
                  Admissions
                </SecondaryButton>
              </div>
            </ScrollReveal>

            {/* Trust Badges Strip */}
            <ScrollReveal direction="up" delay={80}>
              <div className="pt-6 border-t border-[#650B0B]/10 grid grid-cols-3 gap-4 sm:gap-6 max-w-lg">
                <div className="flex items-center gap-2.5 sm:gap-3 group cursor-default transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="w-9 h-9 rounded-sm bg-[#3A0505]/5 border border-[#D4AF37]/50 flex items-center justify-center text-[#650B0B] shrink-0 group-hover:bg-[#650B0B] group-hover:text-[#D4AF37] transition-all duration-300 shadow-sm">
                    <ShieldCheck size={18} className="transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#3A0505] leading-tight group-hover:text-[#650B0B] transition-colors">Islamic</h4>
                    <p className="text-[11px] sm:text-xs text-[#666666]">Environment</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 group cursor-default transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="w-9 h-9 rounded-sm bg-[#3A0505]/5 border border-[#D4AF37]/50 flex items-center justify-center text-[#650B0B] shrink-0 group-hover:bg-[#650B0B] group-hover:text-[#D4AF37] transition-all duration-300 shadow-sm">
                    <GraduationCap size={18} className="transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#3A0505] leading-tight group-hover:text-[#650B0B] transition-colors">Quality</h4>
                    <p className="text-[11px] sm:text-xs text-[#666666]">Education</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 group cursor-default transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="w-9 h-9 rounded-sm bg-[#3A0505]/5 border border-[#D4AF37]/50 flex items-center justify-center text-[#650B0B] shrink-0 group-hover:bg-[#650B0B] group-hover:text-[#D4AF37] transition-all duration-300 shadow-sm">
                    <HeartHandshake size={18} className="transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#3A0505] leading-tight group-hover:text-[#650B0B] transition-colors">Character</h4>
                    <p className="text-[11px] sm:text-xs text-[#666666]">Building</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN: Redesigned Islamic Arch Hero Showcase */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <ScrollReveal direction="none" delay={250} duration={900}>
              {/* Ambient Gold Glow & Geometric Backing */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#D4AF37]/20 to-[#650B0B]/10 rounded-3xl blur-2xl pointer-events-none" />
              
              {/* Islamic 8-Pointed Star Floating Geometric Halo */}
              <div
                className="absolute -top-8 -right-8 w-44 h-44 bg-[#D4AF37]/20 pointer-events-none rotate-12 transition-transform duration-1000 hover:rotate-45"
                style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
              />
              <div className="absolute -bottom-6 -left-6 w-36 h-36 border-2 border-dashed border-[#D4AF37]/40 rounded-full pointer-events-none animate-spin-slow" />

              {/* Main Arch Frame Container */}
              <div className="relative w-full max-w-md lg:max-w-none bg-gradient-to-b from-[#FAF8F3] via-white to-[#FAF8F3] p-3 sm:p-4 rounded-t-[140px] rounded-b-2xl shadow-2xl border-2 border-[#D4AF37]/60 group transition-all duration-500 hover:border-[#D4AF37] hover:shadow-[0_25px_50px_-12px_rgba(58,5,5,0.25)]">
                {/* Inner Arch Window */}
                <div className="w-full relative overflow-hidden bg-[#3A0505] rounded-t-[125px] rounded-b-xl aspect-[4/5] shadow-inner">
                  {/* Hero Architectural / Campus Photo */}
                  <img
                    src="/hero-campus.jpg"
                    alt="Al-Qalam Islamic School Campus"
                    className="w-full h-full object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/classroom.jpg';
                    }}
                  />

                  {/* Islamic Multi-stop Color Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A0505] via-[#3A0505]/30 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#3A0505]/40 via-transparent to-transparent pointer-events-none" />

                  {/* Inner Arch Gold Filigree Border */}
                  <div className="absolute inset-2.5 rounded-t-[115px] rounded-b-lg border border-[#D4AF37]/50 pointer-events-none" />

                  {/* Top Center Bismillah Header Banner */}
                  <div className="absolute top-4 inset-x-0 flex justify-center z-20">
                    <div className="px-4 py-1.5 rounded-full bg-[#3A0505]/90 backdrop-blur-md border border-[#D4AF37] text-[#FAF8F3] text-[11px] sm:text-xs font-serif tracking-widest shadow-lg transition-transform duration-300 group-hover:scale-105">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </div>
                  </div>

                  {/* Islamic Star Badge Overlay */}
                  <div className="absolute bottom-4 right-4 z-30 transform transition-all duration-300 group-hover:scale-110">
                    <div className="p-2 rounded-xl bg-[#3A0505]/90 backdrop-blur-md border border-[#D4AF37] shadow-xl">
                      <AlqalamLogoBadge size="md" showText={false} variant="dark-bg" />
                    </div>
                  </div>

                  {/* Bottom Value Inscription */}
                  <div className="absolute bottom-4 left-4 z-20 text-[#FAF8F3] max-w-[210px]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                        Tahfeez & STEM
                      </span>
                    </div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#FAF8F3] leading-snug">
                      Faith, Knowledge & Moral Excellence
                    </h4>
                  </div>
                </div>

                {/* Floating Interactive Stat Pill Badge (Left) */}
                <div className="absolute -left-4 top-1/3 z-30 bg-[#3A0505] text-[#FAF8F3] px-3.5 py-2.5 rounded-xl border border-[#D4AF37] shadow-2xl flex items-center gap-3 transform -translate-y-1/2 transition-transform duration-300 hover:scale-105">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37]">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#D4AF37] leading-none">Quran & Sunnah</div>
                    <div className="text-[10px] text-[#FAF8F3]/80 mt-0.5">Core Foundation</div>
                  </div>
                </div>

                {/* Floating Interactive Stat Pill Badge (Right Bottom) */}
                <div className="absolute -right-3 -bottom-3 z-30 bg-white text-[#3A0505] px-4 py-2.5 rounded-xl border-2 border-[#D4AF37] shadow-2xl flex items-center gap-3 transition-transform duration-300 hover:scale-105">
                  <div className="w-8 h-8 rounded-lg bg-[#650B0B]/10 border border-[#650B0B]/30 flex items-center justify-center text-[#650B0B]">
                    <GraduationCap size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#650B0B] leading-none">Admissions Open</div>
                    <div className="text-[10px] text-[#666666] mt-0.5">Academic Year 2025–26</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </div>
  );
};
