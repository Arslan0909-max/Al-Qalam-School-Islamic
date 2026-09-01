import React, { useEffect, useRef, useState } from 'react';

export type ScrollAnimationDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'zoom'
  | 'blur'
  | 'flip'
  | 'none';

export type ScrollAnimationEasing = 'spring' | 'smooth' | 'bouncy' | 'gentle' | 'formal';

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
  distance = 22,
  duration = 540,
  easing = 'spring',
  threshold = 0.05,
  once = true, // Once animated into view, stays stable and buttery smooth without unmounting glitches
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentEl = ref.current;
    if (!currentEl) return;

    let isMounted = true;

    // Check if element is already in viewport on initial load or fast scroll
    const rect = currentEl.getBoundingClientRect();
    const isInInitialView = rect.top < window.innerHeight * 1.15 && rect.bottom > -50;
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
        } else if (!once) {
          window.requestAnimationFrame(() => {
            if (isMounted) {
              setIsVisible(false);
            }
          });
        }
      },
      {
        threshold,
        rootMargin: '60px 0px 40px 0px',
      }
    );

    observer.observe(currentEl);

    return () => {
      isMounted = false;
      observer.unobserve(currentEl);
    };
  }, [threshold, once]);

  // Easing curve mappings with Apple-grade physical dynamics
  const easingCurves: Record<ScrollAnimationEasing, string> = {
    spring: 'cubic-bezier(0.34, 1.35, 0.64, 1)', // Punchy, soft spring with refined bounce
    bouncy: 'cubic-bezier(0.34, 1.55, 0.64, 1)', // Lively energetic spring
    smooth: 'cubic-bezier(0.22, 1, 0.36, 1)', // Silky Apple quintic deceleration
    gentle: 'cubic-bezier(0.25, 1, 0.5, 1)', // Soft gentle curve
    formal: 'cubic-bezier(0.2, 0.8, 0.2, 1)', // Formal cinematic curve
  };

  const getTransform = () => {
    if (isVisible) {
      return 'translate3d(0, 0, 0) scale(1) rotateX(0deg) rotateY(0deg)';
    }

    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0) scale(0.975)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0) scale(0.975)`;
      case 'left':
        return `translate3d(-${distance * 1.15}px, 0, 0) scale(0.975)`;
      case 'right':
        return `translate3d(${distance * 1.15}px, 0, 0) scale(0.975)`;
      case 'zoom':
        return 'translate3d(0, 10px, 0) scale(0.92)';
      case 'flip':
        return 'perspective(1000px) rotateX(10deg) translate3d(0, 20px, 0) scale(0.96)';
      case 'blur':
        return 'translate3d(0, 14px, 0) scale(0.98)';
      case 'none':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const getFilter = () => {
    if (direction === 'blur') {
      return isVisible ? 'blur(0px)' : 'blur(6px)';
    }
    return undefined;
  };

  // Prevent overly long delays when scrolling rapidly
  const effectiveDelay = isVisible ? Math.min(delay, 280) : 0;
  const currentDuration = isVisible ? duration : 320;

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
        transitionTimingFunction: isVisible ? easingCurves[easing] : 'cubic-bezier(0.4, 0, 1, 1)',
        willChange: isVisible ? 'auto' : 'transform, opacity',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </div>
  );
};

