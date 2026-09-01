import React from 'react';
import { Award, BookOpen, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { IslamicStar } from '../ui/GeometricDecoration';

export const TrustStrip: React.FC = () => {
  const highlights = [
    { text: 'Spiritual Growth' },
    { text: 'Academic Rigor' },
    { text: 'Quranic Tahfeez' },
    { text: 'Global Citizenship' },
  ];

  return (
    <div className="w-full bg-[#650B0B] text-white py-5 px-6 sm:px-12 flex flex-wrap justify-between items-center border-t border-[#D4AF37]/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-islamic-dark-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-wrap justify-between items-center gap-6 relative z-10">
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 opacity-90">
          {highlights.map((item, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full shrink-0" />
              <span className="text-[11px] sm:text-[12px] uppercase tracking-widest font-medium">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* 3 Gold Stars Accent */}
        <div className="hidden sm:flex items-center gap-1.5 opacity-60">
          <IslamicStar size={16} color="#D4AF37" fill="#D4AF37" />
          <IslamicStar size={16} color="#D4AF37" fill="#D4AF37" />
          <IslamicStar size={16} color="#D4AF37" fill="#D4AF37" />
        </div>
      </div>
    </div>
  );
};
