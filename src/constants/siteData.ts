import { NavItem, MetricItem, ProgramItem, ValuePillar, TrustBadgeItem, GalleryItem } from '../types';

export const SITE_CONFIG = {
  name: 'Al-Qalam Islamic School',
  tagline: 'Traditional Islamic values, presented through a modern educational experience.',
  heroHeadline: 'Nurturing Faith,\nBuilding Excellence.',
  heroDescription: 'Alqalam Islamic School is dedicated to providing quality education based on Islamic values, character building and academic excellence in Khalabat Township (KTS), Haripur.',
  phone: '+92 319 1520393',
  email: 'alqalamislamicschl@gmail.com',
  address: 'Near Hussaini Chowk, Mohallah Salikeen, Sector No 2, Khalabat Township (KTS), Haripur',
  zipCode: '22620',
  timings: 'Monday – Saturday: 7:30 AM – 2:00 PM',
  establishedYear: '2014',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact Us', href: '#contact' },
];

export const TRUST_BADGES: TrustBadgeItem[] = [
  {
    id: 'islamic-environment',
    title: 'Islamic',
    subtitle: 'Environment',
    iconName: 'ShieldCheck',
  },
  {
    id: 'quality-education',
    title: 'Quality',
    subtitle: 'Education',
    iconName: 'GraduationCap',
  },
  {
    id: 'character-building',
    title: 'Character',
    subtitle: 'Building',
    iconName: 'HeartHandshake',
  },
];

export const ABOUT_METRICS: MetricItem[] = [
  {
    id: 'students',
    value: '500+',
    label: 'Students',
    iconName: 'Users',
    description: 'Enrolled across early years & primary classes (up to Class 5th)',
  },
  {
    id: 'staff',
    value: '10+',
    label: 'Qualified Staff',
    iconName: 'UserCheck',
    description: 'Dedicated Huffaz, scholars, and certified primary educators',
  },
  {
    id: 'excellence',
    value: '5+',
    label: 'Years of Excellence',
    iconName: 'Award',
    description: 'Serving the KTS & Haripur community with distinction',
  },
  {
    id: 'environment',
    value: '100%',
    label: 'Islamic Environment',
    iconName: 'Sparkles',
    description: 'Daily Adhkar, Salah, and Sunnah practices',
  },
];

export const CORE_PROGRAMS: ProgramItem[] = [
  {
    id: 'hifz-program',
    title: 'Hifz & Nazra Program',
    description: 'Memorization and recitation of the Holy Qur\'an with Tajweed under certified Huffaz and Qaris.',
    iconName: 'BookOpen',
    badge: 'Core Program',
    features: ['Tajweed Mastery', 'Daily Hifz & Revision', 'Individual Mentorship'],
  },
  {
    id: 'academic-education',
    title: 'Academic Education',
    description: 'Comprehensive academic curriculum from Playgroup / Early Years to Class 5th fostering foundational skills and critical thinking.',
    iconName: 'GraduationCap',
    badge: 'Class 1 to 5th',
    features: ['Early Years & Primary', 'English & Mathematics', 'Holistic Evaluation'],
  },
  {
    id: 'islamiat-studies',
    title: 'Islamiat & Deeniyāt',
    description: 'Foundational study of Qur\'an translation, Duas, Hadith, Seerah, and essential Islamic manners.',
    iconName: 'Scroll',
    badge: 'Foundational',
    features: ['Seerah of the Prophet ﷺ', 'Masnoon Duas', 'Islamic Morals'],
  },
  {
    id: 'character-building',
    title: 'Character & Tarbiyah',
    description: 'Intentional daily activities, assemblies, and moral tarbiyah to nurture respectful, upright Islamic character.',
    iconName: 'UsersRound',
    badge: 'Tarbiyah',
    features: ['Sunnah Habits', 'Respect & Discipline', 'Confidence Building'],
  },
];

export const WHY_CHOOSE_US_PILLARS: ValuePillar[] = [
  {
    id: 'values',
    title: 'Islamic Values',
    description: 'We instill authentic Islamic values in every aspect of learning and daily school life.',
    iconName: 'Compass',
  },
  {
    id: 'faculty',
    title: 'Experienced Faculty',
    description: 'Qualified and dedicated teachers committed to both academic rigor and spiritual nurturing.',
    iconName: 'BookMarked',
  },
  {
    id: 'safety',
    title: 'Safe & Friendly Environment',
    description: 'A secure, disciplined, and caring environment where every student thrives with confidence.',
    iconName: 'Shield',
  },
  {
    id: 'holistic',
    title: 'Holistic Development',
    description: 'Balanced focus on academic excellence, spiritual vitality, and positive personal growth.',
    iconName: 'HeartHandshake',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Qur\'an Recitation & Tajweed Circle',
    category: 'Tahfeez & Tarbiyah',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80',
    aspect: 'landscape',
  },
  {
    id: 'g2',
    title: 'Islamic Studies & Classroom Learning',
    category: 'Academics & Deen',
    image: '/classroom.jpg',
    aspect: 'landscape',
  },
  {
    id: 'g3',
    title: 'Dedicated Musalla & Congregational Salah',
    category: 'Spiritual Life & Tarbiyah',
    image: '/prayer-area.jpg',
    aspect: 'landscape',
  },
  {
    id: 'g4',
    title: 'Arabic Calligraphy & Classical Arts',
    category: 'Creative Expression',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
    aspect: 'landscape',
  },
];
