import React, { useState } from 'react';
import { 
  Building2, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  HeartHandshake, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Sun,
  Flame,
  VolumeX,
  Users
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { ScrollReveal } from '../ui/ScrollReveal';
import { IslamicStar } from '../ui/GeometricDecoration';
import { useLanguage } from '../../context/LanguageContext';

export const FacilitiesSection: React.FC = () => {
  const { isUrdu, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'learning' | 'spiritual' | 'safety'>('all');

  const facilityCategories = [
    { id: 'all', label: isUrdu ? 'تمام سہولیات' : 'All Facilities' },
    { id: 'learning', label: isUrdu ? 'تعلیمی ماحول' : 'Learning Spaces' },
    { id: 'spiritual', label: isUrdu ? 'دینی و اخلاقی' : 'Spiritual & Tarbiyah' },
    { id: 'safety', label: isUrdu ? 'تحفظ و دیکھ بھال' : 'Safety & Care' },
  ];

  const facilities = [
    {
      id: 'f1',
      category: 'spiritual',
      icon: <BookOpen className="w-6 h-6 text-[#D4AF37]" />,
      tag: isUrdu ? 'قرآنی شعبہ' : 'Quranic Center',
      title: isUrdu ? 'مخصوص شعبۂ حفظ و تجوید' : 'Dedicated Hifz & Tajweed Center',
      description: isUrdu 
        ? 'قرآن پاک کے حفظ، ناظرہ اور تجوید کے لیے پرسکون، باوقار اور پرنور ماحول جہاں مستند قراء کرام انفرادی توجہ دیتے ہیں۔'
        : 'A tranquil, serene setting purpose-built for Qur\'an memorization, Nazra, and Tajweed with individual mentor monitoring.',
      features: [
        isUrdu ? 'سند یافتہ اساتذہ و قراء' : 'Certified Huffaz & Qaris',
        isUrdu ? 'تجوید کی عملی مشق' : 'Practical Tajweed Labs',
        isUrdu ? 'روزانہ کی دہرائی کا نظام' : 'Daily Revision Trackers'
      ],
      highlight: isUrdu ? 'روحانی سکون' : 'Spiritual Ambience',
    },
    {
      id: 'f2',
      category: 'learning',
      icon: <Building2 className="w-6 h-6 text-[#D4AF37]" />,
      tag: isUrdu ? 'کلاس رومز' : 'Classrooms',
      title: isUrdu ? 'ہوادار و جدید کلاس رومز' : 'Spacious & Well-Ventilated Classrooms',
      description: isUrdu
        ? 'بچوں کے بیٹھنے کے آرام دہ فرنیچر، مناسب قدرتی روشنی اور جدید تعلیمی چارٹس سے آراستہ پرسکون کمرہ ہائے جماعت۔'
        : 'Bright, ergonomically furnished rooms designed for interactive learning, student comfort, and high focus levels.',
      features: [
        isUrdu ? 'محدود طلباء برائے انفرادی توجہ' : 'Small Student-to-Teacher Ratio',
        isUrdu ? 'جدید تدریسی چارٹس' : 'Visual Learning Aids',
        isUrdu ? 'صاف ستھرا ماحول' : 'Hygienic Desks & Flooring'
      ],
      highlight: isUrdu ? 'بہترین توجہ' : 'High Focus',
    },
    {
      id: 'f3',
      category: 'spiritual',
      icon: <Compass className="w-6 h-6 text-[#D4AF37]" />,
      tag: isUrdu ? 'نماز و تربیت' : 'Salah & Tarbiyah',
      title: isUrdu ? 'نماز باجماعت و دعائیہ مصلیٰ' : 'Congregational Salah & Prayer Area',
      description: isUrdu
        ? 'اسکول کے اندر باجماعت نماز اور روزمرہ مسنون دعاؤں، اذکار اور سنت نبویؐ کے عملی اسباق کے لیے مخصوص جگہ۔'
        : 'A dedicated, clean Musalla for daily Zuhr prayer in congregation, Friday reminders, and Sunnah habit practices.',
      features: [
        isUrdu ? 'نمازِ ظہر باجماعت' : 'Daily Zuhr Salah in Jama\'at',
        isUrdu ? 'وضو کی سہولت' : 'Ablution (Wudhu) Area',
        isUrdu ? 'مسنون دعاؤں کا روزانہ اہتمام' : 'Daily Sunnah Adhkar'
      ],
      highlight: isUrdu ? 'عملی تربیت' : 'Hands-on Tarbiyah',
    },
    {
      id: 'f4',
      category: 'learning',
      icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
      tag: isUrdu ? 'ابتدائی تعلیم' : 'Early Years',
      title: isUrdu ? 'ارلی ایئرز ایکٹیویٹی ایریا' : 'Early Years Creative Play & Learn',
      description: isUrdu
        ? 'پلے گروپ، نرسری اور پریپ کے ننھے بچوں کے لیے دلچسپ ایکٹیویٹیز، اسلامی کہانیاں اور موٹر سکلز بڑھانے والے تدریسی وسائل۔'
        : 'Specially designed learning corners with sensory play, Islamic stories, and foundational skill builders for little learners.',
      features: [
        isUrdu ? 'دلچسپ کھلونے اور تعلیمی پزلز' : 'Sensory & Educational Puzzles',
        isUrdu ? 'محبت اور شفقت بھری نگہداشت' : 'Nurturing & Loving Care',
        isUrdu ? 'حروف شناسی و فونکس' : 'Phonics & Letter Tracing'
      ],
      highlight: isUrdu ? 'شوقِ تعلیم' : 'Joyful Learning',
    },
    {
      id: 'f5',
      category: 'safety',
      icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
      tag: isUrdu ? 'تحفظ و نگرانی' : 'Security & Care',
      title: isUrdu ? 'محفوظ و باپردہ چاردیواری' : 'Safe, Gated & Disciplined Campus',
      description: isUrdu
        ? 'گیٹڈ انٹری، باحجاب اسلامی پردے کا ماحول اور بچوں کی آمد و روانگی کی منظم نگرانی تاکہ والدین مکمل مطمئن رہیں۔'
        : 'Gated access, perimeter security, and strict check-in/check-out protocols to ensure complete safety and peace of mind.',
      features: [
        isUrdu ? 'منظم گیٹڈ انٹری و ایگزٹ' : 'Controlled Entry Gate',
        isUrdu ? 'باہمی احترام کا ماحول' : 'Disciplined & Respectful Culture',
        isUrdu ? 'والدین کے لیے فوری رابطہ' : 'Direct Parental Communication'
      ],
      highlight: isUrdu ? '100% محفوظ' : 'Safe Campus',
    },
    {
      id: 'f6',
      category: 'safety',
      icon: <HeartHandshake className="w-6 h-6 text-[#D4AF37]" />,
      tag: isUrdu ? 'صحت و معاونت' : 'Health & Support',
      title: isUrdu ? 'صاف پانی اور حفظانِ صحت' : 'Pure Drinking Water & First Aid Care',
      description: isUrdu
        ? 'طلباء و طالبات کے لیے صاف اور فلٹر شدہ پینے کا پانی، باقاعدہ صفائی اور فوری ابتدائی طبی امداد کا انتظام۔'
        : 'Clean filtered drinking water stations, sanitized washrooms, and immediate on-site first-aid support.',
      features: [
        isUrdu ? 'فلٹر شدہ پینے کا پانی' : 'Filtered Clean Water',
        isUrdu ? 'فرسٹ ایڈ کٹ اور نگہداشت' : 'First Aid Support Kit',
        isUrdu ? 'روزانہ ڈس انفیکشن اور صفائی' : 'Daily Hygiene & Sanitization'
      ],
      highlight: isUrdu ? 'صحت و صفائی' : 'Hygiene First',
    },
  ];

  const filteredFacilities = activeTab === 'all' 
    ? facilities 
    : facilities.filter(f => f.category === activeTab);

  return (
    <Section id="facilities" bg="warm-cream" withPattern={true} padding="normal">
      <Container>
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <SectionHeading
            kicker={isUrdu ? 'کیمپس اور تعلیمی سہولیات' : 'Campus & Learning Environment'}
            title={isUrdu ? 'القلم کی جدید و باوقار سہولیات' : 'Our Campus Facilities'}
            subtitle={
              isUrdu
                ? 'ایک ایسا منظم، محفوظ اور پرسکون اسلامی ماحول جہاں آپ کا بچہ یکسوئی سے علم، قرآن اور اعلیٰ اخلاق سیکھتا ہے۔'
                : 'A thoughtfully designed, safe, and spiritually uplifting setting that empowers children to thrive academically and morally.'
            }
            align="center"
            theme="light"
          />
        </ScrollReveal>

        {/* Filter Tabs */}
        <ScrollReveal direction="up" delay={80}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {facilityCategories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm cursor-pointer ${
                    isActive
                      ? 'bg-[#3A0505] text-[#F2C94C] border border-[#D4AF37] shadow-[0_4px_12px_rgba(58,5,5,0.25)] scale-105'
                      : 'bg-white/80 hover:bg-white text-[#444444] hover:text-[#3A0505] border border-[#D4AF37]/30'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredFacilities.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delay={idx * 60} duration={550}>
              <div className="relative h-full bg-white rounded-2xl p-6 sm:p-7 border border-[#D4AF37]/35 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden hover:-translate-y-1.5">
                {/* Subtle Top Gold Border accent */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#D4AF37]/40 via-[#F2C94C] to-[#D4AF37]/40 group-hover:h-1.5 transition-all duration-300" />

                <div>
                  {/* Top Row: Icon and Tag */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#3A0505] border border-[#D4AF37]/60 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:border-[#F2C94C] transition-all duration-300">
                      {item.icon}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#FAF8F3] text-[#650B0B] border border-[#D4AF37]/30">
                        {item.tag}
                      </span>
                      <span className="text-[10px] font-semibold text-[#08783F] bg-[#08783F]/10 px-2 py-0.5 rounded-full border border-[#08783F]/20">
                        {item.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3A0505] mb-2.5 group-hover:text-[#650B0B] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-5 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Features Checkpoints */}
                <div className="pt-4 border-t border-[#FAF8F3] bg-[#FAF8F3]/50 -mx-6 -mb-6 p-5 sm:-mx-7 sm:-mb-7 sm:p-6 rounded-b-2xl">
                  <div className="space-y-2">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-[#333333] font-medium">
                        <CheckCircle2 size={14} className="text-[#08783F] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Assurance Banner */}
        <ScrollReveal direction="up" delay={400}>
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#3A0505] via-[#520808] to-[#3A0505] text-[#FAF8F3] border border-[#D4AF37]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F3]/10 border border-[#D4AF37]/50 flex items-center justify-center text-[#F2C94C] shrink-0 shadow-inner">
                <Award size={24} />
              </div>
              <div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#F2C94C]">
                  {isUrdu ? 'کیمپس کا دورہ کریں اور خود مشاہدہ فرمائیں' : 'Schedule a Campus Visit & Tour'}
                </h4>
                <p className="text-xs text-[#FAF8F3]/80 mt-0.5">
                  {isUrdu 
                    ? 'ہمارا اسکول پیر تا ہفتہ صبح 7:30 تا دوپہر 2:00 بجے والدین کے لیے کھلا ہے۔'
                    : 'Open Monday to Saturday from 7:30 AM to 2:00 PM for prospective parents and guardians.'}
                </p>
              </div>
            </div>

            <a
              href="#contact"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#F2C94C] via-[#D4AF37] to-[#F2C94C] text-[#3A0505] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF8F3] transition-all shadow-lg active:scale-95 border border-white/40"
            >
              <span>{isUrdu ? 'اسکول کا وزٹ کریں' : 'Book Campus Tour'}</span>
              <ArrowRight size={14} className={isUrdu ? 'rotate-180' : ''} />
            </a>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
};
