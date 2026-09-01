import React from 'react';
import schoolLogoImg from '../../assets/images/logo.png';

// 8-Pointed Islamic Star (Rub el Hizb / Khatam)
interface StarProps {
  size?: number;
  className?: string;
  color?: string;
  fill?: string;
}

export const IslamicStar: React.FC<StarProps> = ({
  size = 24,
  className = '',
  color = '#D4AF37',
  fill = 'none',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill={fill}
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Outer 8-pointed star formed by 2 rotated squares */}
      <rect x="20" y="20" width="60" height="60" rx="2" />
      <rect
        x="20"
        y="20"
        width="60"
        height="60"
        rx="2"
        transform="rotate(45 50 50)"
      />
      <circle cx="50" cy="50" r="10" stroke={color} strokeWidth="3" fill={color} fillOpacity="0.2" />
    </svg>
  );
};

// Subtle Decorative Gold Divider with Center 8-pointed Diamond Motif (as in posters)
interface DividerProps {
  variant?: 'light' | 'dark' | 'gold';
  className?: string;
  maxWidth?: string;
}

export const GoldDivider: React.FC<DividerProps> = ({
  variant = 'gold',
  className = '',
  maxWidth = 'max-w-xs',
}) => {
  const lineColors = {
    gold: 'bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent',
    light: 'bg-gradient-to-r from-transparent via-[#FAF8F3]/40 to-transparent',
    dark: 'bg-gradient-to-r from-transparent via-[#650B0B]/40 to-transparent',
  };

  const starColor = variant === 'light' ? '#FAF8F3' : '#D4AF37';

  return (
    <div className={`flex items-center justify-center gap-3 w-full mx-auto my-3 ${maxWidth} ${className}`}>
      <div className={`h-[1px] flex-1 ${lineColors[variant]}`} />
      <div className="flex items-center gap-1">
        <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
        <IslamicStar size={14} color={starColor} fill={starColor} />
        <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
      </div>
      <div className={`h-[1px] flex-1 ${lineColors[variant]}`} />
    </div>
  );
};

// Corner Ornament for Luxury Cards & Banners
export const CornerOrnament: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  color?: string;
}> = ({ position = 'top-left', className = '', color = '#D4AF37' }) => {
  const rotationClasses = {
    'top-left': '',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  };

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 40 40"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      className={`absolute opacity-60 ${rotationClasses[position]} ${className}`}
      aria-hidden="true"
    >
      <path d="M2 38 V 10 C 2 5.58 5.58 2 10 2 H 38" />
      <path d="M8 38 V 14 C 8 10.68 10.68 8 14 8 H 38" strokeDasharray="2 2" opacity="0.6" />
      <circle cx="14" cy="14" r="2.5" fill={color} />
    </svg>
  );
};

// Mosque & Minaret Skyline Silhouette for Footer
export const MosqueSkyline: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-10 md:h-14 opacity-25"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60 H1200 V48 C1150 48 1145 42 1140 42 C1135 42 1130 30 1125 30 C1120 30 1115 42 1110 42 C1105 42 1080 48 1050 48 C1020 48 1010 38 1000 38 C990 38 980 15 975 15 C970 15 960 38 950 38 C940 38 910 48 880 48 C850 48 840 25 835 25 C830 25 820 48 800 48 C780 48 770 35 760 35 C750 35 745 5 740 5 C735 5 730 35 720 35 C710 35 680 48 650 48 C620 48 610 32 600 32 C590 32 580 8 575 8 C570 8 560 32 550 32 C540 32 510 48 480 48 C450 48 440 25 435 25 C430 25 420 48 400 48 C380 48 370 35 360 35 C350 35 345 5 340 5 C335 5 330 35 320 35 C310 35 280 48 250 48 C220 48 210 38 200 38 C190 38 180 15 175 15 C170 15 160 38 150 38 C140 38 110 48 80 48 C50 48 45 42 40 42 C35 42 30 30 25 30 C20 30 15 42 10 42 C5 42 0 48 0 48 V60 Z"
          fill="#FAF8F3"
        />
      </svg>
    </div>
  );
};

// Authentic Alqalam School Logo Badge utilizing the official uploaded logo
export const AlqalamLogoBadge: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  badgeSize?: number;
  showText?: boolean;
  tuckText?: boolean;
  className?: string;
  variant?: 'light-bg' | 'dark-bg';
}> = ({ size = 'md', badgeSize, showText = true, tuckText = false, className = '', variant = 'light-bg' }) => {
  const sizeMap = {
    sm: { badge: 48, title: 'text-base', sub: 'text-[10px]' },
    md: { badge: 64, title: 'text-lg', sub: 'text-[11px]' },
    lg: { badge: 88, title: 'text-2xl', sub: 'text-xs' },
    xl: { badge: 128, title: 'text-3xl', sub: 'text-sm' },
    custom: { badge: badgeSize || 80, title: 'text-xl md:text-2xl', sub: 'text-[11px] md:text-xs' },
  };

  const config = sizeMap[size];
  const actualBadgeWidth = badgeSize || config.badge;

  return (
    <div className={`inline-flex items-center gap-3.5 select-none relative ${className}`}>
      {/* 8-Pointed Star Official Logo Badge (Foreground layer so text folds behind it) */}
      <div
        className="relative z-20 shrink-0 flex items-center justify-center filter drop-shadow-md transition-transform duration-300 hover:scale-105"
        style={{ width: actualBadgeWidth, height: actualBadgeWidth }}
      >
        <img
          src={schoolLogoImg || "/logo.png"}
          alt="Alqalam Islamic School Logo"
          className="w-full h-full object-contain filter drop-shadow-sm select-none"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== '/logo.png') {
              target.src = '/logo.png';
            }
          }}
        />
      </div>

      {/* Brand Text representation (Folds softly and bounces behind the logo badge on scroll) */}
      {showText && (
        <div
          className={`flex flex-col relative z-10 whitespace-nowrap transition-all duration-500 origin-left ${
            tuckText
              ? '-translate-x-[45px] opacity-0 scale-90 max-w-0 pointer-events-none -ml-2'
              : 'translate-x-0 opacity-100 scale-100 max-w-[240px]'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.34, 1.45, 0.64, 1)',
            transitionDelay: tuckText ? '0ms' : '120ms',
          }}
        >
          <span
            className={`font-serif font-bold tracking-wider leading-none transition-all duration-300 ${config.title} ${
              variant === 'dark-bg' ? 'text-[#FAF8F3]' : 'text-[#3A0505]'
            }`}
          >
            Al-Qalam
          </span>
          <span
            className={`font-sans tracking-[0.24em] uppercase font-semibold text-[10px] md:text-[11px] leading-tight mt-1 transition-all duration-300 ${
              variant === 'dark-bg' ? 'text-[#D4AF37]' : 'text-[#650B0B]'
            }`}
          >
            Islamic School
          </span>
        </div>
      )}
    </div>
  );
};
