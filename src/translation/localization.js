import { getLocales } from 'expo-localization';

const fallback = { languageTag: 'en' };
const deviceLanguage = getLocales()[0].languageCode || fallback;
const translations = {
    en: require('../translation/languages/en.json'),
    pt: require('../translation/languages/pt.json'),
};

export default translations[deviceLanguage];