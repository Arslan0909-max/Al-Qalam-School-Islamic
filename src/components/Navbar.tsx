import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Languages, Check, MessageCircle, Phone, MapPin } from 'lucide-react';
import { AlqalamLogoBadge } from './ui/GeometricDecoration';
import { SITE_CONFIG } from '../constants/siteData';
import { useLanguage } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
  const { setLanguage, isUrdu, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [detachProgress, setDetachProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isProgrammaticScrollRef = useRef(false);
  const lastScrollYRef = useRef(0);

  // Dynamic Navigation Items with live translated labels
  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.programs, href: '#programs' },
    { label: t.nav.whyUs, href: '#why-us' },
    { label: t.nav.facilities, href: '#facilities' },
    { label: t.nav.contact, href: '#contact' },
  ];

  // Smooth staged open/close controller for menu drawer
  const toggleMobileMenu = () => {
    if (!mobileMenuOpen) {
      setMobileMenuOpen(true);
      setMobileMenuMounted(true);
      setIsHeaderHidden(false);
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
      cachedSections = navItems
        .map((item) => {
          const id = item.href.replace('#', '');
          return { id, el: document.getElementById(id) as HTMLElement };
        })
        .filter((item) => item.el !== null);
    };

    updateCachedSections();

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const lastScrollY = lastScrollYRef.current;
          const scrollDelta = currentScrollY - lastScrollY;

          // 1. Direct Scroll-Linked Detachment Progress:
          // Between scroll 0px (top of home) and 80px (full detachment), progress goes 0.0 -> 1.0 continuously with scroll
          const progress = Math.min(Math.max(currentScrollY / 80, 0), 1);
          setDetachProgress(progress);

          // 2. Home Section & Header State
          if (currentScrollY <= 8) {
            setIsScrolled(false);
            setIsHeaderHidden(false);
            setActiveSection('home');
          } else {
            setIsScrolled(true);
            
            // 3. Header Slide-Up only occurs when user scrolls deeper down (past 140px)
            // The floating logo stays firmly locked in position across all page scrolling.
            if (currentScrollY > 140 && scrollDelta > 5 && !mobileMenuOpen) {
              setIsHeaderHidden(true);
            } else if (scrollDelta < -5) {
              // When scrolling back up, header smoothly reveals
              setIsHeaderHidden(false);
            }
          }

          lastScrollYRef.current = currentScrollY;

          // Fast cached ScrollSpy (only when not programmatic clicking)
          if (!isProgrammaticScrollRef.current && currentScrollY > 20) {
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
  }, [navItems, mobileMenuOpen]);

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

  // Compact state activates on scroll when not hovered
  const isCompact = isScrolled && !isHeaderHovered;

  // Apple-grade physical spring cubic-bezier curves
  const springEase = 'cubic-bezier(0.34, 1.48, 0.58, 1)';
  const punchyEase = 'cubic-bezier(0.28, 1.55, 0.52, 1)';

  // Continuous Hermite smoothstep for 1:1 butter-smooth scroll response (0 at top of home, 1 when detached)
  const easedProgress = detachProgress * detachProgress * (3 - 2 * detachProgress);

  return (
    <>
      {/* 
        Hover Sensor at very top edge:
        If user moves mouse to top 14px of screen when header is hidden, header slides down
      */}
      <div
        className="fixed top-0 inset-x-0 h-3.5 z-40 pointer-events-auto"
        onMouseEnter={() => setIsHeaderHovered(true)}
      />

      {/* 
        Floating Corner Pinned Logo:
        - Directly & smoothly linked 1:1 with scroll position.
        - As user scrolls from 0 to 80px, it drops down softly into position.
        - Once detached (scrollY >= 80px), it stays 100% fixed & firmly locked in the corner throughout all page exploration (scroll up or down).
        - It ONLY smoothly merges back when scrolling reaches all the way back to the Home section top.
      */}
      <div
        className={`fixed z-50 top-3 sm:top-3.5 pointer-events-auto transition-[filter,box-shadow] duration-200 ${
          isUrdu ? 'right-4 sm:right-6 lg:right-8 xl:right-12' : 'left-4 sm:left-6 lg:left-8 xl:left-12'
        }`}
        style={{
          opacity: detachProgress > 0.01 ? Math.min(easedProgress * 1.15, 1) : 0,
          transform: `translate3d(0, ${(easedProgress - 1) * 14}px, 0) scale(${0.88 + easedProgress * 0.12})`,
          pointerEvents: detachProgress > 0.08 && !mobileMenuOpen ? 'auto' : 'none',
          willChange: 'transform, opacity',
        }}
      >
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          title={isUrdu ? 'واپس اوپر جائیں (Al-Qalam)' : 'Back to Top (Al-Qalam)'}
          className="group relative flex items-center justify-center p-1.5 sm:p-2 bg-[#3A0505]/92 hover:bg-[#3A0505] backdrop-blur-2xl border border-[#D4AF37]/50 shadow-[0_8px_24px_rgba(0,0,0,0.55),0_0_12px_rgba(212,175,55,0.25),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_10px_28px_rgba(212,175,55,0.45)] hover:border-[#D4AF37] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer rounded-2xl"
          onMouseEnter={() => setIsHeaderHovered(true)}
        >
          <div className="relative">
            <div className="block sm:hidden">
              <AlqalamLogoBadge
                size="custom"
                badgeSize={38}
                showText={false}
                variant="dark-bg"
              />
            </div>
            <div className="hidden sm:block">
              <AlqalamLogoBadge
                size="custom"
                badgeSize={44}
                showText={false}
                variant="dark-bg"
              />
            </div>
            {/* Luminous Warm Golden Backlight Glow on hover */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#D4AF37]/30 via-white/10 to-transparent rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </a>
      </div>

      {/* Premium Apple-Style Liquid Frosted Glass Header */}
      <header
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
        className="sticky top-0 z-50 w-full select-none"
        style={{
          backgroundColor: isScrolled
            ? (isHeaderHovered ? 'rgba(58, 5, 5, 0.88)' : 'rgba(58, 5, 5, 0.72)')
            : 'rgba(58, 5, 5, 0.94)',
          backdropFilter: 'blur(32px) saturate(190%) contrast(105%)',
          WebkitBackdropFilter: 'blur(32px) saturate(190%) contrast(105%)',
          borderBottom: isScrolled
            ? '1px solid rgba(255, 255, 255, 0.14)'
            : '1px solid rgba(212, 175, 55, 0.22)',
          boxShadow: isScrolled
            ? '0 20px 40px -12px rgba(0, 0, 0, 0.65), 0 0 1px 1px rgba(255, 255, 255, 0.08), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.28), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.06)'
            : '0 4px 18px -2px rgba(0, 0, 0, 0.32), inset 0 1px 1px 0 rgba(255, 255, 255, 0.20)',
          paddingTop: isCompact ? '0.35rem' : '0.65rem',
          paddingBottom: isCompact ? '0.35rem' : '0.65rem',
          transform:
            isHeaderHidden && !isHeaderHovered && !mobileMenuOpen
              ? 'translateY(-105%)'
              : 'translateY(0)',
          transition: `transform 460ms cubic-bezier(0.16, 1, 0.3, 1), padding 520ms ${springEase}, background-color 400ms ease, box-shadow 400ms ease, border-color 400ms ease`,
        }}
      >
        {/* Soft Apple-Style Liquid Glass Top Sheen Highlight */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-white/10 via-white/40 to-white/10 pointer-events-none" />

        {/* Diagonal Glossy Specular Light Reflection (Apple Liquid Glass) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 overflow-hidden"
          style={{
            opacity: isScrolled ? 0.35 : 0.15,
            background: 'linear-gradient(115deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 30%, transparent 60%)',
          }}
        />

        {/* Soft-White Subtle Bottom Edge Highlight */}
        <div
          className="absolute bottom-0 inset-x-0 h-[1px] pointer-events-none transition-opacity duration-400"
          style={{
            opacity: isScrolled ? 0.65 : 0,
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.22) 50%, rgba(255, 255, 255, 0.05) 100%)',
          }}
        />

        {/* Deep Faded Glassy Fog & Dissolve Gradient at Bottom */}
        <div
          className="absolute -bottom-8 inset-x-0 w-full h-9 pointer-events-none transition-opacity duration-500 ease-out"
          style={{
            opacity: isScrolled ? 1 : 0,
            background: 'linear-gradient(to bottom, rgba(58, 5, 5, 0.42) 0%, rgba(58, 5, 5, 0.18) 45%, rgba(58, 5, 5, 0.05) 75%, transparent 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            maskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.6) 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.6) 40%, transparent 100%)',
          }}
        />

        {/* --- STAGGERED SPRING ELEMENT BAR --- */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between relative overflow-visible">
          
          {/* LEFT: Independent Bouncy Logo & Separately Staggered School Name */}
          <div className="flex-shrink-0 flex items-center z-40 relative">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="group flex items-center focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-2xl p-0.5 sm:p-1 active:scale-95 transition-transform duration-200"
            >
              {/* 1. Seamless Scroll-Linked Circular Logo Badge */}
              <div
                className="relative z-40 flex items-center justify-center bg-[#3A0505]/75 backdrop-blur-xl rounded-2xl p-1.5 border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)] origin-left group-hover:border-[#D4AF37]/60 group-hover:shadow-[0_4px_20px_rgba(212,175,55,0.35)]"
                style={{
                  transform: `scale(${1 - easedProgress * 0.1}) translate3d(0, ${easedProgress * 4}px, 0)`,
                  opacity: Math.max(1 - easedProgress * 1.15, 0),
                  pointerEvents: easedProgress > 0.85 ? 'none' : 'auto',
                  transition: 'border-color 300ms ease, box-shadow 300ms ease',
                  willChange: 'transform, opacity',
                }}
              >
                <div className="block sm:hidden">
                  <AlqalamLogoBadge
                    size="custom"
                    badgeSize={48}
                    showText={false}
                    variant="dark-bg"
                  />
                </div>
                <div className="hidden sm:block">
                  <AlqalamLogoBadge
                    size="custom"
                    badgeSize={58}
                    showText={false}
                    variant="dark-bg"
                  />
                </div>
                {/* Luminous Warm Backlight */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#D4AF37]/25 via-white/10 to-transparent rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* 2. School Name: "Al-Qalam" (Stage 1 Spring Slide) */}
              <div className="hidden sm:flex flex-col relative z-20 whitespace-nowrap px-3.5 overflow-hidden">
                <span
                  className="font-serif font-bold tracking-wider leading-none text-[#FAF8F3] text-xl md:text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] inline-block"
                  style={{
                    transform: isCompact
                      ? 'translate3d(-28px, 0, 0) scale(0.92)'
                      : 'translate3d(0, 0, 0) scale(1)',
                    opacity: isCompact ? 0 : 1,
                    transition: `transform 500ms ${springEase}, opacity 360ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    transitionDelay: isCompact ? '0ms' : '50ms',
                  }}
                >
                  {isUrdu ? 'القلم' : 'Al-Qalam'}
                </span>

                {/* 3. School Tagline: "Islamic School" (Stage 2 Spring Slide with slight extra separation) */}
                <span
                  className="font-sans tracking-[0.24em] uppercase font-semibold text-[10px] md:text-[11px] leading-tight mt-1 text-[#F2C94C] drop-shadow-sm inline-block"
                  style={{
                    transform: isCompact
                      ? 'translate3d(-38px, 0, 0) scale(0.88)'
                      : 'translate3d(0, 0, 0) scale(1)',
                    opacity: isCompact ? 0 : 1,
                    transition: `transform 530ms ${punchyEase}, opacity 360ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    transitionDelay: isCompact ? '15ms' : '85ms',
                  }}
                >
                  {isUrdu ? 'اسلامک اسکول' : 'Islamic School'}
                </span>
              </div>
            </a>
          </div>

          {/* CENTER: Floating Nav Pill with Staggered Cascading Bounce on Each Individual Link */}
          <div
            className="hidden lg:flex items-center flex-1 justify-center px-4 relative z-20"
            style={{
              transform: isCompact
                ? 'translate3d(-60px, 0, 0) scale(0.94)'
                : 'translate3d(0, 0, 0) scale(1)',
              opacity: isCompact ? 0 : 1,
              pointerEvents: isCompact ? 'none' : 'auto',
              transition: `transform 540ms ${springEase}, opacity 380ms cubic-bezier(0.16, 1, 0.3, 1)`,
              transitionDelay: isCompact ? '0ms' : '40ms',
            }}
          >
            <nav
              className="flex items-center px-3 py-1 rounded-full border border-white/15 bg-black/45 backdrop-blur-2xl transition-all duration-300"
              style={{
                boxShadow: 'inset 0 1.5px 1px rgba(255, 255, 255, 0.22), 0 8px 24px rgba(0, 0, 0, 0.35)',
              }}
            >
              <div className="flex items-center gap-1 xl:gap-1.5">
                {navItems.map((item, index) => {
                  const sectionId = item.href.replace('#', '');
                  const isActive = activeSection === sectionId;

                  // Individual staggered delay: Left-to-right on enter, Right-to-left on exit
                  const itemEnterDelay = 60 + index * 32;
                  const itemExitDelay = (navItems.length - 1 - index) * 20;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      style={{
                        transform: isCompact
                          ? `translate3d(-${22 + index * 4}px, 0, 0) scale(0.90)`
                          : 'translate3d(0, 0, 0) scale(1)',
                        opacity: isCompact ? 0 : 1,
                        transition: `transform 480ms ${punchyEase}, opacity 340ms ease, background-color 200ms ease`,
                        transitionDelay: isCompact ? `${itemExitDelay}ms` : `${itemEnterDelay}ms`,
                      }}
                      className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-200 transform active:scale-95 group select-none ${
                        isActive
                          ? 'text-[#3A0505] font-bold shadow-sm'
                          : 'text-[#FAF8F3]/90 hover:text-white hover:bg-white/12 hover:scale-[1.03]'
                      }`}
                    >
                      {/* Active Floating Pill Background */}
                      {isActive && (
                        <span className="absolute inset-0 bg-gradient-to-r from-[#F2C94C] via-[#D4AF37] to-[#F2C94C] rounded-full shadow-[0_0_14px_rgba(212,175,55,0.65),inset_0_1px_1px_rgba(255,255,255,0.4)] -z-10 animate-in fade-in zoom-in-95 duration-200" />
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

          {/* RIGHT: CTA Button & 3-Line Menu Bar Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 relative z-30">
            {/* Desktop CTA Button with Punchy Spring Anchor */}
            <div
              className="hidden sm:block"
              style={{
                transform: isCompact
                  ? 'translate3d(-45px, 0, 0) scale(0.88)'
                  : 'translate3d(0, 0, 0) scale(1)',
                opacity: isCompact ? 0 : 1,
                pointerEvents: isCompact ? 'none' : 'auto',
                transition: `transform 550ms ${punchyEase}, opacity 380ms cubic-bezier(0.16, 1, 0.3, 1)`,
                transitionDelay: isCompact ? '0ms' : `${80 + navItems.length * 25}ms`,
              }}
            >
              <a
                href="#admissions"
                onClick={(e) => handleNavClick(e, '#admissions')}
                className="relative inline-flex items-center justify-center gap-2 px-4.5 py-2 rounded-full font-bold text-xs uppercase tracking-widest text-[#3A0505] bg-gradient-to-r from-[#F2C94C] via-[#D4AF37] to-[#F2C94C] hover:from-[#FAF8F3] hover:to-[#D4AF37] shadow-[0_3px_12px_rgba(212,175,55,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 border border-white/50 group"
              >
                <span>{t.nav.applyNow}</span>
                <ArrowRight
                  size={13}
                  className={`transition-transform duration-200 ${isUrdu ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`}
                />
              </a>
            </div>

            {/* 3-Line Menu Bar Button (Unified Menu for Navigation, Language, and Contacts) */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className={`p-2 sm:p-2.5 rounded-full backdrop-blur-2xl border text-[#FAF8F3] hover:text-[#D4AF37] hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all duration-300 active:scale-90 shadow-[0_4px_14px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] relative cursor-pointer ${
                mobileMenuOpen
                  ? 'bg-[#650B0B]/90 text-[#D4AF37] rotate-90 scale-105 border-[#D4AF37]'
                  : 'bg-black/40 border-white/20 hover:border-[#D4AF37]/50'
              }`}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu and language"
              title={isUrdu ? 'مینو اور زبان' : 'Menu & Language'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Unified Bubble Popover Menu with Language Switch, Links & Contacts */}
        {mobileMenuMounted && (
          <>
            {/* Soft Backdrop to close when clicking outside the bubble */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 transition-opacity duration-300"
              style={{
                opacity: mobileMenuVisible ? 1 : 0,
                pointerEvents: mobileMenuVisible ? 'auto' : 'none',
              }}
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            {/* Limited Floating Bubble Popover Card */}
            <div
              className={`fixed z-50 top-[72px] sm:top-[78px] ${
                isUrdu ? 'left-3 sm:left-6 md:left-10' : 'right-3 sm:right-6 md:right-10'
              } w-[calc(100vw-24px)] sm:w-[370px] max-w-[390px] max-h-[82vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#3E0608]/98 via-[#2E0405]/98 to-[#1D0203]/98 backdrop-blur-3xl border border-[#D4AF37]/50 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.25)] p-4 sm:p-5 space-y-4.5`}
              style={{
                opacity: mobileMenuVisible ? 1 : 0,
                transform: mobileMenuVisible
                  ? 'scale(1) translateY(0)'
                  : 'scale(0.92) translateY(-14px)',
                transformOrigin: isUrdu ? 'top left' : 'top right',
                transition:
                  'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* 1. Language Switcher Bar inside Bubble */}
              <div className="pb-3.5 border-b border-white/15">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#FAF8F3]/90 font-medium flex items-center gap-1.5">
                    <Languages size={14} className="text-[#D4AF37]" />
                    <span>{isUrdu ? 'زبان منتخب کریں:' : 'Language:'}</span>
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F2C94C] font-semibold">
                    {isUrdu ? 'اردو فعال ہے' : 'English'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-black/45 p-1 rounded-xl border border-white/10 shadow-inner backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => {
                      setLanguage('en');
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                      !isUrdu
                        ? 'bg-gradient-to-r from-[#F2C94C] to-[#D4AF37] text-[#3A0505] shadow-[0_2px_8px_rgba(212,175,55,0.35)] font-bold'
                        : 'text-[#FAF8F3]/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {!isUrdu && <Check size={12} className="stroke-[3] text-[#3A0505]" />}
                    <span>English</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLanguage('ur');
                    }}
                    className={`py-2 px-3 rounded-lg text-xs transition-all duration-300 flex items-center justify-center gap-1.5 font-urdu cursor-pointer active:scale-95 ${
                      isUrdu
                        ? 'bg-gradient-to-r from-[#F2C94C] to-[#D4AF37] text-[#3A0505] shadow-[0_2px_8px_rgba(212,175,55,0.35)] font-bold'
                        : 'text-[#FAF8F3]/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {isUrdu && <Check size={12} className="stroke-[3] text-[#3A0505]" />}
                    <span className="text-[13px]">اردو</span>
                  </button>
                </div>
              </div>

              {/* 2. Navigation Items */}
              <div className="space-y-1 pb-3.5 border-b border-white/10">
                {navItems.map((item, idx) => {
                  const sectionId = item.href.replace('#', '');
                  const isActive = activeSection === sectionId;
                  const delay = mobileMenuVisible
                    ? 30 + idx * 25
                    : (navItems.length - 1 - idx) * 15;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        handleNavClick(e, item.href);
                        closeMobileMenu();
                      }}
                      style={{
                        opacity: mobileMenuVisible ? 1 : 0,
                        transform: mobileMenuVisible
                          ? 'translateY(0)'
                          : 'translateY(-6px)',
                        transition: 'all 260ms cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: `${delay}ms`,
                      }}
                      className={`px-3.5 py-2.5 rounded-xl font-serif text-sm font-semibold flex items-center justify-between transition-colors duration-150 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#F2C94C] via-[#D4AF37] to-[#F2C94C] text-[#3A0505] shadow-md'
                          : 'text-[#FAF8F3] hover:bg-white/10 hover:text-[#D4AF37]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className={`text-xs ${isActive ? 'text-[#3A0505]' : 'text-[#D4AF37]'}`}>
                        {isUrdu ? '←' : '→'}
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* 3. Quick Actions & Contacts */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${SITE_CONFIG.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    isUrdu
                      ? 'السلام علیکم! میں القلم اسکول کے داخلوں اور نصاب کے بارے میں معلومات حاصل کرنا چاہتا ہوں۔'
                      : 'Assalam-o-Alaikum, I would like to inquire about Alqalam Islamic School admissions.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 p-2 rounded-xl bg-[#08783F]/20 hover:bg-[#08783F]/40 border border-[#08783F]/40 text-[#25D366] hover:text-white transition-all duration-200"
                >
                  <MessageCircle size={14} className="shrink-0 text-[#25D366]" />
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-white text-[11px] leading-tight">{isUrdu ? 'واٹس ایپ' : 'WhatsApp'}</span>
                    <span className="text-[9px] text-white/70">{SITE_CONFIG.phone}</span>
                  </div>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-[#FAF8F3] transition-all duration-200"
                >
                  <Phone size={13} className="text-[#D4AF37] shrink-0" />
                  <div className="flex flex-col text-left">
                    <span className="font-medium text-white text-[11px] leading-tight">{isUrdu ? 'کال کریں' : 'Call'}</span>
                    <span className="text-[9px] text-[#FAF8F3]/60">{SITE_CONFIG.phone}</span>
                  </div>
                </a>
              </div>

              {/* 4. Apply Now Button & Footer inside Bubble */}
              <div className="pt-1 flex flex-col space-y-2.5">
                <a
                  href="#admissions"
                  onClick={(e) => {
                    handleNavClick(e, '#admissions');
                    closeMobileMenu();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full font-bold text-center bg-gradient-to-r from-[#F2C94C] via-[#D4AF37] to-[#F2C94C] text-[#3A0505] hover:bg-[#FAF8F3] shadow-lg active:scale-95 transition-transform border border-white/40 uppercase tracking-widest text-[11px]"
                >
                  <span>{t.nav.applyNow}</span>
                  <ArrowRight size={14} className={isUrdu ? 'rotate-180' : ''} />
                </a>

                <div className="flex items-center justify-center gap-1 text-[10px] text-[#FAF8F3]/60 text-center">
                  <MapPin size={11} className="text-[#D4AF37] shrink-0" />
                  <span className="truncate max-w-[280px]">{SITE_CONFIG.address}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};
