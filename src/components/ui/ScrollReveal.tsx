import React, { useEffect, useRef, useState } from 'react';

export type ScrollAnimationDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'zoom'
  | 'blur'
  | 'flip'
  | 'fade'
  | 'none';

export type ScrollAnimationEasing = 'spring' | 'smooth' | 'bouncy' | 'gentle' | 'formal' | 'luxury';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: ScrollAnimationDirection;
  distance?: number;
  duration?: number;
  easing?: ScrollAnimationEasing;
  threshold?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 32,
  duration = 640,
  easing = 'luxury',
  threshold = 0.06,
  once = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScrollDir = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current + 3) {
        setIsScrollingDown(true);
      } else if (currentScrollY < lastScrollYRef.current - 3) {
        setIsScrollingDown(false);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScrollDir, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollDir);
  }, []);

  useEffect(() => {
    const currentEl = ref.current;
    if (!currentEl) return;

    let isMounted = true;

    // Check if element is already in viewport on initial render
    const rect = currentEl.getBoundingClientRect();
    const isInInitialView = rect.top < window.innerHeight && rect.bottom > 0;
    if (isInInitialView) {
      setIsVisible(true);
      if (once) return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!isMounted) return;
        const entry = entries[0];
        if (entry.isIntersecting) {
          window.requestAnimationFrame(() => {
            if (isMounted) {
              setIsVisible(true);
            }
          });
          if (once) {
            observer.unobserve(entry.target);
          }
        } else {
          // Responsive fluid reset when element departs viewport
          if (!once) {
            window.requestAnimationFrame(() => {
              if (isMounted) {
                setIsVisible(false);
              }
            });
          }
        }
      },
      {
        threshold,
        rootMargin: '60px 0px -45px 0px', // Perfectly buffered optical reading boundary
      }
    );

    observer.observe(currentEl);

    return () => {
      isMounted = false;
      observer.unobserve(currentEl);
    };
  }, [threshold, once]);

  // Luxury Apple-grade Easing Curves with buttery dynamic response
  const easingCurves: Record<ScrollAnimationEasing, string> = {
    luxury: 'cubic-bezier(0.16, 1, 0.3, 1)', // Supreme Apple iOS quintic easing
    spring: 'cubic-bezier(0.34, 1.35, 0.64, 1)', // Punchy physical spring
    bouncy: 'cubic-bezier(0.34, 1.55, 0.64, 1)', // Lively energetic spring
    smooth: 'cubic-bezier(0.22, 1, 0.36, 1)', // Silky deceleration
    gentle: 'cubic-bezier(0.25, 1, 0.5, 1)', // Gentle natural curve
    formal: 'cubic-bezier(0.2, 0.8, 0.2, 1)', // Formal cinematic curve
  };

  const getTransform = () => {
    if (isVisible) {
      return 'translate3d(0, 0, 0) scale(1) rotateX(0deg) rotateY(0deg)';
    }

    // Adaptive bidirectional offsets (scroll up vs scroll down)
    const effectiveDistance = isScrollingDown ? distance : -distance * 0.75;

    switch (direction) {
      case 'up':
        return `translate3d(0, ${effectiveDistance}px, 0) scale(0.975)`;
      case 'down':
        return `translate3d(0, -${effectiveDistance}px, 0) scale(0.975)`;
      case 'left':
        return `translate3d(-${distance * 1.2}px, 0, 0) scale(0.975)`;
      case 'right':
        return `translate3d(${distance * 1.2}px, 0, 0) scale(0.975)`;
      case 'zoom':
        return 'translate3d(0, 16px, 0) scale(0.92)';
      case 'flip':
        return 'perspective(1000px) rotateX(12deg) translate3d(0, 24px, 0) scale(0.96)';
      case 'blur':
        return 'translate3d(0, 18px, 0) scale(0.97)';
      case 'fade':
        return 'translate3d(0, 8px, 0) scale(0.99)';
      case 'none':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const getFilter = () => {
    if (direction === 'blur') {
      return isVisible ? 'blur(0px)' : 'blur(8px)';
    }
    return undefined;
  };

  // Safe delay cap prevents lag when scrolling quickly
  const effectiveDelay = isVisible ? Math.min(delay, 220) : 0;
  const currentDuration = isVisible ? duration : 340;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        filter: getFilter(),
        transitionProperty: 'opacity, transform, filter',
        transitionDuration: `${currentDuration}ms`,
        transitionDelay: `${effectiveDelay}ms`,
        transitionTimingFunction: isVisible ? easingCurves[easing] : 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        willChange: isVisible ? 'auto' : 'transform, opacity, filter',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};


