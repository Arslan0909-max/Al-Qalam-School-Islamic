import React from 'react';
import { Phone, Mail, MapPin, Clock, Send, Check } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { IslamicStar } from '../ui/GeometricDecoration';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SITE_CONFIG } from '../../constants/siteData';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <Section id="contact" bg="ivory" withPattern={true} padding="normal">
      <Container>
        <ScrollReveal direction="up" delay={0}>
          <SectionHeading
            kicker="Connect With Us"
            title="Visit Our Campus & Inquire"
            subtitle="Our administrative office is ready to assist you with admissions, curriculum inquiries, and campus tours."
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
                      School Campus & Administrative Office
                    </span>
                    <h3 className="serif text-2xl sm:text-3xl font-bold text-[#FAF8F3]">
                      Alqalam Islamic School
                    </h3>
                  </div>

                  <div className="space-y-4 text-sm text-[#FAF8F3]/85">
                    <div className="flex items-start gap-3.5 group/item transition-transform duration-300 hover:translate-x-1">
                      <div className="w-10 h-10 rounded-sm bg-[#650B0B] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover/item:border-[#F2C94C] transition-colors shadow-sm">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#FAF8F3]">Campus Address</h4>
                        <p className="text-xs sm:text-sm text-[#FAF8F3]/80 leading-snug mt-0.5">
                          {SITE_CONFIG.address}
                          {SITE_CONFIG.zipCode && (
                            <span className="block text-[#D4AF37]/90 text-xs mt-0.5">
                              Postal / Zip Code: {SITE_CONFIG.zipCode}
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
                        <h4 className="font-semibold text-[#FAF8F3]">Telephone</h4>
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
                        <h4 className="font-semibold text-[#FAF8F3]">Email Address</h4>
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
                        <h4 className="font-semibold text-[#FAF8F3]">Office Hours</h4>
                        <p className="text-xs sm:text-sm text-[#FAF8F3]/80 leading-snug mt-0.5">
                          {SITE_CONFIG.timings}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-6 mt-6 border-t border-[#FAF8F3]/15 text-xs text-[#FAF8F3]/70 flex items-center gap-2">
                  <IslamicStar size={12} color="#D4AF37" fill="#D4AF37" />
                  <span>Visitors are welcome during official working hours.</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Quick Inquiry Form with Soft Entrance & Depth */}
          <div className="lg:col-span-7 flex flex-col">
            <ScrollReveal direction="left" delay={60} duration={600} className="h-full">
              <div className="bg-white p-8 sm:p-9 rounded-sm border border-[#D4AF37]/30 shadow-md card-depth-hover flex flex-col justify-between h-full">
                <div>
                  <h3 className="serif text-2xl font-bold text-[#3A0505] mb-2">
                    Send an Admission Inquiry
                  </h3>
                  <p className="text-sm text-[#666666] mb-6">
                    Fill in the details below and our admissions coordinator will reach out promptly.
                  </p>

                  {submitted ? (
                    <div className="p-6 rounded-sm bg-[#08783F]/10 border border-[#08783F]/30 text-[#08783F] flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300">
                      <Check size={24} className="shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm">Inquiry Received</h4>
                        <p className="text-xs text-[#08783F]/90 mt-0.5">
                          JazakAllah Khair. Our administration will contact you shortly.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A0505] mb-1">
                            Parent / Guardian Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Muhammad Ali"
                            className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#650B0B] focus:ring-1 focus:ring-[#650B0B] transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A0505] mb-1">
                            Contact Number *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. 0300-1234567"
                            className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#650B0B] focus:ring-1 focus:ring-[#650B0B] transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A0505] mb-1">
                            Grade of Interest *
                          </label>
                          <select
                            required
                            className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#650B0B] focus:ring-1 focus:ring-[#650B0B] transition-all duration-200 bg-white text-[#171717]"
                          >
                            <option value="">Select Class / Level</option>
                            <option value="early-years">Early Years (Playgroup / Nursery / Prep)</option>
                            <option value="primary-1-5">Primary (Class 1 to Class 5th)</option>
                            <option value="hifz-nazra">Hifz-ul-Quran & Nazra with Tajweed</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A0505] mb-1">
                            Email Address (Optional)
                          </label>
                          <input
                            type="email"
                            placeholder="name@example.com"
                            className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#650B0B] focus:ring-1 focus:ring-[#650B0B] transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A0505] mb-1">
                          Message / Questions
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Ask about admissions, syllabus, or schedule a campus visit..."
                          className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#650B0B] focus:ring-1 focus:ring-[#650B0B] transition-all duration-200"
                        />
                      </div>

                      <div className="pt-2">
                        <Button
                          variant="primary"
                          size="md"
                          type="submit"
                          icon={<Send size={15} className="transition-transform duration-300 group-hover:translate-x-1" />}
                          className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-widest font-bold hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md group"
                        >
                          Submit Inquiry
                        </Button>
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
