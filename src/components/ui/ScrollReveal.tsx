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

export type ScrollAnimationEasing = 'spring' | 'smooth' | 'bouncy' | 'gentle';

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
  distance = 24,
  duration = 550,
  easing = 'spring',
  threshold = 0.05,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentEl = ref.current;
    if (!currentEl) return;

    // Check if element is already in viewport on mount (e.g. top hero items)
    const rect = currentEl.getBoundingClientRect();
    if (rect.top <= window.innerHeight + 60 && rect.bottom >= -60) {
      setIsVisible(true);
      if (once) return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '100px 0px 40px 0px', // Pre-trigger slightly before entering viewport
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.unobserve(currentEl);
    };
  }, [threshold, once]);

  // Easing curve mappings
  const easingCurves: Record<ScrollAnimationEasing, string> = {
    spring: 'cubic-bezier(0.34, 1.45, 0.64, 1)', // Soft, cute lively bounce
    bouncy: 'cubic-bezier(0.34, 1.65, 0.64, 1)', // More expressive spring bounce
    smooth: 'cubic-bezier(0.16, 1, 0.3, 1)', // Clean deceleration
    gentle: 'cubic-bezier(0.25, 1, 0.5, 1)', // Subtle gentle curve
  };

  const getTransform = () => {
    if (isVisible) {
      return 'translate3d(0, 0, 0) scale(1) rotateX(0deg)';
    }

    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0) scale(0.96)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0) scale(0.96)`;
      case 'left':
        return `translate3d(-${distance * 1.3}px, 0, 0) scale(0.96)`;
      case 'right':
        return `translate3d(${distance * 1.3}px, 0, 0) scale(0.96)`;
      case 'zoom':
        return 'translate3d(0, 10px, 0) scale(0.88)';
      case 'flip':
        return 'perspective(800px) rotateX(15deg) translate3d(0, 20px, 0) scale(0.95)';
      case 'blur':
      case 'none':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const getFilter = () => {
    if (direction === 'blur') {
      return isVisible ? 'blur(0px)' : 'blur(10px)';
    }
    return undefined;
  };

  // Safe delay capping for fast scrolls
  const effectiveDelay = Math.min(delay, 450);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        filter: getFilter(),
        transitionProperty: 'opacity, transform, filter',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${effectiveDelay}ms`,
        transitionTimingFunction: easingCurves[easing],
        willChange: isVisible ? 'auto' : 'transform, opacity, filter',
      }}
    >
      {children}
    </div>
  );
};
