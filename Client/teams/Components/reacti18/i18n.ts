import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {
  fetchLoginTranslationsFromDB,
  insertLoginTranslations,
} from '../database/DatabaseLogin';
import {
  fetchHindiTranslations,
  fetchEnglishTranslations,
} from '../languages/api';

// Fetch translations based on language
const getTranslations = async (lang: string) => {
  if (lang === 'hi') {
    return await fetchHindiTranslations();
  } else {
    return await fetchEnglishTranslations();
  }
};

// Load translations either from the database or API
const loadTranslations = async (lang: string) => {
  const translationsFromDB = await fetchLoginTranslationsFromDB(lang);
  if (translationsFromDB) {
    return translationsFromDB; // Return data from DB
  } else {
    const fetchedTranslations = await getTranslations(lang);
    await insertLoginTranslations(fetchedTranslations.auth.login, lang); // Insert into DB
    return fetchedTranslations.auth.login; // Return fetched data
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

export const setupI18n = async (language: string) => {
  let translations = await loadTranslations(language);

  // Remove non-translation keys like 'id' and 'language'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {id, language: lang, ...filteredTranslations} = translations;

  // Log to check the filtered translations
  console.log('Filtered Translations:', filteredTranslations);

  // Add translations dynamically to the 'auth' namespace
  i18n.addResources(language, 'auth', {
    ...filteredTranslations,
  });

  // Log resources after adding them
  console.log(
    'i18n Resources after add:',
    i18n.getResourceBundle(language, 'auth'),
  );

  // Change the language after loading translations
  i18n.changeLanguage(language);
};

export default i18n;
