import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
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
      home: {
        branding: "BrainBox AI",
        headerTitle: "Home",
        heroEyebrow: "Start here",
        heroTitle: "Start your AI conversation",
        heroDescription:
          "BrainBox AI helps users ask questions, continue conversations, and quickly access product information through a clean chat experience.",
        primaryAction: "New Chat",
        aboutEyebrow: "About",
        aboutTitle: "What is BrainBox AI?",
        aboutDescription:
          "BrainBox AI is the conversational entry point of the product. It explains the service clearly, keeps the interface focused, and turns questions into quick, guided conversations.",
        recentTitle: "Recent Chats",
        recentEmpty:
          "Your recent conversations will appear here after you start chatting.",
        seeAll: "See all",
        seeLess: "See less",
        navHome: "Home",
        navChats: "Chat",
        navActivity: "Activity",
        navProfile: "Profile",
      },
      activity: {
        headerTitle: "Activity",
        emptyTitle: "No conversations yet",
        emptyDescription:
          "Your chat history will appear here once you start a conversation.",
        listTitle: "Chat History",
        deleteLabel: "Delete chat",
        deleteDialogTitle: "Delete chat?",
        deleteConfirm: "Are you sure you want to delete this chat?",
        deleteCancel: "Cancel",
        deleteConfirmAction: "Delete",
      },
      chat: {
        headerEyebrow: "New chat",
        headerTitle: "",
        emptyTitle: "BrainBox",
        emptyDescription:
          "Ask about FinTechX, support channels, security, promotions, or financial education.",
        infoOne: "Remembers what user said earlier in the conversation",
        infoTwo: "Allows user to provide follow-up corrections with AI",
        infoThree: "Limited knowledge of world and events after 2021",
        infoFour: "May occasionally generate incorrect information",
        infoFive:
          "May occasionally produce harmful instructions or biased content",
        regenerate: "Regenerate response",
        thinking: "BrainBox AI is thinking...",
        inputPlaceholder: "Send a message...",
        sendMessage: "Send message",
        backToHome: "Go back to home",
        menuLabel: "Open chat options",
        downloadAction: "Download Chat",
        deleteAction: "Delete Chat",
        deleteConfirm: "Are you sure you want to delete this chat?",
        deleteDialogTitle: "Delete chat?",
        deleteCancel: "Cancel",
        deleteConfirmAction: "Delete",
        assistantLabel: "BrainBox AI",
        userLabel: "You",
        errorMissingKey:
          "Set VITE_OPENAI_API_KEY in your environment to enable BrainBox AI responses.",
        errorRequestFailed:
          "We couldn't get a response from OpenAI right now. Please try again.",
        errorEmptyResponse:
          "OpenAI returned an empty response for this conversation.",
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
        fullNameInvalid: "Nome completo deve conter apenas letras e espaços",
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
      home: {
        branding: "BrainBox AI",
        headerTitle: "Home",
        heroEyebrow: "Comece aqui",
        heroTitle: "Inicie sua conversa com a IA",
        heroDescription:
          "A BrainBox AI ajuda o usuário a fazer perguntas, continuar conversas e acessar informações do produto com rapidez em uma experiência de chat limpa.",
        primaryAction: "Novo chat",
        aboutEyebrow: "Sobre",
        aboutTitle: "O que é a BrainBox AI?",
        aboutDescription:
          "A BrainBox AI é o ponto de entrada conversacional do produto. Ela apresenta o serviço com clareza, mantém a interface focada e transforma dúvidas em conversas guiadas.",
        recentTitle: "Conversas Recentes",
        recentEmpty:
          "Suas conversas recentes vão aparecer aqui depois que você iniciar um chat.",
        seeAll: "Ver todas",
        seeLess: "Ver menos",
        navHome: "Home",
        navChats: "Chat",
        navActivity: "Atividade",
        navProfile: "Perfil",
      },
      activity: {
        headerTitle: "Atividade",
        emptyTitle: "Nenhuma conversa ainda",
        emptyDescription:
          "Seu histórico de chats aparecerá aqui assim que você iniciar uma conversa.",
        listTitle: "Histórico de Chats",
        deleteLabel: "Excluir chat",
        deleteDialogTitle: "Excluir chat?",
        deleteConfirm: "Tem certeza que deseja excluir este chat?",
        deleteCancel: "Cancelar",
        deleteConfirmAction: "Excluir",
      },
      chat: {
        headerEyebrow: "Novo chat",
        headerTitle: "",
        emptyTitle: "BrainBox",
        emptyDescription:
          "Pergunte sobre a FinTechX, canais de atendimento, segurança, promoções ou educação financeira.",
        infoOne: "Lembra o que o usuário disse antes na conversa",
        infoTwo:
          "Permite que o usuário faça correções de continuidade com a IA",
        infoThree: "Conhecimento limitado sobre o mundo e eventos após 2021",
        infoFour: "Pode ocasionalmente gerar informações incorretas",
        infoFive:
          "Pode ocasionalmente produzir instruções nocivas ou conteúdo enviesado",
        regenerate: "Regenerar resposta",
        thinking: "BrainBox AI está pensando...",
        inputPlaceholder: "Envie uma mensagem...",
        sendMessage: "Enviar mensagem",
        backToHome: "Voltar para a home",
        menuLabel: "Abrir opções do chat",
        downloadAction: "Baixar chat",
        deleteAction: "Excluir chat",
        deleteConfirm: "Tem certeza que deseja excluir este chat?",
        deleteDialogTitle: "Excluir chat?",
        deleteCancel: "Cancelar",
        deleteConfirmAction: "Excluir",
        assistantLabel: "BrainBox AI",
        userLabel: "Você",
        errorMissingKey:
          "Defina VITE_OPENAI_API_KEY no ambiente para habilitar as respostas da BrainBox AI.",
        errorRequestFailed:
          "Não foi possível obter uma resposta da OpenAI agora. Tente novamente.",
        errorEmptyResponse:
          "A OpenAI retornou uma resposta vazia para esta conversa.",
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
      home: {
        branding: "BrainBox AI",
        headerTitle: "Inicio",
        heroEyebrow: "Empieza aquí",
        heroTitle: "Comienza tu conversación con IA",
        heroDescription:
          "BrainBox AI ayuda a los usuarios a hacer preguntas, continuar conversaciones y acceder a información del producto en una experiencia de chat clara.",
        primaryAction: "Nuevo chat",
        aboutEyebrow: "Sobre",
        aboutTitle: "¿Qué es BrainBox AI?",
        aboutDescription:
          "BrainBox AI es el punto de entrada conversacional del producto. Presenta el servicio con claridad, mantiene la interfaz enfocada y convierte preguntas en conversaciones guiadas.",
        recentTitle: "Chats recientes",
        recentEmpty:
          "Tus conversaciones recientes aparecerán aquí después de iniciar un chat.",
        seeAll: "Ver todo",
        seeLess: "Ver menos",
        navHome: "Inicio",
        navChats: "Chat",
        navActivity: "Actividad",
        navProfile: "Perfil",
      },
      activity: {
        headerTitle: "Actividad",
        emptyTitle: "Sin conversaciones aún",
        emptyDescription:
          "Tu historial de chats aparecerá aquí una vez que inicies una conversación.",
        listTitle: "Historial de Chats",
        deleteLabel: "Eliminar chat",
        deleteDialogTitle: "¿Eliminar chat?",
        deleteConfirm: "¿Seguro que quieres eliminar este chat?",
        deleteCancel: "Cancelar",
        deleteConfirmAction: "Eliminar",
      },
      chat: {
        headerEyebrow: "Nuevo chat",
        headerTitle: "",
        emptyTitle: "BrainBox",
        emptyDescription:
          "Pregunta sobre FinTechX, canales de soporte, seguridad, promociones o educación financiera.",
        infoOne: "Recuerda lo que el usuario dijo antes en la conversación",
        infoTwo:
          "Permite al usuario hacer correcciones de seguimiento con la IA",
        infoThree:
          "Conocimiento limitado del mundo y de eventos posteriores a 2021",
        infoFour: "Puede generar información incorrecta ocasionalmente",
        infoFive:
          "Puede producir instrucciones dañinas o contenido sesgado ocasionalmente",
        regenerate: "Regenerar respuesta",
        thinking: "BrainBox AI está pensando...",
        inputPlaceholder: "Envía un mensaje...",
        sendMessage: "Enviar mensaje",
        backToHome: "Volver al inicio",
        menuLabel: "Abrir opciones del chat",
        downloadAction: "Descargar chat",
        deleteAction: "Eliminar chat",
        deleteConfirm: "¿Seguro que quieres eliminar este chat?",
        deleteDialogTitle: "¿Eliminar chat?",
        deleteCancel: "Cancelar",
        deleteConfirmAction: "Eliminar",
        assistantLabel: "BrainBox AI",
        userLabel: "Tú",
        errorMissingKey:
          "Define VITE_OPENAI_API_KEY en el entorno para habilitar las respuestas de BrainBox AI.",
        errorRequestFailed:
          "No pudimos obtener una respuesta de OpenAI ahora mismo. Inténtalo de nuevo.",
        errorEmptyResponse:
          "OpenAI devolvió una respuesta vacía para esta conversación.",
      },
    },
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator"],
      caches: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
