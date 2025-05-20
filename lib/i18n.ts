// Simple translation system
// In a real app, you would use a proper i18n library like next-intl or react-i18next

type TranslationKey = string
type TranslationValue = string

interface Translations {
  [key: string]: {
    [key: TranslationKey]: TranslationValue
  }
}

// Default translations
const translations: Translations = {
  fr: {
    // Common
    "app.title": "Système de Gestion R-Travel",
    "app.loading": "Chargement...",
    "app.save": "Enregistrer",
    "app.cancel": "Annuler",
    "app.edit": "Modifier",
    "app.delete": "Supprimer",
    "app.search": "Rechercher",
    "app.filter": "Filtrer",
    "app.details": "Détails",
    "app.close": "Fermer",
    "app.print": "Imprimer",
    "app.download": "Télécharger",
    "app.upload": "Télécharger",
    "app.add": "Ajouter",
    "app.remove": "Supprimer",
    "app.confirm": "Confirmer",

    // Navigation
    "nav.dashboard": "Tableau de bord",
    "nav.vehicles": "Véhicules",
    "nav.drivers": "Chauffeurs",
    "nav.transfers": "Transferts",
    "nav.bookings": "Réservations",
    "nav.documents": "Documents",
    "nav.car-status": "Statut des véhicules",
    "nav.document-form": "Formulaires",
    "nav.settings": "Paramètres",

    // Vehicles
    "vehicles.title": "Gestion des Véhicules",
    "vehicles.add": "Ajouter un véhicule",
    "vehicles.type": "Type de véhicule",
    "vehicles.matricule": "Matricule",
    "vehicles.status": "Statut",
    "vehicles.status.available": "Disponible",
    "vehicles.status.rented": "Loué",
    "vehicles.status.maintenance": "Maintenance",
    "vehicles.status.reserved": "Réservé",

    // Drivers
    "drivers.title": "Gestion des Chauffeurs",
    "drivers.add": "Ajouter un chauffeur",
    "drivers.name": "Nom et prénom",
    "drivers.cin": "CIN",
    "drivers.address": "Adresse",
    "drivers.phone": "Téléphone",
    "drivers.status": "Statut",
    "drivers.status.available": "Disponible",
    "drivers.status.on_duty": "En service",
    "drivers.status.off_duty": "Repos",
    "drivers.status.vacation": "Congé",

    // Documents
    "documents.title": "Système de Gestion Documentaire",
    "documents.upload": "Télécharger un document",
    "documents.existing": "Documents existants",
    "documents.templates": "Modèles de documents",
    "documents.expiring": "Documents expirants",
    "documents.category.vehicle": "Documents Véhicule",
    "documents.category.driver": "Documents Chauffeur",
    "documents.category.client": "Documents Client",
    "documents.category.trip": "Documents Voyage",
    "documents.category.company": "Documents Entreprise",
    "documents.status.valid": "Valide",
    "documents.status.expiring": "Expire bientôt",
    "documents.status.expired": "Expiré",

    // Car Status
    "car-status.title": "Statut des Véhicules",
    "car-status.overview": "Vue d'ensemble",
    "car-status.maintenance": "Maintenance",
    "car-status.documents": "Documents",
    "car-status.history": "Historique",
    "car-status.total": "Total des véhicules",
    "car-status.available": "Disponibles",
    "car-status.rented": "En location",
    "car-status.in-maintenance": "En maintenance",

    // Document Forms
    "document-form.title": "Formulaires de Documents",
    "document-form.contract": "Contrat de Location",
    "document-form.invoice": "Facture",
    "document-form.delivery": "Bon de Livraison",
    "document-form.mission": "Ordre de Mission",
    "document-form.maintenance": "Fiche d'Entretien",
    "document-form.preview": "Aperçu du document",

    "profile.companyProfile": "Profil d'entreprise",
    "profile.companyProfileDescription": "Informations légales et administratives de l'entreprise",
    "profile.editingMode": "Mode édition",
    "profile.viewMode": "Mode consultation",
    "profile.active": "Active",
    "profile.save": "Enregistrer",
    "profile.edit": "Modifier",
    "profile.general": "Général",
    "profile.contact": "Contact",
    "profile.management": "Gestion",
    "profile.activity": "Activité",
    "profile.companyName": "Nom de l'entreprise",
    "profile.legalForm": "Forme juridique",
    "profile.startDate": "Date de création",
    "profile.duration": "Durée",
    "profile.capital": "Capital social",
    "profile.taxId": "Identifiant fiscal",
    "profile.ice": "ICE",
    "profile.rc": "Registre de commerce",
    "profile.patente": "Patente",
    "profile.tva": "Identifiant TVA",
    "profile.cnss": "CNSS",
    "profile.address": "Adresse",
    "profile.phone": "Téléphone",
    "profile.email": "Email",
    "profile.website": "Site web",
    "profile.manager": "Gérant",
    "profile.managerId": "Identité",
    "profile.managerNationality": "Nationalité",
    "profile.managerBirthdate": "Date de naissance",
    "profile.managerAddress": "Adresse",
    "profile.mainActivity": "Activité principale",
    "profile.commune": "Commune",
    "profile.lastUpdated": "Dernière mise à jour",
    "documents.legalDocuments": "Documents légaux",
    "documents.legalDocumentsDescription": "Gérez les documents légaux et administratifs de l'entreprise",
    "documents.uploadDocument": "Télécharger un document",
    "documents.documentLibrary": "Bibliothèque de documents",
    "documents.documentLibraryDescription": "Consultez et gérez tous vos documents officiels",
    "documents.searchDocuments": "Rechercher des documents",
    "documents.filterByStatus": "Filtrer par statut",
    "documents.allDocuments": "Tous les documents",
    "documents.validDocuments": "Documents valides",
    "documents.expiringDocuments": "Documents expirants",
    "documents.expiredDocuments": "Documents expirés",
    "documents.taxDocuments": "Documents fiscaux",
    "documents.legalRegistrations": "Documents juridiques",
    "documents.administrativeDocuments": "Documents administratifs",
  },

  en: {
    // Common
    "app.title": "R-Travel Management System",
    "app.loading": "Loading...",
    "app.save": "Save",
    "app.cancel": "Cancel",
    "app.edit": "Edit",
    "app.delete": "Delete",
    "app.search": "Search",
    "app.filter": "Filter",
    "app.details": "Details",
    "app.close": "Close",
    "app.print": "Print",
    "app.download": "Download",
    "app.upload": "Upload",
    "app.add": "Add",
    "app.remove": "Remove",
    "app.confirm": "Confirm",

    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.vehicles": "Vehicles",
    "nav.drivers": "Drivers",
    "nav.transfers": "Transfers",
    "nav.bookings": "Bookings",
    "nav.documents": "Documents",
    "nav.car-status": "Vehicle Status",
    "nav.document-form": "Forms",
    "nav.settings": "Settings",

    // Vehicles
    "vehicles.title": "Vehicle Management",
    "vehicles.add": "Add a vehicle",
    "vehicles.type": "Vehicle type",
    "vehicles.matricule": "Registration number",
    "vehicles.status": "Status",
    "vehicles.status.available": "Available",
    "vehicles.status.rented": "Rented",
    "vehicles.status.maintenance": "Maintenance",
    "vehicles.status.reserved": "Reserved",

    // Drivers
    "drivers.title": "Driver Management",
    "drivers.add": "Add a driver",
    "drivers.name": "Full name",
    "drivers.cin": "ID number",
    "drivers.address": "Address",
    "drivers.phone": "Phone",
    "drivers.status": "Status",
    "drivers.status.available": "Available",
    "drivers.status.on_duty": "On duty",
    "drivers.status.off_duty": "Off duty",
    "drivers.status.vacation": "Vacation",

    // Documents
    "documents.title": "Document Management System",
    "documents.upload": "Upload a document",
    "documents.existing": "Existing documents",
    "documents.templates": "Document templates",
    "documents.expiring": "Expiring documents",
    "documents.category.vehicle": "Vehicle Documents",
    "documents.category.driver": "Driver Documents",
    "documents.category.client": "Client Documents",
    "documents.category.trip": "Trip Documents",
    "documents.category.company": "Company Documents",
    "documents.status.valid": "Valid",
    "documents.status.expiring": "Expiring soon",
    "documents.status.expired": "Expired",

    // Car Status
    "car-status.title": "Vehicle Status",
    "car-status.overview": "Overview",
    "car-status.maintenance": "Maintenance",
    "car-status.documents": "Documents",
    "car-status.history": "History",
    "car-status.total": "Total vehicles",
    "car-status.available": "Available",
    "car-status.rented": "Rented",
    "car-status.in-maintenance": "In maintenance",

    // Document Forms
    "document-form.title": "Document Forms",
    "document-form.contract": "Rental Contract",
    "document-form.invoice": "Invoice",
    "document-form.delivery": "Delivery Note",
    "document-form.mission": "Mission Order",
    "document-form.maintenance": "Maintenance Sheet",
    "document-form.preview": "Document preview",

    "profile.companyProfile": "Company Profile",
    "profile.companyProfileDescription": "Legal and administrative information of the company",
    "profile.editingMode": "Editing mode",
    "profile.viewMode": "View mode",
    "profile.active": "Active",
    "profile.save": "Save",
    "profile.edit": "Edit",
    "profile.general": "General",
    "profile.contact": "Contact",
    "profile.management": "Management",
    "profile.activity": "Activity",
    "profile.companyName": "Company name",
    "profile.legalForm": "Legal form",
    "profile.startDate": "Start date",
    "profile.duration": "Duration",
    "profile.capital": "Capital",
    "profile.taxId": "Tax ID",
    "profile.ice": "ICE",
    "profile.rc": "Trade register",
    "profile.patente": "Business license",
    "profile.tva": "VAT ID",
    "profile.cnss": "CNSS",
    "profile.address": "Address",
    "profile.phone": "Phone",
    "profile.email": "Email",
    "profile.website": "Website",
    "profile.manager": "Manager",
    "profile.managerId": "ID",
    "profile.managerNationality": "Nationality",
    "profile.managerBirthdate": "Birth date",
    "profile.managerAddress": "Address",
    "profile.mainActivity": "Main activity",
    "profile.commune": "Municipality",
    "profile.lastUpdated": "Last updated",
    "documents.legalDocuments": "Legal Documents",
    "documents.legalDocumentsDescription": "Manage the company's legal and administrative documents",
    "documents.uploadDocument": "Upload document",
    "documents.documentLibrary": "Document Library",
    "documents.documentLibraryDescription": "View and manage all your official documents",
    "documents.searchDocuments": "Search documents",
    "documents.filterByStatus": "Filter by status",
    "documents.allDocuments": "All documents",
    "documents.validDocuments": "Valid documents",
    "documents.expiringDocuments": "Expiring documents",
    "documents.expiredDocuments": "Expired documents",
    "documents.taxDocuments": "Tax documents",
    "documents.legalRegistrations": "Legal registrations",
    "documents.administrativeDocuments": "Administrative documents",
  },

  ar: {
    // Common
    "app.title": "نظام إدارة آر-ترافيل",
    "app.loading": "جاري التحميل...",
    "app.save": "حفظ",
    "app.cancel": "إلغاء",
    "app.edit": "تعديل",
    "app.delete": "حذف",
    "app.search": "بحث",
    "app.filter": "تصفية",
    "app.details": "تفاصيل",
    "app.close": "إغلاق",
    "app.print": "طباعة",
    "app.download": "تنزيل",
    "app.upload": "رفع",
    "app.add": "إضافة",
    "app.remove": "إزالة",
    "app.confirm": "تأكيد",

    // Navigation
    "nav.dashboard": "لوحة التحكم",
    "nav.vehicles": "المركبات",
    "nav.drivers": "السائقين",
    "nav.transfers": "التحويلات",
    "nav.bookings": "الحجوزات",
    "nav.documents": "المستندات",
    "nav.car-status": "حالة المركبات",
    "nav.document-form": "النماذج",
    "nav.settings": "الإعدادات",

    // Vehicles
    "vehicles.title": "إدارة المركبات",
    "vehicles.add": "إضافة مركبة",
    "vehicles.type": "نوع المركبة",
    "vehicles.matricule": "رقم التسجيل",
    "vehicles.status": "الحالة",
    "vehicles.status.available": "متاح",
    "vehicles.status.rented": "مؤجر",
    "vehicles.status.maintenance": "صيانة",
    "vehicles.status.reserved": "محجوز",

    // Drivers
    "drivers.title": "إدارة السائقين",
    "drivers.add": "إضافة سائق",
    "drivers.name": "الاسم الكامل",
    "drivers.cin": "رقم الهوية",
    "drivers.address": "العنوان",
    "drivers.phone": "الهاتف",
    "drivers.status": "الحالة",
    "drivers.status.available": "متاح",
    "drivers.status.on_duty": "في الخدمة",
    "drivers.status.off_duty": "خارج الخدمة",
    "drivers.status.vacation": "إجازة",

    // Documents
    "documents.title": "نظام إدارة المستندات",
    "documents.upload": "رفع مستند",
    "documents.existing": "المستندات الموجودة",
    "documents.templates": "قوالب المستندات",
    "documents.expiring": "المستندات المنتهية",
    "documents.category.vehicle": "مستندات المركبات",
    "documents.category.driver": "مستندات السائقين",
    "documents.category.client": "مستندات العملاء",
    "documents.category.trip": "مستندات الرحلات",
    "documents.category.company": "مستندات الشركة",
    "documents.status.valid": "ساري",
    "documents.status.expiring": "ينتهي قريبًا",
    "documents.status.expired": "منتهي",

    // Car Status
    "car-status.title": "حالة المركبات",
    "car-status.overview": "نظرة عامة",
    "car-status.maintenance": "الصيانة",
    "car-status.documents": "المستندات",
    "car-status.history": "السجل",
    "car-status.total": "إجمالي المركبات",
    "car-status.available": "المتاحة",
    "car-status.rented": "المؤجرة",
    "car-status.in-maintenance": "في الصيانة",

    // Document Forms
    "document-form.title": "نماذج المستندات",
    "document-form.contract": "عقد إيجار",
    "document-form.invoice": "فاتورة",
    "document-form.delivery": "إشعار تسليم",
    "document-form.mission": "أمر مهمة",
    "document-form.maintenance": "ورقة صيانة",
    "document-form.preview": "معاينة المستند",

    "profile.companyProfile": "ملف الشركة",
    "profile.companyProfileDescription": "المعلومات القانونية والإدارية للشركة",
    "profile.editingMode": "وضع التحرير",
    "profile.viewMode": "وضع العرض",
    "profile.active": "نشط",
    "profile.save": "حفظ",
    "profile.edit": "تعديل",
    "profile.general": "عام",
    "profile.contact": "اتصال",
    "profile.management": "إدارة",
    "profile.activity": "نشاط",
    "profile.companyName": "اسم الشركة",
    "profile.legalForm": "الشكل القانوني",
    "profile.startDate": "تاريخ البدء",
    "profile.duration": "المدة",
    "profile.capital": "رأس المال",
    "profile.taxId": "رقم التعريف الضريبي",
    "profile.ice": "ICE",
    "profile.rc": "السجل التجاري",
    "profile.patente": "رخصة العمل",
    "profile.tva": "رقم تعريف ضريبة القيمة المضافة",
    "profile.cnss": "CNSS",
    "profile.address": "العنوان",
    "profile.phone": "الهاتف",
    "profile.email": "البريد الإلكتروني",
    "profile.website": "الموقع الإلكتروني",
    "profile.manager": "المدير",
    "profile.managerId": "الهوية",
    "profile.managerNationality": "الجنسية",
    "profile.managerBirthdate": "تاريخ الميلاد",
    "profile.managerAddress": "العنوان",
    "profile.mainActivity": "النشاط الرئيسي",
    "profile.commune": "البلدية",
    "profile.lastUpdated": "آخر تحديث",
    "documents.legalDocuments": "الوثائق القانونية",
    "documents.legalDocumentsDescription": "إدارة الوثائق القانونية والإدارية للشركة",
    "documents.uploadDocument": "تحميل وثيقة",
    "documents.documentLibrary": "مكتبة الوثائق",
    "documents.documentLibraryDescription": "عرض وإدارة جميع الوثائق الرسمية",
    "documents.searchDocuments": "البحث عن وثائق",
    "documents.filterByStatus": "تصفية حسب الحالة",
    "documents.allDocuments": "جميع الوثائق",
    "documents.validDocuments": "وثائق صالحة",
    "documents.expiringDocuments": "وثائق تنتهي قريبا",
    "documents.expiredDocuments": "وثائق منتهية",
    "documents.taxDocuments": "الوثائق الضريبية",
    "documents.legalRegistrations": "التسجيلات القانونية",
    "documents.administrativeDocuments": "الوثائق الإدارية",
  },
}

// Get current language from localStorage or default to French
const getCurrentLanguage = (): string => {
  if (typeof window === "undefined") return "fr"
  return localStorage.getItem("r-travel-language") || "fr"
}

// Translate a key
export const t = (key: TranslationKey): string => {
  const lang = getCurrentLanguage()
  const translation = translations[lang]?.[key]

  if (!translation) {
    console.warn(`Translation missing for key: ${key} in language: ${lang}`)
    // Fallback to French
    return translations.fr[key] || key
  }

  return translation
}

// Add translations dynamically (useful for data that comes from the backend)
export const addTranslations = (lang: string, newTranslations: Record<string, string>) => {
  if (!translations[lang]) {
    translations[lang] = {}
  }

  Object.assign(translations[lang], newTranslations)
}

// Get all available languages
export const getAvailableLanguages = () => {
  return Object.keys(translations)
}

// Check if the current language is RTL
export const isRTL = (): boolean => {
  const lang = getCurrentLanguage()
  return lang === "ar"
}
