export interface Video {
  id: string;
  title: string;
  description: string;
  category: 'dahab' | 'coastal' | 'cairo' | 'adventures' | 'guides';
  categoryLabel: string;
  duration: string;
  views: string;
  publishedAt: string;
  thumbnail: string;
  youtubeId: string;
  featured?: boolean;
  seoKeywords: string[];
  location?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishedAt: string;
  relatedVideoId: string;
  seoKeywords: string[];
  author: {
    name: string;
    initials: string;
    role: string;
    avatar?: string;
  };
}

export interface ResourceTool {
  id: string;
  type: string;
  title: string;
  description: string;
  downloadCount: string;
  icon: string;
  fileSize: string;
  fileType: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const SITE_METADATA = {
  creatorName: "روماني جورج",
  englishName: "Romany Goerge",
  channelHandle: "@RomanyGoerge25",
  channelUrl: "https://www.youtube.com/@RomanyGoerge25",
  subscribeUrl: "https://www.youtube.com/@RomanyGoerge25?sub_confirmation=1",
  channelId: "UCROky7p4-JubAKwQRIDSrHQ",
  tagline: "فلوجات سفر ومغامرات واستكشاف في مصر وخارجها",
  subtagline: "رحالة وصانع محتوى سياحي | سفر بأقل ميزانية وتجارب حقيقية",
  bio: "أنا روماني جورج ودي قناتي للمغامرة والاستكشاف في كل مكان في مصر وبره مصر. لو بتدور على فلوجات سفر حقيقية فالمكان ده ليك! هنا بنعيش المغامرة وبنشبع الفضول من قلب الشوارع القديمة لقمم الجبال، ومن الرحلات الاقتصادية لأجمل خروجات وقصص وأماكن ممكن تشوفها. هتشوف جولات في أماكن مشهورة وأماكن تانية غامضة وأول مرة تشوفها، وتحديات وتجارب وتخييم ورحلات مليانة أكشن وأسرار إزاي تسافر بأقل ميزانية وتستمتع بكل لحظة.",
  avatarUrl: "https://yt3.googleusercontent.com/eGWpmKhyoIxn-oX3mz5QZUo_6FuOsYeS75GMiNAYpUS3cDpwLAtg7WvxqKXxa-yfOJ1OiAdbOCU=s900-c-k-c0x00ffffff-no-rj",
  logoUrl: "https://yt3.googleusercontent.com/eGWpmKhyoIxn-oX3mz5QZUo_6FuOsYeS75GMiNAYpUS3cDpwLAtg7WvxqKXxa-yfOJ1OiAdbOCU=s900-c-k-c0x00ffffff-no-rj",
  socials: {
    youtube: "https://www.youtube.com/@RomanyGoerge25",
    youtubeSubscribe: "https://www.youtube.com/@RomanyGoerge25?sub_confirmation=1",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
  },
  seoKeywords: [
    "Romany Goerge",
    "روماني جورج",
    "سياحة في مصر",
    "السفر في مصر",
    "فلوجات سفر",
    "فلوج دهب",
    "ارخص شاطئ في الاسكندرية",
    "المتحف المصري الكبير",
    "الاهرامات بعد التطوير",
    "سفاري دهب",
    "اماكن الخروج في رأس السنة",
    "رحلات اقتصادية في مصر",
    "Egypt travel vlog",
    "tourism in Egypt",
    "budget travel Egypt",
    "Dahab travel guide",
    "Alexandria travel guide",
  ],
};

export const METRICS: Metric[] = [
  { value: "+1.6K+", label: "مشاهد ومتابع في القناة" },
  { value: "+23", label: "فلوج كامل مصور" },
  { value: "+12", label: "مدينة ووجهة استكشفناها" },
  { value: "100%", label: "تجارب واقعية وموثوقة" },
];

export const SPOTLIGHT_VIDEO: Video = {
  id: "HBQn5QBOYpU",
  title: "جربت حاجات لأول مرة في دهب.. تجربة أديها 10 من 10",
  description: "فلوج دهب 🌊🏝️ تجربة مختلفة بعيد عن دوشة الحياة وضغط الشغل! جربت حاجات لأول مرة، وعشت مغامرات جديدة وسط البحر والجبال وأجواء دهب المميزة. تعالوا نكتشف دهب سوا ونعيش يوم مليان تجارب وذكريات جديدة.",
  category: "dahab",
  categoryLabel: "فلوجات دهب والبحر الأحمر",
  duration: "18:40",
  views: "الأكثر تفاعلاً",
  publishedAt: "أكتوبر 2026",
  thumbnail: "https://i.ytimg.com/vi/HBQn5QBOYpU/maxresdefault.jpg",
  youtubeId: "HBQn5QBOYpU",
  featured: true,
  location: "دهب، جنوب سيناء",
  seoKeywords: ["فلوج دهب", "مغامرات دهب", "سياحة دهب", "السفر إلى دهب", "Dahab vlog", "روماني جورج"],
};

export const VIDEOS: Video[] = [
  {
    id: "gFsjneUglqs",
    title: "يوم صيفي عشوائي في اسكندرية من الزمن الجميل | أرخص شاطئ",
    description: "في هذا الفيديو هنقضي يوم كامل على البحر ونجرب أرخص شاطئ في الإسكندرية، ونشوف أسعار الدخول والخدمات والأجواء وهل الشاطئ يستحق الزيارة فعلًا ولا لأ. لو بتدور على فسحة اقتصادية في إسكندرية فالفيديو ده ليك!",
    category: "coastal",
    categoryLabel: "الإسكندرية ومطروح",
    duration: "16:50",
    views: "فلوج الإسكندرية",
    publishedAt: "صيف 2026",
    thumbnail: "https://i.ytimg.com/vi/gFsjneUglqs/maxresdefault.jpg",
    youtubeId: "gFsjneUglqs",
    location: "الإسكندرية، مصر",
    seoKeywords: ["ارخص شاطئ في الاسكندرية", "اسعار شواطئ الاسكندرية", "فسحة في اسكندرية", "يوم على البحر في اسكندرية"],
  },
  {
    id: "6wXLpu_APh0",
    title: "5 أيام في دهب.. كل اللي محتاج تعرفه قبل ما تسافر",
    description: "دليل كامل وشامل لقضاء 5 أيام في مدينة السحر والسلام دهب: خطة السير، الفنادق والكامبات المناسبة، الأنشطة البحرية، وأسرار توفير الميزانية في جنوب سيناء.",
    category: "dahab",
    categoryLabel: "فلوجات دهب والبحر الأحمر",
    duration: "22:15",
    views: "دليل دهب الشامل",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/6wXLpu_APh0/maxresdefault.jpg",
    youtubeId: "6wXLpu_APh0",
    location: "دهب، جنوب سيناء",
    seoKeywords: ["5 ايام في دهب", "دليل دهب", "كامبات دهب", "السفر الى دهب"],
  },
  {
    id: "AzAMeQ7YtRw",
    title: "سافرت أجمل وأرخص مدينة ساحلية في مصر: مدينة دهب",
    description: "جولة ممتعة وتفصيلية في مدينة دهب، استعراض الممشى السياحي، خليج اللايت هاوس، وأسعار المعيشة والفسح التي تجعلها أرخص وأروع مصيف في مصر.",
    category: "dahab",
    categoryLabel: "فلوجات دهب والبحر الأحمر",
    duration: "15:30",
    views: "فلوج دهب الاقتصادي",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/AzAMeQ7YtRw/maxresdefault.jpg",
    youtubeId: "AzAMeQ7YtRw",
    location: "دهب، جنوب سيناء",
    seoKeywords: ["ارخص مدينة ساحلية في مصر", "سياحة دهب", "مصيف دهب"],
  },
  {
    id: "-gAYYdnMJFU",
    title: "دليلك السريع للخروجات والحياة الليلية في مدينة دهب",
    description: "استكشف سحر الليل في دهب: كافيهات الممشى على البحر، الحفلات البدوية في الجبل، وموسيقى الروك والريغي في أحلى أماكن السهر الهادئة.",
    category: "dahab",
    categoryLabel: "فلوجات دهب والبحر الأحمر",
    duration: "12:45",
    views: "سهرات دهب",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/-gAYYdnMJFU/maxresdefault.jpg",
    youtubeId: "-gAYYdnMJFU",
    location: "دهب، جنوب سيناء",
    seoKeywords: ["خروجات دهب", "الحياة الليلية في دهب", "سهرة جبلية دهب"],
  },
  {
    id: "bAT4UvZowBc",
    title: "دليلك السريع: تأكل إيه في دهب؟ مطاعم وشوارع وأكلات شعبية",
    description: "جولة طعام كاملة في دهب: من وجبات الفول والفلافل الصباحية على البحر، إلى وجبات السي فود الطازجة في السوق القديم والمشاوي البدوية اللذيذة.",
    category: "dahab",
    categoryLabel: "فلوجات دهب والبحر الأحمر",
    duration: "14:10",
    views: "أكل ومطاعم دهب",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/bAT4UvZowBc/maxresdefault.jpg",
    youtubeId: "bAT4UvZowBc",
    location: "دهب، جنوب سيناء",
    seoKeywords: ["تاكل ايه في دهب", "مطاعم دهب", "اكل دهب", "سي فود دهب"],
  },
  {
    id: "yqlWpZ0kvos",
    title: "الصدمة! تجربتي الأولى للمبيت في كامب بدوي 🏕️ ما توقعتش كدة!",
    description: "تجربة واقعية للنوم والإقامة في كامب بدوي مفتوح في دهب: إيجابيات وسلبيات التجربة، الحمامات المشتركة، الهدوء، وهل أنصح بها للجميع أم لا.",
    category: "dahab",
    categoryLabel: "فلوجات دهب والبحر الأحمر",
    duration: "16:20",
    views: "تجربة تخييم",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/yqlWpZ0kvos/maxresdefault.jpg",
    youtubeId: "yqlWpZ0kvos",
    location: "دهب، جنوب سيناء",
    seoKeywords: ["كامب دهب", "تخييم دهب", "المبيت في كامب"],
  },
  {
    id: "7NcY_NjtyNY",
    title: "أفضل 4 مصايف في مصر 2026؟ مطروح vs دهب vs اسكندرية",
    description: "مقارنة شاملة وصادقة بين أشهر مصايف مصر: مرسى مطروح، دهب، والإسكندرية، من حيث الأسعار، نقاء البحر، الخدمات، والأنشطة المناسبة للشباب والعائلات.",
    category: "coastal",
    categoryLabel: "الإسكندرية ومطروح",
    duration: "19:40",
    views: "مقارنة مصايف مصر",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/7NcY_NjtyNY/maxresdefault.jpg",
    youtubeId: "7NcY_NjtyNY",
    location: "مصر",
    seoKeywords: ["افضل مصايف مصر", "مطروح vs دهب", "اسعار المصايف في مصر"],
  },
  {
    id: "FZMm-cVwDPM",
    title: "دليلك السريع لمرسى مطروح – كل اللي محتاج تعرفه عن المصيف",
    description: "جولة على أجمل شواطئ مالديف مصر في مرسى مطروح: شاطئ الأبيض، عجيبة، كليوباترا، مع نصائح المواصلات والإقامة وأرخص أسعار الشقق والشاليهات.",
    category: "coastal",
    categoryLabel: "الإسكندرية ومطروح",
    duration: "13:55",
    views: "دليل مرسى مطروح",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/FZMm-cVwDPM/maxresdefault.jpg",
    youtubeId: "FZMm-cVwDPM",
    location: "مرسى مطروح، مصر",
    seoKeywords: ["مرسى مطروح", "شواطئ مطروح", "مصيف مطروح", "دليل مطروح"],
  },
  {
    id: "fwsShsW88EU",
    title: "إسكندرية صد رد في الشتاء.. هل تستحق السفر؟",
    description: "رحلة يوم واحد خاطفة إلى الإسكندرية في قلب الشتاء والنوة: ركوب القطار، التمشية على الكورنيش، أكل الحواوشي والكبدة السكندرية، وتجربة شتوية ولا أروع.",
    category: "coastal",
    categoryLabel: "الإسكندرية ومطروح",
    duration: "11:30",
    views: "شتاء الإسكندرية",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/fwsShsW88EU/maxresdefault.jpg",
    youtubeId: "fwsShsW88EU",
    location: "الإسكندرية، مصر",
    seoKeywords: ["اسكندرية في الشتاء", "اسكندرية صد رد", "نوة اسكندرية"],
  },
  {
    id: "OmdbvTZOLK0",
    title: "داخل المتحف المصري الكبير | اكتشفنا كنوز لم تُرى من قبل! 🔥",
    description: "تغطية وجولة حصرية داخل الصرح الثقافي الأكبر عالمياً: المتحف المصري الكبير (GEM)، استعراض الدرج العظيم، قاعات العرض، وتفاصيل الزيارة بالأسعار.",
    category: "cairo",
    categoryLabel: "القاهرة والمعالم",
    duration: "21:00",
    views: "المتحف الكبير",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/OmdbvTZOLK0/maxresdefault.jpg",
    youtubeId: "OmdbvTZOLK0",
    location: "الجيزة، مصر",
    seoKeywords: ["المتحف المصري الكبير", "Grand Egyptian Museum", "زيارة المتحف الكبير"],
  },
  {
    id: "K3A2IKu3ud0",
    title: "الأهرامات بعد التطوير 😳 مش هتصدق بقت عاملة إزاي!",
    description: "جولة ميدانية بعد تطوير هضبة أهرامات الجيزة بالكامل: الحافلات الكهربائية الصديقة للبيئة، مطاعم البانوراما، والخدمات السياحية الجديدة ذات المعايير العالمية.",
    category: "cairo",
    categoryLabel: "القاهرة والمعالم",
    duration: "17:15",
    views: "تطوير الأهرامات",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/K3A2IKu3ud0/maxresdefault.jpg",
    youtubeId: "K3A2IKu3ud0",
    location: "الجيزة، مصر",
    seoKeywords: ["الاهرامات بعد التطوير", "اهرامات الجيزة", "تطوير هضبة الاهرامات"],
  },
  {
    id: "xClDOlPvU1c",
    title: "المكان اللي مرت منه العائلة المقدسة في مصر.. والسر اللي محدش يعرفه!",
    description: "رحلة استكشافية تاريخية على مسار رحلة العائلة المقدسة في مصر، وزيارة المغارات والمعالم الروحية القديمة وقصة لا يعرفها الكثيرون.",
    category: "cairo",
    categoryLabel: "القاهرة والمعالم",
    duration: "18:25",
    views: "مسار العائلة المقدسة",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/xClDOlPvU1c/maxresdefault.jpg",
    youtubeId: "xClDOlPvU1c",
    location: "مصر القديمة",
    seoKeywords: ["مسار العائلة المقدسة", "اماكن تاريخية في مصر", "اثار مصر المسيحية"],
  },
  {
    id: "oh07OB2dgZs",
    title: "أجواء رمضان في شارع المعز 2026 | جولة في أشهر الكافيهات وأجمل الحفلات",
    description: "ليلة رمضانية تاريخية في قلب القاهرة الفاطمية وشارع المعز لدين الله الفاطمي: الفوانيس، الفرق الصوفية، الحفلات التراثية، وألذ مشروبات شتوية ورمضانية.",
    category: "cairo",
    categoryLabel: "القاهرة والمعالم",
    duration: "15:10",
    views: "رمضان المعز",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/oh07OB2dgZs/maxresdefault.jpg",
    youtubeId: "oh07OB2dgZs",
    location: "القاهرة التاريخية",
    seoKeywords: ["رمضان في شارع المعز", "شارع المعز", "كافيهات شارع المعز"],
  },
  {
    id: "CeLH3F-XrwA",
    title: "سحر القاهرة في 2026.. ليه لازم تزورها دلوقتي؟ (تجربة حقيقية) 🌙",
    description: "فلوج يكشف الوجه الجمالي المعاصر لمدينة القاهرة: من ممشى أهل مصر وتطوير القلعة، إلى كافيهات وسط البلد العريقة والتناغم الساحر بين القديم والحديث.",
    category: "cairo",
    categoryLabel: "القاهرة والمعالم",
    duration: "14:40",
    views: "سحر القاهرة",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/CeLH3F-XrwA/maxresdefault.jpg",
    youtubeId: "CeLH3F-XrwA",
    location: "القاهرة، مصر",
    seoKeywords: ["سحر القاهرة", "سياحة القاهرة", "فسح القاهرة 2026"],
  },
  {
    id: "CEsqMZOtw5Q",
    title: "24 ساعة Paintball في أجمد مكان بالقاهرة | أكشن كامل",
    description: "تحدي ولعبة البينتبول المليئة بالإثارة والأدرينالين مع الأصدقاء: التكتيكات الحربية، إطلاق كرات الألوان، وأفضل الأماكن المناسبة للخروج واللعب في القاهرة.",
    category: "adventures",
    categoryLabel: "مغامرات وأنشطة",
    duration: "12:20",
    views: "مغامرة Paintball",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/CEsqMZOtw5Q/maxresdefault.jpg",
    youtubeId: "CEsqMZOtw5Q",
    location: "القاهرة، مصر",
    seoKeywords: ["بينتبول القاهرة", "Paintball Cairo", "انشطة شبابية في القاهرة"],
  },
  {
    id: "ceRJLesMS8Y",
    title: "Mario High Ropes المقطم | تجربة مليانة أدرينالين 😍 هل هي أفضل خروجة مغامرات؟",
    description: "تجربة حبال الانزلاق والتسلق والتوازن على ارتفاعات عالية في ماريو هاي روبس بالمقطم، تقييم كامل للسلامة والأسعار ومستوى التحدي.",
    category: "adventures",
    categoryLabel: "مغامرات وأنشطة",
    duration: "13:45",
    views: "مغامرة الحبال المقطم",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/ceRJLesMS8Y/maxresdefault.jpg",
    youtubeId: "ceRJLesMS8Y",
    location: "المقطم، القاهرة",
    seoKeywords: ["ماريو هاي روبس المقطم", "Mario High Ropes", "خروجة مغامرات في القاهرة"],
  },
  {
    id: "mXjPGq1sF7M",
    title: "يوم كامل في الفيوم.. هل تستحق السفر فعلاً؟",
    description: "جولة يوم كامل في واحة الفيوم: بحيرة قارون، شلالات وادي الريان، قرية تونس لصناعة الخزف، وتجربة الفطير المشلتت والعسل في قلب الطبيعة.",
    category: "adventures",
    categoryLabel: "مغامرات وأنشطة",
    duration: "17:35",
    views: "يوم في الفيوم",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/mXjPGq1sF7M/maxresdefault.jpg",
    youtubeId: "mXjPGq1sF7M",
    location: "الفيوم، مصر",
    seoKeywords: ["يوم في الفيوم", "وادي الريان", "قرية تونس الفيوم", "سياحة الفيوم"],
  },
  {
    id: "nuLdFUf15PY",
    title: "داخل أكبر تجمع لتدوير القمامة في العالم بمنطقة المقطم (حي الزبالين)",
    description: "جولة استكشافية وثائقية نادرة داخل حي الزبالين بالمقطم وكنسية دير القديس سمعان الخراز، والتعرف على أكبر منظومة إعادة تدوير بيئية يدوية في العالم.",
    category: "adventures",
    categoryLabel: "مغامرات وأنشطة",
    duration: "16:05",
    views: "وثائقي المقطم",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/nuLdFUf15PY/maxresdefault.jpg",
    youtubeId: "nuLdFUf15PY",
    location: "المقطم، القاهرة",
    seoKeywords: ["حي الزبالين المقطم", "دير سمعان الخراز", "تدوير القمامة في مصر"],
  },
  {
    id: "qxnV-3bGa7U",
    title: "دليلك السريع لأماكن الخروج في رأس السنة في مصر 2026",
    description: "أقوى ترشيحات الخروج والاحتفال بليلة رأس السنة والعام الجديد في القاهرة والمحافظات، مع خطط مناسبة لجميع الميزانيات من المجانية للاقتصادية.",
    category: "guides",
    categoryLabel: "أدلة السفر والميزانية",
    duration: "10:50",
    views: "أماكن رأس السنة",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/qxnV-3bGa7U/maxresdefault.jpg",
    youtubeId: "qxnV-3bGa7U",
    location: "مصر",
    seoKeywords: ["اماكن الخروج في رأس السنة", "خروجات رأس السنة 2026", "فسح رأس السنة"],
  },
  {
    id: "eSOobokQdNk",
    title: "أفضل أماكن الخروج في العيد | خروجات رهيبة وأجواء العيد في مصر",
    description: "خطط وأماكن غير مكررة لقضاء إجازة العيد في مصر: حدائق، ممشى، مطاعم، وأنشطة ترفيهية تناسب الشباب والعائلات بعيداً عن الزحام الشديد.",
    category: "guides",
    categoryLabel: "أدلة السفر والميزانية",
    duration: "14:15",
    views: "خروجات العيد",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/eSOobokQdNk/maxresdefault.jpg",
    youtubeId: "eSOobokQdNk",
    location: "مصر",
    seoKeywords: ["اماكن الخروج في العيد", "فسح العيد في مصر", "خروجات العيد 2026"],
  },
  {
    id: "nbftp4Jm4Yw",
    title: "جربت أرخص مكان إقامة في القاهرة (هوستيل) | الحقيقة كاملة",
    description: "تجربة المبيت في أرخص هوستل شبابي بوسط البلد في القاهرة: مستوى النظافة، الأمان، السعر مقابل القيمة، وهل ينفع للمسافرين القادمين من المحافظات؟",
    category: "guides",
    categoryLabel: "أدلة السفر والميزانية",
    duration: "15:50",
    views: "تجربة هوستل رخيص",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/nbftp4Jm4Yw/maxresdefault.jpg",
    youtubeId: "nbftp4Jm4Yw",
    location: "وسط البلد، القاهرة",
    seoKeywords: ["ارخص مكان اقامة في القاهرة", "هوستل في القاهرة", "Hostel Cairo"],
  },
  {
    id: "JteFk2DYxks",
    title: "لو سافرت لوحدك هتتبسط ولا لأ؟ | أسرار السفر الفردي (Solo Travel)",
    description: "حديث من القلب عن تجربة السفر بمفردك (Solo Traveling): كيف تتغلب على الخوف والملل، وتتعرف على أصدقاء جدد، وتستمتع بأعلى درجات الحرية في رحلتك.",
    category: "guides",
    categoryLabel: "أدلة السفر والميزانية",
    duration: "13:10",
    views: "السفر الفردي",
    publishedAt: "2026",
    thumbnail: "https://i.ytimg.com/vi/JteFk2DYxks/maxresdefault.jpg",
    youtubeId: "JteFk2DYxks",
    location: "دليل عام",
    seoKeywords: ["السفر لوحدك", "Solo travel Egypt", "نصائح السفر الفردي"],
  },
];

export const ARTICLES: Article[] = [
  {
    id: "dahab-budget-travel-guide",
    slug: "dahab-budget-travel-guide",
    title: "دليل السفر إلى دهب بأقل ميزانية: كيف تقضي 4 إلى 5 أيام بمصاريف اقتصادية؟",
    excerpt: "خطة وتفاصيل عملية مستوحاة من رحلاتي لدهب: الإقامة الرخيصة، المواصلات من القاهرة، تكلفة الدايفنج والكياك، وألذ مطاعم الممشى.",
    content: `مدينة دهب ليست مجرد مصيف، بل هي أسلوب حياة وهدوء لا تجده في أي مكان آخر في العالم. الكثير يعتقد أن السفر لدهب يحتاج ميزانية ضخمة، لكن الحقيقة هي العكس تماماً إذا عرفت الأسرار الصح.

1. المواصلات من وإلى دهب:
يمكنك السفر عبر حافلات جو باص أو ويست ديليت (West & East Delta) بأسعار تبدأ من 250 إلى 400 جنيه مصري، أو عبر مشاركة السيارات (Carpooling) لتوفير الوقت والمال. مدة الرحلة تستغرق حوالي 8 إلى 9 ساعات، ومن الأفضل حجز رحلة مسائية للنوم طوال الطريق والاستيقاظ في دهب صباحاً.

2. الإقامة الاقتصادية (Camp & Hostels):
دهب مليئة بالكامبات البدوية والنزل الشبابية النظيفة في منطقتي اللايت هاوس (Lighthouse) والمسبط والمشربة بأسعار تبدأ من 150 إلى 300 جنيه لليلة. هذه الأماكن تمنحك فرصة التعرف على مسافرين من مختلف دول العالم وتتميز بقربها الشديد من البحر.

3. الأنشطة البحرية والتخييم:
- الدايفنج (Scuba Diving): أسعار الغطس التمهيدي (Discovery Dive) مع مدرب محترف تبدأ من 35 إلى 45 دولار وتعد الأرخص عالمياً مع أعلى جودة رؤية للشعاب المرجانية في البلو هول ومحمية رأس أبو جالوم.
- الكياك (Kayaking): يمكنك استئجار كياك لمدة ساعة بمبلغ رمزي في خليج دهب الهادئ وقت الشروق.
- سفاري البيتش باجي: رحلة غروب الشمس إلى بانوراما دهب ووادي النجوم تجربة لا تفوت لشرب الشاي البدوي بالحبق ومشاهدة ألوان الغروب الذهبية خلف جبال سيناء.

4. الطعام والشراب:
تجنب المطاعم السياحية الفاخرة على البحر وتوجه للشوارع الداخلية للممشى لتناول الكشري، الفول والطعمية، والفطير، بالإضافة إلى وجبات السي فود الطازجة في السوق القديم حيث يمكنك اختيار السمك الطازج بالكيلو وطهيه على الفحم بنصف تكلفة المطاعم الكبرى.`,
    category: "دليل وجهات مصر",
    readTime: "قراءة 6 دقائق",
    publishedAt: "نوفمبر 2026",
    relatedVideoId: "HBQn5QBOYpU",
    seoKeywords: ["السفر الى دهب", "ارخص رحلة لدهب", "كامبات دهب", "تكلفة السفر الى دهب", "دايفنج دهب"],
    author: {
      name: "روماني جورج",
      initials: "ر.ج",
      role: "رحالة ومستكشف سياحي",
    },
  },
  {
    id: "alexandria-cheapest-beaches",
    slug: "alexandria-cheapest-beaches",
    title: "أرخص شواطئ وفسح الإسكندرية في 2026: جدول يوم كامل على البحر بأقل من 150 جنيه",
    excerpt: "تجربة واقعية لاستكشاف أرخص شواطئ عروس البحر الأبيض المتوسط، أسعار التذاكر والخدمات، وكيف تقضي يوماً ممتعاً من الزمن الجميل.",
    content: `الإسكندرية لها سحر خاص في كل الفصول، وفي هذا التقرير أشارككم خلاصة جولتي المصورة على كورنيش وشواطئ إسكندرية بأقل تكلفة ممكنة:

1. الشواطئ العامة والخدمة لمن يطلبها:
تتيح محافظة الإسكندرية شواطئ عامة مجانية وأخرى بنظام "الخدمة لمن يطلبها" بتذاكر تبدأ من 5 إلى 15 جنيهاً فقط للفرد شاملة الشمسية والكرسي واستخدام دورات المياه وغرف تغيير الملابس. شاطئ المندرة المجاني وشاطئ جليم العام من أفضل الخيارات التي تمنحك إطلالة رائعة دون دفع مبالغ باهظة.

2. برنامج اليوم الكامل الاقتصادي:
- الصباح الباكر (7 صباحاً): الوصول بالقطار الروسي أو قطار التالجو إلى محطة مصر أو سيدي جابر.
- الإفطار السكندري الأصيل: فول وفلافل مع باذنجان مخلل وسلطة طحينة على البحر مباشرة بـ 25 جنيهاً.
- وقت الشاطئ والسباحة (من 9 صباحاً حتى 2 ظهراً): الاستمتاع بنسيم البحر والأمواج وأخذ الصور التذكارية.
- الغداء الشعبي: سندوتشات كبدة إسكندراني وسبيط وجمبري مقلي من المحلات الشعبية العريقة في منطقة بحري والأنفوشي.
- الغروب والسهرة: المشي على كوبري ستانلي وشراء الآيس كريم أو الأرز باللبن والمكسرات من محطة الرمل واختتام اليوم بركوب الترام الأصفر التراثي.`,
    category: "جولات المدن",
    readTime: "قراءة 5 دقائق",
    publishedAt: "صيف 2026",
    relatedVideoId: "gFsjneUglqs",
    seoKeywords: ["ارخص شاطئ في الاسكندرية", "اسعار شواطئ الاسكندرية", "شواطئ اسكندرية المجانية", "فسحة في اسكندرية"],
    author: {
      name: "روماني جورج",
      initials: "ر.ج",
      role: "رحالة ومستكشف سياحي",
    },
  },
  {
    id: "new-years-eve-outings-egypt",
    slug: "new-years-eve-outings-egypt",
    title: "أماكن الخروج والاحتفال برأس السنة في مصر: دليلك لأجمل الخروجات الاقتصادية",
    excerpt: "أفكار مميزة للاحتفال بليلة رأس السنة 2026 بأجواء ساحرة وتكلفة اقتصادية، من ممشى أهل مصر وكورنيش النيل إلى معالم دهب وسيوة.",
    content: `ليلة رأس السنة فرصة مثالية لصنع ذكريات لا تُنسى، وإليك أبرز الخيارات للخروج بأقل تكلفة:

1. القاهرة والجيزة:
- ممشى أهل مصر: أجواء احتفالية وإضاءات مبهرة وألعاب نارية فوق النيل بتذكرة دخول رمزية.
- شارع المعز والجمالية: تجربة شتوية تراثية أصيلة وسط المباني التاريخية والمقاهي العتيقة مع سماع الطرب الأصيل.
- جولة فلوكة في النيل: استئجار فلوكة نيلية مع أصحابك بسعر جماعي والاستمتاع بأنوار العاصمة وانعكاسها على صفحة النيل.
- حديقة الأزهر: إطلالة بانورامية ساحرة على قلعة صلاح الدين الأيوبي ومآذن القاهرة القديمة مع مساحات خضراء شاسعة.

2. المدن الساحلية والشتوية:
- دهب وسانت كاترين: الاحتفال برأس السنة فوق قمة جبل موسى في سانت كاترين ومشاهدة شروق أول شمس للعام الجديد في لحظة إيمانية وجمالية مهيبة.
- الإسكندرية: الاستمتاع بنوة رأس السنة وأمواج بحري مع كوب شاي ساخن بالميرمية وساندوتش حواوشي ساخن على الكورنيش.`,
    category: "أدلة ودليل السفر",
    readTime: "قراءة 5 دقائق",
    publishedAt: "نوفمبر 2026",
    relatedVideoId: "qxnV-3bGa7U",
    seoKeywords: ["اماكن الخروج في رأس السنه في مصر", "خروجات رأس السنة", "اماكن فسح في مصر", "احتفالات رأس السنة في القاهرة"],
    author: {
      name: "روماني جورج",
      initials: "ر.ج",
      role: "رحالة ومستكشف سياحي",
    },
  },
  {
    id: "matrouh-vs-dahab-vs-alex",
    slug: "matrouh-vs-dahab-vs-alex",
    title: "مقارنة المصايف: مرسى مطروح vs دهب vs الإسكندرية.. أيهم تختار لرحلتك القادمة؟",
    excerpt: "مقارنة شاملة من واقع التجربة الميدانية: مقارنة الأسعار، هدوء الشواطئ، الأنشطة، وطبيعة كل مصيف لمساعدتك على اتخاذ القرار الصحيح.",
    content: `السؤال الذي يحير ملايين المصطافين كل عام: هل نسافر إلى دهب أم مطروح أم الإسكندرية؟ لكل وجهة طابع خاص يناسب شخصيات وميزانيات مختلفة:

1. دهب (عاصمة الهدوء والاسترخاء):
- لمن تناسب: الشباب، عشاق الغطس، محبي اليوجا والهدوء، ومحبي البساطة والتخييم.
- ميزة دهب: طقس معتدل طوال العام، تكاليف معيشة رخيصة جداً، بحر نقي مليء بالشعب المرجانية الملونة.
- عيب دهب: بعدها النسبي عن القاهرة (8-9 ساعات براً)، والشواطئ أغلبها صخرية تحتاج حذاء بحر.

2. مرسى مطروح (مالديف مصر برمال بيضاء ناعمة):
- لمن تناسب: العائلات، محبي السباحة في مياه تركوازية ضحلة، ومحبي الشواطئ الرملية المفتوحة.
- ميزة مطروح: شواطئ خيالية تنافس جزر المالديف (الأبيض، عجيبة، كليوباترا، روميل)، وطبيعة بحر مهدئة للأعصاب.
- عيب مطروح: موسمها الصيفي قصير جداً (من يوليو إلى سبتمبر)، وزحام الشواطئ في ذروة الموسم.

3. الإسكندرية (عروس المتوسط ومدينة الروح والذكريات):
- لمن تناسب: رحلات اليوم الواحد السريعة (صد رد)، محبي السياحة الثقافية والشعبية، وعشاق التمشية والأكل السكندري.
- ميزة إسكندرية: قريبة جداً من القاهرة (ساعتان بالقطار السريع)، مليئة بالمطاعم والمعالم والأنشطة في كل زاوية.
- عيب إسكندرية: البحر في الصيف مزدحم جداً ولا يقارن بنقاء دهب أو مطروح.`,
    category: "مقارنات وخطط",
    readTime: "قراءة 6 دقائق",
    publishedAt: "2026",
    relatedVideoId: "7NcY_NjtyNY",
    seoKeywords: ["مقارنة المصايف", "دهب ولا مطروح", "مصيف اسكندرية", "افضل بحر في مصر"],
    author: {
      name: "روماني جورج",
      initials: "ر.ج",
      role: "رحالة ومستكشف سياحي",
    },
  },
];

export const RESOURCE_TOOLS: ResourceTool[] = [
  {
    id: "tool-packing-list",
    type: "ملف PDF تفاعلي",
    title: "قائمة تجهيز شنطة السفر والمغامرة والتخييم",
    description: "تشيك ليست شاملة لكل ما تحتاجه لرحلات البحر، التخييم في الصحراء، وصعود الجبال حتى لا تنسى أي شيء أساسي.",
    downloadCount: "حمّله أكثر من 3,800 مسافر",
    icon: "backpack",
    fileSize: "2.4 MB",
    fileType: "PDF Checklist",
  },
  {
    id: "tool-budget-sheet",
    type: "شيت إكسل جاهز",
    title: "حاسبة ميزانية السفر الذكية في مصر (دهب، شرم، إسكندرية)",
    description: "حساب تلقائي لتكلفة البنزين والمواصلات والإقامة والأنشطة والوجبات اليومية لضبط ميزانيتك قبل الانطلاق.",
    downloadCount: "حمّله أكثر من 4,200 مسافر",
    icon: "calculator",
    fileSize: "1.1 MB",
    fileType: "Excel Sheet",
  },
  {
    id: "tool-dahab-map",
    type: "خريطة جوجل مخصصة",
    title: "دليل نقاط GPS لأفضل كافيهات ومطاعم دهب المخفية والموفرة",
    description: "قائمة مثبتة على خرائط Google تضم أهم أماكن الغطس، الكامبات، والمطاعم الشعبية ذات التقييم العالي والأسعار المناسبة.",
    downloadCount: "حفظه أكثر من 5,600 مستكشف",
    icon: "map",
    fileSize: "Google Maps Link",
    fileType: "Map Layer",
  },
  {
    id: "tool-travel-apps",
    type: "دليل رقمي مصور",
    title: "أفضل 5 تطبيقات ذكية للمسافرين في مصر 2026",
    description: "روابط وتوجيهات لأقوى التطبيقات لحجز الباصات، تتبع الطقس، الخرائط دون إنترنت، وحجز غرف الهوستل بأوفر سعر.",
    downloadCount: "حمّله أكثر من 2,900 مستخدم",
    icon: "terminal",
    fileSize: "3.1 MB",
    fileType: "Digital Guide",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "من هو روماني جورج وما هو محتوى قناته؟",
    answer: "روماني جورج هو رحالة ومستكشف سياحي وصانع محتوى مصري متخصص في فلوجات السفر والمغامرات واستكشاف المعالم السياحية والأماكن غير التقليدية في مصر وخارجها، مع التركيز على السفر بأقل ميزانية ممكنة وتقديم نصائح عملية للشباب والعائلات.",
  },
  {
    question: "أين يمكنني متابعة فلوجات روماني جورج الجديدة؟",
    answer: "يمكنك متابعة كافة الفيديوهات الحصرية عبر قناة يوتيوب الرسمية @RomanyGoerge25، كما يتم نشر المقاطع السريعة وتحديثات السفر أسبوعياً.",
  },
  {
    question: "كيف أسافر إلى دهب بأقل ميزانية؟",
    answer: "يمكنك السفر بحافلات النقل العام الاقتصادية (جو باص أو ويست ديليت)، والإقامة في كامبات ونزل شبابية في منطقتي اللايت هاوس أو المسبط، وتناول الوجبات في المطاعم الشعبية بالممشى، وتنسيق الأنشطة البحرية مثل الدايفنج والكياك مباشرة دون وسطاء.",
  },
  {
    question: "ما هي أرخص شواطئ الإسكندرية لليوم الواحد؟",
    answer: "شواطئ الإسكندرية المجانية مثل شاطئ المندرة المجاني وشواطئ 'الخدمة لمن يطلبها' في جليم وبحري والأنفوشي تتيح لك قضاء يوم كامل على البحر بتكلفة دخول رمزية جداً تشمل الشمسية والمقاعد.",
  },
  {
    question: "هل تنصح بالسفر الفردي (Solo Travel) في مصر؟",
    answer: "نعم بالتأكيد! مصر بلد آمن ومضياف، ومدن مثل دهب والأقصر وأسوان والإسكندرية مثالية جداً للسفر الفردي، وستتعرف خلال رحلتك على مسافرين وأصدقاء رائعين.",
  },
];
