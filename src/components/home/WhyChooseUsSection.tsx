import React from 'react';
import { Compass, BookMarked, Shield, HeartHandshake } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { IslamicStar } from '../ui/GeometricDecoration';
import { ScrollReveal } from '../ui/ScrollReveal';
import { useLanguage } from '../../context/LanguageContext';

export const WhyChooseUsSection: React.FC = () => {
  const { t } = useLanguage();

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'values':
        return <Compass size={26} className="text-[#D4AF37]" />;
      case 'faculty':
        return <BookMarked size={26} className="text-[#D4AF37]" />;
      case 'safety':
        return <Shield size={26} className="text-[#D4AF37]" />;
      case 'holistic':
        return <HeartHandshake size={26} className="text-[#D4AF37]" />;
      default:
        return <IslamicStar size={26} color="#D4AF37" fill="#D4AF37" />;
    }
  };

  return (
    <Section id="why-us" bg="maroon" withPattern={true} padding="normal">
      <Container>
        {/* Section Heading */}
        <ScrollReveal direction="up" delay={0}>
          <SectionHeading
            kicker={t.whyChooseUs.kicker}
            title={t.whyChooseUs.title}
            subtitle={t.whyChooseUs.subtitle}
            align="center"
            theme="dark"
          />
        </ScrollReveal>

        {/* 4 Pillars Grid with Staggered Entrance & Gentle Gold Border Glow Hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {t.whyChooseUs.pillars.map((pillar, idx) => (
            <ScrollReveal key={pillar.id} direction="up" delay={idx * 75} duration={600} easing="spring">
              <div
                className="relative bg-[#650B0B]/55 border border-[#D4AF37]/35 rounded-xl p-6 sm:p-7 text-center backdrop-blur-md gold-border-glow group flex flex-col items-center justify-between h-full cursor-pointer overflow-hidden active:scale-[0.98] transition-all duration-300"
              >
                {/* Top Subtle Specular Light Edge */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Gentle Gold Ambient Light Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/15 via-transparent to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                {/* Subtle Islamic Corner Light Reflections */}
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#D4AF37]/40 group-hover:border-[#F2C94C] transition-colors duration-300 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#D4AF37]/40 group-hover:border-[#F2C94C] transition-colors duration-300 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center w-full">
                  {/* Circular Gold Icon with gentle backlight glow */}
                  <div className="relative mb-5">
                    <div className="w-14 h-14 rounded-xl border border-[#D4AF37]/60 bg-[#3A0505]/90 flex items-center justify-center group-hover:scale-110 group-hover:border-[#F2C94C] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] transition-all duration-300 shadow-md">
                      {getPillarIcon(pillar.id)}
                    </div>
                    {/* Ambient glow behind icon */}
                    <div className="absolute -inset-1 bg-[#D4AF37]/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Title */}
                  <h3 className="serif text-xl sm:text-2xl font-bold text-[#FAF8F3] mb-3 group-hover:text-[#F2C94C] group-hover:drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)] transition-all duration-300 leading-snug">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#FAF8F3]/85 leading-relaxed font-normal group-hover:text-[#FAF8F3] transition-colors duration-300">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom subtle indicator line */}
                <div className="relative z-10 w-10 h-[1.5px] bg-[#D4AF37]/30 group-hover:w-16 group-hover:bg-[#F2C94C] mt-6 transition-all duration-300 rounded-full" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
};
