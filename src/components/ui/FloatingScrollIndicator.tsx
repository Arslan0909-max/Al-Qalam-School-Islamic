import React, { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FloatingScrollIndicator: React.FC = () => {
  const { isUrdu } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          
          if (totalHeight > 0) {
            const progress = (currentY / totalHeight) * 100;
            setScrollProgress(Math.min(100, Math.max(0, progress)));
          }

          if (currentY > lastY + 5) {
            setScrollDirection('down');
          } else if (currentY < lastY - 5) {
            setScrollDirection('up');
          }

          setIsVisible(currentY > 240);
          setLastY(currentY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const isNearBottom = scrollProgress > 88;

  // Calculate SVG circular stroke
  const size = 46;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-5 sm:bottom-7 ${
        isUrdu ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
      } z-40 transition-all duration-400 ease-out pointer-events-auto ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={isUrdu ? 'اوپر جائیں' : 'Scroll to top'}
        title={isUrdu ? 'اوپر جائیں' : 'Scroll to top'}
        className="relative group flex items-center justify-center w-[46px] h-[46px] rounded-full bg-[#3A0505]/90 hover:bg-[#650B0B] backdrop-blur-xl border border-[#D4AF37]/50 shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(212,175,55,0.25)] hover:shadow-[0_12px_32px_rgba(212,175,55,0.55),0_0_20px_rgba(255,255,255,0.3)] hover:scale-110 active:scale-[0.93] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
      >
        {/* SVG Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Gold Progress Indicator */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#goldGradient)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 90ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F2C94C" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#FAF8F3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Dynamic Arrow */}
        <div className="relative z-10 text-[#FAF8F3] group-hover:text-[#F2C94C] transition-colors">
          <ArrowUp
            size={18}
            className={`transition-transform duration-300 ${
              scrollDirection === 'down' && !isNearBottom
                ? 'translate-y-0.5'
                : '-translate-y-0.5 group-hover:-translate-y-1'
            }`}
          />
        </div>

        {/* Pulse glow when near bottom */}
        {isNearBottom && (
          <span className="absolute -inset-1 rounded-full bg-[#D4AF37]/30 animate-ping pointer-events-none" />
        )}
      </button>
    </div>
  );
};
