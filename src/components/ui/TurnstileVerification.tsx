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

// Cloudflare Turnstile Always-Passes Test Sitekey for local & preview development:
// 1x00000000000000000000AA
const DEFAULT_SITE_KEY = '1x00000000000000000000AA';

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

  const siteKey =
    (import.meta.env.VITE_TURNSTILE_SITEKEY as string | undefined) || DEFAULT_SITE_KEY;

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
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
          <ShieldCheck size={14} className="shrink-0 text-amber-600" />
          <span>
            {isUrdu
              ? 'سیکیورٹی سروس لوڈ کی جا رہی ہے۔ اگر نہ ہو تو پیج ریفریش کریں۔'
              : 'Security verification is initializing. If blocked by an ad-blocker, please allow challenges.cloudflare.com.'}
          </span>
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
