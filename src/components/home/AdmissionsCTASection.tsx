import React from 'react';
import { Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { IslamicStar, CornerOrnament } from '../ui/GeometricDecoration';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SITE_CONFIG } from '../../constants/siteData';
import { useLanguage } from '../../context/LanguageContext';

export const AdmissionsCTASection: React.FC = () => {
  const { isUrdu, t } = useLanguage();

  return (
    <Section id="admissions" bg="ivory" withPattern={true} padding="normal">
      <Container>
        <ScrollReveal direction="zoom" delay={0} duration={600}>
          <div className="relative bg-gradient-to-br from-[#3A0505] via-[#650B0B] to-[#3A0505] text-[#FAF8F3] rounded-sm p-8 sm:p-12 lg:p-14 border border-[#D4AF37] shadow-2xl overflow-hidden group hover:border-[#F2C94C] transition-colors duration-500">
            {/* Corner Ornaments */}
            <CornerOrnament position="top-left" color="#D4AF37" className="top-2 left-2 opacity-80 group-hover:opacity-100 transition-opacity" />
            <CornerOrnament position="top-right" color="#D4AF37" className="top-2 right-2 opacity-80 group-hover:opacity-100 transition-opacity" />
            <CornerOrnament position="bottom-left" color="#D4AF37" className="bottom-2 left-2 opacity-80 group-hover:opacity-100 transition-opacity" />
            <CornerOrnament position="bottom-right" color="#D4AF37" className="bottom-2 right-2 opacity-80 group-hover:opacity-100 transition-opacity" />

            {/* Background Islamic Star Watermark with slow subtle breathing */}
            <div className="absolute -right-16 -bottom-16 opacity-10 pointer-events-none transition-transform duration-1000 group-hover:scale-105 group-hover:rotate-12">
              <IslamicStar size={340} color="#D4AF37" fill="#D4AF37" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Content */}
              <div className="lg:col-span-8 space-y-5 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-[1px] bg-[#D4AF37]"></div>
                  <span className="text-[12px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                    {t.admissionsCTA.kicker}
                  </span>
                </div>

                <h2 className="serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#FAF8F3]">
                  {t.admissionsCTA.titleLine1}
                  <br />
                  <span className="text-[#D4AF37] text-soft-glow inline-block">{t.admissionsCTA.titleLine2}</span>
                </h2>

                <p className="text-base sm:text-lg text-[#FAF8F3]/85 max-w-2xl leading-relaxed">
                  {t.admissionsCTA.description}
                </p>

                {/* Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-sm text-[#FAF8F3]/90 transition-transform duration-300 hover:translate-x-1.5 cursor-default">
                    <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0" />
                    <span>{t.admissionsCTA.check1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#FAF8F3]/90 transition-transform duration-300 hover:translate-x-1.5 cursor-default">
                    <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0" />
                    <span>{t.admissionsCTA.check2}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#FAF8F3]/90 transition-transform duration-300 hover:translate-x-1.5 cursor-default">
                    <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0" />
                    <span>{t.admissionsCTA.check3}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#FAF8F3]/90 transition-transform duration-300 hover:translate-x-1.5 cursor-default">
                    <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0" />
                    <span>{t.admissionsCTA.check4}</span>
                  </div>
                </div>
              </div>

              {/* Right Action Box */}
              <div className="lg:col-span-4 flex flex-col gap-3.5 sm:flex-row lg:flex-col justify-center">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-sm bg-[#D4AF37] text-[#3A0505] font-bold text-xs uppercase tracking-widest hover:bg-[#F2C94C] hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-black/20 group select-none text-center"
                >
                  <Phone size={16} className="transition-transform duration-300 group-hover:rotate-12" />
                  <span>{isUrdu ? `کال کریں: ${SITE_CONFIG.phone}` : t.admissionsCTA.callButton}</span>
                </a>

                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm border border-[#FAF8F3]/60 text-[#FAF8F3] font-semibold text-xs uppercase tracking-widest hover:bg-white/10 hover:border-[#D4AF37] hover:scale-[1.02] active:scale-95 transition-all duration-300 select-none text-center group"
                >
                  <span>{t.admissionsCTA.visitButton}</span>
                  <ArrowRight
                    size={14}
                    className={`transition-transform duration-300 ${isUrdu ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`}
                  />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
};
