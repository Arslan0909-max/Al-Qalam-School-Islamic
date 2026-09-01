import React from 'react';
import { IslamicStar } from '../ui/GeometricDecoration';
import { ScrollReveal } from '../ui/ScrollReveal';
import { useLanguage } from '../../context/LanguageContext';

export const TrustStrip: React.FC = () => {
  const { t } = useLanguage();

  const highlights = [
    { text: t.trustStrip.spiritualGrowth },
    { text: t.trustStrip.academicRigor },
    { text: t.trustStrip.quranicTahfeez },
    { text: t.trustStrip.globalCitizenship },
  ];

  return (
    <div className="w-full bg-[#650B0B] text-white py-5 px-6 sm:px-12 flex flex-wrap justify-between items-center border-t border-[#D4AF37]/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-islamic-dark-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-wrap justify-between items-center gap-6 relative z-10">
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 opacity-90">
          {highlights.map((item, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 40} duration={400}>
              <div className="flex items-center gap-2.5 group cursor-default transition-transform duration-300 hover:translate-x-1">
                <span className="w-2 h-2 bg-[#D4AF37] rounded-full shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-[11px] sm:text-[12px] uppercase tracking-widest font-medium group-hover:text-[#F2C94C] transition-colors">
                  {item.text}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* 3 Gold Stars Accent with Soft Zoom Animation */}
        <ScrollReveal direction="zoom" delay={150}>
          <div className="hidden sm:flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
            <IslamicStar size={16} color="#D4AF37" fill="#D4AF37" />
            <IslamicStar size={16} color="#D4AF37" fill="#D4AF37" />
            <IslamicStar size={16} color="#D4AF37" fill="#D4AF37" />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
