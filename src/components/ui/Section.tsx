import React from 'react';

export type SectionBg = 'ivory' | 'warm-cream' | 'maroon' | 'burgundy' | 'white';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  bg?: SectionBg;
  className?: string;
  withPattern?: boolean;
  patternOpacity?: 'light' | 'medium' | 'subtle';
  padding?: 'normal' | 'large' | 'compact' | 'none';
}

export const Section: React.FC<SectionProps> = ({
  id,
  children,
  bg = 'ivory',
  className = '',
  withPattern = false,
  patternOpacity = 'subtle',
  padding = 'normal',
}) => {
  const bgClasses: Record<SectionBg, string> = {
    ivory: 'bg-[#FAF8F3] text-[#171717]',
    'warm-cream': 'bg-[#F3EFE7] text-[#171717]',
    maroon: 'bg-[#3A0505] text-[#FAF8F3]',
    burgundy: 'bg-[#650B0B] text-[#FAF8F3]',
    white: 'bg-[#FFFFFF] text-[#171717]',
  };

  const paddingClasses = {
    none: '',
    compact: 'py-10 md:py-14',
    normal: 'py-16 md:py-24',
    large: 'py-20 md:py-32',
  };

  const opacityClass = {
    subtle: 'opacity-40',
    light: 'opacity-60',
    medium: 'opacity-80',
  }[patternOpacity];

  return (
    <section
      id={id}
      className={`relative overflow-hidden transition-colors duration-300 ${bgClasses[bg]} ${paddingClasses[padding]} ${className}`}
    >
      {withPattern && (
        <div
          className={`absolute inset-0 pointer-events-none ${
            bg === 'maroon' || bg === 'burgundy' ? 'bg-islamic-dark-grid' : 'bg-islamic-grid'
          } ${opacityClass}`}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
};
