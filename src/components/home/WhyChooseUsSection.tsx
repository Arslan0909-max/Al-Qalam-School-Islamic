import React from 'react';
import { Compass, BookMarked, Shield, HeartHandshake } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { IslamicStar } from '../ui/GeometricDecoration';
import { ScrollReveal } from '../ui/ScrollReveal';
import { WHY_CHOOSE_US_PILLARS } from '../../constants/siteData';

export const WhyChooseUsSection: React.FC = () => {
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
    <Section id="facilities" bg="maroon" withPattern={true} padding="normal">
      <Container>
        {/* Section Heading */}
        <ScrollReveal direction="up" delay={0}>
          <SectionHeading
            kicker="The Alqalam Advantage"
            title="Why Choose Us?"
            subtitle="A nurturing sanctuary where children build lifelong iman, razor-sharp intellect, and compassionate character."
            align="center"
            theme="dark"
          />
        </ScrollReveal>

        {/* 4 Pillars Grid with Staggered Entrance & Dark Card Depth Hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {WHY_CHOOSE_US_PILLARS.map((pillar, idx) => (
            <ScrollReveal key={pillar.id} direction="up" delay={idx * 60} duration={550}>
              <div
                className="bg-[#650B0B]/50 border border-[#D4AF37]/30 rounded-sm p-6 sm:p-7 text-center backdrop-blur-sm dark-card-depth-hover group flex flex-col items-center h-full"
              >
                {/* Circular Gold Icon with intricate border */}
                <div className="w-14 h-14 rounded-sm border border-[#D4AF37]/60 bg-[#3A0505] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-[#F2C94C] transition-all duration-300 shadow-md">
                  {getPillarIcon(pillar.id)}
                </div>

                {/* Title */}
                <h3 className="serif text-xl sm:text-2xl font-bold text-[#FAF8F3] mb-3 group-hover:text-[#D4AF37] transition-colors leading-snug">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#FAF8F3]/80 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
};
