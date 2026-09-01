import React from 'react';
import { BookOpen, GraduationCap, Scroll, UsersRound, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { IslamicStar } from '../ui/GeometricDecoration';
import { ScrollReveal } from '../ui/ScrollReveal';
import { CORE_PROGRAMS } from '../../constants/siteData';

export const ProgramsSection: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'hifz-program':
        return <BookOpen size={30} className="text-[#650B0B]" />;
      case 'academic-education':
        return <GraduationCap size={30} className="text-[#650B0B]" />;
      case 'islamiat-studies':
        return <Scroll size={30} className="text-[#650B0B]" />;
      case 'character-building':
        return <UsersRound size={30} className="text-[#650B0B]" />;
      default:
        return <BookOpen size={30} className="text-[#650B0B]" />;
    }
  };

  return (
    <Section id="programs" bg="ivory" withPattern={true} padding="normal">
      <Container>
        {/* Section Heading with ScrollReveal */}
        <ScrollReveal direction="up" delay={0}>
          <SectionHeading
            kicker="Academic & Spiritual Path"
            title="Our Programs"
            subtitle="Integrated educational tracks combining Quranic excellence, Islamic character, and contemporary national academic curricula."
            align="center"
            theme="light"
          />
        </ScrollReveal>

        {/* 4 Cards Grid with Staggered Soft Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {CORE_PROGRAMS.map((prog, idx) => (
            <ScrollReveal key={prog.id} direction="up" delay={idx * 60} duration={550}>
              <div
                className="bg-white rounded-sm p-7 border border-[#D4AF37]/30 card-depth-hover flex flex-col justify-between text-center group relative overflow-hidden h-full shadow-sm"
              >
                {/* Subtle top gold accent bar */}
                <div className="absolute top-0 inset-x-0 h-1 bg-[#650B0B] group-hover:bg-[#D4AF37] transition-all duration-300" />

                <div>
                  {/* Icon Container with soft scale */}
                  <div className="w-14 h-14 mx-auto mb-5 rounded-sm bg-[#650B0B]/5 border border-[#650B0B]/15 flex items-center justify-center group-hover:bg-[#650B0B] group-hover:border-[#650B0B] transition-all duration-300 shadow-sm">
                    <span className="transition-transform duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert">
                      {getIcon(prog.id)}
                    </span>
                  </div>

                  {/* Badge */}
                  {prog.badge && (
                    <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-[#650B0B] bg-[#650B0B]/5 px-2.5 py-0.5 rounded-sm mb-3 border border-[#650B0B]/10 group-hover:border-[#D4AF37]/40 transition-colors">
                      {prog.badge}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="serif text-xl sm:text-2xl font-bold text-[#3A0505] mb-3 group-hover:text-[#650B0B] transition-colors leading-snug">
                    {prog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#666666] leading-relaxed mb-6 font-normal">
                    {prog.description}
                  </p>
                </div>

                {/* Features Pill list */}
                {prog.features && (
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5 justify-center">
                    {prog.features.map((feature, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[11px] bg-[#FAF8F3] text-[#3A0505] px-2.5 py-1 rounded-sm border border-[#D4AF37]/20 font-medium transition-colors hover:bg-white hover:border-[#D4AF37]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Curriculum note */}
        <ScrollReveal direction="up" delay={500}>
          <div className="mt-12 text-center">
            <p className="text-sm text-[#666666] flex items-center justify-center gap-2">
              <IslamicStar size={12} color="#D4AF37" fill="#D4AF37" />
              <span>Comprehensive syllabus designed according to modern pedagogical standards and Sunnah ethics.</span>
              <IslamicStar size={12} color="#D4AF37" fill="#D4AF37" />
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
};
