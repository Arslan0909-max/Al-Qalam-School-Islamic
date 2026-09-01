import React from 'react';
import { IslamicStar } from './GeometricDecoration';

interface ImageCardProps {
  src?: string;
  alt: string;
  title: string;
  category?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'video';
  className?: string;
  onClick?: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  src,
  alt,
  title,
  category,
  aspectRatio = 'landscape',
  className = '',
  onClick,
}) => {
  const aspectClasses = {
    landscape: 'aspect-[4/3]',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square',
    video: 'aspect-[16/9]',
  };

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-md bg-[#3A0505] border-2 border-[#D4AF37]/40 shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-[#D4AF37] hover:-translate-y-1 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Islamic Arch & Image Container */}
      <div className={`w-full overflow-hidden relative ${aspectClasses[aspectRatio]}`}>
        {src ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#3A0505] via-[#650B0B] to-[#171717] flex flex-col items-center justify-center p-6 text-center text-[#FAF8F3]">
            <IslamicStar size={36} color="#D4AF37" fill="#D4AF37" className="mb-2 opacity-80" />
            <span className="text-xs uppercase tracking-widest text-[#D4AF37]">{category || 'Al-Qalam Campus'}</span>
          </div>
        )}

        {/* Decorative Islamic Corner Ornaments */}
        <div className="absolute top-2 left-2 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M2 14V2H14" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
            <circle cx="5" cy="5" r="1.5" fill="#D4AF37" />
          </svg>
        </div>
        <div className="absolute top-2 right-2 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22 14V2H10" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
            <circle cx="19" cy="5" r="1.5" fill="#D4AF37" />
          </svg>
        </div>
      </div>

      {/* Atmospheric Dark Maroon / Gold Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#3A0505] via-[#3A0505]/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

      {/* Content overlay with Islamic styling */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-[#FAF8F3] z-10">
        {category && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              {category}
            </span>
          </div>
        )}
        <h4 className="serif text-lg sm:text-xl font-bold leading-tight text-[#FAF8F3] group-hover:text-[#F2C94C] transition-colors">
          {title}
        </h4>
      </div>
    </div>
  );
};
