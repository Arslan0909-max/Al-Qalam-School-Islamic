export interface Translations {
  nav: {
    home: string;
    about: string;
    programs: string;
    whyUs: string;
    facilities: string;
    gallery: string;
    contact: string;
    applyNow: string;
    switchLang: string;
    langLabel: string;
  };
  hero: {
    kicker: string;
    headlineLine1: string;
    headlineLine2: string;
    description: string;
    applyButton: string;
    exploreButton: string;
    viewPosterButton: string;
    badgeIslamic: string;
    badgeIslamicSub: string;
    badgeQuality: string;
    badgeQualitySub: string;
    badgeCharacter: string;
    badgeCharacterSub: string;
    floatingAdmissions: string;
    floatingAdmissionsGrade: string;
    floatingHifz: string;
    floatingHifzSub: string;
    modalTitle: string;
    modalSubtitle: string;
    modalClose: string;
  };
  trustStrip: {
    spiritualGrowth: string;
    academicRigor: string;
    quranicTahfeez: string;
    globalCitizenship: string;
  };
  about: {
    kicker: string;
    headingPrefix: string;
    headingHighlight: string;
    p1: string;
    p2: string;
    button: string;
    metricStudents: string;
    metricStudentsDesc: string;
    metricStaff: string;
    metricStaffDesc: string;
    metricYears: string;
    metricYearsDesc: string;
    metricEnv: string;
    metricEnvDesc: string;
  };
  programs: {
    kicker: string;
    title: string;
    subtitle: string;
    curriculumNote: string;
    items: {
      id: string;
      title: string;
      description: string;
      badge: string;
      features: string[];
    }[];
  };
  whyChooseUs: {
    kicker: string;
    title: string;
    subtitle: string;
    pillars: {
      id: string;
      title: string;
      description: string;
    }[];
  };
  admissionsCTA: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    check1: string;
    check2: string;
    check3: string;
    check4: string;
    callButton: string;
    visitButton: string;
  };
  gallery: {
    kicker: string;
    title: string;
    subtitle: string;
    allTab: string;
    academicsTab: string;
    tahfeezTab: string;
    facilitiesTab: string;
    campusLifeTab: string;
    viewFullButton: string;
    items: {
      id: string;
      title: string;
      category: string;
    }[];
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    formTitle: string;
    formSubtitle: string;
    parentNameLabel: string;
    parentNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    gradeLabel: string;
    selectGrade: string;
    earlyYearsOption: string;
    primaryOption: string;
    hifzOption: string;
    generalOption: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
    directWhatsApp: string;
    infoTitle: string;
    phone: string;
    email: string;
    address: string;
    timings: string;
    timingsValue: string;
  };
  footer: {
    tagline: string;
    description: string;
    quickLinks: string;
    programsTitle: string;
    contactInfoTitle: string;
    timingsTitle: string;
    copyright: string;
    allRightsReserved: string;
    campusLocation: string;
  };
}

