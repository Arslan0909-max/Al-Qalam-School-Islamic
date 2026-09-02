import React from 'react';
import { ArrowRight, BookOpen, GraduationCap, HeartHandshake, ShieldCheck } from 'lucide-react';
import { Container } from '../ui/Container';
import { PrimaryButton, SecondaryButton } from '../ui/Button';
import { AlqalamLogoBadge } from '../ui/GeometricDecoration';
import { ScrollReveal } from '../ui/ScrollReveal';
import { useLanguage } from '../../context/LanguageContext';

export const HeroSection: React.FC = () => {
  const { isUrdu, t } = useLanguage();

  return (
    <div id="home" className="relative overflow-hidden min-h-[640px] lg:min-h-[720px] flex items-center border-b border-[#D4AF37]/30 bg-[#3A0505]">
      {/* 1. RESPONSIVE HERO BANNER BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/school-banner.jpg"
          alt="Alqalam Islamic School Welcome Banner"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center lg:object-right-top scale-105 transform motion-safe:animate-pulse-slow opacity-60 lg:opacity-75 transition-all duration-700"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/hero-campus.jpg';
          }}
        />

        {/* 2. OPTIMIZED MULTI-LAYER LIGHT & CONTRAST MASKS */}
        {/* Soft light editorial overlay for left text column on large screens */}
        <div
          className="hidden lg:block absolute inset-0 pointer-events-none"
          style={{
            background: isUrdu
              ? 'linear-gradient(270deg, rgba(250, 248, 243, 0.97) 0%, rgba(250, 248, 243, 0.94) 42%, rgba(250, 248, 243, 0.75) 60%, rgba(58, 5, 5, 0.45) 85%, rgba(58, 5, 5, 0.7) 100%)'
              : 'linear-gradient(90deg, rgba(250, 248, 243, 0.97) 0%, rgba(250, 248, 243, 0.94) 42%, rgba(250, 248, 243, 0.75) 60%, rgba(58, 5, 5, 0.45) 85%, rgba(58, 5, 5, 0.7) 100%)',
          }}
        />

        {/* Mobile & Tablet Full Backdrop Mask with Liquid Glass Frosting */}
        <div
          className="lg:hidden absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(58, 5, 5, 0.88) 0%, rgba(58, 5, 5, 0.82) 40%, rgba(250, 248, 243, 0.95) 75%, rgba(250, 248, 243, 0.98) 100%)',
          }}
        />

        {/* Top Header Transition Vignette */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#3A0505]/90 via-[#3A0505]/40 to-transparent pointer-events-none" />

        {/* Islamic Subtle Geometric Grid Pattern Texture */}
        <div className="absolute inset-0 bg-islamic-grid opacity-15 pointer-events-none" />

        {/* Ambient Warm Golden Sunbeam Orbs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <Container className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* TEXT COLUMN: Editorial Typography & High-Contrast Visual Elements */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7 text-left">
            
            {/* School Location Kicker */}
            <ScrollReveal direction="down" delay={0}>
              <div className="flex items-center gap-2.5 sm:gap-3 group cursor-default">
                <div className="w-8 sm:w-12 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-16"></div>
                <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-[#D4AF37] lg:text-[#B8860B] font-bold transition-colors duration-300">
                  {t.hero.kicker}
                </span>
              </div>
            </ScrollReveal>

            {/* Main Headline with High Contrast Readability */}
            <ScrollReveal direction="up" delay={30}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl serif leading-[1.12] tracking-tight font-bold text-[#FAF8F3] lg:text-[#3A0505] drop-shadow-sm">
                {t.hero.headlineLine1}{' '}
                <span className="text-[#F2C94C] lg:text-[#650B0B] block sm:inline relative">
                  {t.hero.headlineLine2}
                </span>
              </h1>
            </ScrollReveal>

            {/* Supporting Description */}
            <ScrollReveal direction="up" delay={45}>
              <p className="text-base sm:text-lg lg:text-xl text-[#FAF8F3]/90 lg:text-[#444444] leading-relaxed max-w-xl font-normal drop-shadow-sm lg:drop-shadow-none">
                {t.hero.description}
              </p>
            </ScrollReveal>

            {/* Action Buttons & Admission Badge */}
            <ScrollReveal direction="up" delay={60}>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <PrimaryButton
                  size="lg"
                  asLink
                  href="#admissions"
                  icon={
                    <ArrowRight
                      size={16}
                      className={`transition-transform duration-300 ease-out ${isUrdu ? 'group-hover:-translate-x-1.5 rotate-180' : 'group-hover:translate-x-1.5'}`}
                    />
                  }
                  className="px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-[13px] font-bold uppercase tracking-widest group shadow-[0_8px_25px_rgba(58,5,5,0.4)] hover:shadow-[0_12px_32px_rgba(212,175,55,0.45)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  {t.hero.applyButton}
                </PrimaryButton>

                <SecondaryButton
                  size="lg"
                  asLink
                  href="#about"
                  className="px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-[13px] font-bold uppercase tracking-widest bg-white/90 lg:bg-transparent hover:bg-[#650B0B] hover:text-[#FAF8F3] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border border-[#D4AF37] shadow-sm hover:shadow-[0_8px_24px_rgba(101,11,11,0.3)]"
                >
                  {t.hero.exploreButton}
                </SecondaryButton>
              </div>
            </ScrollReveal>

            {/* Trust Badges Strip (Optimized for both light and dark backgrounds) */}
            <ScrollReveal direction="up" delay={75}>
              <div className="pt-5 border-t border-white/20 lg:border-[#650B0B]/15 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
                <div className="flex items-center gap-2 sm:gap-3 group cursor-default transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-[#FAF8F3]/10 lg:bg-[#3A0505]/5 border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] lg:text-[#650B0B] shrink-0 group-hover:bg-[#650B0B] group-hover:text-[#D4AF37] transition-all duration-300 shadow-sm">
                    <ShieldCheck size={17} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#FAF8F3] lg:text-[#3A0505] leading-tight">
                      {t.hero.badgeIslamic}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-[#FAF8F3]/75 lg:text-[#666666]">
                      {t.hero.badgeIslamicSub}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 group cursor-default transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-[#FAF8F3]/10 lg:bg-[#3A0505]/5 border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] lg:text-[#650B0B] shrink-0 group-hover:bg-[#650B0B] group-hover:text-[#D4AF37] transition-all duration-300 shadow-sm">
                    <GraduationCap size={17} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#FAF8F3] lg:text-[#3A0505] leading-tight">
                      {t.hero.badgeQuality}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-[#FAF8F3]/75 lg:text-[#666666]">
                      {t.hero.badgeQualitySub}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 group cursor-default transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-[#FAF8F3]/10 lg:bg-[#3A0505]/5 border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] lg:text-[#650B0B] shrink-0 group-hover:bg-[#650B0B] group-hover:text-[#D4AF37] transition-all duration-300 shadow-sm">
                    <HeartHandshake size={17} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#FAF8F3] lg:text-[#3A0505] leading-tight">
                      {t.hero.badgeCharacter}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-[#FAF8F3]/75 lg:text-[#666666]">
                      {t.hero.badgeCharacterSub}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN: Redesigned Islamic Arch Hero Window */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <ScrollReveal direction="zoom" delay={100} duration={650}>
              {/* Ambient Gold Glow & Geometric Backing */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#D4AF37]/30 to-[#650B0B]/20 rounded-3xl blur-2xl pointer-events-none" />
              
              {/* Islamic Star Floating Geometric Halo */}
              <div
                className="absolute -top-8 -right-8 w-44 h-44 bg-[#D4AF37]/20 pointer-events-none rotate-12 transition-transform duration-1000 hover:rotate-45"
                style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
              />

              {/* Main Arch Frame Container */}
              <div className="relative w-full max-w-md lg:max-w-none bg-gradient-to-b from-[#FAF8F3] via-white to-[#FAF8F3] p-3 sm:p-4 rounded-t-[140px] rounded-b-2xl shadow-2xl border-2 border-[#D4AF37]/70 group transition-all duration-500 hover:border-[#D4AF37] hover:shadow-[0_25px_50px_-12px_rgba(58,5,5,0.35)]">
                {/* Inner Arch Window */}
                <div className="w-full relative overflow-hidden bg-[#3A0505] rounded-t-[125px] rounded-b-xl aspect-[4/5] shadow-inner">
                  {/* Hero Campus & Welcome Poster Visual */}
                  <img
                    src="/hero-campus.jpg"
                    alt="Al-Qalam Islamic School Campus & Students"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/classroom.jpg';
                    }}
                  />

                  {/* Islamic Multi-stop Color Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A0505] via-[#3A0505]/35 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#3A0505]/50 via-transparent to-transparent pointer-events-none" />

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
                    <div className="p-2 rounded-xl bg-[#3A0505]/95 backdrop-blur-md border border-[#D4AF37] shadow-xl">
                      <AlqalamLogoBadge size="md" showText={false} variant="dark-bg" />
                    </div>
                  </div>

                  {/* Bottom Value Inscription */}
                  <div className="absolute bottom-4 left-4 z-20 text-[#FAF8F3] max-w-[210px]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                        Tahfeez & Cambridge
                      </span>
                    </div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#FAF8F3] leading-snug">
                      {isUrdu ? 'تعلیم، تربیت اور سنتِ نبویؐ' : 'Faith, Knowledge & Moral Excellence'}
                    </h4>
                  </div>
                </div>

                {/* Floating Interactive Stat Pill Badge (Left) */}
                <div className="absolute -left-3 sm:-left-5 top-1/3 z-30 bg-[#3A0505] text-[#FAF8F3] px-3.5 py-2.5 rounded-xl border border-[#D4AF37] shadow-2xl flex items-center gap-3 transform -translate-y-1/2 transition-transform duration-300 hover:scale-105">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37]">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#D4AF37] leading-none">{t.hero.floatingHifz}</div>
                    <div className="text-[10px] text-[#FAF8F3]/80 mt-0.5">{t.hero.floatingHifzSub}</div>
                  </div>
                </div>

                {/* Floating Interactive Stat Pill Badge (Right Bottom) */}
                <div className="absolute -right-2 sm:-right-4 -bottom-3 z-30 bg-white text-[#3A0505] px-4 py-2.5 rounded-xl border-2 border-[#D4AF37] shadow-2xl flex items-center gap-3 transition-transform duration-300 hover:scale-105">
                  <div className="w-8 h-8 rounded-lg bg-[#650B0B]/10 border border-[#650B0B]/30 flex items-center justify-center text-[#650B0B]">
                    <GraduationCap size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#650B0B] leading-none">{t.hero.floatingAdmissions}</div>
                    <div className="text-[10px] text-[#666666] mt-0.5">{t.hero.floatingAdmissionsGrade}</div>
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
