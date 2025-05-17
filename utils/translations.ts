"use client"

import { useLanguage } from "@/contexts/language-context"

type TranslationKey =
  | "home.hero.title1"
  | "home.hero.description1"
  | "home.hero.title2"
  | "home.hero.description2"
  | "home.hero.title3"
  | "home.hero.description3"
  | "home.hero.title4"
  | "home.hero.description4"
  | "common.discover"
  | "common.contact"

const translations: Record<string, Record<TranslationKey, string>> = {
  fr: {
    "home.hero.title1": "Élégance & Confort",
    "home.hero.description1": "Découvrez notre flotte premium pour une expérience de conduite incomparable",
    "home.hero.title2": "Service VIP",
    "home.hero.description2": "Voyagez avec distinction dans nos véhicules de luxe avec chauffeur dédié",
    "home.hero.title3": "Moments Exceptionnels",
    "home.hero.description3": "Solutions de transport sur mesure pour vos événements les plus prestigieux",
    "home.hero.title4": "Aventures Marocaines",
    "home.hero.description4": "Explorez les paysages spectaculaires du Maroc avec nos véhicules tout-terrain",
    "common.discover": "Découvrir",
    "common.contact": "Nous contacter",
  },
  en: {
    "home.hero.title1": "Elegance & Comfort",
    "home.hero.description1": "Discover our premium fleet for an incomparable driving experience",
    "home.hero.title2": "VIP Service",
    "home.hero.description2": "Travel with distinction in our luxury vehicles with dedicated chauffeur",
    "home.hero.title3": "Exceptional Moments",
    "home.hero.description3": "Tailored transportation solutions for your most prestigious events",
    "home.hero.title4": "Moroccan Adventures",
    "home.hero.description4": "Explore Morocco's spectacular landscapes with our all-terrain vehicles",
    "common.discover": "Discover",
    "common.contact": "Contact Us",
  },
  ar: {
    "home.hero.title1": "أناقة وراحة",
    "home.hero.description1": "اكتشف أسطولنا المتميز لتجربة قيادة لا مثيل لها",
    "home.hero.title2": "خدمة كبار الشخصيات",
    "home.hero.description2": "سافر بتميز في سياراتنا الفاخرة مع سائق مخصص",
    "home.hero.title3": "لحظات استثنائية",
    "home.hero.description3": "حلول نقل مخصصة لأكثر مناسباتك تميزًا",
    "home.hero.title4": "مغامرات مغربية",
    "home.hero.description4": "استكشف المناظر الطبيعية المذهلة في المغرب مع سياراتنا رباعية الدفع",
    "common.discover": "اكتشف",
    "common.contact": "اتصل بنا",
  },
}

export function useTranslation() {
  const { language } = useLanguage()

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.fr[key]
  }

  return { t }
}