export const TRANSLATIONS: { en: Translations; ur: Translations } = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      programs: 'Programs',
      whyUs: 'Why Us',
      facilities: 'Facilities',
      gallery: 'Gallery',
      contact: 'Contact Us',
      applyNow: 'Apply Now',
      switchLang: 'اردو',
      langLabel: 'Urdu',
    },
    hero: {
      kicker: 'Alqalam Islamic School • Khalabat Township, Haripur',
      headlineLine1: 'Nurturing Faith.',
      headlineLine2: 'Building Excellence.',
      description:
        'Alqalam Islamic School is dedicated to providing quality education based on Islamic values, character building and academic excellence in Khalabat Township (KTS), Haripur.',
      applyButton: 'Admissions Open 2026–27',
      exploreButton: 'Explore School',
      viewPosterButton: 'View Official Poster',
      badgeIslamic: 'Islamic',
      badgeIslamicSub: 'Environment',
      badgeQuality: 'Quality',
      badgeQualitySub: 'Education',
      badgeCharacter: 'Character',
      badgeCharacterSub: 'Building',
      floatingAdmissions: 'Admissions Open 2026–27',
      floatingAdmissionsGrade: 'Playgroup to Class 5th',
      floatingHifz: 'Hifz-ul-Quran',
      floatingHifzSub: 'Nazra & Tajweed Program',
      modalTitle: 'Official Admission & School Poster',
      modalSubtitle: 'Alqalam Islamic School — Academic Session 2026-27',
      modalClose: 'Close Viewer',
    },
    trustStrip: {
      spiritualGrowth: 'Spiritual Growth',
      academicRigor: 'Academic Rigor',
      quranicTahfeez: 'Quranic Tahfeez',
      globalCitizenship: 'Character Building',
    },
    about: {
      kicker: 'About Our Institution',
      headingPrefix: 'About Alqalam',
      headingHighlight: 'Islamic School',
      p1: 'We aim to develop students academically, spiritually and socially in an authentic Islamic environment. Our vision is to raise righteous individuals who excel in modern academics while contributing positively to society.',
      p2: 'Founded on the principles of Quranic guidance and contemporary pedagogies, our institution fosters an atmosphere where curiosity, moral discipline, and intellectual rigor flourish together.',
      button: 'Explore Programs',
      metricStudents: 'Students',
      metricStudentsDesc: 'Enrolled across early years & primary classes (Playgroup to Class 5th)',
      metricStaff: 'Qualified Staff',
      metricStaffDesc: 'Dedicated Huffaz, scholars, and certified primary educators',
      metricYears: 'Years of Excellence',
      metricYearsDesc: 'Serving the KTS & Haripur community with distinction',
      metricEnv: 'Islamic Environment',
      metricEnvDesc: 'Daily Adhkar, Salah, and Sunnah practices',
    },
    programs: {
      kicker: 'Academic & Spiritual Path',
      title: 'Our Programs',
      subtitle:
        'Integrated educational tracks combining Quranic excellence, Islamic character, and contemporary national academic curricula.',
      curriculumNote:
        'Comprehensive syllabus designed according to modern pedagogical standards and Sunnah ethics.',
      items: [
        {
          id: 'hifz-program',
          title: "Hifz & Nazra Program",
          description: "Memorization and recitation of the Holy Qur'an with Tajweed under certified Huffaz and Qaris.",
          badge: 'Core Program',
          features: ['Tajweed Mastery', 'Daily Hifz & Revision', 'Individual Mentorship'],
        },
        {
          id: 'academic-education',
          title: 'Academic Education',
          description: 'Comprehensive academic curriculum from Playgroup / Early Years to Class 5th fostering foundational skills and critical thinking.',
          badge: 'Playgroup to 5th',
          features: ['Early Years & Primary', 'English & Mathematics', 'Holistic Evaluation'],
        },
        {
          id: 'islamiat-studies',
          title: 'Islamiat & Deeniyāt',
          description: "Foundational study of Qur'an translation, Duas, Hadith, Seerah, and essential Islamic manners.",
          badge: 'Foundational',
          features: ['Seerah of the Prophet ﷺ', 'Masnoon Duas', 'Islamic Morals'],
        },
        {
          id: 'character-building',
          title: 'Character & Tarbiyah',
          description: 'Intentional daily activities, assemblies, and moral tarbiyah to nurture respectful, upright Islamic character.',
          badge: 'Tarbiyah',
          features: ['Sunnah Habits', 'Respect & Discipline', 'Confidence Building'],
        },
      ],
    },
    whyChooseUs: {
      kicker: 'Why Choose Us',
      title: 'The Pillars of Alqalam',
      subtitle:
        'Guided by the principles of faith, academic excellence, and character-driven pedagogy in Sector 2, KTS Haripur.',
      pillars: [
        {
          id: 'values',
          title: 'Islamic Values',
          description: 'We instill authentic Islamic values in every aspect of learning and daily school life.',
        },
        {
          id: 'faculty',
          title: 'Experienced Faculty',
          description: 'Qualified and dedicated teachers committed to both academic rigor and spiritual nurturing.',
        },
        {
          id: 'safety',
          title: 'Safe & Friendly Environment',
          description: 'A secure, disciplined, and caring environment where every student thrives with confidence.',
        },
        {
          id: 'holistic',
          title: 'Holistic Development',
          description: 'Balanced focus on academic excellence, spiritual vitality, and positive personal growth.',
        },
      ],
    },
    admissionsCTA: {
      kicker: 'Admissions Open 2026–27',
      titleLine1: "Begin Your Child's Journey of",
      titleLine2: 'Faith and Knowledge',
      description:
        'Join the Alqalam family in Sector 2, Khalabat Township (KTS), Haripur. We welcome applications from Playgroup through Class 5th and the specialized Hifz-ul-Quran program.',
      check1: 'Limited seats per class for personalized care',
      check2: 'Affordable fee structure & moral guidance',
      check3: 'Safe campus & convenient Parent Pick & Drop',
      check4: 'Interactive entrance assessment & interview',
      callButton: 'Call Admissions: +92 319 1520393',
      visitButton: 'Request Prospectus & Visit',
    },
    gallery: {
      kicker: 'Campus Life & Activities',
      title: 'Moments at Alqalam',
      subtitle:
        'A glimpse into our classrooms, Quranic recitation circles, Islamic celebrations, and educational environment.',
      allTab: 'All Photos',
      academicsTab: 'Academics',
      tahfeezTab: 'Hifz & Tarbiyah',
      facilitiesTab: 'Facilities',
      campusLifeTab: 'Campus Life',
      viewFullButton: 'View Full Size',
      items: [
        {
          id: 'g1',
          title: "Qur'an Recitation & Tajweed Circle",
          category: 'Tahfeez & Tarbiyah',
        },
        {
          id: 'g2',
          title: 'Islamic Studies & Classroom Learning',
          category: 'Academics & Deen',
        },
        {
          id: 'g3',
          title: 'Dedicated Musalla & Congregational Salah',
          category: 'Spiritual Life & Tarbiyah',
        },
        {
          id: 'g4',
          title: 'Early Years Interactive Activity',
          category: 'Early Childhood',
        },
        {
          id: 'g5',
          title: 'School Campus Front View',
          category: 'Campus & Infrastructure',
        },
        {
          id: 'g6',
          title: 'Annual Speech & Husn-e-Qirat Contest',
          category: 'Student Achievements',
        },
      ],
    },
    contact: {
      kicker: 'Connect With Us',
      title: 'Visit Our Campus & Inquire',
      subtitle:
        'Our administrative office is ready to assist you with admissions, curriculum inquiries, and campus tours.',
      formTitle: 'Online Admission Inquiry',
      formSubtitle: 'Fill out this quick form and our administration will reach out to you promptly.',
      parentNameLabel: 'Parent / Guardian Full Name',
      parentNamePlaceholder: 'e.g. Muhammad Farooq',
      phoneLabel: 'Contact / WhatsApp Number',
      phonePlaceholder: 'e.g. 0319 1520393',
      gradeLabel: 'Grade / Program of Interest',
      selectGrade: 'Select Grade or Track...',
      earlyYearsOption: 'Early Years (Playgroup / Nursery / Prep)',
      primaryOption: 'Primary (Class 1 to Class 5th)',
      hifzOption: 'Hifz-ul-Quran & Nazra with Tajweed',
      generalOption: 'General Information & Campus Tour',
      emailLabel: 'Email Address (Optional)',
      emailPlaceholder: 'parent@example.com',
      messageLabel: 'Additional Message or Questions',
      messagePlaceholder: 'Ask about fee structure, syllabus, class timings...',
      submitButton: 'Submit Admission Inquiry',
      submitting: 'Sending Inquiry...',
      successTitle: 'Inquiry Sent Successfully!',
      successMessage:
        'JazakAllah Khair! We have received your inquiry. Our administration will contact you shortly.',
      sendAnother: 'Send Another Inquiry',
      directWhatsApp: 'Chat via WhatsApp',
      infoTitle: 'Campus Information',
      phone: 'Phone & WhatsApp',
      email: 'Official Email',
      address: 'Campus Address',
      timings: 'Office & School Timings',
      timingsValue: 'Monday – Saturday: 7:30 AM – 2:00 PM',
    },
    footer: {
      tagline: 'Traditional Islamic values, presented through a modern educational experience.',
      description:
        'Alqalam Islamic School is dedicated to providing quality education based on Islamic values, character building and academic excellence in Khalabat Township (KTS), Haripur.',
      quickLinks: 'Quick Links',
      programsTitle: 'Our Programs',
      contactInfoTitle: 'Contact Information',
      timingsTitle: 'Office Timings',
      copyright: 'All Rights Reserved.',
      allRightsReserved: 'Alqalam Islamic School, Khalabat Township, Haripur.',
      campusLocation: 'Near Hussaini Chowk, Mohallah Salikeen, Sector No 2, KTS, Haripur',
    },
  },
  ur: {
    nav: {
      home: 'صفحۂ اول',
      about: 'ہمارے بارے میں',
      programs: 'تعلیمی شعبہ جات',
      whyUs: 'ہمیں کیوں منتخب کریں؟',
      facilities: 'سہولیات',
      gallery: 'تصویری گیلری',
      contact: 'رابطہ کریں',
      applyNow: 'داخلہ لیں',
      switchLang: 'English',
      langLabel: 'English',
    },
    hero: {
      kicker: 'القلم اسلامک اسکول • سیکٹر نمبر 2، کھلابٹ ٹاؤن شپ، ہری پور',
      headlineLine1: 'ایمانی و اخلاقی تربیت۔',
      headlineLine2: 'شاندار تعلیمی سفر۔',
      description:
        'القلم اسلامک اسکول کھلابٹ ٹاؤن شپ (ہری پور) میں اسلامی اقدار، حفظ القرآن، بہترین اخلاق اور جدید معیاری عصری تعلیم کا قابلِ اعتماد ادارہ ہے۔',
      applyButton: 'داخلے جاری ہیں 2026–27',
      exploreButton: 'اسکول کا تعارف',
      viewPosterButton: 'آفیشل اشتہار دیکھیں',
      badgeIslamic: 'اسلامی',
      badgeIslamicSub: 'ماحول',
      badgeQuality: 'معیاری',
      badgeQualitySub: 'تعلیم',
      badgeCharacter: 'اخلاقی',
      badgeCharacterSub: 'تربیت',
      floatingAdmissions: 'داخلے جاری ہیں 2026–27',
      floatingAdmissionsGrade: 'پلے گروپ تا پنجم (5th)',
      floatingHifz: 'حفظ القرآن الکریم',
      floatingHifzSub: 'مع ناظرہ و تجوید کلاس',
      modalTitle: 'اسکول کا آفیشل داخلہ اشتہار',
      modalSubtitle: 'القلم اسلامک اسکول — تعلیمی سیشن 2026-27',
      modalClose: 'اشتہار بند کریں',
    },
    trustStrip: {
      spiritualGrowth: 'روحانی و ایمانی تربیت',
      academicRigor: 'معیاری جدید نصاب',
      quranicTahfeez: 'حفظ و ناظرہ قرآن',
      globalCitizenship: 'سنت آداب و کردار سازی',
    },
    about: {
      kicker: 'ادارے کا تعارف',
      headingPrefix: 'تعارف القلم',
      headingHighlight: 'اسلامک اسکول',
      p1: 'ہمارا مقصد اپنے طلباء و طالبات کو ایک خالص اسلامی اور محبت بھرے ماحول میں دینی، علمی اور اخلاقی طور پر سنوارنا ہے۔ ہمارا وژن ایسے باکردار افراد تیار کرنا ہے جو جدید علوم میں نمایاں کامیابی حاصل کریں اور معاشرے کا مفید حصہ بنیں۔',
      p2: 'قرآنی رہنمائی اور جدید تعلیمی اصولوں پر قائم یہ ادارہ ایک ایسا پلیٹ فارم ہے جہاں تجسس، خود اعتمادی اور اخلاقی تربیت ایک ساتھ پروان چڑھتی ہے۔',
      button: 'تمام پروگرامز دیکھیں',
      metricStudents: 'طلباء و طالبات',
      metricStudentsDesc: 'پلے گروپ سے پنجم اور حفظ کلاسز میں زیرِ تعلیم',
      metricStaff: 'اہل و تجربہ کار اساتذہ',
      metricStaffDesc: 'سند یافتہ حفاظ، قراء اور تربیت یافتہ پرائمری معلمین',
      metricYears: 'سالہ شاندار خدمات',
      metricYearsDesc: 'کھلابٹ ٹاؤن شپ اور ہری پور میں معیاری خدمات',
      metricEnv: 'اسلامی و اخلاقی ماحول',
      metricEnvDesc: 'روزمرہ مسنون دعائیں، نماز باجماعت اور سیرت نبویؐ کی تربیت',
    },
    programs: {
      kicker: 'تعلیمی و روحانی شعبہ جات',
      title: 'ہمارے تعلیمی پروگرامز',
      subtitle:
        'قرآنی تعلیمات، اخلاقی تربیت اور قومی و بین الاقوامی تعلیمی نصاب کا خوبصورت اور متوازن امتزاج۔',
      curriculumNote:
        'جدید تعلیمی تقاضوں اور سنتِ نبویؐ کے اصولوں کے عین مطابق تیار کردہ جامع نصاب۔',
      items: [
        {
          id: 'hifz-program',
          title: 'شعبۂ حفظ و ناظرہ قرآن',
          description: 'ماہر و سند یافتہ قراء اور حفاظ کرام کی زیرِ نگرانی تجوید کے ساتھ حفظِ قرآن اور روزانہ دہرائی۔',
          badge: 'خصوصی کلاس',
          features: ['تجوید و حسنِ قرات', 'روزانہ حفظ و پختہ دہرائی', 'انفرادی توجہ و نگرانی'],
        },
        {
          id: 'academic-education',
          title: 'پرائمری اسکولنگ',
          description: 'پلے گروپ، نرسری تا پنجم (5th) کلاس تک معیاری عصری نصاب، انگریزی زبان اور ریاضی کی مضبوط بنیاد۔',
          badge: 'پلے گروپ تا پنجم (5th)',
          features: ['ارلی ایئرز و پرائمری', 'انگلش و ریاضی کی مہارت', 'ماہانہ امتحانات و جائزہ'],
        },
        {
          id: 'islamiat-studies',
          title: 'اسلامیات و دینیات کورس',
          description: 'قرآنی ترجمہ، مسنون دعائیں، احادیثِ مبارکہ، سیرت النبیؐ اور ضروری فقہی و اخلاقی احکام۔',
          badge: 'بنیادی دینی کورس',
          features: ['سیرت طیبہؐ کا مطالعہ', 'مسنون دعائیں و اذکار', 'اسلامی آدابِ زندگی'],
        },
        {
          id: 'character-building',
          title: 'اخلاق و تربیتِ سنت',
          description: 'صبح کی دعائیہ اسمبلی، احترامِ والدین و اساتذہ اور سنت نبویؐ کے مطابق روزمرہ عادات کی عملی مشق۔',
          badge: 'تربیت و کردار',
          features: ['سنتِ نبویؐ پر عمل', 'نظم و ضبط و احترام', 'خود اعتمادی و کردار سازی'],
        },
      ],
    },
    whyChooseUs: {
      kicker: 'ہمیں کیوں منتخب کریں؟',
      title: 'القلم کی امتیازی خصوصیات',
      subtitle:
        'اسلامی اقدار، مشفق اساتذہ اور بہترین نصاب کے تحت کھلابٹ ٹاؤن شپ سیکٹر نمبر 2 ہری پور میں بچوں کا روشن مستقبل۔',
      pillars: [
        {
          id: 'values',
          title: 'اسلامی اقدار و تربیت',
          description: 'ہم پڑھائی اور روزمرہ زندگی کے ہر پہلو میں اسلامی اخلاق اور سنت نبویؐ کی روح پیدا کرتے ہیں۔',
        },
        {
          id: 'faculty',
          title: 'تجربہ کار و مشفق اساتذہ',
          description: 'بچوں کے ساتھ شفقت سے پیش آنے والے سند یافتہ، محنتی اور باصلاحیت اساتذہ کی ٹیم۔',
        },
        {
          id: 'safety',
          title: 'محفوظ اور پرسکون ماحول',
          description: 'ایک ایسا منظم، محفوظ اور دوستانہ کیمپس جہاں ہر بچہ خوشی اور اعتماد کے ساتھ سیکھتا ہے۔',
        },
        {
          id: 'holistic',
          title: 'ہمہ جہت نشوونما',
          description: 'دینی، ذہنی، تعلیمی اور اخلاقی صلاحیتوں کی متوازن اور جامع تعمیر و ترقی۔',
        },
      ],
    },
    admissionsCTA: {
      kicker: 'داخلے جاری ہیں 2026–27',
      titleLine1: 'اپنے بچے کے روشن تعلیمی سفر کا',
      titleLine2: 'آج ہی آغاز کریں',
      description:
        'القلم اسلامک اسکول (سیکٹر نمبر 2، کھلابٹ ٹاؤن شپ، ہری پور) میں داخلہ لیں۔ پلے گروپ تا پنجم (5th) اور شعبۂ حفظ القرآن کے لیے نشستیں محدود ہیں۔',
      check1: 'ہر کلاس میں محدود تعداد برائے انفرادی توجہ',
      check2: 'مناسب و باکفایت فیس اور اعلیٰ اخلاقی تربیت',
      check3: 'محفوظ کیمپس اور والدین کے لیے آسان پک اینڈ ڈراپ',
      check4: 'دوستانہ اسیسمنٹ اور فوری ایڈمیشن رہنمائی',
      callButton: 'رابطہ کریں: 1520393 0319',
      visitButton: 'پراسپیکٹس و اسکول وزٹ حاصل کریں',
    },
    gallery: {
      kicker: 'سرگرمیاں اور کیمپس کے مناظر',
      title: 'القلم کی تصویری جھلکیاں',
      subtitle:
        'ہماری کلاس رومز، حفظ و تجوید کی نشستوں، سالانہ تقاریب اور اسکول کی سرگرمیوں کا خوبصورت تصویری احوال۔',
      allTab: 'تمام تصاویر',
      academicsTab: 'تعلیم و تدریس',
      tahfeezTab: 'حفظ و تربیت',
      facilitiesTab: 'سہولیات',
      campusLifeTab: 'کیمپس لائف',
      viewFullButton: 'مکمل سائز میں دیکھیں',
      items: [
        {
          id: 'g1',
          title: 'قرآن پاک کی تلاوت اور تجوید کا حلقہ',
          category: 'تحفیظ و تربیت',
        },
        {
          id: 'g2',
          title: 'کلاس روم میں تدریس و سرگرمیاں',
          category: 'تعلیم و تدریس',
        },
        {
          id: 'g3',
          title: 'مخصوص مصلیٰ و باجماعت نماز کی تربیت',
          category: 'روحانی زندگی و تربیت',
        },
        {
          id: 'g4',
          title: 'ارلی ایئرز بچوں کی سرگرمیاں اور کھیل',
          category: 'ابتدائی تعلیم',
        },
        {
          id: 'g5',
          title: 'اسکول کیمپس کا فرنٹ ویو',
          category: 'کیمپس اور انفراسٹرکچر',
        },
        {
          id: 'g6',
          title: 'سالانہ حسنِ قرات و تقریری مقابلہ',
          category: 'طلباء کی کامیابیاں',
        },
      ],
    },
    contact: {
      kicker: 'ہم سے رابطہ کریں',
      title: 'کیمپس تشریف لائیں اور معلومات حاصل کریں',
      subtitle:
        'ہمارا ایڈمنسٹریشن دفتر داخلوں، نصاب کی تفصیلات اور کیمپس وزٹ کے لیے آپ کی خدمت میں حاضر ہے۔',
      formTitle: 'آن لائن داخلہ معلومات فارم',
      formSubtitle: 'یہ مختصر فارم پُر کریں، ہماری انتظامیہ جلد آپ سے رابطہ کرے گی۔',
      parentNameLabel: 'والد / سرپرست کا پورا نام',
      parentNamePlaceholder: 'مثال: محمد فاروق',
      phoneLabel: 'موبائل / واٹس ایپ نمبر',
      phonePlaceholder: 'مثال: 0319 1520393',
      gradeLabel: 'مطلوبہ کلاس یا شعبہ',
      selectGrade: 'کلاس یا شعبہ منتخب کریں...',
      earlyYearsOption: 'ابتدائی کلاسز (پلے گروپ / نرسری / پریپ)',
      primaryOption: 'پرائمری (پہلی تا پانچویں کلاس)',
      hifzOption: 'شعبۂ حفظ القرآن و ناظرہ مع تجوید',
      generalOption: 'عمومی معلومات و اسکول وزٹ',
      emailLabel: 'ای میل پتہ (اختیاری)',
      emailPlaceholder: 'parent@example.com',
      messageLabel: 'اضافی پیغام یا سوالات',
      messagePlaceholder: 'فیس شیڈول، نصاب یا ٹائمنگ کے متعلق پوچھیں...',
      submitButton: 'درخواست جمع کروائیں',
      submitting: 'پیغام بھیجا جا رہا ہے...',
      successTitle: 'پیغام کامیابی سے موصول ہو گیا!',
      successMessage:
        'جزاک اللہ خیر! آپ کی معلومات ہمیں موصول ہو گئی ہیں، ہماری انتظامیہ جلد آپ سے رابطہ کرے گی۔',
      sendAnother: 'ایک اور پیغام بھیجیں',
      directWhatsApp: 'واٹس ایپ پر فوری رابطہ کریں',
      infoTitle: 'اسکول کی معلومات',
      phone: 'فون اور واٹس ایپ',
      email: 'آفیشل ای میل',
      address: 'اسکول کا پتہ',
      timings: 'دفتری و تعلیمی اوقات',
      timingsValue: 'پیر تا ہفتہ: صبح 7:30 تا دوپہر 2:00 بجے',
    },
    footer: {
      tagline: 'دینی اور عصری علوم کا حسین امتزاج • تعلیم بھی، تربیت بھی',
      description:
        'القلم اسلامک اسکول کھلابٹ ٹاؤن شپ (ہری پور) میں اسلامی اقدار، حفظ القرآن، اخلاقِ حسنہ اور معیاری عصری تعلیم کا قابلِ فخر ادارہ ہے۔',
      quickLinks: 'اہم لنکس',
      programsTitle: 'ہمارے پروگرامز',
      contactInfoTitle: 'رابطے کی معلومات',
      timingsTitle: 'دفتری اوقات',
      copyright: 'تمام جملہ حقوق محفوظ ہیں۔',
      allRightsReserved: 'القلم اسلامک اسکول، سیکٹر نمبر 2، کھلابٹ ٹاؤن شپ، ہری پور۔',
      campusLocation: 'نزد حسینی چوک، محلہ سالکین، سیکٹر نمبر 2، کھلابٹ ٹاؤن شپ، ہری پور',
    },
  },
};
