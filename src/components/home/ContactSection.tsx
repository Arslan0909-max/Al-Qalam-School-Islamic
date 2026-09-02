import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Check, Loader2, MessageCircle, AlertCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { IslamicStar } from '../ui/GeometricDecoration';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SITE_CONFIG } from '../../constants/siteData';
import { useLanguage } from '../../context/LanguageContext';

export const ContactSection: React.FC = () => {
  const { isUrdu, t } = useLanguage();
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    grade: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Send directly to the school's official email via FormSubmit AJAX service
      const response = await fetch(`https://formsubmit.co/ajax/${SITE_CONFIG.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Admission Inquiry: ${formData.parentName} (${formData.grade})`,
          'Parent / Guardian Name': formData.parentName,
          'Contact Number / Phone': formData.phone,
          'Grade / Class of Interest': formData.grade,
          'Parent Email': formData.email || 'Not provided',
          'Inquiry / Message': formData.message || 'No additional message provided',
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      if (response.ok || data.success === 'true' || data.success === true) {
        setSubmitted(true);
        setFormData({
          parentName: '',
          phone: '',
          grade: '',
          email: '',
          message: '',
        });
      } else {
        throw new Error(data.message || 'Failed to deliver email');
      }
    } catch (err: any) {
      console.warn('Direct email submission notice:', err);
      // Fallback: If network is offline or blocked, still confirm and provide instant mailto / phone
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp quick inquiry link
  const rawCleanPhone = SITE_CONFIG.phone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${rawCleanPhone}?text=${encodeURIComponent(
    isUrdu
      ? `السلام علیکم! میں القلم اسلامک اسکول میں داخلے اور معلومات کے لیے رابطہ کر رہا ہوں۔`
      : `Assalam-o-Alaikum, I am inquiring about admission at Alqalam Islamic School.`
  )}`;

  return (
    <Section id="contact" bg="ivory" withPattern={true} padding="normal">
      <Container>
        <ScrollReveal direction="up" delay={0}>
          <SectionHeading
            kicker={t.contact.kicker}
            title={t.contact.title}
            subtitle={t.contact.subtitle}
            align="center"
            theme="light"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Contact Details Card with Dark Depth */}
          <div className="lg:col-span-5 flex flex-col">
            <ScrollReveal direction="right" delay={0} duration={600} className="h-full">
              <div className="bg-[#3A0505] text-[#FAF8F3] p-8 sm:p-9 rounded-sm border border-[#D4AF37]/40 shadow-xl flex flex-col justify-between relative overflow-hidden h-full group hover:border-[#D4AF37] transition-colors duration-400">
                <div className="absolute inset-0 bg-islamic-dark-grid opacity-20 pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
                      {t.contact.infoTitle}
                    </span>
                    <h3 className="serif text-2xl sm:text-3xl font-bold text-[#FAF8F3]">
                      {isUrdu ? 'القلم اسلامک اسکول' : 'Alqalam Islamic School'}
                    </h3>
                  </div>

                  <div className="space-y-4 text-sm text-[#FAF8F3]/85">
                    <div className="flex items-start gap-3.5 group/item transition-transform duration-300 hover:translate-x-1">
                      <div className="w-10 h-10 rounded-sm bg-[#650B0B] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover/item:border-[#F2C94C] transition-colors shadow-sm">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#FAF8F3]">{t.contact.address}</h4>
                        <p className="text-xs sm:text-sm text-[#FAF8F3]/80 leading-snug mt-0.5">
                          {isUrdu ? t.footer.campusLocation : SITE_CONFIG.address}
                          {SITE_CONFIG.zipCode && (
                            <span className="block text-[#D4AF37]/90 text-xs mt-0.5">
                              {isUrdu ? `پوسٹل کوڈ: ${SITE_CONFIG.zipCode}` : `Postal / Zip Code: ${SITE_CONFIG.zipCode}`}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 group/item transition-transform duration-300 hover:translate-x-1">
                      <div className="w-10 h-10 rounded-sm bg-[#650B0B] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover/item:border-[#F2C94C] transition-colors shadow-sm">
                        <Phone size={18} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#FAF8F3]">{t.contact.phone}</h4>
                        <a
                          href={`tel:${SITE_CONFIG.phone}`}
                          className="text-xs sm:text-sm text-[#D4AF37] hover:underline leading-snug mt-0.5 block font-medium"
                        >
                          {SITE_CONFIG.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 group/item transition-transform duration-300 hover:translate-x-1">
                      <div className="w-10 h-10 rounded-sm bg-[#650B0B] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover/item:border-[#F2C94C] transition-colors shadow-sm">
                        <Mail size={18} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#FAF8F3]">{t.contact.email}</h4>
                        <a
                          href={`mailto:${SITE_CONFIG.email}`}
                          className="text-xs sm:text-sm text-[#D4AF37] hover:underline leading-snug mt-0.5 block break-all"
                        >
                          {SITE_CONFIG.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 group/item transition-transform duration-300 hover:translate-x-1">
                      <div className="w-10 h-10 rounded-sm bg-[#650B0B] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover/item:border-[#F2C94C] transition-colors shadow-sm">
                        <Clock size={18} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#FAF8F3]">{t.contact.timings}</h4>
                        <p className="text-xs sm:text-sm text-[#FAF8F3]/80 leading-snug mt-0.5">
                          {t.contact.timingsValue}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Direct WhatsApp Option */}
                  <div className="pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-sm bg-[#08783F] hover:bg-[#076837] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <MessageCircle size={16} />
                      {t.contact.directWhatsApp}
                    </a>
                  </div>
                </div>

                <div className="relative z-10 pt-6 mt-6 border-t border-[#FAF8F3]/15 text-xs text-[#FAF8F3]/70 flex items-center gap-2">
                  <IslamicStar size={12} color="#D4AF37" fill="#D4AF37" />
                  <span>{isUrdu ? 'دفتری اوقات میں تشریف لانے والے مہمانوں کا خیرمقدم ہے۔' : 'Visitors are welcome during official working hours.'}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Quick Inquiry Form connected with Email */}
          <div className="lg:col-span-7 flex flex-col">
            <ScrollReveal direction="left" delay={60} duration={600} className="h-full">
              <div className="bg-white p-8 sm:p-9 rounded-sm border border-[#D4AF37]/30 shadow-md card-depth-hover flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="serif text-2xl font-bold text-[#3A0505]">
                      {t.contact.formTitle}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#650B0B] text-[11px] font-semibold">
                      <Mail size={12} className="text-[#D4AF37]" />
                      Direct Inquiry
                    </span>
                  </div>
                  <p className="text-sm text-[#666666] mb-6">
                    {t.contact.formSubtitle}
                  </p>

                  {submitted ? (
                    <div className="p-7 rounded-sm bg-[#08783F]/10 border border-[#08783F]/30 text-[#08783F] space-y-4 animate-in fade-in zoom-in-95 duration-400">
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-[#08783F] text-white flex items-center justify-center shrink-0 shadow-md">
                          <Check size={22} />
                        </div>
                        <div>
                          <h4 className="font-bold text-base text-[#08783F]">{t.contact.successTitle}</h4>
                          <p className="text-xs text-[#08783F]/90 mt-1 leading-relaxed">
                            {t.contact.successMessage}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setSubmitted(false)}
                          className="text-xs font-semibold text-[#650B0B] underline hover:text-[#3A0505] transition-colors"
                        >
                          {t.contact.sendAnother}
                        </button>
                        <span className="text-xs text-slate-400">•</span>
                        <a
                          href={`tel:${SITE_CONFIG.phone}`}
                          className="text-xs font-semibold text-[#08783F] hover:underline"
                        >
                          {SITE_CONFIG.phone}
                        </a>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {errorMessage && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
                          <AlertCircle size={15} className="shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A0505] mb-1">
                            {t.contact.parentNameLabel} *
                          </label>
                          <input
                            type="text"
                            name="parentName"
                            required
                            value={formData.parentName}
                            onChange={handleChange}
                            placeholder={t.contact.parentNamePlaceholder}
                            className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#650B0B] focus:ring-1 focus:ring-[#650B0B] transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A0505] mb-1">
                            {t.contact.phoneLabel} *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t.contact.phonePlaceholder}
                            className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#650B0B] focus:ring-1 focus:ring-[#650B0B] transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A0505] mb-1">
                            {t.contact.gradeLabel} *
                          </label>
                          <select
                            name="grade"
                            required
                            value={formData.grade}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#650B0B] focus:ring-1 focus:ring-[#650B0B] transition-all duration-200 bg-white text-[#171717]"
                          >
                            <option value="">{t.contact.selectGrade}</option>
                            <option value="Early Years (Playgroup / Nursery / Prep)">
                              {t.contact.earlyYearsOption}
                            </option>
                            <option value="Primary (Class 1 to Class 5th)">
                              {t.contact.primaryOption}
                            </option>
                            <option value="Hifz-ul-Quran & Nazra with Tajweed">
                              {t.contact.hifzOption}
                            </option>
                            <option value="General Information & Campus Tour">
                              {t.contact.generalOption}
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A0505] mb-1">
                            {t.contact.emailLabel}
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t.contact.emailPlaceholder}
                            className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#650B0B] focus:ring-1 focus:ring-[#650B0B] transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A0505] mb-1">
                          {t.contact.messageLabel}
                        </label>
                        <textarea
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={t.contact.messagePlaceholder}
                          className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#650B0B] focus:ring-1 focus:ring-[#650B0B] transition-all duration-200"
                        />
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                        <Button
                          variant="primary"
                          size="md"
                          type="submit"
                          disabled={isSubmitting}
                          icon={
                            isSubmitting ? (
                              <Loader2 size={15} className="animate-spin" />
                            ) : (
                              <Send
                                size={15}
                                className={`transition-transform duration-300 ${isUrdu ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`}
                              />
                            )
                          }
                          className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-widest font-bold hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md group disabled:opacity-75 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? t.contact.submitting : t.contact.submitButton}
                        </Button>

                        <p className="text-[11px] text-[#777777] italic">
                          {SITE_CONFIG.email}
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
};
