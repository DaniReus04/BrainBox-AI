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
          auth: {
            welcomeTitle: "Welcome Back",
            welcomeSubtitle: "Sign in to continue your AI journey",
            email: "Email",
            password: "Password",
            emailRequired: "Email is required",
            emailInvalid: "Enter a valid email",
            passwordRequired: "Password is required",
            passwordMin: "Password must be at least 6 characters",
            passwordRules:
              "Password must have at least 8 characters, including letters, numbers, and a special character",
            fullName: "Full Name",
            fullNameRequired: "Full name is required",
            fullNameInvalid: "Full name must contain only letters and spaces",
            confirmPassword: "Confirm Password",
            confirmPasswordRequired: "Confirm password is required",
            confirmPasswordMatch: "Passwords must match",
            login: "Sign In",
            register: "Sign Up",
            noAccount: "Don't have an account?",
            hasAccount: "Already have an account?",
            registerTitle: "Create Account",
            registerSubtitle: "Join BrainBox AI today",
            invalidCredentials: "Invalid email or password",
            emailExists: "Email already registered",
            genericError: "Something went wrong. Try again.",
            loginSuccess: "Logged in successfully",
            registerSuccess: "Account created successfully",
            registerSuccessTitle: "Register",
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
          auth: {
            welcomeTitle: "Bem-vindo de Volta",
            welcomeSubtitle: "Faça login para continuar sua jornada com IA",
            email: "Email",
            password: "Senha",
            emailRequired: "Email é obrigatório",
            emailInvalid: "Digite um email válido",
            passwordRequired: "Senha é obrigatória",
            passwordMin: "A senha deve ter pelo menos 6 caracteres",
            passwordRules:
              "A senha deve ter pelo menos 8 caracteres, incluindo letras, números e um caractere especial",
            fullName: "Nome Completo",
            fullNameRequired: "Nome completo é obrigatório",
            fullNameInvalid:
              "Nome completo deve conter apenas letras e espaços",
            confirmPassword: "Confirmar Senha",
            confirmPasswordRequired: "Confirmar senha é obrigatório",
            confirmPasswordMatch: "As senhas devem ser iguais",
            login: "Entrar",
            register: "Cadastrar",
            noAccount: "Não tem uma conta?",
            hasAccount: "Já tem uma conta?",
            registerTitle: "Criar Conta",
            registerSubtitle: "Junte-se ao BrainBox AI hoje",
            invalidCredentials: "Email ou senha inválidos",
            emailExists: "Email já cadastrado",
            genericError: "Algo deu errado. Tente novamente.",
            loginSuccess: "Login realizado com sucesso",
            registerSuccess: "Conta criada com sucesso",
            registerSuccessTitle: "Registrado",
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
          auth: {
            welcomeTitle: "Bienvenido de Nuevo",
            welcomeSubtitle: "Inicia sesión para continuar tu viaje con IA",
            email: "Correo electrónico",
            password: "Contraseña",
            emailRequired: "El correo es obligatorio",
            emailInvalid: "Ingresa un correo válido",
            passwordRequired: "La contraseña es obligatoria",
            passwordMin: "La contraseña debe tener al menos 6 caracteres",
            passwordRules:
              "La contraseña debe tener al menos 8 caracteres, incluyendo letras, números y un carácter especial",
            fullName: "Nombre Completo",
            fullNameRequired: "El nombre completo es obligatorio",
            fullNameInvalid:
              "El nombre completo debe contener solo letras y espacios",
            confirmPassword: "Confirmar Contraseña",
            confirmPasswordRequired: "Confirmar contraseña es obligatorio",
            confirmPasswordMatch: "Las contraseñas deben coincidir",
            login: "Iniciar Sesión",
            register: "Registrarse",
            noAccount: "¿No tienes una cuenta?",
            hasAccount: "¿Ya tienes una cuenta?",
            registerTitle: "Crear Cuenta",
            registerSubtitle: "Únete a BrainBox AI hoy",
            invalidCredentials: "Correo o contraseña inválidos",
            emailExists: "Correo ya registrado",
            genericError: "Algo salió mal. Inténtalo de nuevo.",
            loginSuccess: "Inicio de sesión exitoso",
            registerSuccess: "Cuenta creada con éxito",
            registerSuccessTitle: "Registro",
          },
        },
      },
    },
  });

export default i18n;
