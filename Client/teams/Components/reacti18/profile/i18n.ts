import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {
  fetchEnglishTranslations,
  fetchHindiTranslations,
} from '../../languages/api';
import {
  fetchProfileTranslationsFromDB,
  insertProfileTranslations,
} from '../../database/DatabaseProfile';

// Fetch translations based on language
const getTranslations = async (lang: string) => {
  if (lang === 'hi') {
    return await fetchHindiTranslations();
  } else {
    return await fetchEnglishTranslations();
  }
};

// Load translations either from the database or API
const loadProfileTranslations = async (lang: string) => {
  const translationsFromDB = await fetchProfileTranslationsFromDB(lang);
  if (translationsFromDB) {
    return translationsFromDB; // Return data from DB
  } else {
    const fetchedTranslations = await getTranslations(lang);
    await insertProfileTranslations(fetchedTranslations.profile, lang); // Insert into DB
    return fetchedTranslations.profile; // Return fetched data
  }
};

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {}, // We'll add resources dynamically
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
  react: {
    useSuspense: false, // Disable suspense
  },
});

export const setupProfileI18n = async (language: string) => {
  let translations = await loadProfileTranslations(language);

  // Remove non-translation keys like 'id' and 'language'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {id, language: lang, ...filteredTranslations} = translations;

  // Log to check the filtered translations
  console.log('Filtered Translations (Profile):', filteredTranslations);

  // Add translations dynamically to the 'profile' namespace
  i18n.addResources(language, 'profile', {
    ...filteredTranslations,
  });

  // Change the language after loading translations
  i18n.changeLanguage(language);
};

export default i18n;
