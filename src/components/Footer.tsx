import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, MessageCircle, ArrowUp } from 'lucide-react';
import { AlqalamLogoBadge, MosqueSkyline, IslamicStar, GoldDivider } from './ui/GeometricDecoration';
import { NAV_ITEMS, CORE_PROGRAMS, SITE_CONFIG } from '../constants/siteData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#3A0505] text-[#FAF8F3] overflow-hidden border-t border-[#D4AF37]/40">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-islamic-dark-grid opacity-20 pointer-events-none" />

      {/* Top Skyline Vector */}
      <MosqueSkyline className="mb-4" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#FAF8F3]/15">
          {/* Column 1: School Brand & Mission */}
          <div className="space-y-4">
            <AlqalamLogoBadge size="lg" variant="dark-bg" />
            <p className="text-sm text-[#FAF8F3]/80 leading-relaxed pt-2">
              Alqalam Islamic School is committed to providing quality Islamic education and nurturing future leaders through academic excellence, Quranic literacy, and moral tarbiyah.
            </p>
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-3">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-sm bg-[#FAF8F3]/10 hover:bg-[#D4AF37] hover:text-[#3A0505] flex items-center justify-center transition-all duration-300 border border-[#D4AF37]/30 text-[#FAF8F3]"
                >
                  <Facebook size={15} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-sm bg-[#FAF8F3]/10 hover:bg-[#D4AF37] hover:text-[#3A0505] flex items-center justify-center transition-all duration-300 border border-[#D4AF37]/30 text-[#FAF8F3]"
                >
                  <Instagram size={15} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-sm bg-[#FAF8F3]/10 hover:bg-[#D4AF37] hover:text-[#3A0505] flex items-center justify-center transition-all duration-300 border border-[#D4AF37]/30 text-[#FAF8F3]"
                >
                  <Youtube size={15} />
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  aria-label="Call or WhatsApp"
                  className="w-8 h-8 rounded-sm bg-[#FAF8F3]/10 hover:bg-[#D4AF37] hover:text-[#3A0505] flex items-center justify-center transition-all duration-300 border border-[#D4AF37]/30 text-[#FAF8F3]"
                >
                  <Phone size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="serif text-xl font-bold text-[#FAF8F3] mb-4 flex items-center gap-2">
              <IslamicStar size={14} color="#D4AF37" fill="#D4AF37" />
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF8F3]/80">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Academic & Islamic Programs */}
          <div>
            <h4 className="serif text-xl font-bold text-[#FAF8F3] mb-4 flex items-center gap-2">
              <IslamicStar size={14} color="#D4AF37" fill="#D4AF37" />
              Programs
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF8F3]/80">
              {CORE_PROGRAMS.map((prog) => (
                <li key={prog.id}>
                  <a
                    href="#programs"
                    className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    <span>{prog.title}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#programs"
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group"
                >
                  <span className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>Extracurricular & Tarbiyah</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h4 className="serif text-xl font-bold text-[#FAF8F3] mb-4 flex items-center gap-2">
              <IslamicStar size={14} color="#D4AF37" fill="#D4AF37" />
              Contact Us
            </h4>
            <ul className="space-y-3.5 text-sm text-[#FAF8F3]/85">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-[#D4AF37] font-medium transition-colors">
                    {SITE_CONFIG.phone}
                  </a>
                  <p className="text-xs text-[#FAF8F3]/60">Main Office Line</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="leading-snug block">{SITE_CONFIG.address}</span>
                  {SITE_CONFIG.zipCode && (
                    <span className="text-xs text-[#D4AF37]/85 block mt-0.5">Zip Code: {SITE_CONFIG.zipCode}</span>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="hover:text-[#D4AF37] break-all transition-colors"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[#FAF8F3]/70">{SITE_CONFIG.timings}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F3]/70">
          <p>© {new Date().getFullYear()} Alqalam Islamic School. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>Traditional Values • Modern Excellence</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#D4AF37] hover:underline cursor-pointer focus:outline-none"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
