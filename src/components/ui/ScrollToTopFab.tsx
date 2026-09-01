import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { IslamicStar } from './GeometricDecoration';

export const ScrollToTopFab: React.FC = () => {
  const [showFab, setShowFab] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;

          setScrollProgress(Math.min(100, Math.max(0, progress)));
          setShowFab(currentScrollY > 320);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-40 transition-all duration-500"
      style={{
        opacity: showFab ? 1 : 0,
        transform: showFab ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.8)',
        pointerEvents: showFab ? 'auto' : 'none',
        transitionTimingFunction: 'cubic-bezier(0.34, 1.6, 0.64, 1)',
      }}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#3A0505] text-[#D4AF37] border border-[#D4AF37]/50 shadow-[0_8px_24px_rgba(0,0,0,0.35),0_0_12px_rgba(212,175,55,0.25)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-lg"
      >
        {/* Circular SVG Scroll Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r="21"
            fill="none"
            stroke="rgba(212, 175, 55, 0.2)"
            strokeWidth="2"
          />
          <circle
            cx="24"
            cy="24"
            r="21"
            fill="none"
            stroke="url(#fabGoldGradient)"
            strokeWidth="2.5"
            strokeDasharray={132}
            strokeDashoffset={132 - (132 * scrollProgress) / 100}
            strokeLinecap="round"
            className="transition-all duration-150 ease-out"
          />
          <defs>
            <linearGradient id="fabGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F2C94C" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Arrow Icon with Hover Bounce */}
        <ArrowUp
          size={18}
          className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
        />

        {/* Ambient Tiny Sparkle Glow */}
        <div className="absolute -inset-1 rounded-full bg-[#D4AF37]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </button>
    </div>
  );
};
