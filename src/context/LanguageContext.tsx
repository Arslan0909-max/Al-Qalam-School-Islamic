import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS, Translations } from '../constants/translations';

export type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isUrdu: boolean;
  dir: 'ltr' | 'rtl';
  t: Translations;
  isTransitioning: boolean;
  isRevealing: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'alqalam_lang_pref';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'ur') {
        return saved;
      }
    }
    return 'en';
  });

  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isRevealing, setIsRevealing] = useState<boolean>(false);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;

    // 1. Activate rich maroon-purple processing veil
    setIsTransitioning(true);
    setIsRevealing(false);

    // 2. Switch text language & direction seamlessly underneath the dark royal veil
    setTimeout(() => {
      setLanguageState(lang);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, lang);
      }
    }, 280);

    // 3. Lift veil and trigger iPhone Hello-to-Home screen wake up glide
    setTimeout(() => {
      setIsTransitioning(false);
      setIsRevealing(true);
    }, 650);

    // 4. Conclude reveal animation
    setTimeout(() => {
      setIsRevealing(false);
    }, 1450);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  const isUrdu = language === 'ur';
  const dir = isUrdu ? 'rtl' : 'ltr';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = dir;
      document.documentElement.lang = isUrdu ? 'ur' : 'en';

      if (isUrdu) {
        document.body.classList.add('lang-ur');
      } else {
        document.body.classList.remove('lang-ur');
      }
    }
  }, [language, dir, isUrdu]);

  const t = TRANSLATIONS[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isUrdu,
        dir,
        t,
        isTransitioning,
        isRevealing,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
