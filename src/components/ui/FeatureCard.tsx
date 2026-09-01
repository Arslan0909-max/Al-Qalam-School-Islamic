import React from 'react';
import {
  BookOpen,
  GraduationCap,
  Scroll,
  UsersRound,
  ShieldCheck,
  HeartHandshake,
  Award,
  Sparkles,
  UserCheck,
  Users,
  Compass,
  BookMarked,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { IslamicStar, CornerOrnament } from './GeometricDecoration';

// Icon Map helper
export const IconRenderer: React.FC<{
  name: string;
  size?: number;
  className?: string;
  color?: string;
}> = ({ name, size = 24, className = '', color }) => {
  const icons: Record<string, React.ReactNode> = {
    BookOpen: <BookOpen size={size} className={className} color={color} />,
    GraduationCap: <GraduationCap size={size} className={className} color={color} />,
    Scroll: <Scroll size={size} className={className} color={color} />,
    UsersRound: <UsersRound size={size} className={className} color={color} />,
    ShieldCheck: <ShieldCheck size={size} className={className} color={color} />,
    HeartHandshake: <HeartHandshake size={size} className={className} color={color} />,
    Award: <Award size={size} className={className} color={color} />,
    Sparkles: <Sparkles size={size} className={className} color={color} />,
    UserCheck: <UserCheck size={size} className={className} color={color} />,
    Users: <Users size={size} className={className} color={color} />,
    Compass: <Compass size={size} className={className} color={color} />,
    BookMarked: <BookMarked size={size} className={className} color={color} />,
    Shield: <Shield size={size} className={className} color={color} />,
  };

  return <>{icons[name] || <Sparkles size={size} className={className} color={color} />}</>;
};

interface FeatureCardProps {
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  features?: string[];
  theme?: 'light' | 'dark' | 'maroon' | 'gold-accent';
  className?: string;
  showCornerOrnaments?: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  iconName,
  badge,
  features,
  theme = 'light',
  className = '',
  showCornerOrnaments = false,
}) => {
  const themeStyles = {
    light:
      'bg-white text-[#171717] border border-[#D4AF37]/25 shadow-sm hover:shadow-md hover:border-[#D4AF37]/60 hover:-translate-y-1',
    dark:
      'bg-[#3A0505] text-[#FAF8F3] border border-[#D4AF37]/30 shadow-md hover:border-[#D4AF37] hover:-translate-y-1',
    maroon:
      'bg-[#650B0B] text-white border border-[#D4AF37]/30 shadow-md hover:border-[#D4AF37] hover:-translate-y-1',
    'gold-accent':
      'bg-[#FAF8F3] text-[#3A0505] border-2 border-[#D4AF37]/40 shadow-sm hover:border-[#D4AF37] hover:-translate-y-1',
  };

  const isDark = theme === 'dark' || theme === 'maroon';

  return (
    <div
      className={`relative p-6 sm:p-7 rounded-xl transition-all duration-300 flex flex-col justify-between group ${themeStyles[theme]} ${className}`}
    >
      {showCornerOrnaments && (
        <>
          <CornerOrnament position="top-left" color="#D4AF37" className="-top-1 -left-1" />
          <CornerOrnament position="bottom-right" color="#D4AF37" className="-bottom-1 -right-1" />
        </>
      )}

      <div>
        {/* Top bar with Icon & Badge */}
        <div className="flex items-start justify-between mb-5">
          <div
            className={`w-14 h-14 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
              isDark
                ? 'bg-[#FAF8F3]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                : 'bg-[#650B0B]/5 text-[#650B0B] border border-[#650B0B]/15 group-hover:bg-[#650B0B] group-hover:text-white'
            }`}
          >
            <IconRenderer name={iconName} size={28} />
          </div>

          {badge && (
            <span
              className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border ${
                isDark
                  ? 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/40'
                  : 'bg-[#FAF8F3] text-[#650B0B] border-[#650B0B]/20'
              }`}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={`font-serif text-xl sm:text-2xl font-bold mb-2.5 leading-snug group-hover:text-[#D4AF37] transition-colors ${
            isDark ? 'text-[#FAF8F3]' : 'text-[#3A0505]'
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-[#FAF8F3]/80' : 'text-[#666666]'
          }`}
        >
          {description}
        </p>
      </div>

      {/* Feature bullet list if provided */}
      {features && features.length > 0 && (
        <div className="mt-5 pt-4 border-t border-[#D4AF37]/20">
          <ul className="space-y-1.5 text-xs sm:text-sm">
            {features.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 size={14} className={isDark ? 'text-[#D4AF37]' : 'text-[#08783F]'} />
                <span className={isDark ? 'text-[#FAF8F3]/90' : 'text-[#3A0505]'}>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
