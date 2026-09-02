import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ArrowRight,
  Languages,
  Check,
  MessageCircle,
  Phone,
  MapPin,
  Home,
  BookOpen,
  GraduationCap,
  Award,
  Building2,
  ChevronDown,
} from 'lucide-react';
import { AlqalamLogoBadge } from './ui/GeometricDecoration';
import { SITE_CONFIG } from '../constants/siteData';
import { useLanguage } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
  const { setLanguage, isUrdu, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [logoBubbleOpen, setLogoBubbleOpen] = useState(false);
  const [logoBubbleMounted, setLogoBubbleMounted] = useState(false);
  const [bubbleAnchor, setBubbleAnchor] = useState<'header' | 'floating'>('header');
  const [activeSection, setActiveSection] = useState('home');
  const isProgrammaticScrollRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const headerLogoRef = useRef<HTMLDivElement>(null);
  const floatingLogoRef = useRef<HTMLDivElement>(null);
  const logoHoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dynamic Navigation Items with live translated labels & icons
  const navItems = [
    { label: t.nav.home, href: '#home', icon: Home, desc: isUrdu ? 'مرکزی صفحہ' : 'Main Campus' },
    { label: t.nav.about, href: '#about', icon: BookOpen, desc: isUrdu ? 'ہمارا مشن و تعارف' : 'Our Mission & Vision' },
    { label: t.nav.programs, href: '#programs', icon: GraduationCap, desc: isUrdu ? 'حفظ و عصری نصاب' : 'Hifz & Academics' },
    { label: t.nav.whyUs, href: '#why-us', icon: Award, desc: isUrdu ? 'ہمارے خاص امتیازات' : 'Values & Culture' },
    { label: t.nav.facilities, href: '#facilities', icon: Building2, desc: isUrdu ? 'کلاس رومز و لائبریری' : 'Modern Campus' },
    { label: t.nav.contact, href: '#contact', icon: MapPin, desc: isUrdu ? 'رابطہ و نقشہ' : 'Visit & Inquiries' },
  ];

  // Open / Close Logo Bubble with Soft Bounce and Smooth Grace Buffer
  const openLogoBubble = (anchor: 'header' | 'floating' = 'header') => {
    if (logoHoverTimerRef.current) {
      clearTimeout(logoHoverTimerRef.current);
      logoHoverTimerRef.current = null;
    }
    setBubbleAnchor(anchor);
    setLogoBubbleMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLogoBubbleOpen(true);
      });
    });
  };

  const closeLogoBubble = (immediate = false) => {
    if (logoHoverTimerRef.current) {
      clearTimeout(logoHoverTimerRef.current);
      logoHoverTimerRef.current = null;
    }
    if (immediate) {
      setLogoBubbleOpen(false);
      setTimeout(() => {
        setLogoBubbleMounted(false);
      }, 260);
      return;
    }
    // Gentle buffer for seamless cursor traversal between logo and bubble window
    logoHoverTimerRef.current = setTimeout(() => {
      setLogoBubbleOpen(false);
      setTimeout(() => {
        setLogoBubbleMounted(false);
      }, 260);
    }, 240);
  };

  const toggleLogoBubble = (anchor: 'header' | 'floating' = 'header') => {
    if (logoBubbleOpen && bubbleAnchor === anchor) {
      closeLogoBubble(true);
    } else {
      openLogoBubble(anchor);
    }
  };

  // Click outside and Escape key listener for the Logo Bubble Window
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      const insideHeaderLogo = headerLogoRef.current?.contains(target);
      const insideFloatingLogo = floatingLogoRef.current?.contains(target);
      if (!insideHeaderLogo && !insideFloatingLogo) {
        closeLogoBubble(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLogoBubble(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

          // Smooth hysteresis threshold for sticky header
          if (currentScrollY <= 20) {
            setIsScrolled(false);
            setActiveSection('home');
          } else {
            setIsScrolled(true);
          }

          lastScrollYRef.current = currentScrollY;

          // Fast cached ScrollSpy (only when not programmatic clicking)
          if (!isProgrammaticScrollRef.current && currentScrollY > 20) {
            const scrollPosition = currentScrollY + 140;
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
  }, [navItems]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeLogoBubble(true);
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

  // Smooth easing curves for professional, punchy and bouncy spring transitions
  const smoothEase = 'cubic-bezier(0.16, 1, 0.3, 1)';
  const springEase = 'cubic-bezier(0.34, 1.45, 0.64, 1)';
  const hideEase = 'cubic-bezier(0.4, 0, 0.2, 1)';

  // Determine if header elements are collapsed behind the logo
  const isCollapsed = isScrolled && !isHeaderHovered;

  return (
    <>
      {/* Premium Sticky Frosted Glass Header */}
      <header
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
        className="sticky top-0 z-50 w-full select-none"
        style={{
          backgroundColor: isScrolled
            ? (isHeaderHovered ? 'rgba(58, 5, 5, 0.94)' : 'rgba(58, 5, 5, 0.88)')
            : 'rgba(58, 5, 5, 0.98)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: isScrolled
            ? '1px solid rgba(212, 175, 55, 0.28)'
            : '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: isScrolled
            ? '0 10px 30px -5px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
            : '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          paddingTop: isScrolled ? '0.45rem' : '0.65rem',
          paddingBottom: isScrolled ? '0.45rem' : '0.65rem',
          transition: `padding 260ms ${smoothEase}, background-color 260ms ease, box-shadow 260ms ease, border-color 260ms ease`,
        }}
      >
        {/* Soft Liquid Glass Top Sheen Highlight */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-white/10 via-white/40 to-white/10 pointer-events-none" />

        {/* Diagonal Specular Light Reflection */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 overflow-hidden"
          style={{
            opacity: isScrolled ? 0.22 : 0.14,
            background: 'linear-gradient(115deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 30%, transparent 60%)',
          }}
        />

        {/* --- NAVBAR CONTENT BAR --- */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between relative overflow-visible">
          
          {/* LEFT: Header Logo & School Name */}
          <div
            ref={headerLogoRef}
            onMouseEnter={() => openLogoBubble('header')}
            onMouseLeave={() => closeLogoBubble(false)}
            className="flex-shrink-0 flex items-center z-40 relative"
          >
            <a
              href="#home"
              onClick={(e) => {
                if (window.innerWidth < 1024) {
                  e.preventDefault();
                  toggleLogoBubble('header');
                } else {
                  handleNavClick(e, '#home');
                }
              }}
              title={isUrdu ? 'القلم اسکول (مینو دیکھنے کے لیے ہوور یا کلک کریں)' : 'Al-Qalam School (Hover or tap to explore options)'}
              className="group flex items-center focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-2xl p-0.5 sm:p-1 active:scale-98 transition-transform duration-200 cursor-pointer"
            >
              {/* Header Logo Badge with subtle punchy spring scale */}
              <div
                className="relative z-40 flex items-center justify-center bg-[#3A0505]/80 backdrop-blur-xl rounded-2xl p-1.5 border border-white/25 shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] origin-left group-hover:border-[#D4AF37] group-hover:shadow-[0_6px_24px_rgba(212,175,55,0.45)] group-hover:scale-105 active:scale-95 transition-all duration-300"
                style={{
                  transform: isScrolled ? 'scale(0.92)' : 'scale(1)',
                  transition: `transform 400ms ${springEase}, border-color 260ms ease, box-shadow 260ms ease`,
                }}
              >
                <div className="block sm:hidden">
                  <AlqalamLogoBadge
                    size="custom"
                    badgeSize={44}
                    showText={false}
                    variant="dark-bg"
                  />
                </div>
                <div className="hidden sm:block">
                  <AlqalamLogoBadge
                    size="custom"
                    badgeSize={50}
                    showText={false}
                    variant="dark-bg"
                  />
                </div>

                {/* Luminous Warm Backlight & Hover Aura Glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#D4AF37]/35 via-white/20 to-transparent rounded-full blur-md opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-400 pointer-events-none" />
              </div>

              {/* School Name, Tagline & Soft Interactive Indicator - Slides & Fades Behind Logo on Scroll with Soft Bouncy Easing */}
              <div
                className="hidden sm:flex flex-col relative z-20 whitespace-nowrap px-3.5"
                style={{
                  opacity: isCollapsed ? 0 : 1,
                  transform: isCollapsed
                    ? (isUrdu ? 'translate3d(45px, 0, 0) scale(0.85)' : 'translate3d(-45px, 0, 0) scale(0.85)')
                    : 'translate3d(0, 0, 0) scale(1)',
                  filter: isCollapsed ? 'blur(4px)' : 'blur(0px)',
                  transition: isCollapsed
                    ? `opacity 280ms ${hideEase}, transform 340ms ${hideEase}, filter 280ms ease`
                    : `opacity 480ms ${springEase} 60ms, transform 540ms ${springEase} 60ms, filter 400ms ease 60ms`,
                  pointerEvents: isCollapsed ? 'none' : 'auto',
                }}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="font-serif font-bold tracking-wider leading-none text-[#FAF8F3] text-xl md:text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] inline-block transition-colors duration-200 group-hover:text-white"
                  >
                    {isUrdu ? 'القلم' : 'Al-Qalam'}
                  </span>

                  {/* Curvy Mini Sparkle / Chevron Indicator signaling interactive bubble */}
                  <span
                    className={`inline-flex items-center justify-center w-4.5 h-4.5 rounded-full bg-white/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[9px] group-hover:bg-[#D4AF37] group-hover:text-[#3A0505] transition-all duration-300 ${
                      logoBubbleOpen && bubbleAnchor === 'header' ? 'rotate-180 bg-[#D4AF37] text-[#3A0505]' : 'rotate-0'
                    }`}
                  >
                    <ChevronDown size={11} className="stroke-[2.5]" />
                  </span>
                </div>

                <span
                  className="font-sans tracking-[0.24em] uppercase font-semibold text-[10px] md:text-[11px] leading-tight mt-1 text-[#F2C94C] drop-shadow-sm inline-block transition-colors duration-200 group-hover:text-[#FAF8F3]"
                >
                  {isUrdu ? 'اسلامک اسکول' : 'Islamic School'}
                </span>
              </div>
            </a>

            {/* ============================================================ */}
            {/* CURVY FROSTED TRANSPARENT BUBBLE WINDOW (Attached to Header Logo) */}
            {/* ============================================================ */}
            {logoBubbleMounted && bubbleAnchor === 'header' && (
              <div
                onMouseEnter={() => openLogoBubble('header')}
                onMouseLeave={() => closeLogoBubble(false)}
                className={`absolute top-[calc(100%+14px)] ${
                  isUrdu ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
                } w-[320px] sm:w-[390px] md:w-[430px] max-w-[calc(100vw-24px)] rounded-[28px] overflow-hidden z-50 p-4 sm:p-5 border border-[#D4AF37]/50 shadow-[0_28px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(212,175,55,0.22),inset_0_1.5px_1px_rgba(255,255,255,0.35)] select-none`}
                style={{
                  backgroundColor: 'rgba(46, 5, 7, 0.94)',
                  backdropFilter: 'blur(36px) saturate(190%) contrast(105%)',
                  WebkitBackdropFilter: 'blur(36px) saturate(190%) contrast(105%)',
                  opacity: logoBubbleOpen ? 1 : 0,
                  transform: logoBubbleOpen
                    ? 'scale(1) translateY(0)'
                    : 'scale(0.88) translateY(-14px)',
                  transition: logoBubbleOpen
                    ? 'opacity 340ms cubic-bezier(0.34, 1.45, 0.64, 1), transform 380ms cubic-bezier(0.34, 1.45, 0.64, 1)'
                    : 'opacity 220ms ease-out, transform 240ms ease-out',
                  pointerEvents: logoBubbleOpen ? 'auto' : 'none',
                }}
              >
                {/* Top Frosted Pointer Notch */}
                <div
                  className={`absolute -top-2 ${
                    isUrdu ? 'right-7' : 'left-7'
                  } w-4 h-4 rotate-45 bg-[#3A0505] border-t border-l border-[#D4AF37]/60 pointer-events-none shadow-sm`}
                />

                {/* Ambient Specular Glass Top Sheen */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                {/* 1. Header of Bubble Window */}
                <div className="flex items-center justify-between pb-3.5 border-b border-white/15">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#3A0505] border border-[#D4AF37]/60 p-0.5 shadow-md shrink-0 flex items-center justify-center">
                      <AlqalamLogoBadge
                        size="custom"
                        badgeSize={26}
                        showText={false}
                        variant="dark-bg"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-serif font-bold text-sm text-[#FAF8F3] leading-tight">
                        {isUrdu ? 'القلم اسلامک اسکول' : 'Al-Qalam Islamic School'}
                      </span>
                      <span className="text-[10px] text-[#D4AF37] font-sans tracking-wide">
                        {isUrdu ? 'فوری مینو و لنکس' : 'Quick Access & Options'}
                      </span>
                    </div>
                  </div>

                  {/* Close button for touch / convenience */}
                  <button
                    type="button"
                    onClick={() => closeLogoBubble(true)}
                    className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* 2. Navigation Options Grid (Options visible on header) */}
                <div className="py-3 grid grid-cols-2 gap-2">
                  {navItems.map((item, idx) => {
                    const sectionId = item.href.replace('#', '');
                    const isActive = activeSection === sectionId;
                    const IconComponent = item.icon;

                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          handleNavClick(e, item.href);
                          closeLogoBubble(true);
                        }}
                        style={{
                          transitionDelay: `${idx * 25}ms`,
                        }}
                        className={`group/item flex items-start gap-2.5 p-2.5 rounded-2xl border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer active:scale-[0.96] ${
                          isActive
                            ? 'bg-gradient-to-r from-[#F2C94C] via-[#D4AF37] to-[#F2C94C] text-[#3A0505] border-[#F2C94C] shadow-[0_4px_14px_rgba(212,175,55,0.4)]'
                            : 'bg-black/30 hover:bg-white/12 border-white/10 hover:border-[#D4AF37]/50 text-[#FAF8F3] hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:-translate-y-0.5'
                        }`}
                      >
                        <div
                          className={`p-1.5 rounded-xl shrink-0 transition-transform duration-300 ease-out group-hover/item:scale-110 ${
                            isActive
                              ? 'bg-[#3A0505] text-[#D4AF37]'
                              : 'bg-[#3A0505]/80 text-[#D4AF37] border border-[#D4AF37]/30'
                          }`}
                        >
                          <IconComponent size={14} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span
                            className={`font-semibold text-xs leading-tight truncate ${
                              isActive ? 'text-[#3A0505] font-bold' : 'text-white'
                            }`}
                          >
                            {item.label}
                          </span>
                          <span
                            className={`text-[9px] leading-tight truncate mt-0.5 ${
                              isActive ? 'text-[#3A0505]/80' : 'text-white/60'
                            }`}
                          >
                            {item.desc}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* 3. Language Quick Switcher */}
                <div className="pt-2 pb-3 border-t border-white/15">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-[#FAF8F3]/80 font-medium flex items-center gap-1.5">
                      <Languages size={13} className="text-[#D4AF37]" />
                      <span>{isUrdu ? 'زبان تبدیل کریں:' : 'Language:'}</span>
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F2C94C] font-semibold">
                      {isUrdu ? 'اردو' : 'English'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => setLanguage('en')}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-1 cursor-pointer active:scale-[0.95] ${
                        !isUrdu
                          ? 'bg-gradient-to-r from-[#F2C94C] to-[#D4AF37] text-[#3A0505] shadow-sm font-bold'
                          : 'text-[#FAF8F3]/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {!isUrdu && <Check size={11} className="stroke-[3] text-[#3A0505]" />}
                      <span>English</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLanguage('ur')}
                      className={`py-1.5 px-2 rounded-lg text-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-1 font-urdu cursor-pointer active:scale-[0.95] ${
                        isUrdu
                          ? 'bg-gradient-to-r from-[#F2C94C] to-[#D4AF37] text-[#3A0505] shadow-sm font-bold'
                          : 'text-[#FAF8F3]/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {isUrdu && <Check size={11} className="stroke-[3] text-[#3A0505]" />}
                      <span className="text-[12px]">اردو</span>
                    </button>
                  </div>
                </div>

                {/* 4. Action & Direct Contact Footer Strip */}
                <div className="pt-2 border-t border-white/15 space-y-2">
                  <a
                    href="#admissions"
                    onClick={(e) => {
                      handleNavClick(e, '#admissions');
                      closeLogoBubble(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full font-bold text-center bg-gradient-to-r from-[#F2C94C] via-[#D4AF37] to-[#F2C94C] text-[#3A0505] hover:from-[#FAF8F3] hover:to-[#D4AF37] shadow-[0_4px_16px_rgba(212,175,55,0.45)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.65),0_0_12px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.96] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border border-white/40 uppercase tracking-wider text-[11px]"
                  >
                    <span>{t.nav.applyNow}</span>
                    <ArrowRight size={13} className={isUrdu ? 'rotate-180' : ''} />
                  </a>

                  <div className="grid grid-cols-2 gap-1.5">
                    <a
                      href={`https://wa.me/${SITE_CONFIG.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        isUrdu
                          ? 'السلام علیکم! میں القلم اسکول کے داخلوں اور نصاب کے بارے میں معلومات حاصل کرنا چاہتا ہوں۔'
                          : 'Assalam-o-Alaikum, I would like to inquire about Alqalam Islamic School admissions.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => closeLogoBubble(true)}
                      className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-[#08783F]/25 hover:bg-[#08783F]/45 border border-[#08783F]/40 text-[#25D366] hover:text-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] active:scale-[0.95] text-[10px] font-semibold"
                    >
                      <MessageCircle size={12} className="shrink-0 text-[#25D366]" />
                      <span>{isUrdu ? 'واٹس ایپ رابطہ' : 'WhatsApp'}</span>
                    </a>

                    <a
                      href={`tel:${SITE_CONFIG.phone}`}
                      onClick={() => closeLogoBubble(true)}
                      className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-[#FAF8F3] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] active:scale-[0.95] text-[10px] font-medium"
                    >
                      <Phone size={11} className="text-[#D4AF37] shrink-0" />
                      <span>{isUrdu ? 'فون کال' : 'Call Now'}</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>


          {/* CENTER: Floating Nav Pill - Slides & Fades Behind Logo on Scroll */}
          <div className="hidden lg:flex items-center flex-1 justify-center px-4 relative z-20">
            <nav
              className="flex items-center px-3 py-1 rounded-full border border-white/15 bg-black/45 backdrop-blur-2xl"
              style={{
                boxShadow: 'inset 0 1.5px 1px rgba(255, 255, 255, 0.22), 0 8px 24px rgba(0, 0, 0, 0.35)',
                opacity: isCollapsed ? 0 : 1,
                transform: isCollapsed
                  ? (isUrdu ? 'translate3d(120px, 0, 0) scale(0.88)' : 'translate3d(-120px, 0, 0) scale(0.88)')
                  : 'translate3d(0, 0, 0) scale(1)',
                filter: isCollapsed ? 'blur(6px)' : 'blur(0px)',
                transition: isCollapsed
                  ? `opacity 280ms ${hideEase} 40ms, transform 340ms ${hideEase} 40ms, filter 280ms ease`
                  : `opacity 480ms ${springEase} 100ms, transform 540ms ${springEase} 100ms, filter 400ms ease 100ms`,
                pointerEvents: isCollapsed ? 'none' : 'auto',
              }}
            >
              <div className="flex items-center gap-1 xl:gap-1.5">
                {navItems.map((item, idx) => {
                  const sectionId = item.href.replace('#', '');
                  const isActive = activeSection === sectionId;
                  const expandDelay = 120 + idx * 35;
                  const collapseDelay = (navItems.length - 1 - idx) * 20;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      style={{
                        opacity: isCollapsed ? 0 : 1,
                        transform: isCollapsed
                          ? (isUrdu ? 'translate3d(50px, 0, 0) scale(0.85)' : 'translate3d(-50px, 0, 0) scale(0.85)')
                          : 'translate3d(0, 0, 0) scale(1)',
                        transition: isCollapsed
                          ? `opacity 240ms ${hideEase} ${collapseDelay}ms, transform 280ms ${hideEase} ${collapseDelay}ms`
                          : `opacity 440ms ${springEase} ${expandDelay}ms, transform 500ms ${springEase} ${expandDelay}ms`,
                      }}
                      className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform active:scale-95 group select-none ${
                        isActive
                          ? 'text-[#3A0505] font-bold shadow-sm'
                          : 'text-[#FAF8F3]/90 hover:text-white hover:bg-white/12 hover:scale-[1.03]'
                      }`}
                    >
                      {/* Active Floating Pill Background */}
                      {isActive && (
                        <span className="absolute inset-0 bg-gradient-to-r from-[#F2C94C] via-[#D4AF37] to-[#F2C94C] rounded-full shadow-[0_0_14px_rgba(212,175,55,0.65),inset_0_1px_1px_rgba(255,255,255,0.4)] -z-10 animate-in fade-in duration-200" />
                      )}

                      {/* Hover subtle underline */}
                      {!isActive && (
                        <span className="absolute bottom-0.5 left-3 right-3 h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
                      )}

                      <span className="relative z-10">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* RIGHT: CTA Button - Slides & Fades Behind Logo on Scroll */}
          <div className="flex items-center gap-2 sm:gap-3 relative z-30">
            {/* CTA Button */}
            <div
              style={{
                opacity: isCollapsed ? 0 : 1,
                transform: isCollapsed
                  ? (isUrdu ? 'translate3d(180px, 0, 0) scale(0.82)' : 'translate3d(-180px, 0, 0) scale(0.82)')
                  : 'translate3d(0, 0, 0) scale(1)',
                filter: isCollapsed ? 'blur(5px)' : 'blur(0px)',
                transition: isCollapsed
                  ? `opacity 260ms ${hideEase}, transform 320ms ${hideEase}, filter 260ms ease`
                  : `opacity 500ms ${springEase} 220ms, transform 580ms ${springEase} 220ms, filter 420ms ease 220ms`,
                pointerEvents: isCollapsed ? 'none' : 'auto',
              }}
            >
              <a
                href="#admissions"
                onClick={(e) => handleNavClick(e, '#admissions')}
                className="relative inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-full font-bold text-[11px] sm:text-xs uppercase tracking-widest text-[#3A0505] bg-gradient-to-r from-[#F2C94C] via-[#D4AF37] to-[#F2C94C] hover:from-[#FAF8F3] hover:to-[#D4AF37] shadow-[0_3px_12px_rgba(212,175,55,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_8px_24px_rgba(212,175,55,0.65),0_0_12px_rgba(255,255,255,0.4)] hover:scale-[1.03] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border border-white/50 group"
              >
                <span>{t.nav.applyNow}</span>
                <ArrowRight
                  size={13}
                  className={`transition-transform duration-300 ease-out ${isUrdu ? 'group-hover:-translate-x-1.5 rotate-180' : 'group-hover:translate-x-1.5'}`}
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* FLOATING SCROLL LOGO DOCK (Active during scroll away from Home) */}
      {/* Features soft punchy bounce on scroll down, persists across sections, */}
      {/* and softly bounces/fades back into header on return to Home */}
      {/* ============================================================ */}
      <div
        ref={floatingLogoRef}
        onMouseEnter={() => openLogoBubble('floating')}
        onMouseLeave={() => closeLogoBubble(false)}
        className={`fixed top-3 sm:top-3.5 ${
          isUrdu ? 'right-4 sm:right-6 lg:right-10' : 'left-4 sm:left-6 lg:left-10'
        } z-[60] select-none`}
        style={{
          opacity: isScrolled ? 1 : 0,
          transform: isScrolled
            ? 'translate3d(0, 0, 0) scale(1)'
            : (isUrdu ? 'translate3d(30px, -20px, 0) scale(0.82)' : 'translate3d(-30px, -20px, 0) scale(0.82)'),
          filter: isScrolled ? 'blur(0px)' : 'blur(4px)',
          transition: isScrolled
            ? `opacity 380ms ${springEase}, transform 440ms ${springEase}, filter 300ms ease`
            : `opacity 260ms ${hideEase}, transform 300ms ${hideEase}, filter 240ms ease`,
          pointerEvents: isScrolled ? 'auto' : 'none',
        }}
      >
        <div className="relative group">
          {/* Interactive Floating Pill Badge */}
          <a
            href="#home"
            onClick={(e) => {
              if (window.innerWidth < 1024) {
                e.preventDefault();
                toggleLogoBubble('floating');
              } else {
                handleNavClick(e, '#home');
              }
            }}
            title={isUrdu ? 'مرکزی صفحہ پر جائیں / فوری مینو' : 'Scroll to Home / Quick Menu'}
            className="flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#3A0505]/75 hover:bg-[#3A0505]/88 backdrop-blur-xl saturate-150 border border-white/20 hover:border-[#D4AF37]/80 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_18px_rgba(212,175,55,0.28),inset_0_1.5px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_12px_36px_rgba(212,175,55,0.55),0_0_22px_rgba(255,255,255,0.35)] hover:scale-105 active:scale-[0.94] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
          >
            {/* Logo Emblem with aura glow */}
            <div className="relative flex items-center justify-center">
              <AlqalamLogoBadge
                size="custom"
                badgeSize={40}
                showText={false}
                variant="dark-bg"
              />
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#D4AF37]/45 via-white/30 to-transparent rounded-full blur-md opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 pointer-events-none" />
            </div>

            {/* School Label & Chevron in Floating Pill */}
            <div className="hidden sm:flex flex-col items-start pr-1 pl-0.5">
              <div className="flex items-center gap-1">
                <span className="font-serif font-bold text-xs text-[#FAF8F3] leading-none drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.9)]">
                  {isUrdu ? 'القلم' : 'Al-Qalam'}
                </span>
                <span
                  className={`inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-white/15 text-[#D4AF37] text-[8px] transition-transform duration-300 ${
                    logoBubbleOpen && bubbleAnchor === 'floating' ? 'rotate-180 bg-[#D4AF37] text-[#3A0505]' : 'rotate-0'
                  }`}
                >
                  <ChevronDown size={9} className="stroke-[3]" />
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-[#F2C94C] font-semibold mt-0.5 leading-none drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                {isUrdu ? 'اسلامک اسکول' : 'Islamic School'}
              </span>
            </div>
          </a>

          {/* Floating Dock Quick-Access Bubble Window */}
          {logoBubbleMounted && bubbleAnchor === 'floating' && (
            <div
              onMouseEnter={() => openLogoBubble('floating')}
              onMouseLeave={() => closeLogoBubble(false)}
              className={`absolute top-[calc(100%+12px)] ${
                isUrdu ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
              } w-[320px] sm:w-[390px] md:w-[430px] max-w-[calc(100vw-24px)] rounded-[28px] overflow-hidden z-50 p-4 sm:p-5 border border-[#D4AF37]/50 shadow-[0_28px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(212,175,55,0.22),inset_0_1.5px_1px_rgba(255,255,255,0.35)] select-none`}
              style={{
                backgroundColor: 'rgba(46, 5, 7, 0.88)',
                backdropFilter: 'blur(36px) saturate(190%) contrast(105%)',
                WebkitBackdropFilter: 'blur(36px) saturate(190%) contrast(105%)',
                opacity: logoBubbleOpen ? 1 : 0,
                transform: logoBubbleOpen
                  ? 'scale(1) translateY(0)'
                  : 'scale(0.88) translateY(-14px)',
                transition: logoBubbleOpen
                  ? 'opacity 340ms cubic-bezier(0.34, 1.45, 0.64, 1), transform 380ms cubic-bezier(0.34, 1.45, 0.64, 1)'
                  : 'opacity 220ms ease-out, transform 240ms ease-out',
                pointerEvents: logoBubbleOpen ? 'auto' : 'none',
              }}
            >
              {/* Pointer Notch */}
              <div
                className={`absolute -top-2 ${
                  isUrdu ? 'right-6' : 'left-6'
                } w-4 h-4 rotate-45 bg-[#3A0505] border-t border-l border-[#D4AF37]/60 pointer-events-none shadow-sm`}
              />

              {/* Ambient Specular Glass Top Sheen */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/15">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#3A0505] border border-[#D4AF37]/60 p-0.5 shadow-md shrink-0 flex items-center justify-center">
                    <AlqalamLogoBadge
                      size="custom"
                      badgeSize={26}
                      showText={false}
                      variant="dark-bg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif font-bold text-sm text-[#FAF8F3] leading-tight">
                      {isUrdu ? 'القلم اسلامک اسکول' : 'Al-Qalam Islamic School'}
                    </span>
                    <span className="text-[10px] text-[#D4AF37] font-sans tracking-wide">
                      {isUrdu ? 'فوری مینو و لنکس' : 'Quick Access & Options'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => closeLogoBubble(true)}
                  className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Navigation Options Grid */}
              <div className="py-3 grid grid-cols-2 gap-2">
                {navItems.map((item, idx) => {
                  const sectionId = item.href.replace('#', '');
                  const isActive = activeSection === sectionId;
                  const IconComponent = item.icon;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        handleNavClick(e, item.href);
                        closeLogoBubble(true);
                      }}
                      style={{
                        transitionDelay: `${idx * 25}ms`,
                      }}
                      className={`group/item flex items-start gap-2.5 p-2.5 rounded-2xl border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer active:scale-[0.96] ${
                        isActive
                          ? 'bg-gradient-to-r from-[#F2C94C] via-[#D4AF37] to-[#F2C94C] text-[#3A0505] border-[#F2C94C] shadow-[0_4px_14px_rgba(212,175,55,0.4)]'
                          : 'bg-black/30 hover:bg-white/12 border-white/10 hover:border-[#D4AF37]/50 text-[#FAF8F3] hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:-translate-y-0.5'
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-xl shrink-0 transition-transform duration-300 ease-out group-hover/item:scale-110 ${
                          isActive
                            ? 'bg-[#3A0505] text-[#D4AF37]'
                            : 'bg-[#3A0505]/80 text-[#D4AF37] border border-[#D4AF37]/30'
                        }`}
                      >
                        <IconComponent size={14} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span
                          className={`font-semibold text-xs leading-tight truncate ${
                            isActive ? 'text-[#3A0505] font-bold' : 'text-white'
                          }`}
                        >
                          {item.label}
                        </span>
                        <span
                          className={`text-[9px] leading-tight truncate mt-0.5 ${
                            isActive ? 'text-[#3A0505]/80' : 'text-white/60'
                          }`}
                        >
                          {item.desc}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Language Switcher */}
              <div className="pt-2 pb-3 border-t border-white/15">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-[#FAF8F3]/80 font-medium flex items-center gap-1.5">
                    <Languages size={13} className="text-[#D4AF37]" />
                    <span>{isUrdu ? 'زبان تبدیل کریں:' : 'Language:'}</span>
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F2C94C] font-semibold">
                    {isUrdu ? 'اردو' : 'English'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-1 cursor-pointer active:scale-[0.95] ${
                      !isUrdu
                        ? 'bg-gradient-to-r from-[#F2C94C] to-[#D4AF37] text-[#3A0505] shadow-sm font-bold'
                        : 'text-[#FAF8F3]/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {!isUrdu && <Check size={11} className="stroke-[3] text-[#3A0505]" />}
                    <span>English</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLanguage('ur')}
                    className={`py-1.5 px-2 rounded-lg text-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-1 font-urdu cursor-pointer active:scale-[0.95] ${
                      isUrdu
                        ? 'bg-gradient-to-r from-[#F2C94C] to-[#D4AF37] text-[#3A0505] shadow-sm font-bold'
                        : 'text-[#FAF8F3]/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {isUrdu && <Check size={11} className="stroke-[3] text-[#3A0505]" />}
                    <span className="text-[12px]">اردو</span>
                  </button>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="pt-2 border-t border-white/15 space-y-2">
                <a
                  href="#admissions"
                  onClick={(e) => {
                    handleNavClick(e, '#admissions');
                    closeLogoBubble(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full font-bold text-center bg-gradient-to-r from-[#F2C94C] via-[#D4AF37] to-[#F2C94C] text-[#3A0505] hover:from-[#FAF8F3] hover:to-[#D4AF37] shadow-[0_4px_16px_rgba(212,175,55,0.45)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.65),0_0_12px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.96] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border border-white/40 uppercase tracking-wider text-[11px]"
                >
                  <span>{t.nav.applyNow}</span>
                  <ArrowRight size={13} className={isUrdu ? 'rotate-180' : ''} />
                </a>

                <div className="grid grid-cols-2 gap-1.5">
                  <a
                    href={`https://wa.me/${SITE_CONFIG.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      isUrdu
                        ? 'السلام علیکم! میں القلم اسکول کے داخلوں اور نصاب کے بارے میں معلومات حاصل کرنا چاہتا ہوں۔'
                        : 'Assalam-o-Alaikum, I would like to inquire about Alqalam Islamic School admissions.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => closeLogoBubble(true)}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-[#08783F]/25 hover:bg-[#08783F]/45 border border-[#08783F]/40 text-[#25D366] hover:text-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] active:scale-[0.95] text-[10px] font-semibold"
                  >
                    <MessageCircle size={12} className="shrink-0 text-[#25D366]" />
                    <span>{isUrdu ? 'واٹس ایپ رابطہ' : 'WhatsApp'}</span>
                  </a>

                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    onClick={() => closeLogoBubble(true)}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-[#FAF8F3] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] active:scale-[0.95] text-[10px] font-medium"
                  >
                    <Phone size={11} className="text-[#D4AF37] shrink-0" />
                    <span>{isUrdu ? 'فون کال' : 'Call Now'}</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
