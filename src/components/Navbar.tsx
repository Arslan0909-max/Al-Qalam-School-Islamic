import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { AlqalamLogoBadge } from './ui/GeometricDecoration';
import { NAV_ITEMS, SITE_CONFIG } from '../constants/siteData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isProgrammaticScrollRef = useRef(false);

  // Smooth staged open/close controller for mobile drawer
  const toggleMobileMenu = () => {
    if (!mobileMenuOpen) {
      setMobileMenuOpen(true);
      setMobileMenuMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMobileMenuVisible(true);
        });
      });
    } else {
      closeMobileMenu();
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileMenuVisible(false);
    setTimeout(() => {
      setMobileMenuMounted(false);
    }, 400);
  };

  useEffect(() => {
    let ticking = false;
    let cachedSections: { id: string; el: HTMLElement }[] = [];

    const updateCachedSections = () => {
      cachedSections = NAV_ITEMS.map((item) => {
        const id = item.href.replace('#', '');
        return { id, el: document.getElementById(id) as HTMLElement };
      }).filter((item) => item.el !== null);
    };

    updateCachedSections();

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // If user explicitly clicked Home to go to top, handle smoothly
          if (currentScrollY <= 25) {
            setIsScrolled(false);
            setActiveSection('home');
          } else if (currentScrollY > 60) {
            setIsScrolled(true);
          }

          // Fast cached ScrollSpy (only when not programmatic clicking)
          if (!isProgrammaticScrollRef.current && currentScrollY > 25) {
            const scrollPosition = currentScrollY + 160;
            for (let i = cachedSections.length - 1; i >= 0; i--) {
              const { id, el } = cachedSections[i];
              if (el && scrollPosition >= el.offsetTop) {
                setActiveSection(id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeMobileMenu();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMobileMenu();
    const targetId = href.replace('#', '');
    setActiveSection(targetId);

    // Prevent jitter loop on Home / Top click
    if (targetId === 'home') {
      isProgrammaticScrollRef.current = true;
      setIsScrolled(false);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 700);
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      isProgrammaticScrollRef.current = true;
      const offsetTop = targetElement.offsetTop - 70;
      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: 'smooth',
      });
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 700);
    }
  };

  // Compact mode when scrolled and not hovered
  const isCompact = isScrolled && !isHeaderHovered;

  return (
    <>
      {/* Sticky Apple-Style Liquid Frosted Glass Header */}
      <header
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
        className="sticky top-0 z-50 w-full select-none"
        style={{
          backgroundColor: isScrolled
            ? (isHeaderHovered ? 'rgba(58, 5, 5, 0.78)' : 'rgba(58, 5, 5, 0.58)')
            : 'rgba(58, 5, 5, 0.88)',
          backdropFilter: 'blur(20px) saturate(160%)',
          WebkitBackdropFilter: 'blur(20px) saturate(160%)',
          borderBottom: isScrolled
            ? '1px solid rgba(212, 175, 55, 0.28)'
            : '1px solid rgba(212, 175, 55, 0.20)',
          boxShadow: isScrolled
            ? '0 12px 32px -6px rgba(0, 0, 0, 0.5), 0 0 20px -2px rgba(212, 175, 55, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)'
            : '0 4px 16px -2px rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
          paddingTop: isCompact ? '0.35rem' : '0.85rem',
          paddingBottom: isCompact ? '0.35rem' : '0.85rem',
          transition: 'padding 550ms cubic-bezier(0.34, 1.4, 0.64, 1), background-color 450ms ease, box-shadow 450ms ease, border-color 450ms ease',
        }}
      >
        {/* Specular Liquid Top Light Edge */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        {/* Ambient Depth Underglow (reveals softly during scroll) */}
        <div
          className="absolute -bottom-4 inset-x-0 h-6 bg-gradient-to-b from-black/30 to-transparent pointer-events-none transition-opacity duration-500 ease-out"
          style={{ opacity: isScrolled ? 1 : 0 }}
        />

        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between relative overflow-hidden">
          
          {/* LEFT: Logo & Separate Animated School Name */}
          <div className="flex-shrink-0 flex items-center z-40 relative">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="group flex items-center focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-2xl p-1 transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              {/* 1. STANDALONE CIRCULAR LOGO EMBLEM (Fixed foreground at z-40, stays fixed & crisp) */}
              <div className="relative z-40 flex items-center justify-center bg-[#3A0505]/40 backdrop-blur-md rounded-2xl p-1 border border-[#D4AF37]/25 shadow-sm">
                <AlqalamLogoBadge
                  size="custom"
                  badgeSize={isCompact ? 56 : 70}
                  showText={false}
                  variant="dark-bg"
                  className="transition-all duration-500 ease-out"
                />
                {/* Subtle backlight glow */}
                <div className="absolute -inset-1 bg-[#D4AF37]/15 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* 2. SEPARATED SCHOOL NAME TEXT (Animates Right-to-Left behind the Logo Emblem on scroll!) */}
              <div
                className="hidden sm:flex flex-col relative z-20 whitespace-nowrap pl-2.5 overflow-hidden"
                style={{
                  transform: isCompact
                    ? 'translateX(-50px) scale(0.88)'
                    : 'translateX(0) scale(1)',
                  opacity: isCompact ? 0 : 1,
                  maxWidth: isCompact ? '0px' : '220px',
                  pointerEvents: isCompact ? 'none' : 'auto',
                  transition: 'transform 520ms cubic-bezier(0.34, 1.5, 0.64, 1), opacity 380ms ease, max-width 520ms cubic-bezier(0.34, 1.5, 0.64, 1)',
                  transitionDelay: isCompact ? '0ms' : '100ms',
                }}
              >
                <span className="font-serif font-bold tracking-wider leading-none text-[#FAF8F3] text-xl md:text-2xl drop-shadow-sm">
                  Al-Qalam
                </span>
                <span className="font-sans tracking-[0.24em] uppercase font-semibold text-[10px] md:text-[11px] leading-tight mt-1 text-[#D4AF37]">
                  Islamic School
                </span>
              </div>
            </a>
          </div>

          {/* CENTER: Navigation Bar with Right-to-Left Tucking Behind Logo & Punchy Bouncy Spring Reveal */}
          <div
            className="hidden lg:flex items-center flex-1 justify-center px-4 relative z-20"
            style={{
              transform: isCompact
                ? 'translateX(-140px) scale(0.88)'
                : 'translateX(0) scale(1)',
              opacity: isCompact ? 0 : 1,
              pointerEvents: isCompact ? 'none' : 'auto',
              transition: 'transform 550ms cubic-bezier(0.34, 1.45, 0.64, 1), opacity 420ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <nav
              className="flex items-center px-3 py-1 rounded-full shadow-lg border border-[#D4AF37]/30 bg-black/40 backdrop-blur-xl transition-all duration-300"
              style={{
                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.12), 0 4px 14px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div className="flex items-center gap-1 xl:gap-1.5">
                {NAV_ITEMS.map((item, index) => {
                  const sectionId = item.href.replace('#', '');
                  const isActive = activeSection === sectionId;

                  // Right-to-Left cascading fold-in & Left-to-Right punchy bounce unfold
                  const itemDelay = isCompact
                    ? (NAV_ITEMS.length - 1 - index) * 22
                    : 40 + index * 35;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      style={{
                        transform: isCompact
                          ? 'translateX(-50px) scale(0.9)'
                          : 'translateX(0) scale(1)',
                        opacity: isCompact ? 0 : 1,
                        transition: 'transform 500ms cubic-bezier(0.34, 1.5, 0.64, 1), opacity 380ms ease, background-color 200ms ease',
                        transitionDelay: `${itemDelay}ms`,
                      }}
                      className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-200 transform active:scale-95 group select-none ${
                        isActive
                          ? 'text-[#3A0505] font-bold shadow-sm'
                          : 'text-[#FAF8F3]/90 hover:text-white hover:bg-white/10 hover:scale-[1.02]'
                      }`}
                    >
                      {/* Active Floating Pill Background */}
                      {isActive && (
                        <span className="absolute inset-0 bg-gradient-to-r from-[#F2C94C] via-[#D4AF37] to-[#F2C94C] rounded-full shadow-[0_0_12px_rgba(212,175,55,0.55)] -z-10 animate-in fade-in zoom-in-95 duration-200" />
                      )}

                      {/* Hover subtle underline */}
                      {!isActive && (
                        <span className="absolute bottom-0.5 left-3 right-3 h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-full" />
                      )}

                      <span className="relative z-10">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* RIGHT: Admissions CTA Button (Tucks left behind logo with spring bounce) & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 relative z-30">
            {/* Desktop CTA Button */}
            <div
              className="hidden sm:block"
              style={{
                transform: isCompact
                  ? 'translateX(-180px) scale(0.86)'
                  : 'translateX(0) scale(1)',
                opacity: isCompact ? 0 : 1,
                pointerEvents: isCompact ? 'none' : 'auto',
                transition: 'transform 560ms cubic-bezier(0.34, 1.45, 0.64, 1), opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: isCompact ? '0ms' : '160ms',
              }}
            >
              <a
                href="#admissions"
                onClick={(e) => handleNavClick(e, '#admissions')}
                className="relative inline-flex items-center justify-center gap-2 px-4.5 py-2 rounded-full font-bold text-xs uppercase tracking-widest text-[#3A0505] bg-gradient-to-r from-[#F2C94C] via-[#D4AF37] to-[#F2C94C] hover:from-[#FAF8F3] hover:to-[#D4AF37] shadow-[0_3px_12px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 border border-[#FAF8F3]/50 group"
              >
                <span>Apply Now</span>
                <ArrowRight
                  size={13}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Mobile Rounded Liquid Glass Menu Toggle Button */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className={`lg:hidden p-2 rounded-full backdrop-blur-xl border border-[#D4AF37]/35 text-[#FAF8F3] hover:text-[#D4AF37] hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all duration-300 active:scale-90 shadow-md relative ${
                mobileMenuOpen
                  ? 'bg-[#650B0B]/90 text-[#D4AF37] rotate-90 scale-105'
                  : 'bg-black/30 rotate-0 scale-100'
              }`}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Full-Screen Menu Drawer with Progressive Staggered Fade-In */}
        {mobileMenuMounted && (
          <div
            className="lg:hidden fixed inset-x-0 top-full bg-[#3A0505]/95 backdrop-blur-2xl border-b border-[#D4AF37]/35 shadow-2xl py-6 px-6 max-h-[85vh] overflow-y-auto"
            style={{
              opacity: mobileMenuVisible ? 1 : 0,
              transform: mobileMenuVisible ? 'translateY(0)' : 'translateY(-12px)',
              transition: 'opacity 380ms cubic-bezier(0.16, 1, 0.3, 1), transform 380ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="flex flex-col space-y-2 pb-6 border-b border-[#D4AF37]/20">
              {NAV_ITEMS.map((item, idx) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                const delay = mobileMenuVisible
                  ? 40 + idx * 45
                  : (NAV_ITEMS.length - 1 - idx) * 25;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    style={{
                      opacity: mobileMenuVisible ? 1 : 0,
                      transform: mobileMenuVisible
                        ? 'translateY(0) scale(1)'
                        : 'translateY(-12px) scale(0.96)',
                      transition: 'all 350ms cubic-bezier(0.16, 1, 0.3, 1)',
                      transitionDelay: `${delay}ms`,
                    }}
                    className={`px-4 py-3 rounded-xl font-serif text-lg font-semibold flex items-center justify-between transition-colors duration-200 ${
                      isActive
                        ? 'bg-[#D4AF37] text-[#3A0505] shadow-lg'
                        : 'text-[#FAF8F3] hover:bg-white/10 hover:text-[#D4AF37]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className={isActive ? 'text-[#3A0505]' : 'text-[#D4AF37]'}>→</span>
                  </a>
                );
              })}
            </div>

            <div
              className="mt-6 flex flex-col space-y-4"
              style={{
                opacity: mobileMenuVisible ? 1 : 0,
                transform: mobileMenuVisible ? 'translateY(0)' : 'translateY(-8px)',
                transition: 'all 380ms cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: mobileMenuVisible
                  ? `${50 + NAV_ITEMS.length * 45}ms`
                  : '0ms',
              }}
            >
              <a
                href="#admissions"
                onClick={(e) => handleNavClick(e, '#admissions')}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-center bg-gradient-to-r from-[#F2C94C] via-[#D4AF37] to-[#F2C94C] text-[#3A0505] hover:bg-[#FAF8F3] shadow-lg active:scale-95 transition-transform"
              >
                <span>Apply Now for Admission</span>
                <ArrowRight size={18} />
              </a>

              <div
                className="text-center pt-2 text-xs text-[#FAF8F3]/75 space-y-1"
                style={{
                  opacity: mobileMenuVisible ? 1 : 0,
                  transition: 'opacity 380ms ease',
                  transitionDelay: mobileMenuVisible
                    ? `${100 + NAV_ITEMS.length * 45}ms`
                    : '0ms',
                }}
              >
                <p>📞 {SITE_CONFIG.phone}</p>
                <p>📍 {SITE_CONFIG.address} ({SITE_CONFIG.zipCode})</p>
                <p>✉️ {SITE_CONFIG.email}</p>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
