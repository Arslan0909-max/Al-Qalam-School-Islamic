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
  distance = 28,
  duration = 600,
  easing = 'spring',
  threshold = 0.08,
  once = false, // Set to false by default so animation triggers every time user scrolls
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentEl = ref.current;
    if (!currentEl) return;

    // Check if element is currently in viewport on mount
    const rect = currentEl.getBoundingClientRect();
    const isInInitialView = rect.top < window.innerHeight && rect.bottom > 0;
    if (isInInitialView) {
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
        } else {
          // If once is false, reset visibility when scrolled out so it animates again on return
          if (!once) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold,
        rootMargin: '60px 0px -40px 0px', // Smooth pre-trigger zone
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.unobserve(currentEl);
    };
  }, [threshold, once]);

  // Easing curve mappings with formal punchy spring and soft depth
  const easingCurves: Record<ScrollAnimationEasing, string> = {
    spring: 'cubic-bezier(0.34, 1.38, 0.64, 1)', // Punchy, soft spring with refined bounce
    bouncy: 'cubic-bezier(0.34, 1.55, 0.64, 1)', // Lively spring
    smooth: 'cubic-bezier(0.16, 1, 0.3, 1)', // Smooth deceleration
    gentle: 'cubic-bezier(0.25, 1, 0.5, 1)', // Soft gentle curve
    formal: 'cubic-bezier(0.2, 0.8, 0.2, 1)', // Formal cinematic curve
  };

  const getTransform = () => {
    if (isVisible) {
      return 'translate3d(0, 0, 0) scale(1) rotateX(0deg) rotateY(0deg)';
    }

    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0) scale(0.965)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0) scale(0.965)`;
      case 'left':
        return `translate3d(-${distance * 1.25}px, 0, 0) scale(0.965)`;
      case 'right':
        return `translate3d(${distance * 1.25}px, 0, 0) scale(0.965)`;
      case 'zoom':
        return 'translate3d(0, 14px, 0) scale(0.91)';
      case 'flip':
        return 'perspective(900px) rotateX(12deg) translate3d(0, 24px, 0) scale(0.95)';
      case 'blur':
        return 'translate3d(0, 18px, 0) scale(0.97)';
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

  // Prevent overly long delays when scrolling rapidly
  const effectiveDelay = isVisible ? Math.min(delay, 300) : 0;
  const currentDuration = isVisible ? duration : 350;

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
      }}
    >
      {children}
    </div>
  );
};
