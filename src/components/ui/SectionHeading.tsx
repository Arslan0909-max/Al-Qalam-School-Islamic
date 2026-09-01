import React from 'react';
import { GoldDivider, IslamicStar } from './GeometricDecoration';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
  withDivider?: boolean;
  withStarIcon?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
  className = '',
  withDivider = true,
  withStarIcon = false,
}) => {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col mb-10 md:mb-14 ${alignClasses[align]} ${className}`}>
      {/* Optional Top Kicker / Badge */}
      {kicker && (
        <div className="inline-flex items-center gap-2.5 mb-3">
          <div className="w-8 h-[1px] bg-[#D4AF37]"></div>
          <span
            className={`text-[12px] font-semibold uppercase tracking-[0.25em] ${
              isDark ? 'text-[#D4AF37]' : 'text-[#D4AF37]'
            }`}
          >
            {kicker}
          </span>
          <div className="w-8 h-[1px] bg-[#D4AF37]"></div>
        </div>
      )}

      {/* Main Editorial Heading */}
      <h2
        className={`serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] ${
          isDark ? 'text-[#FAF8F3]' : 'text-[#650B0B]'
        }`}
      >
        {withStarIcon && <IslamicStar size={20} className="inline-block mr-2.5 mb-1.5" />}
        {title}
      </h2>

      {/* Decorative Gold Geometric Divider Line */}
      {withDivider && (
        <div className={`w-full ${align === 'center' ? 'mx-auto' : ''}`}>
          <GoldDivider
            variant={isDark ? 'light' : 'gold'}
            className={align === 'left' ? '!mx-0 justify-start' : align === 'right' ? '!mx-0 !ml-auto' : ''}
            maxWidth="max-w-xs"
          />
        </div>
      )}

      {/* Subtitle / Descriptive Copy */}
      {subtitle && (
        <p
          className={`mt-2 text-base md:text-lg max-w-2xl font-normal leading-relaxed ${
            isDark ? 'text-[#FAF8F3]/80' : 'text-[#666666]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
