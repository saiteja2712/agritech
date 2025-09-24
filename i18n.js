import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationUA from "./locales/ua/translation.json";
import translationTE from "./locales/te/translation.json";
const languageMap = {
  1: "en",
  2: "ua",
  5: "te",
};

const resources = {
  en: {
    translation: translationEN,
  },
  ua: {
    translation: translationUA,
  },
  te: {
    translation: translationTE,
  },
};

const storedLanguageId = localStorage.getItem("language") || "en";
const storedLanguage = languageMap[storedLanguageId];
i18n.use(initReactI18next).init({
  resources,
  lng: storedLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
