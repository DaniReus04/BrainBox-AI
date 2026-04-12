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
          version: "Version",
          onboarding: {
            skip: "Skip",
            skipConfirmTitle: "Skip Tutorial?",
            skipConfirmDescription:
              "Are you sure you want to skip the tutorial? You can always learn about BrainBox later.",
            skipConfirmCancel: "Cancel",
            skipConfirmAction: "Yes, skip",
            step1Title: "Unlock the Power Of Future AI",
            step1Description:
              "Chat with the smartest AI Future\nExperience power of AI with us",
            step2Title: "Your Personal AI Assistant",
            step2Description:
              "Get instant answers, creative ideas, and smart solutions\nPowered by cutting-edge technology",
            step3Title: "Start Your Journey Now",
            step3Description:
              "Join thousands of users already enjoying BrainBox\nYour AI companion awaits",
          },
        },
      },
      pt: {
        translation: {
          welcome: "Bem-vindo ao BrainBox AI",
          version: "Versão",
          onboarding: {
            skip: "Pular",
            skipConfirmTitle: "Pular tutorial?",
            skipConfirmDescription:
              "Tem certeza que deseja pular o tutorial? Você pode aprender sobre o BrainBox depois.",
            skipConfirmCancel: "Cancelar",
            skipConfirmAction: "Sim, pular",
            step1Title: "Desbloqueie o Poder da IA do Futuro",
            step1Description:
              "Converse com a IA mais inteligente do futuro\nExperimente o poder da IA conosco",
            step2Title: "Seu Assistente de IA Pessoal",
            step2Description:
              "Obtenha respostas instantâneas, ideias criativas e soluções inteligentes\nImpulsionado por tecnologia de ponta",
            step3Title: "Comece Sua Jornada Agora",
            step3Description:
              "Junte-se a milhares de usuários que já aproveitam o BrainBox\nSeu companheiro de IA aguarda",
          },
        },
      },
      es: {
        translation: {
          welcome: "Bienvenido al BrainBox AI",
          version: "Versión",
          onboarding: {
            skip: "Omitir",
            skipConfirmTitle: "¿Omitir tutorial?",
            skipConfirmDescription:
              "¿Estás seguro de que quieres omitir el tutorial? Puedes aprender sobre BrainBox después.",
            skipConfirmCancel: "Cancelar",
            skipConfirmAction: "Sí, omitir",
            step1Title: "Desbloquea el Poder de la IA del Futuro",
            step1Description:
              "Chatea con la IA más inteligente del futuro\nExperimenta el poder de la IA con nosotros",
            step2Title: "Tu Asistente de IA Personal",
            step2Description:
              "Obtén respuestas instantáneas, ideas creativas y soluciones inteligentes\nImpulsado por tecnología de vanguardia",
            step3Title: "Comienza Tu Viaje Ahora",
            step3Description:
              "Únete a miles de usuarios que ya disfrutan de BrainBox\nTu compañero de IA te espera",
          },
        },
      },
    },
  });

export default i18n;
