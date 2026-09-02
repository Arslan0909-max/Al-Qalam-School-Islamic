import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AlertCircle, ShieldCheck } from 'lucide-react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact';
          action?: string;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

// Cloudflare Turnstile Live Sitekey for Alqalam School Islamic (Domain: al-qalam-school-islamic.vercel.app):
const DEFAULT_SITE_KEY = '0x4AAAAAAElDsvpo69_pA07e';

interface TurnstileVerificationProps {
  onVerify: (token: string | null) => void;
  hasError?: boolean;
  errorMessage?: string;
  className?: string;
  action?: string;
}

export const TurnstileVerification: React.FC<TurnstileVerificationProps> = ({
  onVerify,
  hasError = false,
  errorMessage,
  className = '',
  action = 'admission_inquiry',
}) => {
  const { isUrdu } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [fallbackChecked, setFallbackChecked] = useState(false);

  const siteKey =
    (import.meta.env.VITE_TURNSTILE_SITEKEY as string | undefined) ||
    ((import.meta.env as any).NEXT_PUBLIC_TURNSTILE_SITE_KEY as string | undefined) ||
    DEFAULT_SITE_KEY;

  useEffect(() => {
    let checkInterval: NodeJS.Timeout | null = null;
    let attempts = 0;

    const renderWidget = () => {
      if (!containerRef.current || !window.turnstile) return false;

      // Clean up previous widget if any
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
        widgetIdRef.current = null;
      }

      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          theme: 'light',
          callback: (token: string) => {
            onVerify(token);
            setLoadError(false);
          },
          'error-callback': () => {
            onVerify(null);
            setLoadError(true);
          },
          'expired-callback': () => {
            onVerify(null);
          },
        });
        widgetIdRef.current = id;
        setIsReady(true);
        return true;
      } catch (err) {
        console.warn('Turnstile render warning:', err);
        return false;
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      // Poll briefly for the external official script to finish initializing
      checkInterval = setInterval(() => {
        attempts += 1;
        if (window.turnstile) {
          if (renderWidget() && checkInterval) {
            clearInterval(checkInterval);
          }
        } else if (attempts > 30) {
          if (checkInterval) clearInterval(checkInterval);
          setLoadError(true);
        }
      }, 150);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, action, onVerify]);

  return (
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      {/* Official Cloudflare Turnstile Challenge Container */}
      <div className="min-h-[66px] flex items-center">
        <div ref={containerRef} className="turnstile-container" />
      </div>

      {loadError && (
        <div className="flex flex-col gap-2 p-3 rounded-lg bg-amber-50/90 border border-amber-200 text-amber-900 text-xs w-full max-w-sm">
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck size={16} className="shrink-0 text-amber-600" />
            <span>
              {isUrdu ? 'متبادل سیکیورٹی تصدیق' : 'Security Verification (Human Check)'}
            </span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer pt-1 text-neutral-800 select-none">
            <input
              type="checkbox"
              checked={fallbackChecked}
              onChange={(e) => {
                const checked = e.target.checked;
                setFallbackChecked(checked);
                onVerify(checked ? 'fallback-human-verified' : null);
              }}
              className="w-4 h-4 rounded text-emerald-600 border-neutral-300 focus:ring-emerald-500 cursor-pointer"
            />
            <span className="text-xs font-medium">
              {isUrdu ? 'میں انسان ہوں (تصدیق کریں)' : 'I confirm I am a human visitor'}
            </span>
          </label>
        </div>
      )}

      {hasError && !loadError && (
        <div className="flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle size={14} className="shrink-0" />
          <span>
            {errorMessage ||
              (isUrdu
                ? 'فارم بھیجنے سے پہلے اینٹی بوٹ تصدیق مکمل کریں۔'
                : 'Please complete the anti-bot verification before submitting.')}
          </span>
        </div>
      )}
    </div>
  );
};
