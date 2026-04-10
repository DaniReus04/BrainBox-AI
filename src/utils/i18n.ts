import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          welcome: "Welcome to BrainBox AI",
        },
      },
      pt: {
        translation: {
          welcome: "Bem-vindo ao BrainBox AI",
        },
      },
      es: {
        translation: {
          welcome: "Bienvenido al BrainBox AI",
        },
      },
    },
  });

export default i18n;
