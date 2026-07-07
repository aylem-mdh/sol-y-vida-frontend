import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  es: {
    translation: {
      common: {
        home: "Inicio",
        services: "Servicios",
        about: "Nosotros",
        contact: "Contacto",
        login: "Acceder",
        language: "Idioma",
        logout: "Cerrar sesión",
        support: "¿Necesitas ayuda?"
      },

      home: {
        badge: "Atención domiciliaria premium · Costa del Sol",
        title1: "Cuidamos de quienes",
        title2: " más quieres",
        text: "Cuidado profesional y humano para que tus seres queridos reciban la atención que merecen.",
        btn1: "Solicitar valoración",
        btn2: "Ver servicios"
      },

      contact: {
        title: "Contacto",
        subtitle: "Estamos aquí para ayudarte y resolver cualquier duda.",
        info: "Información de contacto",
        phone: "Teléfono",
        coverage: "Cobertura",
        schedule: "Horario",
        scheduleValue: "Lunes a Domingo · 24h",
        sendMessage: "Envíanos un mensaje",
        name: "Nombre",
        message: "¿Cómo podemos ayudarte?",
        send: "Enviar mensaje"
      },

      services: {
        title: "Nuestros Servicios",
        subtitle: "Cuidado personalizado para cada necesidad.",
        card1: "Acompañamiento y compañía",
        card1Desc: "Compañía diaria, paseos y apoyo emocional.",
        card2: "Ayuda a domicilio",
        card2Desc: "Apoyo en higiene, movilidad y tareas básicas.",
        card3: "Acompañamiento médico",
        card3Desc: "Asistencia en consultas y hospitales.",
        card4: "Respiro familiar",
        card4Desc: "Cuidamos mientras tú descansas.",
        how: "¿Cómo trabajamos?",
        step1: "Valoración gratuita",
        step2: "Selección del cuidador",
        step3: "Seguimiento continuo"
      },

      about: {
        title: "Sobre Nosotros",
        subtitle: "Cuidamos con profesionalidad, cercanía y confianza.",
        mission: "Nuestra misión",
        missionText:
          "En Sol y Vida Cuidados trabajamos para mejorar la calidad de vida de personas mayores y dependientes.",
        values: "Nuestros valores",
        empathy: "Empatía",
        trust: "Confianza",
        professionalism: "Profesionalidad",
        closeness: "Cercanía"
      },

      login: {
        title: "Acceder",
        subtitle: "Inicia sesión en tu cuenta",
        password: "Contraseña",
        admin: "Administradora",
        worker: "Trabajador",
        family: "Familia",
        enter: "Entrar"
      },

      sidebar: {
        home: "Inicio",
        clients: "Clientes",
        workers: "Trabajadores",
        services: "Servicios",
        visits: "Visitas",
        budgets: "Presupuestos",
        reviews: "Valoraciones",
        reports: "Informes",
        settings: "Configuración"
      }
    }
  },

  en: {
    translation: {
      common: {
        home: "Home",
        services: "Services",
        about: "About",
        contact: "Contact",
        login: "Login",
        language: "Language",
        logout: "Logout",
        support: "Need help?"
      },

      home: {
        badge: "Premium home care · Costa del Sol",
        title1: "We care for those",
        title2: " you love most",
        text: "Professional and human care for your loved ones.",
        btn1: "Request assessment",
        btn2: "View services"
      },

      contact: {
        title: "Contact",
        subtitle: "We are here to help.",
        info: "Contact information",
        phone: "Phone",
        coverage: "Coverage",
        schedule: "Schedule",
        scheduleValue: "Monday to Sunday · 24h",
        sendMessage: "Send us a message",
        name: "Name",
        message: "How can we help you?",
        send: "Send message"
      },

      services: {
        title: "Our Services",
        subtitle: "Personalized care for every need.",
        card1: "Companionship",
        card1Desc: "Daily company and emotional support.",
        card2: "Home assistance",
        card2Desc: "Support with hygiene and mobility.",
        card3: "Medical assistance",
        card3Desc: "Support in appointments and hospitals.",
        card4: "Family respite",
        card4Desc: "We care while you rest.",
        how: "How do we work?",
        step1: "Free assessment",
        step2: "Caregiver selection",
        step3: "Continuous monitoring"
      },

      about: {
        title: "About Us",
        subtitle: "Professional, close and trustworthy care.",
        mission: "Our mission",
        missionText: "We work to improve quality of life.",
        values: "Our values",
        empathy: "Empathy",
        trust: "Trust",
        professionalism: "Professionalism",
        closeness: "Closeness"
      },

      login: {
        title: "Login",
        subtitle: "Sign in to your account",
        password: "Password",
        admin: "Administrator",
        worker: "Worker",
        family: "Family",
        enter: "Enter"
      },

      sidebar: {
        home: "Home",
        clients: "Clients",
        workers: "Workers",
        services: "Services",
        visits: "Visits",
        budgets: "Budgets",
        reviews: "Reviews",
        reports: "Reports",
        settings: "Settings"
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;