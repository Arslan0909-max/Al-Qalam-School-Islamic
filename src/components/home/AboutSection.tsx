import React from 'react';
import { Users, UserCheck, Award, Sparkles, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { CornerOrnament } from '../ui/GeometricDecoration';
import { ScrollReveal } from '../ui/ScrollReveal';
import { ABOUT_METRICS } from '../../constants/siteData';

export const AboutSection: React.FC = () => {
  return (
    <Section id="about" bg="maroon" withPattern={true} padding="normal">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Mission, Vision, and Intro */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <ScrollReveal direction="down" delay={0}>
              <div className="flex items-center gap-3 group cursor-default">
                <div className="w-10 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-14"></div>
                <span className="text-[12px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                  About Our Institution
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={20}>
              <h2 className="serif text-4xl sm:text-5xl font-bold text-[#FAF8F3] leading-[1.15]">
                About Alqalam
                <br />
                <span className="text-[#D4AF37] text-soft-glow inline-block">Islamic School</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={30}>
              <div className="w-16 h-[2px] bg-[#D4AF37]" />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={40}>
              <p className="text-base sm:text-lg text-[#FAF8F3]/90 leading-relaxed font-normal">
                We aim to develop students academically, spiritually and socially in an authentic Islamic environment. Our vision is to raise righteous individuals who excel in modern academics while contributing positively to society.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={50}>
              <p className="text-sm text-[#FAF8F3]/75 leading-relaxed">
                Founded on the principles of Quranic guidance and contemporary pedagogies, our institution fosters an atmosphere where curiosity, moral discipline, and intellectual rigor flourish together.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={60}>
              <div className="pt-2">
                <Button
                  variant="gold"
                  size="md"
                  asLink
                  href="#programs"
                  icon={<ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />}
                  className="shadow-lg shadow-black/30 font-semibold uppercase tracking-widest text-[12px] px-8 py-3.5 rounded-sm hover:scale-[1.03] active:scale-95 transition-all duration-300 group"
                >
                  Explore Programs
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 4 Key Metric Cards with staggered soft depth */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
              {ABOUT_METRICS.map((metric, idx) => (
                <ScrollReveal key={metric.id} direction="up" delay={idx * 35} duration={320}>
                  <div
                    className="relative bg-[#650B0B]/60 border border-[#D4AF37]/35 rounded-sm p-6 sm:p-7 text-center backdrop-blur-sm dark-card-depth-hover group"
                  >
                    <CornerOrnament position="top-right" color="#D4AF37" className="top-1 right-1 opacity-40 group-hover:opacity-100 transition-opacity" />

                    {/* Circular Gold Icon */}
                    <div className="w-14 h-14 mx-auto mb-4 rounded-sm border border-[#D4AF37]/60 bg-[#3A0505] flex items-center justify-center text-[#D4AF37] group-hover:scale-110 group-hover:border-[#F2C94C] transition-all duration-300 shadow-inner">
                      {metric.id === 'students' && <Users size={24} />}
                      {metric.id === 'staff' && <UserCheck size={24} />}
                      {metric.id === 'excellence' && <Award size={24} />}
                      {metric.id === 'environment' && <Sparkles size={24} />}
                    </div>

                    {/* Value */}
                    <div className="serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FAF8F3] tracking-tight mb-1 group-hover:text-[#D4AF37] transition-colors">
                      {metric.value}
                    </div>

                    {/* Label */}
                    <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
                      {metric.label}
                    </div>

                    {/* Short Description */}
                    {metric.description && (
                      <p className="text-xs text-[#FAF8F3]/70 leading-snug">
                        {metric.description}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
