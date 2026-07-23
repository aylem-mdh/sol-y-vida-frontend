import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  es: {
    translation: {
      common: {
        home: "Inicio",
        services: "Servicios",
        about: "Conócenos",
        contact: "Contacto",
        login: "Acceder",
        language: "Idioma",
        logout: "Cerrar sesión",
        support: "¿Necesitas ayuda?",
        yes: "Sí",
        no: "No"
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
        publicDesc1:
          "Atencion cercana para el dia a dia, promoviendo bienestar emocional, autonomia y tranquilidad en el hogar.",
        card2: "Ayuda a domicilio",
        card2Desc: "Apoyo en higiene, movilidad y tareas básicas.",
        publicDesc2:
          "Apoyo profesional en tareas cotidianas y cuidados basicos para mantener una rutina segura y confortable.",
        card3: "Acompañamiento médico",
        card3Desc: "Asistencia en consultas y hospitales.",
        publicDesc3:
          "Asistencia en consultas, pruebas y procesos hospitalarios, con seguimiento humano y atencion personalizada.",
        card4: "Respiro familiar",
        card4Desc: "Cuidamos mientras tú descansas.",
        publicDesc4:
          "Servicio pensado para aliviar la carga del entorno familiar y garantizar continuidad asistencial con confianza.",
        publicDescription:
          "En Sol y Vida Cuidados ofrecemos una atencion cercana, profesional y personalizada para mejorar la calidad de vida de las personas mayores y proporcionar tranquilidad a sus familias.",
        moreInfoTitle: "Necesitas mas informacion?",
        moreInfoText:
          "Nuestro equipo esta disponible para resolver tus dudas y ayudarte a encontrar el servicio mas adecuado para cada situacion.",
        requestInfo: "Solicitar informacion",
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
        subtitle: "Accede a tu área privada de Sol y Vida Cuidados.",
        email: "Correo electrónico",
        password: "Contraseña",
        forgotPassword: "¿Has olvidado tu contraseña?",
        admin: "Administradora",
        worker: "Trabajador",
        family: "Familia",
        enter: "Entrar",
        errors: {
          noToken: "No se pudo obtener el token de autenticación.",
          noRole: "No se pudo identificar el rol del usuario.",
          clientDisabled: "El acceso para Cliente no está habilitado.",
          noServer: "No se pudo conectar con el servidor. Verifica que el backend esté activo.",
          invalidCredentials: "Correo electrónico o contraseña incorrectos.",
          generic: "No se pudo iniciar sesión en este momento. Inténtalo de nuevo."
        }
      },

      sidebar: {
        dashboard: "Dashboard",
        workers: "Trabajadores",
        clients: "Clientes",
        familyMembers: "Familiares",
        services: "Servicios",
        calendar: "Calendario",
        incidents: "Incidencias",
        documentation: "Documentación",
        reports: "Informes",
        notifications: "Notificaciones",
        budgets: "Presupuestos",
        maintenance: "Línea técnica",
        complaints: "Quejas",
        settings: "Configuración",
        myServices: "Mis servicios",
        agenda: "Agenda",
        assignedClients: "Clientes",
        profile: "Perfil",
        messages: "Mensajes",
        followUp: "Seguimiento",
        support: "Soporte",
        support24: "Atención continua 24/7",
        aria: {
          openMenu: "Abrir menú",
          closeMenu: "Cerrar menú",
          closePanel: "Cerrar panel"
        }
      },

      topbar: {
        goodMorning: "Buenos días",
        goodAfternoon: "Buenas tardes",
        goodEvening: "Buenas noches",
        notifications: "Notificaciones"
      },

      footer: {
        vitalyTitle: "Prevención de Riesgos Laborales y Vigilancia de la Salud",
        vitalyText:
          "Mantenemos una colaboración estratégica con VITALY para la gestión de la Prevención de Riesgos Laborales (PRL) y la Vigilancia de la Salud. Esta alianza garantiza el cumplimiento normativo, la protección de nuestro equipo profesional y la mejora continua de la calidad asistencial que ofrecemos a nuestros usuarios.",
        moreInfo: "Más información"
      },

      tables: {
        common: {
          actions: "Acciones",
          city: "Ciudad",
          phone: "Teléfono",
          status: "Estado",
          active: "Activo",
          inactive: "Inactivo",
          edit: "Editar",
          delete: "Eliminar",
          readOnly: "Solo lectura",
          description: "Descripción",
          name: "Nombre"
        },
        workers: {
          title: "Trabajadores",
          subtitle: "Gestiona todos los trabajadores de Sol y Vida.",
          search: "Buscar trabajador...",
          specialty: "Especialidad",
          empty: "No se encontraron trabajadores."
        },
        clients: {
          title: "Clientes recientes",
          subtitle: "Gestiona todos los clientes de Sol y Vida.",
          search: "Buscar cliente...",
          client: "Cliente",
          empty: "No se encontraron clientes."
        },
        familyMembers: {
          title: "Familiares",
          subtitle: "Gestiona los familiares de los clientes.",
          search: "Buscar familiar...",
          relationship: "Parentesco",
          primary: "Principal",
          empty: "No hay familiares registrados."
        },
        services: {
          title: "Servicios",
          subtitle: "Gestiona todos los servicios.",
          search: "Buscar servicio...",
          service: "Servicio",
          pricePerHour: "Precio/Hora",
          empty: "No hay servicios registrados."
        },
        visits: {
          title: "Visitas",
          subtitle: "Gestiona todas las visitas.",
          search: "Buscar visita...",
          date: "Fecha",
          notes: "Observaciones",
          empty: "No se encontraron resultados."
        }
      },

      roles: {
        admin: "Administradora",
        worker: "Trabajadora",
        family: "Familiar"
      },

      crud: {
        confirmDeleteWorker: "Seguro que deseas eliminar este trabajador?",
        confirmDeleteClient: "Eliminar cliente?",
        confirmDeleteFamilyMember: "Seguro que deseas eliminar este familiar?",
        confirmDeleteService: "Eliminar servicio?",
        confirmDeleteVisit: "Seguro que deseas eliminar esta visita?",
        errors: {
          deleteWorker: "No se pudo eliminar el trabajador.",
          deleteClient: "No se pudo eliminar el cliente.",
          deleteFamilyMember: "No se pudo eliminar el familiar.",
          deleteService: "No se pudo eliminar el servicio.",
          deleteVisit: "No se pudo eliminar la visita."
        }
      },

      forms: {
        common: {
          name: "Nombre",
          lastName: "Apellidos",
          idNumber: "DNI",
          address: "Direccion",
          city: "Ciudad",
          postalCode: "Codigo postal",
          phone: "Telefono",
          email: "Email",
          description: "Descripcion",
          notes: "Observaciones",
          saving: "Guardando...",
          saveChanges: "Guardar cambios",
          cancel: "Cancelar",
          errors: {
            generic: "Ha ocurrido un error."
          }
        },
        client: {
          newTitle: "Nuevo cliente",
          editTitle: "Editar cliente",
          socialSecurity: "Numero Seguridad Social",
          save: "Guardar cliente",
          errors: {
            required: "Rellena todos los campos obligatorios del cliente."
          },
          success: {
            created: "Cliente creado correctamente",
            updated: "Cliente actualizado correctamente"
          }
        },
        worker: {
          specialty: "Especialidad",
          save: "Crear trabajador",
          errors: {
            required: "Rellena los campos obligatorios."
          }
        },
        service: {
          name: "Nombre del servicio",
          pricePerHour: "Precio por hora (EUR)",
          save: "Crear servicio",
          errors: {
            required: "Completa los campos obligatorios."
          }
        },
        familyMember: {
          relationship: "Parentesco",
          primaryContact: "Contacto principal",
          save: "Crear familiar",
          errors: {
            required: "Completa los campos obligatorios del familiar."
          }
        },
        visit: {
          selectClient: "Selecciona un cliente",
          selectWorker: "Selecciona un trabajador",
          save: "Crear visita",
          errors: {
            required: "Completa fecha, cliente y trabajador antes de guardar la visita.",
            save: "No se pudo guardar la visita."
          }
        }
      },

      pages: {
        workers: {
          title: "Trabajadores",
          subtitle: "Gestiona el personal de Sol y Vida Cuidados.",
          new: "Nuevo trabajador",
          edit: "Editar trabajador"
        },
        clients: {
          title: "Clientes",
          subtitle: "Gestiona todos los clientes.",
          new: "Nuevo cliente",
          edit: "Editar cliente"
        },
        familyMembers: {
          title: "Familiares",
          subtitle: "Gestiona los familiares de los clientes.",
          new: "Nuevo familiar",
          edit: "Editar familiar"
        },
        services: {
          title: "Servicios",
          subtitle: "Gestiona el catalogo interno de servicios de Sol y Vida Cuidados.",
          new: "Nuevo servicio",
          edit: "Editar servicio"
        },
        visits: {
          title: "Visitas",
          subtitleAdmin: "Gestiona todas las visitas de Sol y Vida Cuidados.",
          subtitleWorker: "Inicia y finaliza servicios con trazabilidad GPS e informe asistencial.",
          new: "Nueva visita",
          edit: "Editar visita",
          operation: "Operacion de servicio",
          scheduled: "Programada",
          start: "Iniciar",
          finish: "Finalizar",
          hygiene: "Higiene",
          medication: "Medicacion",
          nutrition: "Nutricion",
          mobility: "Movilidad",
          reportRequired: "Informe asistencial obligatorio",
          optionalNotes: "Notas opcionales",
          saveAndFinish: "Guardar y finalizar servicio",
          startError: "No se pudo iniciar el servicio. Revisa permisos de ubicacion.",
          finishSuccess: "Servicio finalizado e informe asistencial guardado.",
          finishError: "Completa checklist, informe y permisos GPS para finalizar."
        }
      },
      branding: {
        name: "Sol y Vida",
        suffix: "Cuidados",
        company: "Sol y Vida Cuidados",
        supportPhone: "626 406 477",
        supportPhoneRaw: "+34626406477",
        supportEmail: "solyvida@solyvidacare.com",
        website: "solyvidacare.com"
      },
      profiles: {
        adminName: "Carmen López",
        workerName: "María García",
        familyName: "Familia López",
        clientMain: "Carmen López"
      },
      contactPage: {
        followUpSubject: "Seguimiento familiar de {{clientName}}",
        title: "Contacta con Sol y Vida Cuidados",
        subtitle: "Estamos aquí para ayudarte.",
        description: "Si necesitas información sobre nuestros servicios de atención domiciliaria, estaremos encantados de atenderte y resolver cualquier duda.",
        phoneLabel: "Teléfono",
        emailLabel: "Correo electrónico",
        addressLabel: "Dirección",
        addressStreet: "Paseo del Colorado, 7",
        addressCity: "Torremolinos (Málaga)",
        websiteLabel: "Sitio web",
        alerts: {
          required: "Completa los campos obligatorios para enviar tu solicitud.",
          success: "Tu solicitud ha sido enviada correctamente.",
          error: "No se pudo enviar tu solicitud en este momento."
        },
        form: {
          title: "Envíanos un mensaje",
          description: "Completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible.",
          fullName: "Nombre completo",
          fullNamePlaceholder: "Tu nombre y apellidos",
          email: "Correo electrónico",
          emailPlaceholder: "tuemail@dominio.com",
          phone: "Teléfono",
          phonePlaceholder: "626 406 477",
          subject: "Asunto",
          subjectPlaceholder: "¿En qué podemos ayudarte?",
          message: "Mensaje",
          messagePlaceholder: "Cuéntanos brevemente tu necesidad para ofrecerte una atención personalizada.",
          sending: "Enviando solicitud...",
          submit: "Solicitar información"
        }
      },
      workerPage: {
        topbar: {
          title: "Buenos días, María",
          subtitle: "Resumen de actividad diaria y seguimiento de servicios asignados.",
          searchPlaceholder: "Buscar agenda, cliente o documento"
        },
        cards: {
          assignedServices: "Servicios asignados",
          today: "Hoy",
          nextVisit: "Próxima visita",
          todaySchedule: "Horario de hoy",
          hours: "Horas",
          assignedClients: "Clientes asignados",
          stable: "Estables"
        },
        sections: {
          calendarAgenda: "Calendario y agenda",
          nextVisit: "Próxima visita",
          incidents: "Incidencias",
          documentation: "Documentación",
          myProfile: "Mi perfil profesional"
        },
        labels: {
          client: "Cliente",
          estimatedTime: "Hora estimada",
          coordination: "Coordinación de servicios"
        },
        actions: {
          history: "Historial",
          incidents: "Incidencias",
          documentation: "Documentación",
          profile: "Mi perfil",
          startService: "Iniciar servicio",
          manageIncidents: "Gestionar incidencias",
          view: "Ver",
          contactCoordination: "Contactar con coordinación"
        },
        incidents: {
          pending: "Pendiente",
          pendingText: "Cambio de horario solicitado por familia",
          resolved: "Resuelta",
          resolvedText: "Acceso a vivienda validado"
        },
        locations: {
          torremolinos: "Torremolinos",
          benalmadena: "Benalmádena",
          fuengirola: "Fuengirola",
          mijas: "Mijas"
        },
        sampleClients: {
          antonioRuiz: "Antonio Ruiz",
          mariaSanchez: "María Sánchez",
          elenaMartin: "Elena Martín"
        },
        documents: {
          dailyReport: "Parte diario - julio.pdf",
          prlProtocol: "Protocolo PRL.pdf",
          monthlyReport: "Informe mensual.docx"
        },
        noResults: "No se encontraron resultados."
      },
      familyPage: {
        topbar: {
          welcome: "Bienvenido",
          subtitleFamily: "Seguimiento diario y comunicación familiar en tiempo real.",
          subtitleClient: "Consulta tus servicios, próximas visitas y documentación en un solo lugar.",
          searchPlaceholder: "Buscar informes, documentos o mensajes"
        },
        loading: "Cargando seguimiento familiar...",
        noData: "No hay datos disponibles para este seguimiento.",
        noResults: "No se encontraron resultados.",
        cards: {
          myServices: "Mis servicios",
          familyStatus: "Estado del familiar",
          active: "Activos",
          stable: "Estable",
          nextVisits: "Próximas visitas",
          thisWeek: "Esta semana",
          assignedProfessional: "Profesional asignado",
          latestReports: "Últimos informes",
          reference: "Referencia",
          updated: "Actualizados",
          pendingMessages: "Mensajes pendientes",
          unread: "Sin leer"
        },
        sections: {
          nextVisit: "Próxima visita"
        },
        labels: {
          homeCare: "Atención domiciliaria",
          activeServiceText: "Servicio activo de lunes a viernes con seguimiento diario del equipo.",
          notes: "Observaciones",
          new: "Nuevo",
          updated: "Actualizado",
          familyContact: "Contacto familiar",
          personalAccess: "Acceso personal activo para seguimiento del servicio."
        },
        actions: {
          calendar: "Calendario",
          messages: "Mensajes",
          documentation: "Documentación",
          myProfile: "Mi perfil",
          contact: "Contacto",
          viewFullFollowup: "Ver seguimiento completo",
          replyOrContact: "Responder o contactar",
          requestFullReport: "Solicitar informe completo",
          contactCompany: "Contactar con la empresa",
          reply: "Responder"
        },
        modals: {
          newMessage: "Nuevo mensaje"
        },
        form: {
          subject: "Asunto",
          messagePlaceholder: "Escribe tu mensaje",
          sending: "Enviando...",
          send: "Enviar mensaje"
        },
        errors: {
          load: "No se pudo cargar el seguimiento familiar.",
          messageRequired: "Completa el asunto y el mensaje.",
          messageSend: "No se pudo enviar el mensaje.",
          documentOpen: "No se pudo abrir el documento."
        }
      },
      reportsPage: {
        topbar: {
          subtitleAdmin: "Seguimiento global de actividad y evolución operativa.",
          subtitleFamily: "Resumen de seguimiento y estado del servicio familiar."
        },
        searchPlaceholder: "Buscar informe",
        admin: {
          summaryTitle: "Resumen ejecutivo",
          activeClients: "Clientes activos",
          activeWorkers: "Trabajadores activos",
          registeredVisits: "Visitas registradas",
          relatedFamily: "Familiares asociados",
          actionsTitle: "Acciones de informe"
        },
        family: {
          followupTitle: "Seguimiento familiar",
          quickAccess: "Accesos útiles",
          noReportSelected: "Sin informe seleccionado",
          selectReport: "Selecciona un informe para revisar su contenido."
        },
        actions: {
          viewClients: "Ver clientes",
          viewFamily: "Ver familiares",
          documentSupport: "Soporte documental",
          open: "Abrir",
          viewSummary: "Ver resumen",
          download: "Descargar",
          backToFamily: "Volver al panel familiar",
          viewDocumentation: "Ver documentación",
          contactCompany: "Contactar con la empresa"
        },
        errors: {
          download: "No se pudo descargar el informe."
        }
      },
      settingsPage: {
        topbar: {
          subtitle: "Ajustes operativos, soporte y control de sesión."
        },
        sections: {
          operational: "Configuración operativa",
          quickActions: "Acciones rápidas"
        },
        labels: {
          activeRole: "Rol activo",
          supportChannel: "Canal de soporte",
          operationalEmail: "Correo operativo",
          protectedEnvironment: "Entorno protegido",
          protectedEnvironmentText: "JWT activo y navegación privada.",
          sensitiveConfigInfo: "La configuración sensible se mantiene protegida en backend; aquí solo se exponen acciones operativas seguras."
        },
        family: {
          linkedFamily: "Familiar vinculado",
          caredPerson: "Persona atendida",
          operationalEmail: "Correo operativo",
          contactPhone: "Teléfono de contacto",
          preferredChannel: "Canal preferente",
          channelPhone: "Teléfono",
          channelEmail: "Correo electrónico",
          activePlan: "Plan activo",
          coordinationNotes: "Observaciones para coordinación",
          keepNotifications: "Mantener avisos y seguimiento activo en el portal familiar."
        },
        actions: {
          contactSupport: "Contactar soporte",
          reviewTeam: "Revisar equipo",
          viewDocumentation: "Ver documentación",
          phoneSupport: "Soporte telefónico",
          saveProfile: "Guardar cambios del perfil"
        },
        errors: {
          save: "No se pudo guardar el perfil."
        }
      },
      notificationsPage: {
        subtitle: "Historial de avisos y estado de lectura. Preparado para canal push.",
        history: "Historial",
        searchPlaceholder: "Buscar notificación",
        pushReady: "Push listo",
        inApp: "In-app",
        markRead: "Marcar leída",
        noResults: "No se encontraron resultados."
      },
      incidentsPage: {
        subtitle: "Seguimiento operativo de incidencias y observaciones relevantes del servicio.",
        registry: "Registro de incidencias",
        registryDescription: "CRUD operativo de incidencias vinculado a visitas reales del sistema.",
        newIncident: "Nueva incidencia",
        createIncident: "Crear incidencia",
        editIncident: "Editar incidencia",
        searchPlaceholder: "Buscar incidencia",
        noResults: "No se encontraron resultados.",
        confirmDelete: "¿Eliminar incidencia?",
        client: "Cliente",
        professional: "Profesional",
        actionsTitle: "Acciones operativas",
        reviewVisits: "Revisar visitas",
        careFollowup: "Seguimiento asistencial",
        traceability: "Las incidencias quedan registradas sobre visitas existentes para mantener trazabilidad operativa real.",
        linkedVisit: "Visita vinculada",
        titleLabel: "Título",
        levelLabel: "Nivel",
        date: "Fecha",
        level: {
          low: "Baja",
          medium: "Media",
          high: "Alta"
        },
        errors: {
          save: "No se pudo guardar la incidencia.",
          delete: "No se pudo eliminar la incidencia."
        }
      },
      maintenancePage: {
        title: "Línea técnica",
        subtitle: "Mantenimiento con fotos antes/después e informe técnico obligatorio.",
        newTicket: "Nuevo ticket técnico",
        createTicket: "Crear ticket",
        history: "Historial técnico",
        searchPlaceholder: "Buscar ticket",
        area: "Área",
        beforePhoto: "Foto de incidencia",
        afterPhoto: "Foto de resolución",
        beforePhotoUrl: "URL foto antes",
        afterPhotoUrl: "URL foto después",
        technicalReport: "Informe técnico",
        closeTicket: "Cerrar ticket",
        report: "Informe",
        before: "Antes",
        after: "Después",
        noneAttached: "No adjunta",
        pending: "Pendiente",
        noResults: "No se encontraron resultados.",
        errors: {
          required: "Completa cliente, área y descripción.",
          reportRequired: "El informe técnico es obligatorio."
        }
      },
      complaintsPage: {
        subtitle: "Canal de conversaciones para quejas, sugerencias y seguimiento de respuestas.",
        searchPlaceholder: "Buscar conversación",
        newConversation: "Nueva conversación",
        adminInbox: "Gestión de conversaciones",
        history: "Historial de conversaciones",
        subject: "Asunto",
        description: "Detalle",
        send: "Enviar",
        save: "Guardar respuesta",
        responseLabel: "Respuesta",
        responsePlaceholder: "Responder al usuario",
        noResults: "No se encontraron resultados.",
        categories: {
          suggestion: "Sugerencia",
          complaint: "Queja",
          quality: "Incidencia de calidad"
        },
        status: {
          pending: "Pendiente",
          inProgress: "En proceso",
          resolved: "Resuelta"
        },
        errors: {
          required: "Completa asunto y detalle.",
          send: "No se pudo enviar la conversación.",
          responseRequired: "Añade una respuesta antes de guardar.",
          update: "No se pudo actualizar la conversación."
        }
      },
      budgetsPage: {
        subtitle: "Cálculo automático de horas, base, IVA, total y estimación mensual.",
        searchPlaceholder: "Buscar presupuesto",
        newBudget: "Nuevo presupuesto",
        createBudget: "Crear presupuesto",
        history: "Historial",
        hours: "Horas",
        hourlyRate: "Precio/hora",
        vat: "IVA %",
        ibanLast4: "Últimos 4 dígitos IBAN",
        base: "Base",
        vatLabel: "IVA",
        total: "Total",
        monthlyEstimate: "Estimación mensual",
        directDebit: "Recibo domiciliado",
        approved: "Aprobado",
        pending: "Pendiente",
        approve: "Aprobar",
        noResults: "No se encontraron resultados.",
        errors: {
          required: "Completa cliente, horas y tarifa."
        }
      },
      activatePage: {
        title: "Activar cuenta",
        subtitle: "Introduce el token recibido y crea tu contraseña.",
        token: "Token de activación",
        newPassword: "Nueva contraseña",
        activating: "Activando...",
        submit: "Activar cuenta",
        success: "Cuenta activada correctamente. Ya puedes iniciar sesión.",
        backToLogin: "Volver al acceso",
        errors: {
          required: "Debes indicar token y contraseña.",
          failed: "No se pudo activar la cuenta. Revisa el token e inténtalo de nuevo."
        }
      },
      resetPasswordPage: {
        title: "Recuperar contraseña",
        subtitle: "Solicita un enlace de recuperación y luego define la nueva clave.",
        email: "Correo electrónico",
        step1: "1. Solicitar recuperación",
        step2: "2. Cambiar contraseña",
        requestLink: "Solicitar enlace",
        requesting: "Solicitando...",
        recoveryToken: "Token de recuperación",
        newPassword: "Nueva contraseña",
        updatePassword: "Actualizar contraseña",
        updating: "Actualizando...",
        backToLogin: "Volver al acceso",
        messages: {
          recoveryToken: "Recuperación solicitada. Token temporal: {{token}}",
          recoveryRequested: "Recuperación solicitada. Revisa tu correo.",
          updated: "Contraseña actualizada correctamente."
        },
        errors: {
          emailRequired: "Indica un correo electrónico.",
          recovery: "No se pudo iniciar la recuperación de contraseña.",
          tokenPasswordRequired: "Debes completar token y nueva contraseña.",
          update: "No se pudo actualizar la contraseña."
        }
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
        support: "Need help?",
        yes: "Yes",
        no: "No"
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
        publicDesc1:
          "Close day-to-day care that promotes emotional wellbeing, autonomy and peace of mind at home.",
        card2: "Home assistance",
        card2Desc: "Support with hygiene and mobility.",
        publicDesc2:
          "Professional support with daily tasks and basic care to maintain a safe and comfortable routine.",
        card3: "Medical assistance",
        card3Desc: "Support in appointments and hospitals.",
        publicDesc3:
          "Assistance in appointments, tests and hospital processes, with human follow-up and personalized care.",
        card4: "Family respite",
        card4Desc: "We care while you rest.",
        publicDesc4:
          "A service designed to ease family burden and guarantee continuity of care with confidence.",
        publicDescription:
          "At Sol y Vida Cuidados we provide close, professional and personalized care to improve older adults' quality of life and bring peace of mind to their families.",
        moreInfoTitle: "Need more information?",
        moreInfoText:
          "Our team is available to answer your questions and help you find the most suitable service for each situation.",
        requestInfo: "Request information",
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
        subtitle: "Access your Sol y Vida Cuidados private area.",
        email: "Email",
        password: "Password",
        forgotPassword: "Forgot your password?",
        admin: "Administrator",
        worker: "Worker",
        family: "Family",
        enter: "Enter",
        errors: {
          noToken: "Authentication token could not be obtained.",
          noRole: "User role could not be identified.",
          clientDisabled: "Client access is not enabled.",
          noServer: "Could not connect to the server. Verify backend is running.",
          invalidCredentials: "Incorrect email or password.",
          generic: "Could not sign in right now. Please try again."
        }
      },

      sidebar: {
        dashboard: "Dashboard",
        workers: "Workers",
        clients: "Clients",
        familyMembers: "Family members",
        services: "Services",
        calendar: "Calendar",
        incidents: "Incidents",
        documentation: "Documentation",
        reports: "Reports",
        notifications: "Notifications",
        budgets: "Budgets",
        maintenance: "Technical line",
        complaints: "Complaints",
        settings: "Settings",
        myServices: "My services",
        agenda: "Agenda",
        assignedClients: "Clients",
        profile: "Profile",
        messages: "Messages",
        followUp: "Follow-up",
        support: "Support",
        support24: "24/7 continuous support",
        aria: {
          openMenu: "Open menu",
          closeMenu: "Close menu",
          closePanel: "Close panel"
        }
      },

      topbar: {
        goodMorning: "Good morning",
        goodAfternoon: "Good afternoon",
        goodEvening: "Good evening",
        notifications: "Notifications"
      },

      footer: {
        vitalyTitle: "Occupational Risk Prevention and Health Surveillance",
        vitalyText:
          "We maintain a strategic partnership with VITALY for Occupational Risk Prevention (PRL) and Health Surveillance management. This alliance ensures regulatory compliance, protection of our professional team, and continuous improvement of the quality of care we provide to our users.",
        moreInfo: "More information"
      },

      tables: {
        common: {
          actions: "Actions",
          city: "City",
          phone: "Phone",
          status: "Status",
          active: "Active",
          inactive: "Inactive",
          edit: "Edit",
          delete: "Delete",
          readOnly: "Read-only",
          description: "Description",
          name: "Name"
        },
        workers: {
          title: "Workers",
          subtitle: "Manage all Sol y Vida workers.",
          search: "Search worker...",
          specialty: "Specialty",
          empty: "No workers found."
        },
        clients: {
          title: "Recent clients",
          subtitle: "Manage all Sol y Vida clients.",
          search: "Search client...",
          client: "Client",
          empty: "No clients found."
        },
        familyMembers: {
          title: "Family members",
          subtitle: "Manage clients' family members.",
          search: "Search family member...",
          relationship: "Relationship",
          primary: "Primary",
          empty: "No family members registered."
        },
        services: {
          title: "Services",
          subtitle: "Manage all services.",
          search: "Search service...",
          service: "Service",
          pricePerHour: "Price/Hour",
          empty: "No services registered."
        },
        visits: {
          title: "Visits",
          subtitle: "Manage all visits.",
          search: "Search visit...",
          date: "Date",
          notes: "Notes",
          empty: "No results found."
        }
      },

      roles: {
        admin: "Administrator",
        worker: "Worker",
        family: "Family member"
      },

      crud: {
        confirmDeleteWorker: "Are you sure you want to delete this worker?",
        confirmDeleteClient: "Delete client?",
        confirmDeleteFamilyMember: "Are you sure you want to delete this family member?",
        confirmDeleteService: "Delete service?",
        confirmDeleteVisit: "Are you sure you want to delete this visit?",
        errors: {
          deleteWorker: "Could not delete the worker.",
          deleteClient: "Could not delete the client.",
          deleteFamilyMember: "Could not delete the family member.",
          deleteService: "Could not delete the service.",
          deleteVisit: "Could not delete the visit."
        }
      },

      forms: {
        common: {
          name: "Name",
          lastName: "Last name",
          idNumber: "ID number",
          address: "Address",
          city: "City",
          postalCode: "Postal code",
          phone: "Phone",
          email: "Email",
          description: "Description",
          notes: "Notes",
          saving: "Saving...",
          saveChanges: "Save changes",
          cancel: "Cancel",
          errors: {
            generic: "An error occurred."
          }
        },
        client: {
          newTitle: "New client",
          editTitle: "Edit client",
          socialSecurity: "Social Security Number",
          save: "Save client",
          errors: {
            required: "Complete all required client fields."
          },
          success: {
            created: "Client created successfully",
            updated: "Client updated successfully"
          }
        },
        worker: {
          specialty: "Specialty",
          save: "Create worker",
          errors: {
            required: "Complete required fields."
          }
        },
        service: {
          name: "Service name",
          pricePerHour: "Price per hour (EUR)",
          save: "Create service",
          errors: {
            required: "Complete required fields."
          }
        },
        familyMember: {
          relationship: "Relationship",
          primaryContact: "Primary contact",
          save: "Create family member",
          errors: {
            required: "Complete required family member fields."
          }
        },
        visit: {
          selectClient: "Select a client",
          selectWorker: "Select a worker",
          save: "Create visit",
          errors: {
            required: "Complete date, client and worker before saving the visit.",
            save: "Could not save the visit."
          }
        }
      },

      pages: {
        workers: {
          title: "Workers",
          subtitle: "Manage Sol y Vida Cuidados staff.",
          new: "New worker",
          edit: "Edit worker"
        },
        clients: {
          title: "Clients",
          subtitle: "Manage all clients.",
          new: "New client",
          edit: "Edit client"
        },
        familyMembers: {
          title: "Family members",
          subtitle: "Manage clients' family members.",
          new: "New family member",
          edit: "Edit family member"
        },
        services: {
          title: "Services",
          subtitle: "Manage Sol y Vida Cuidados internal services catalog.",
          new: "New service",
          edit: "Edit service"
        },
        visits: {
          title: "Visits",
          subtitleAdmin: "Manage all Sol y Vida Cuidados visits.",
          subtitleWorker: "Start and finish services with GPS traceability and care report.",
          new: "New visit",
          edit: "Edit visit",
          operation: "Service operation",
          scheduled: "Scheduled",
          start: "Start",
          finish: "Finish",
          hygiene: "Hygiene",
          medication: "Medication",
          nutrition: "Nutrition",
          mobility: "Mobility",
          reportRequired: "Mandatory care report",
          optionalNotes: "Optional notes",
          saveAndFinish: "Save and finish service",
          startError: "Could not start the service. Check location permissions.",
          finishSuccess: "Service finished and care report saved.",
          finishError: "Complete checklist, report and GPS permissions to finish."
        }
      },
      branding: {
        name: "Sol y Vida",
        suffix: "Care",
        company: "Sol y Vida Cuidados",
        supportPhone: "626 406 477",
        supportPhoneRaw: "+34626406477",
        supportEmail: "solyvida@solyvidacare.com",
        website: "solyvidacare.com"
      },
      profiles: {
        adminName: "Carmen Lopez",
        workerName: "Maria Garcia",
        familyName: "Lopez Family",
        clientMain: "Carmen Lopez"
      },
      contactPage: {
        followUpSubject: "Family follow-up for {{clientName}}",
        title: "Contact Sol y Vida Cuidados",
        subtitle: "We are here to help you.",
        description: "If you need information about our home care services, we will be happy to assist you and answer any questions.",
        phoneLabel: "Phone",
        emailLabel: "Email",
        addressLabel: "Address",
        addressStreet: "Paseo del Colorado, 7",
        addressCity: "Torremolinos (Malaga)",
        websiteLabel: "Website",
        alerts: {
          required: "Complete the required fields to send your request.",
          success: "Your request has been sent successfully.",
          error: "Your request could not be sent right now."
        },
        form: {
          title: "Send us a message",
          description: "Complete the following form and we will contact you as soon as possible.",
          fullName: "Full name",
          fullNamePlaceholder: "Your full name",
          email: "Email",
          emailPlaceholder: "youremail@domain.com",
          phone: "Phone",
          phonePlaceholder: "626 406 477",
          subject: "Subject",
          subjectPlaceholder: "How can we help you?",
          message: "Message",
          messagePlaceholder: "Briefly tell us your needs so we can offer personalized care.",
          sending: "Sending request...",
          submit: "Request information"
        }
      },
      workerPage: {
        topbar: {
          title: "Good morning, Maria",
          subtitle: "Daily activity summary and follow-up of assigned services.",
          searchPlaceholder: "Search agenda, client or document"
        },
        cards: {
          assignedServices: "Assigned services",
          today: "Today",
          nextVisit: "Next visit",
          todaySchedule: "Today's schedule",
          hours: "Hours",
          assignedClients: "Assigned clients",
          stable: "Stable"
        },
        sections: {
          calendarAgenda: "Calendar and agenda",
          nextVisit: "Next visit",
          incidents: "Incidents",
          documentation: "Documentation",
          myProfile: "My professional profile"
        },
        labels: {
          client: "Client",
          estimatedTime: "Estimated time",
          coordination: "Service coordination"
        },
        actions: {
          history: "History",
          incidents: "Incidents",
          documentation: "Documentation",
          profile: "My profile",
          startService: "Start service",
          manageIncidents: "Manage incidents",
          view: "View",
          contactCoordination: "Contact coordination"
        },
        incidents: {
          pending: "Pending",
          pendingText: "Schedule change requested by family",
          resolved: "Resolved",
          resolvedText: "Home access validated"
        },
        locations: {
          torremolinos: "Torremolinos",
          benalmadena: "Benalmadena",
          fuengirola: "Fuengirola",
          mijas: "Mijas"
        },
        sampleClients: {
          antonioRuiz: "Antonio Ruiz",
          mariaSanchez: "Maria Sanchez",
          elenaMartin: "Elena Martin"
        },
        documents: {
          dailyReport: "Daily report - July.pdf",
          prlProtocol: "OSH Protocol.pdf",
          monthlyReport: "Monthly report.docx"
        },
        noResults: "No results found."
      },
      familyPage: {
        topbar: {
          welcome: "Welcome",
          subtitleFamily: "Daily follow-up and real-time family communication.",
          subtitleClient: "Check your services, upcoming visits and documentation in one place.",
          searchPlaceholder: "Search reports, documents or messages"
        },
        loading: "Loading family follow-up...",
        noData: "No data available for this follow-up.",
        noResults: "No results found.",
        cards: {
          myServices: "My services",
          familyStatus: "Family member status",
          active: "Active",
          stable: "Stable",
          nextVisits: "Upcoming visits",
          thisWeek: "This week",
          assignedProfessional: "Assigned professional",
          latestReports: "Latest reports",
          reference: "Reference",
          updated: "Updated",
          pendingMessages: "Pending messages",
          unread: "Unread"
        },
        sections: {
          nextVisit: "Next visit"
        },
        labels: {
          homeCare: "Home care",
          activeServiceText: "Active service from Monday to Friday with daily team follow-up.",
          notes: "Notes",
          new: "New",
          updated: "Updated",
          familyContact: "Family contact",
          personalAccess: "Active personal access for service follow-up."
        },
        actions: {
          calendar: "Calendar",
          messages: "Messages",
          documentation: "Documentation",
          myProfile: "My profile",
          contact: "Contact",
          viewFullFollowup: "View full follow-up",
          replyOrContact: "Reply or contact",
          requestFullReport: "Request full report",
          contactCompany: "Contact the company",
          reply: "Reply"
        },
        modals: {
          newMessage: "New message"
        },
        form: {
          subject: "Subject",
          messagePlaceholder: "Write your message",
          sending: "Sending...",
          send: "Send message"
        },
        errors: {
          load: "Family follow-up could not be loaded.",
          messageRequired: "Complete subject and message.",
          messageSend: "Message could not be sent.",
          documentOpen: "Document could not be opened."
        }
      },
      reportsPage: {
        topbar: {
          subtitleAdmin: "Global activity and operational evolution monitoring.",
          subtitleFamily: "Service follow-up summary and family service status."
        },
        searchPlaceholder: "Search report",
        admin: {
          summaryTitle: "Executive summary",
          activeClients: "Active clients",
          activeWorkers: "Active workers",
          registeredVisits: "Registered visits",
          relatedFamily: "Related family members",
          actionsTitle: "Report actions"
        },
        family: {
          followupTitle: "Family follow-up",
          quickAccess: "Quick access",
          noReportSelected: "No report selected",
          selectReport: "Select a report to review its content."
        },
        actions: {
          viewClients: "View clients",
          viewFamily: "View family members",
          documentSupport: "Document support",
          open: "Open",
          viewSummary: "View summary",
          download: "Download",
          backToFamily: "Back to family panel",
          viewDocumentation: "View documentation",
          contactCompany: "Contact the company"
        },
        errors: {
          download: "The report could not be downloaded."
        }
      },
      settingsPage: {
        topbar: {
          subtitle: "Operational settings, support and session control."
        },
        sections: {
          operational: "Operational settings",
          quickActions: "Quick actions"
        },
        labels: {
          activeRole: "Active role",
          supportChannel: "Support channel",
          operationalEmail: "Operational email",
          protectedEnvironment: "Protected environment",
          protectedEnvironmentText: "Active JWT and private navigation.",
          sensitiveConfigInfo: "Sensitive settings remain protected in backend; only safe operational actions are exposed here."
        },
        family: {
          linkedFamily: "Linked family member",
          caredPerson: "Person receiving care",
          operationalEmail: "Operational email",
          contactPhone: "Contact phone",
          preferredChannel: "Preferred channel",
          channelPhone: "Phone",
          channelEmail: "Email",
          activePlan: "Active plan",
          coordinationNotes: "Notes for coordination",
          keepNotifications: "Keep alerts and follow-up active in the family portal."
        },
        actions: {
          contactSupport: "Contact support",
          reviewTeam: "Review team",
          viewDocumentation: "View documentation",
          phoneSupport: "Phone support",
          saveProfile: "Save profile changes"
        },
        errors: {
          save: "Profile could not be saved."
        }
      },
      notificationsPage: {
        subtitle: "Alerts history and read status. Ready for push channel.",
        history: "History",
        searchPlaceholder: "Search notification",
        pushReady: "Push ready",
        inApp: "In-app",
        markRead: "Mark as read",
        noResults: "No results found."
      },
      incidentsPage: {
        subtitle: "Operational follow-up of incidents and relevant service observations.",
        registry: "Incident registry",
        registryDescription: "Operational incident CRUD linked to real visits in the system.",
        newIncident: "New incident",
        createIncident: "Create incident",
        editIncident: "Edit incident",
        searchPlaceholder: "Search incident",
        noResults: "No results found.",
        confirmDelete: "Delete incident?",
        client: "Client",
        professional: "Professional",
        actionsTitle: "Operational actions",
        reviewVisits: "Review visits",
        careFollowup: "Care follow-up",
        traceability: "Incidents are recorded against existing visits to maintain real operational traceability.",
        linkedVisit: "Linked visit",
        titleLabel: "Title",
        levelLabel: "Level",
        date: "Date",
        level: {
          low: "Low",
          medium: "Medium",
          high: "High"
        },
        errors: {
          save: "Incident could not be saved.",
          delete: "Incident could not be deleted."
        }
      },
      maintenancePage: {
        title: "Technical line",
        subtitle: "Maintenance with before/after photos and mandatory technical report.",
        newTicket: "New technical ticket",
        createTicket: "Create ticket",
        history: "Technical history",
        searchPlaceholder: "Search ticket",
        area: "Area",
        beforePhoto: "Incident photo",
        afterPhoto: "Resolution photo",
        beforePhotoUrl: "Before photo URL",
        afterPhotoUrl: "After photo URL",
        technicalReport: "Technical report",
        closeTicket: "Close ticket",
        report: "Report",
        before: "Before",
        after: "After",
        noneAttached: "Not attached",
        pending: "Pending",
        noResults: "No results found.",
        errors: {
          required: "Complete client, area and description.",
          reportRequired: "Technical report is required."
        }
      },
      complaintsPage: {
        subtitle: "Conversation channel for complaints, suggestions and response follow-up.",
        searchPlaceholder: "Search conversation",
        newConversation: "New conversation",
        adminInbox: "Conversation management",
        history: "Conversation history",
        subject: "Subject",
        description: "Details",
        send: "Send",
        save: "Save response",
        responseLabel: "Response",
        responsePlaceholder: "Reply to user",
        noResults: "No results found.",
        categories: {
          suggestion: "Suggestion",
          complaint: "Complaint",
          quality: "Quality incident"
        },
        status: {
          pending: "Pending",
          inProgress: "In progress",
          resolved: "Resolved"
        },
        errors: {
          required: "Complete subject and details.",
          send: "Conversation could not be sent.",
          responseRequired: "Add a response before saving.",
          update: "Conversation could not be updated."
        }
      },
      budgetsPage: {
        subtitle: "Automatic calculation of hours, base, VAT, total and monthly estimate.",
        searchPlaceholder: "Search budget",
        newBudget: "New budget",
        createBudget: "Create budget",
        history: "History",
        hours: "Hours",
        hourlyRate: "Hourly rate",
        vat: "VAT %",
        ibanLast4: "Last 4 IBAN digits",
        base: "Base",
        vatLabel: "VAT",
        total: "Total",
        monthlyEstimate: "Monthly estimate",
        directDebit: "Direct debit receipt",
        approved: "Approved",
        pending: "Pending",
        approve: "Approve",
        noResults: "No results found.",
        errors: {
          required: "Complete client, hours and rate."
        }
      },
      activatePage: {
        title: "Activate account",
        subtitle: "Enter the received token and create your password.",
        token: "Activation token",
        newPassword: "New password",
        activating: "Activating...",
        submit: "Activate account",
        success: "Account activated successfully. You can now sign in.",
        backToLogin: "Back to access",
        errors: {
          required: "You must provide token and password.",
          failed: "Could not activate account. Check the token and try again."
        }
      },
      resetPasswordPage: {
        title: "Recover password",
        subtitle: "Request a recovery link and then define your new password.",
        email: "Email",
        step1: "1. Request recovery",
        step2: "2. Change password",
        requestLink: "Request link",
        requesting: "Requesting...",
        recoveryToken: "Recovery token",
        newPassword: "New password",
        updatePassword: "Update password",
        updating: "Updating...",
        backToLogin: "Back to access",
        messages: {
          recoveryToken: "Recovery requested. Temporary token: {{token}}",
          recoveryRequested: "Recovery requested. Check your email.",
          updated: "Password updated successfully."
        },
        errors: {
          emailRequired: "Enter an email address.",
          recovery: "Could not start password recovery.",
          tokenPasswordRequired: "You must complete token and new password.",
          update: "Password could not be updated."
        }
      }
    }
  },

  fr: {
    translation: {
      common: {
        home: "Accueil",
        services: "Services",
        about: "A propos",
        contact: "Contact",
        login: "Connexion",
        language: "Langue",
        logout: "Se deconnecter",
        support: "Besoin d'aide ?",
        yes: "Oui",
        no: "Non"
      },
      login: {
        subtitle: "Accedez a votre espace prive Sol y Vida Cuidados.",
        email: "E-mail",
        password: "Mot de passe",
        forgotPassword: "Mot de passe oublie ?",
        errors: {
          noToken: "Le jeton d'authentification n'a pas pu etre obtenu.",
          noRole: "Le role utilisateur n'a pas pu etre identifie.",
          clientDisabled: "L'acces client n'est pas active.",
          noServer: "Connexion au serveur impossible. Verifiez que le backend est actif.",
          invalidCredentials: "E-mail ou mot de passe incorrect.",
          generic: "Connexion impossible pour le moment. Reessayez."
        }
      },
      sidebar: {
        dashboard: "Tableau de bord",
        workers: "Intervenants",
        clients: "Clients",
        familyMembers: "Proches",
        services: "Services",
        calendar: "Calendrier",
        incidents: "Incidents",
        documentation: "Documentation",
        reports: "Rapports",
        notifications: "Notifications",
        budgets: "Budgets",
        maintenance: "Assistance technique",
        complaints: "Reclamations",
        settings: "Parametres",
        myServices: "Mes services",
        agenda: "Agenda",
        assignedClients: "Clients",
        profile: "Profil",
        messages: "Messages",
        followUp: "Suivi",
        support: "Support",
        support24: "Assistance continue 24/7",
        aria: {
          openMenu: "Ouvrir le menu",
          closeMenu: "Fermer le menu",
          closePanel: "Fermer le panneau"
        }
      },
      topbar: {
        goodMorning: "Bonjour",
        goodAfternoon: "Bon apres-midi",
        goodEvening: "Bonsoir",
        notifications: "Notifications"
      },
      footer: {
        vitalyTitle: "Prevention des risques professionnels et surveillance de la sante",
        vitalyText:
          "Nous maintenons un partenariat strategique avec VITALY pour la gestion de la prevention des risques professionnels et de la surveillance de la sante.",
        moreInfo: "Plus d'informations"
      },
      tables: {
        common: {
          actions: "Actions",
          city: "Ville",
          phone: "Telephone",
          status: "Statut",
          active: "Actif",
          inactive: "Inactif",
          edit: "Modifier",
          delete: "Supprimer",
          readOnly: "Lecture seule",
          description: "Description",
          name: "Nom"
        },
        workers: {
          title: "Intervenants",
          subtitle: "Gerez tous les intervenants Sol y Vida.",
          search: "Rechercher un intervenant...",
          specialty: "Specialite",
          empty: "Aucun intervenant trouve."
        },
        clients: {
          title: "Clients recents",
          subtitle: "Gerez tous les clients Sol y Vida.",
          search: "Rechercher un client...",
          client: "Client",
          empty: "Aucun client trouve."
        },
        familyMembers: {
          title: "Proches",
          subtitle: "Gerez les proches des clients.",
          search: "Rechercher un proche...",
          relationship: "Lien",
          primary: "Principal",
          empty: "Aucun proche enregistre."
        },
        services: {
          title: "Services",
          subtitle: "Gerez tous les services.",
          search: "Rechercher un service...",
          service: "Service",
          pricePerHour: "Prix/Heure",
          empty: "Aucun service enregistre."
        },
        visits: {
          title: "Visites",
          subtitle: "Gerez toutes les visites.",
          search: "Rechercher une visite...",
          date: "Date",
          notes: "Observations",
          empty: "Aucun resultat."
        }
      },
      services: {
        publicDesc1:
          "Un accompagnement proche au quotidien, favorisant le bien-etre emotionnel, l'autonomie et la serenite a domicile.",
        publicDesc2:
          "Un soutien professionnel pour les taches quotidiennes et les soins de base afin de maintenir une routine sure et confortable.",
        publicDesc3:
          "Une assistance lors des consultations, examens et parcours hospitaliers, avec suivi humain et attention personnalisee.",
        publicDesc4:
          "Un service pense pour alleger la charge familiale et garantir une continuite des soins en toute confiance.",
        publicDescription:
          "Chez Sol y Vida Cuidados, nous offrons une attention proche, professionnelle et personnalisee pour ameliorer la qualite de vie des personnes agees et apporter de la tranquillite a leurs familles.",
        moreInfoTitle: "Besoin de plus d'informations ?",
        moreInfoText:
          "Notre equipe est disponible pour repondre a vos questions et vous aider a trouver le service le plus adapte a chaque situation.",
        requestInfo: "Demander des informations"
      },
      roles: {
        admin: "Administratrice",
        worker: "Intervenante",
        family: "Membre de la famille"
      },
      crud: {
        confirmDeleteWorker: "Supprimer cet intervenant ?",
        confirmDeleteClient: "Supprimer ce client ?",
        confirmDeleteFamilyMember: "Supprimer ce proche ?",
        confirmDeleteService: "Supprimer ce service ?",
        confirmDeleteVisit: "Supprimer cette visite ?",
        errors: {
          deleteWorker: "Suppression de l'intervenant impossible.",
          deleteClient: "Suppression du client impossible.",
          deleteFamilyMember: "Suppression du proche impossible.",
          deleteService: "Suppression du service impossible.",
          deleteVisit: "Suppression de la visite impossible."
        }
      },
      forms: {
        common: {
          name: "Nom",
          lastName: "Prenom",
          idNumber: "Identifiant",
          address: "Adresse",
          city: "Ville",
          postalCode: "Code postal",
          phone: "Telephone",
          email: "E-mail",
          description: "Description",
          notes: "Observations",
          saving: "Enregistrement...",
          saveChanges: "Enregistrer les modifications",
          cancel: "Annuler",
          errors: {
            generic: "Une erreur est survenue."
          }
        },
        client: {
          newTitle: "Nouveau client",
          editTitle: "Modifier le client",
          socialSecurity: "Numero de securite sociale",
          save: "Enregistrer le client",
          errors: {
            required: "Completez tous les champs obligatoires du client."
          },
          success: {
            created: "Client cree avec succes",
            updated: "Client mis a jour avec succes"
          }
        },
        worker: {
          specialty: "Specialite",
          save: "Creer l'intervenant",
          errors: {
            required: "Completez les champs obligatoires."
          }
        },
        service: {
          name: "Nom du service",
          pricePerHour: "Prix par heure (EUR)",
          save: "Creer le service",
          errors: {
            required: "Completez les champs obligatoires."
          }
        },
        familyMember: {
          relationship: "Lien",
          primaryContact: "Contact principal",
          save: "Creer le proche",
          errors: {
            required: "Completez les champs obligatoires du proche."
          }
        },
        visit: {
          selectClient: "Selectionnez un client",
          selectWorker: "Selectionnez un intervenant",
          save: "Creer la visite",
          errors: {
            required: "Completez la date, le client et l'intervenant avant d'enregistrer la visite.",
            save: "Impossible d'enregistrer la visite."
          }
        }
      },
      pages: {
        workers: {
          title: "Intervenants",
          subtitle: "Gerez le personnel de Sol y Vida Cuidados.",
          new: "Nouvel intervenant",
          edit: "Modifier l'intervenant"
        },
        clients: {
          title: "Clients",
          subtitle: "Gerez tous les clients.",
          new: "Nouveau client",
          edit: "Modifier le client"
        },
        familyMembers: {
          title: "Proches",
          subtitle: "Gerez les proches des clients.",
          new: "Nouveau proche",
          edit: "Modifier le proche"
        },
        services: {
          title: "Services",
          subtitle: "Gerez le catalogue interne des services de Sol y Vida Cuidados.",
          new: "Nouveau service",
          edit: "Modifier le service"
        },
        visits: {
          title: "Visites",
          subtitleAdmin: "Gerez toutes les visites de Sol y Vida Cuidados.",
          subtitleWorker: "Demarrez et terminez les services avec tracabilite GPS et rapport de soins.",
          new: "Nouvelle visite",
          edit: "Modifier la visite",
          operation: "Operation de service",
          scheduled: "Planifiee",
          start: "Demarrer",
          finish: "Terminer",
          hygiene: "Hygiene",
          medication: "Medication",
          nutrition: "Nutrition",
          mobility: "Mobilite",
          reportRequired: "Rapport de soins obligatoire",
          optionalNotes: "Notes optionnelles",
          saveAndFinish: "Enregistrer et terminer le service",
          startError: "Impossible de demarrer le service. Verifiez les permissions de localisation.",
          finishSuccess: "Service termine et rapport de soins enregistre.",
          finishError: "Completez la checklist, le rapport et les permissions GPS pour terminer."
        }
      },
      branding: {
        name: "Sol y Vida",
        suffix: "Cuidados",
        company: "Sol y Vida Cuidados",
        supportPhone: "626 406 477",
        supportPhoneRaw: "+34626406477",
        supportEmail: "solyvida@solyvidacare.com",
        website: "solyvidacare.com"
      },
      profiles: {
        adminName: "Carmen Lopez",
        workerName: "Maria Garcia",
        familyName: "Famille Lopez",
        clientMain: "Carmen Lopez"
      },
      contactPage: {
        followUpSubject: "Suivi familial de {{clientName}}",
        title: "Contacter Sol y Vida Cuidados",
        subtitle: "Nous sommes la pour vous aider.",
        description: "Si vous avez besoin d'informations sur nos services de soins a domicile, nous serons ravis de vous aider et de repondre a vos questions.",
        phoneLabel: "Telephone",
        emailLabel: "E-mail",
        addressLabel: "Adresse",
        addressStreet: "Paseo del Colorado, 7",
        addressCity: "Torremolinos (Malaga)",
        websiteLabel: "Site web",
        alerts: {
          required: "Completez les champs obligatoires pour envoyer votre demande.",
          success: "Votre demande a ete envoyee avec succes.",
          error: "Votre demande n'a pas pu etre envoyee pour le moment."
        },
        form: {
          title: "Envoyez-nous un message",
          description: "Completez le formulaire suivant et nous vous contacterons au plus vite.",
          fullName: "Nom complet",
          fullNamePlaceholder: "Votre nom et prenom",
          email: "E-mail",
          emailPlaceholder: "votremail@domaine.com",
          phone: "Telephone",
          phonePlaceholder: "626 406 477",
          subject: "Objet",
          subjectPlaceholder: "Comment pouvons-nous vous aider ?",
          message: "Message",
          messagePlaceholder: "Expliquez brievement votre besoin pour une prise en charge personnalisee.",
          sending: "Envoi en cours...",
          submit: "Demander des informations"
        }
      },
      workerPage: {
        topbar: {
          title: "Bonjour, Maria",
          subtitle: "Resume de l'activite quotidienne et suivi des services assignes.",
          searchPlaceholder: "Rechercher agenda, client ou document"
        },
        cards: {
          assignedServices: "Services assignes",
          today: "Aujourd'hui",
          nextVisit: "Prochaine visite",
          todaySchedule: "Planning du jour",
          hours: "Heures",
          assignedClients: "Clients assignes",
          stable: "Stables"
        },
        sections: {
          calendarAgenda: "Calendrier et agenda",
          nextVisit: "Prochaine visite",
          incidents: "Incidents",
          documentation: "Documentation",
          myProfile: "Mon profil professionnel"
        },
        labels: {
          client: "Client",
          estimatedTime: "Heure estimee",
          coordination: "Coordination des services"
        },
        actions: {
          history: "Historique",
          incidents: "Incidents",
          documentation: "Documentation",
          profile: "Mon profil",
          startService: "Demarrer le service",
          manageIncidents: "Gerer les incidents",
          view: "Voir",
          contactCoordination: "Contacter la coordination"
        },
        incidents: {
          pending: "En attente",
          pendingText: "Changement d'horaire demande par la famille",
          resolved: "Resolue",
          resolvedText: "Acces au domicile valide"
        },
        locations: {
          torremolinos: "Torremolinos",
          benalmadena: "Benalmadena",
          fuengirola: "Fuengirola",
          mijas: "Mijas"
        },
        sampleClients: {
          antonioRuiz: "Antonio Ruiz",
          mariaSanchez: "Maria Sanchez",
          elenaMartin: "Elena Martin"
        },
        documents: {
          dailyReport: "Rapport quotidien - juillet.pdf",
          prlProtocol: "Protocole PRL.pdf",
          monthlyReport: "Rapport mensuel.docx"
        },
        noResults: "Aucun resultat."
      },
      familyPage: {
        topbar: {
          welcome: "Bienvenue",
          subtitleFamily: "Suivi quotidien et communication familiale en temps reel.",
          subtitleClient: "Consultez vos services, prochaines visites et documents en un seul endroit.",
          searchPlaceholder: "Rechercher rapports, documents ou messages"
        },
        loading: "Chargement du suivi familial...",
        noData: "Aucune donnee disponible pour ce suivi.",
        noResults: "Aucun resultat.",
        cards: {
          myServices: "Mes services",
          familyStatus: "Etat du proche",
          active: "Actifs",
          stable: "Stable",
          nextVisits: "Prochaines visites",
          thisWeek: "Cette semaine",
          assignedProfessional: "Professionnel assigne",
          latestReports: "Derniers rapports",
          reference: "Reference",
          updated: "Mis a jour",
          pendingMessages: "Messages en attente",
          unread: "Non lus"
        },
        sections: {
          nextVisit: "Prochaine visite"
        },
        labels: {
          homeCare: "Soins a domicile",
          activeServiceText: "Service actif du lundi au vendredi avec suivi quotidien de l'equipe.",
          notes: "Observations",
          new: "Nouveau",
          updated: "Mis a jour",
          familyContact: "Contact familial",
          personalAccess: "Acces personnel actif pour le suivi du service."
        },
        actions: {
          calendar: "Calendrier",
          messages: "Messages",
          documentation: "Documentation",
          myProfile: "Mon profil",
          contact: "Contact",
          viewFullFollowup: "Voir le suivi complet",
          replyOrContact: "Repondre ou contacter",
          requestFullReport: "Demander le rapport complet",
          contactCompany: "Contacter l'entreprise",
          reply: "Repondre"
        },
        modals: {
          newMessage: "Nouveau message"
        },
        form: {
          subject: "Objet",
          messagePlaceholder: "Ecrivez votre message",
          sending: "Envoi...",
          send: "Envoyer le message"
        },
        errors: {
          load: "Le suivi familial n'a pas pu etre charge.",
          messageRequired: "Completez l'objet et le message.",
          messageSend: "Le message n'a pas pu etre envoye.",
          documentOpen: "Le document n'a pas pu etre ouvert."
        }
      },
      reportsPage: {
        topbar: {
          subtitleAdmin: "Suivi global de l'activite et de l'evolution operationnelle.",
          subtitleFamily: "Resume du suivi et de l'etat du service familial."
        },
        searchPlaceholder: "Rechercher un rapport",
        admin: {
          summaryTitle: "Resume executif",
          activeClients: "Clients actifs",
          activeWorkers: "Intervenants actifs",
          registeredVisits: "Visites enregistrees",
          relatedFamily: "Proches associes",
          actionsTitle: "Actions de rapport"
        },
        family: {
          followupTitle: "Suivi familial",
          quickAccess: "Acces utiles",
          noReportSelected: "Aucun rapport selectionne",
          selectReport: "Selectionnez un rapport pour consulter son contenu."
        },
        actions: {
          viewClients: "Voir les clients",
          viewFamily: "Voir les proches",
          documentSupport: "Support documentaire",
          open: "Ouvrir",
          viewSummary: "Voir le resume",
          download: "Telecharger",
          backToFamily: "Retour au panneau familial",
          viewDocumentation: "Voir la documentation",
          contactCompany: "Contacter l'entreprise"
        },
        errors: {
          download: "Le rapport n'a pas pu etre telecharge."
        }
      },
      settingsPage: {
        topbar: {
          subtitle: "Parametres operationnels, support et controle de session."
        },
        sections: {
          operational: "Configuration operationnelle",
          quickActions: "Actions rapides"
        },
        labels: {
          activeRole: "Role actif",
          supportChannel: "Canal de support",
          operationalEmail: "E-mail operationnel",
          protectedEnvironment: "Environnement protege",
          protectedEnvironmentText: "JWT actif et navigation privee.",
          sensitiveConfigInfo: "La configuration sensible reste protegee dans le backend ; seules des actions operationnelles sures sont exposees ici."
        },
        family: {
          linkedFamily: "Proche lie",
          caredPerson: "Personne prise en charge",
          operationalEmail: "E-mail operationnel",
          contactPhone: "Telephone de contact",
          preferredChannel: "Canal prefere",
          channelPhone: "Telephone",
          channelEmail: "E-mail",
          activePlan: "Plan actif",
          coordinationNotes: "Observations pour la coordination",
          keepNotifications: "Maintenir les alertes et le suivi actifs sur le portail familial."
        },
        actions: {
          contactSupport: "Contacter le support",
          reviewTeam: "Verifier l'equipe",
          viewDocumentation: "Voir la documentation",
          phoneSupport: "Support telephonique",
          saveProfile: "Enregistrer les modifications du profil"
        },
        errors: {
          save: "Le profil n'a pas pu etre enregistre."
        }
      },
      notificationsPage: {
        subtitle: "Historique des alertes et etat de lecture. Pret pour le canal push.",
        history: "Historique",
        searchPlaceholder: "Rechercher une notification",
        pushReady: "Push pret",
        inApp: "In-app",
        markRead: "Marquer comme lue",
        noResults: "Aucun resultat."
      },
      incidentsPage: {
        subtitle: "Suivi operationnel des incidents et des observations pertinentes du service.",
        registry: "Registre des incidents",
        registryDescription: "CRUD operationnel des incidents lie a de vraies visites du systeme.",
        newIncident: "Nouvel incident",
        createIncident: "Creer l'incident",
        editIncident: "Modifier l'incident",
        searchPlaceholder: "Rechercher un incident",
        noResults: "Aucun resultat.",
        confirmDelete: "Supprimer l'incident ?",
        client: "Client",
        professional: "Professionnel",
        actionsTitle: "Actions operationnelles",
        reviewVisits: "Verifier les visites",
        careFollowup: "Suivi des soins",
        traceability: "Les incidents sont enregistres sur des visites existantes pour maintenir une tracabilite operationnelle reelle.",
        linkedVisit: "Visite liee",
        titleLabel: "Titre",
        levelLabel: "Niveau",
        date: "Date",
        level: {
          low: "Faible",
          medium: "Moyen",
          high: "Eleve"
        },
        errors: {
          save: "L'incident n'a pas pu etre enregistre.",
          delete: "L'incident n'a pas pu etre supprime."
        }
      },
      maintenancePage: {
        title: "Ligne technique",
        subtitle: "Maintenance avec photos avant/apres et rapport technique obligatoire.",
        newTicket: "Nouveau ticket technique",
        createTicket: "Creer le ticket",
        history: "Historique technique",
        searchPlaceholder: "Rechercher un ticket",
        area: "Zone",
        beforePhoto: "Photo de l'incident",
        afterPhoto: "Photo de resolution",
        beforePhotoUrl: "URL photo avant",
        afterPhotoUrl: "URL photo apres",
        technicalReport: "Rapport technique",
        closeTicket: "Fermer le ticket",
        report: "Rapport",
        before: "Avant",
        after: "Apres",
        noneAttached: "Non jointe",
        pending: "En attente",
        noResults: "Aucun resultat.",
        errors: {
          required: "Completez client, zone et description.",
          reportRequired: "Le rapport technique est obligatoire."
        }
      },
      complaintsPage: {
        subtitle: "Canal de conversation pour reclamations, suggestions et suivi des reponses.",
        searchPlaceholder: "Rechercher une conversation",
        newConversation: "Nouvelle conversation",
        adminInbox: "Gestion des conversations",
        history: "Historique des conversations",
        subject: "Sujet",
        description: "Detail",
        send: "Envoyer",
        save: "Enregistrer la reponse",
        responseLabel: "Reponse",
        responsePlaceholder: "Repondre a l'utilisateur",
        noResults: "Aucun resultat.",
        categories: {
          suggestion: "Suggestion",
          complaint: "Reclamation",
          quality: "Incident qualite"
        },
        status: {
          pending: "En attente",
          inProgress: "En cours",
          resolved: "Resolue"
        },
        errors: {
          required: "Completez le sujet et le detail.",
          send: "La conversation n'a pas pu etre envoyee.",
          responseRequired: "Ajoutez une reponse avant d'enregistrer.",
          update: "La conversation n'a pas pu etre mise a jour."
        }
      },
      budgetsPage: {
        subtitle: "Calcul automatique des heures, base, TVA, total et estimation mensuelle.",
        searchPlaceholder: "Rechercher un budget",
        newBudget: "Nouveau budget",
        createBudget: "Creer le budget",
        history: "Historique",
        hours: "Heures",
        hourlyRate: "Prix/heure",
        vat: "TVA %",
        ibanLast4: "4 derniers chiffres IBAN",
        base: "Base",
        vatLabel: "TVA",
        total: "Total",
        monthlyEstimate: "Estimation mensuelle",
        directDebit: "Prelevement automatique",
        approved: "Approuve",
        pending: "En attente",
        approve: "Approuver",
        noResults: "Aucun resultat.",
        errors: {
          required: "Completez client, heures et tarif."
        }
      },
      activatePage: {
        title: "Activer le compte",
        subtitle: "Saisissez le token recu et creez votre mot de passe.",
        token: "Token d'activation",
        newPassword: "Nouveau mot de passe",
        activating: "Activation...",
        submit: "Activer le compte",
        success: "Compte active avec succes. Vous pouvez maintenant vous connecter.",
        backToLogin: "Retour a l'acces",
        errors: {
          required: "Vous devez indiquer le token et le mot de passe.",
          failed: "Impossible d'activer le compte. Verifiez le token et reessayez."
        }
      },
      resetPasswordPage: {
        title: "Recuperer le mot de passe",
        subtitle: "Demandez un lien de recuperation puis definissez votre nouveau mot de passe.",
        email: "E-mail",
        step1: "1. Demander la recuperation",
        step2: "2. Changer le mot de passe",
        requestLink: "Demander le lien",
        requesting: "Demande en cours...",
        recoveryToken: "Token de recuperation",
        newPassword: "Nouveau mot de passe",
        updatePassword: "Mettre a jour le mot de passe",
        updating: "Mise a jour...",
        backToLogin: "Retour a l'acces",
        messages: {
          recoveryToken: "Recuperation demandee. Token temporaire : {{token}}",
          recoveryRequested: "Recuperation demandee. Verifiez votre e-mail.",
          updated: "Mot de passe mis a jour avec succes."
        },
        errors: {
          emailRequired: "Indiquez une adresse e-mail.",
          recovery: "Impossible de lancer la recuperation du mot de passe.",
          tokenPasswordRequired: "Vous devez completer le token et le nouveau mot de passe.",
          update: "Le mot de passe n'a pas pu etre mis a jour."
        }
      }
    }
  },

  de: {
    translation: {
      common: {
        home: "Startseite",
        services: "Leistungen",
        about: "Uber uns",
        contact: "Kontakt",
        login: "Anmelden",
        language: "Sprache",
        logout: "Abmelden",
        support: "Brauchen Sie Hilfe?",
        yes: "Ja",
        no: "Nein"
      },
      login: {
        subtitle: "Greifen Sie auf Ihren privaten Sol y Vida Cuidados Bereich zu.",
        email: "E-Mail",
        password: "Passwort",
        forgotPassword: "Passwort vergessen?",
        errors: {
          noToken: "Authentifizierungs-Token konnte nicht abgerufen werden.",
          noRole: "Benutzerrolle konnte nicht ermittelt werden.",
          clientDisabled: "Kundenzugang ist nicht aktiviert.",
          noServer: "Verbindung zum Server fehlgeschlagen. Prufen Sie, ob das Backend lauft.",
          invalidCredentials: "E-Mail oder Passwort ist falsch.",
          generic: "Anmeldung derzeit nicht moglich. Bitte erneut versuchen."
        }
      },
      sidebar: {
        dashboard: "Dashboard",
        workers: "Mitarbeitende",
        clients: "Kunden",
        familyMembers: "Angehorige",
        services: "Leistungen",
        calendar: "Kalender",
        incidents: "Vorfalle",
        documentation: "Dokumentation",
        reports: "Berichte",
        notifications: "Benachrichtigungen",
        budgets: "Budgets",
        maintenance: "Technischer Support",
        complaints: "Beschwerden",
        settings: "Einstellungen",
        myServices: "Meine Leistungen",
        agenda: "Agenda",
        assignedClients: "Kunden",
        profile: "Profil",
        messages: "Nachrichten",
        followUp: "Nachverfolgung",
        support: "Support",
        support24: "24/7 Betreuung",
        aria: {
          openMenu: "Menü öffnen",
          closeMenu: "Menü schließen",
          closePanel: "Panel schließen"
        }
      },
      topbar: {
        goodMorning: "Guten Morgen",
        goodAfternoon: "Guten Tag",
        goodEvening: "Guten Abend",
        notifications: "Benachrichtigungen"
      },
      footer: {
        vitalyTitle: "Arbeitsschutz und Gesundheitsuberwachung",
        vitalyText:
          "Wir pflegen eine strategische Zusammenarbeit mit VITALY fur Arbeitsschutz und Gesundheitsuberwachung.",
        moreInfo: "Mehr Informationen"
      },
      tables: {
        common: {
          actions: "Aktionen",
          city: "Stadt",
          phone: "Telefon",
          status: "Status",
          active: "Aktiv",
          inactive: "Inaktiv",
          edit: "Bearbeiten",
          delete: "Loschen",
          readOnly: "Nur Lesen",
          description: "Beschreibung",
          name: "Name"
        },
        workers: {
          title: "Mitarbeitende",
          subtitle: "Verwalten Sie alle Sol y Vida Mitarbeitenden.",
          search: "Mitarbeitende suchen...",
          specialty: "Spezialisierung",
          empty: "Keine Mitarbeitenden gefunden."
        },
        clients: {
          title: "Aktuelle Kunden",
          subtitle: "Verwalten Sie alle Sol y Vida Kunden.",
          search: "Kunde suchen...",
          client: "Kunde",
          empty: "Keine Kunden gefunden."
        },
        familyMembers: {
          title: "Angehorige",
          subtitle: "Verwalten Sie die Angehorigen der Kunden.",
          search: "Angehorige suchen...",
          relationship: "Verhaltnis",
          primary: "Hauptkontakt",
          empty: "Keine Angehorigen registriert."
        },
        services: {
          title: "Leistungen",
          subtitle: "Verwalten Sie alle Leistungen.",
          search: "Leistung suchen...",
          service: "Leistung",
          pricePerHour: "Preis/Stunde",
          empty: "Keine Leistungen registriert."
        },
        visits: {
          title: "Besuche",
          subtitle: "Verwalten Sie alle Besuche.",
          search: "Besuch suchen...",
          date: "Datum",
          notes: "Notizen",
          empty: "Keine Ergebnisse gefunden."
        }
      },
      services: {
        publicDesc1:
          "Nahe alltagliche Betreuung, die emotionales Wohlbefinden, Selbststandigkeit und Ruhe zu Hause fordert.",
        publicDesc2:
          "Professionelle Unterstutzung bei Alltagstatigkeiten und Grundpflege fur einen sicheren und komfortablen Tagesablauf.",
        publicDesc3:
          "Unterstutzung bei Arztterminen, Untersuchungen und Krankenhausprozessen mit menschlicher Begleitung und individueller Betreuung.",
        publicDesc4:
          "Ein Service, der die Familie entlastet und eine vertrauensvolle Versorgungskontinuitat sicherstellt.",
        publicDescription:
          "Bei Sol y Vida Cuidados bieten wir nahe, professionelle und personalisierte Betreuung, um die Lebensqualitat alterer Menschen zu verbessern und ihren Familien Sicherheit zu geben.",
        moreInfoTitle: "Benotigen Sie weitere Informationen?",
        moreInfoText:
          "Unser Team beantwortet gerne Ihre Fragen und hilft Ihnen, den passenden Service fur jede Situation zu finden.",
        requestInfo: "Information anfordern"
      },
      roles: {
        admin: "Administratorin",
        worker: "Mitarbeiterin",
        family: "Familienmitglied"
      },
      crud: {
        confirmDeleteWorker: "Mochten Sie diesen Mitarbeitenden wirklich loschen?",
        confirmDeleteClient: "Kunden loschen?",
        confirmDeleteFamilyMember: "Mochten Sie diesen Angehorigen wirklich loschen?",
        confirmDeleteService: "Leistung loschen?",
        confirmDeleteVisit: "Mochten Sie diesen Besuch wirklich loschen?",
        errors: {
          deleteWorker: "Der Mitarbeitende konnte nicht geloscht werden.",
          deleteClient: "Der Kunde konnte nicht geloscht werden.",
          deleteFamilyMember: "Der Angehorige konnte nicht geloscht werden.",
          deleteService: "Die Leistung konnte nicht geloscht werden.",
          deleteVisit: "Der Besuch konnte nicht geloscht werden."
        }
      },
      forms: {
        common: {
          name: "Vorname",
          lastName: "Nachname",
          idNumber: "Ausweisnummer",
          address: "Adresse",
          city: "Stadt",
          postalCode: "Postleitzahl",
          phone: "Telefon",
          email: "E-Mail",
          description: "Beschreibung",
          notes: "Notizen",
          saving: "Wird gespeichert...",
          saveChanges: "Anderungen speichern",
          cancel: "Abbrechen",
          errors: {
            generic: "Ein Fehler ist aufgetreten."
          }
        },
        client: {
          newTitle: "Neuer Kunde",
          editTitle: "Kunde bearbeiten",
          socialSecurity: "Sozialversicherungsnummer",
          save: "Kunde speichern",
          errors: {
            required: "Bitte alle Pflichtfelder des Kunden ausfullen."
          },
          success: {
            created: "Kunde erfolgreich erstellt",
            updated: "Kunde erfolgreich aktualisiert"
          }
        },
        worker: {
          specialty: "Spezialisierung",
          save: "Mitarbeitenden erstellen",
          errors: {
            required: "Bitte Pflichtfelder ausfullen."
          }
        },
        service: {
          name: "Leistungsname",
          pricePerHour: "Preis pro Stunde (EUR)",
          save: "Leistung erstellen",
          errors: {
            required: "Bitte Pflichtfelder ausfullen."
          }
        },
        familyMember: {
          relationship: "Verhaltnis",
          primaryContact: "Hauptkontakt",
          save: "Angehorigen erstellen",
          errors: {
            required: "Bitte Pflichtfelder des Angehorigen ausfullen."
          }
        },
        visit: {
          selectClient: "Kunden auswahlen",
          selectWorker: "Mitarbeitenden auswahlen",
          save: "Besuch erstellen",
          errors: {
            required: "Datum, Kunde und Mitarbeitender mussen vor dem Speichern gewahlt werden.",
            save: "Besuch konnte nicht gespeichert werden."
          }
        }
      },
      pages: {
        workers: {
          title: "Mitarbeitende",
          subtitle: "Verwalten Sie das Personal von Sol y Vida Cuidados.",
          new: "Neue Mitarbeitende",
          edit: "Mitarbeitende bearbeiten"
        },
        clients: {
          title: "Kunden",
          subtitle: "Verwalten Sie alle Kunden.",
          new: "Neuer Kunde",
          edit: "Kunde bearbeiten"
        },
        familyMembers: {
          title: "Angehorige",
          subtitle: "Verwalten Sie die Angehorigen der Kunden.",
          new: "Neuer Angehoriger",
          edit: "Angehorigen bearbeiten"
        },
        services: {
          title: "Leistungen",
          subtitle: "Verwalten Sie den internen Leistungskatalog von Sol y Vida Cuidados.",
          new: "Neue Leistung",
          edit: "Leistung bearbeiten"
        },
        visits: {
          title: "Besuche",
          subtitleAdmin: "Verwalten Sie alle Besuche von Sol y Vida Cuidados.",
          subtitleWorker: "Starten und beenden Sie Einsatze mit GPS-Nachverfolgung und Pflegebericht.",
          new: "Neuer Besuch",
          edit: "Besuch bearbeiten",
          operation: "Servicebetrieb",
          scheduled: "Geplant",
          start: "Starten",
          finish: "Beenden",
          hygiene: "Hygiene",
          medication: "Medikation",
          nutrition: "Ernahrung",
          mobility: "Mobilitat",
          reportRequired: "Pflichtiger Pflegebericht",
          optionalNotes: "Optionale Notizen",
          saveAndFinish: "Speichern und Service beenden",
          startError: "Service konnte nicht gestartet werden. Prufen Sie die Standortberechtigungen.",
          finishSuccess: "Service beendet und Pflegebericht gespeichert.",
          finishError: "Checklist, Bericht und GPS-Berechtigungen zum Beenden ausfullen."
        }
      },
      branding: {
        name: "Sol y Vida",
        suffix: "Cuidados",
        company: "Sol y Vida Cuidados",
        supportPhone: "626 406 477",
        supportPhoneRaw: "+34626406477",
        supportEmail: "solyvida@solyvidacare.com",
        website: "solyvidacare.com"
      },
      profiles: {
        adminName: "Carmen Lopez",
        workerName: "Maria Garcia",
        familyName: "Familie Lopez",
        clientMain: "Carmen Lopez"
      },
      contactPage: {
        followUpSubject: "Familienbetreuung fur {{clientName}}",
        title: "Kontaktieren Sie Sol y Vida Cuidados",
        subtitle: "Wir sind hier, um Ihnen zu helfen.",
        description: "Wenn Sie Informationen uber unsere hausliche Pflege benotigen, helfen wir Ihnen gern weiter und beantworten Ihre Fragen.",
        phoneLabel: "Telefon",
        emailLabel: "E-Mail",
        addressLabel: "Adresse",
        addressStreet: "Paseo del Colorado, 7",
        addressCity: "Torremolinos (Malaga)",
        websiteLabel: "Webseite",
        alerts: {
          required: "Fullen Sie die Pflichtfelder aus, um Ihre Anfrage zu senden.",
          success: "Ihre Anfrage wurde erfolgreich gesendet.",
          error: "Ihre Anfrage konnte momentan nicht gesendet werden."
        },
        form: {
          title: "Senden Sie uns eine Nachricht",
          description: "Fullen Sie das folgende Formular aus und wir melden uns so bald wie moglich.",
          fullName: "Vollstandiger Name",
          fullNamePlaceholder: "Ihr Vor- und Nachname",
          email: "E-Mail",
          emailPlaceholder: "ihremail@domain.com",
          phone: "Telefon",
          phonePlaceholder: "626 406 477",
          subject: "Betreff",
          subjectPlaceholder: "Wie konnen wir Ihnen helfen?",
          message: "Nachricht",
          messagePlaceholder: "Beschreiben Sie kurz Ihr Anliegen fur eine personalisierte Betreuung.",
          sending: "Anfrage wird gesendet...",
          submit: "Informationen anfordern"
        }
      },
      workerPage: {
        topbar: {
          title: "Guten Morgen, Maria",
          subtitle: "Tageszusammenfassung und Nachverfolgung der zugewiesenen Leistungen.",
          searchPlaceholder: "Agenda, Kunde oder Dokument suchen"
        },
        cards: {
          assignedServices: "Zugewiesene Leistungen",
          today: "Heute",
          nextVisit: "Nachster Besuch",
          todaySchedule: "Heutiger Zeitplan",
          hours: "Stunden",
          assignedClients: "Zugewiesene Kunden",
          stable: "Stabil"
        },
        sections: {
          calendarAgenda: "Kalender und Agenda",
          nextVisit: "Nachster Besuch",
          incidents: "Vorfalle",
          documentation: "Dokumentation",
          myProfile: "Mein Berufsprofil"
        },
        labels: {
          client: "Kunde",
          estimatedTime: "Geschaftzte Uhrzeit",
          coordination: "Leistungskoordination"
        },
        actions: {
          history: "Verlauf",
          incidents: "Vorfalle",
          documentation: "Dokumentation",
          profile: "Mein Profil",
          startService: "Leistung starten",
          manageIncidents: "Vorfalle verwalten",
          view: "Ansehen",
          contactCoordination: "Koordination kontaktieren"
        },
        incidents: {
          pending: "Ausstehend",
          pendingText: "Zeitplananderung von der Familie angefordert",
          resolved: "Gelist",
          resolvedText: "Zugang zur Wohnung bestatigt"
        },
        locations: {
          torremolinos: "Torremolinos",
          benalmadena: "Benalmadena",
          fuengirola: "Fuengirola",
          mijas: "Mijas"
        },
        sampleClients: {
          antonioRuiz: "Antonio Ruiz",
          mariaSanchez: "Maria Sanchez",
          elenaMartin: "Elena Martin"
        },
        documents: {
          dailyReport: "Tagesbericht - Juli.pdf",
          prlProtocol: "Arbeitsschutzprotokoll.pdf",
          monthlyReport: "Monatsbericht.docx"
        },
        noResults: "Keine Ergebnisse gefunden."
      },
      familyPage: {
        topbar: {
          welcome: "Willkommen",
          subtitleFamily: "Tagliche Nachverfolgung und Familienkommunikation in Echtzeit.",
          subtitleClient: "Sehen Sie Ihre Leistungen, nachsten Besuche und Dokumentation an einem Ort.",
          searchPlaceholder: "Berichte, Dokumente oder Nachrichten suchen"
        },
        loading: "Familiennachverfolgung wird geladen...",
        noData: "Keine Daten fur diese Nachverfolgung verfugbar.",
        noResults: "Keine Ergebnisse gefunden.",
        cards: {
          myServices: "Meine Leistungen",
          familyStatus: "Status des Angehorigen",
          active: "Aktiv",
          stable: "Stabil",
          nextVisits: "Nachste Besuche",
          thisWeek: "Diese Woche",
          assignedProfessional: "Zugewiesene Fachkraft",
          latestReports: "Neueste Berichte",
          reference: "Referenz",
          updated: "Aktualisiert",
          pendingMessages: "Ausstehende Nachrichten",
          unread: "Ungelesen"
        },
        sections: {
          nextVisit: "Nachster Besuch"
        },
        labels: {
          homeCare: "Hausliche Pflege",
          activeServiceText: "Aktiver Service von Montag bis Freitag mit taglicher Teamnachverfolgung.",
          notes: "Notizen",
          new: "Neu",
          updated: "Aktualisiert",
          familyContact: "Familienkontakt",
          personalAccess: "Aktiver personlicher Zugang zur Serviceverfolgung."
        },
        actions: {
          calendar: "Kalender",
          messages: "Nachrichten",
          documentation: "Dokumentation",
          myProfile: "Mein Profil",
          contact: "Kontakt",
          viewFullFollowup: "Vollstandige Nachverfolgung anzeigen",
          replyOrContact: "Antworten oder kontaktieren",
          requestFullReport: "Vollstandigen Bericht anfordern",
          contactCompany: "Unternehmen kontaktieren",
          reply: "Antworten"
        },
        modals: {
          newMessage: "Neue Nachricht"
        },
        form: {
          subject: "Betreff",
          messagePlaceholder: "Schreiben Sie Ihre Nachricht",
          sending: "Wird gesendet...",
          send: "Nachricht senden"
        },
        errors: {
          load: "Familiennachverfolgung konnte nicht geladen werden.",
          messageRequired: "Betreff und Nachricht ausfullen.",
          messageSend: "Nachricht konnte nicht gesendet werden.",
          documentOpen: "Dokument konnte nicht geoffnet werden."
        }
      },
      reportsPage: {
        topbar: {
          subtitleAdmin: "Globale Aktivitats- und Betriebsentwicklung.",
          subtitleFamily: "Zusammenfassung der Nachverfolgung und des Familienservice-Status."
        },
        searchPlaceholder: "Bericht suchen",
        admin: {
          summaryTitle: "Managementzusammenfassung",
          activeClients: "Aktive Kunden",
          activeWorkers: "Aktive Mitarbeitende",
          registeredVisits: "Erfasste Besuche",
          relatedFamily: "Zugeordnete Angehorige",
          actionsTitle: "Berichtsaktionen"
        },
        family: {
          followupTitle: "Familiennachverfolgung",
          quickAccess: "Schnellzugriffe",
          noReportSelected: "Kein Bericht ausgewahlt",
          selectReport: "Wahlen Sie einen Bericht aus, um den Inhalt zu prufen."
        },
        actions: {
          viewClients: "Kunden anzeigen",
          viewFamily: "Angehorige anzeigen",
          documentSupport: "Dokumentensupport",
          open: "Offnen",
          viewSummary: "Zusammenfassung anzeigen",
          download: "Herunterladen",
          backToFamily: "Zuruck zum Familienbereich",
          viewDocumentation: "Dokumentation anzeigen",
          contactCompany: "Unternehmen kontaktieren"
        },
        errors: {
          download: "Bericht konnte nicht heruntergeladen werden."
        }
      },
      settingsPage: {
        topbar: {
          subtitle: "Betriebseinstellungen, Support und Sitzungskontrolle."
        },
        sections: {
          operational: "Betriebseinstellungen",
          quickActions: "Schnellaktionen"
        },
        labels: {
          activeRole: "Aktive Rolle",
          supportChannel: "Supportkanal",
          operationalEmail: "Betriebs-E-Mail",
          protectedEnvironment: "Geschutzte Umgebung",
          protectedEnvironmentText: "Aktives JWT und private Navigation.",
          sensitiveConfigInfo: "Sensible Konfigurationen bleiben im Backend geschutzt; hier werden nur sichere betriebliche Aktionen angezeigt."
        },
        family: {
          linkedFamily: "Verknupfter Angehoriger",
          caredPerson: "Betreute Person",
          operationalEmail: "Betriebs-E-Mail",
          contactPhone: "Kontakttelefon",
          preferredChannel: "Bevorzugter Kanal",
          channelPhone: "Telefon",
          channelEmail: "E-Mail",
          activePlan: "Aktiver Plan",
          coordinationNotes: "Hinweise fur Koordination",
          keepNotifications: "Hinweise und Nachverfolgung im Familienportal aktiv halten."
        },
        actions: {
          contactSupport: "Support kontaktieren",
          reviewTeam: "Team prufen",
          viewDocumentation: "Dokumentation anzeigen",
          phoneSupport: "Telefonischer Support",
          saveProfile: "Profilanderungen speichern"
        },
        errors: {
          save: "Profil konnte nicht gespeichert werden."
        }
      },
      notificationsPage: {
        subtitle: "Verlauf von Hinweisen und Lesestatus. Fur Push-Kanal vorbereitet.",
        history: "Verlauf",
        searchPlaceholder: "Benachrichtigung suchen",
        pushReady: "Push bereit",
        inApp: "In-app",
        markRead: "Als gelesen markieren",
        noResults: "Keine Ergebnisse gefunden."
      },
      incidentsPage: {
        subtitle: "Betriebliche Nachverfolgung von Vorfallen und relevanten Servicebeobachtungen.",
        registry: "Vorfallsregister",
        registryDescription: "Operatives CRUD fur Vorfalle, verknupft mit realen Besuchen im System.",
        newIncident: "Neuer Vorfall",
        createIncident: "Vorfall erstellen",
        editIncident: "Vorfall bearbeiten",
        searchPlaceholder: "Vorfall suchen",
        noResults: "Keine Ergebnisse gefunden.",
        confirmDelete: "Vorfall loschen?",
        client: "Kunde",
        professional: "Fachkraft",
        actionsTitle: "Betriebliche Aktionen",
        reviewVisits: "Besuche prufen",
        careFollowup: "Pflege-Nachverfolgung",
        traceability: "Vorfalle werden zu bestehenden Besuchen erfasst, um echte betriebliche Nachvollziehbarkeit zu gewahrleisten.",
        linkedVisit: "Verknupfter Besuch",
        titleLabel: "Titel",
        levelLabel: "Stufe",
        date: "Datum",
        level: {
          low: "Niedrig",
          medium: "Mittel",
          high: "Hoch"
        },
        errors: {
          save: "Vorfall konnte nicht gespeichert werden.",
          delete: "Vorfall konnte nicht geloscht werden."
        }
      },
      maintenancePage: {
        title: "Techniklinie",
        subtitle: "Wartung mit Vorher/Nachher-Fotos und obligatorischem Technikbericht.",
        newTicket: "Neues Technik-Ticket",
        createTicket: "Ticket erstellen",
        history: "Technikverlauf",
        searchPlaceholder: "Ticket suchen",
        area: "Bereich",
        beforePhoto: "Vorfallsfoto",
        afterPhoto: "Losungsfoto",
        beforePhotoUrl: "URL Vorher-Foto",
        afterPhotoUrl: "URL Nachher-Foto",
        technicalReport: "Technikbericht",
        closeTicket: "Ticket schliessen",
        report: "Bericht",
        before: "Vorher",
        after: "Nachher",
        noneAttached: "Nicht beigefugt",
        pending: "Ausstehend",
        noResults: "Keine Ergebnisse gefunden.",
        errors: {
          required: "Kunde, Bereich und Beschreibung ausfullen.",
          reportRequired: "Technikbericht ist obligatorisch."
        }
      },
      complaintsPage: {
        subtitle: "Gesprachekanal fur Beschwerden, Vorschlage und Antwortverfolgung.",
        searchPlaceholder: "Gesprach suchen",
        newConversation: "Neues Gesprach",
        adminInbox: "Gesprachsverwaltung",
        history: "Gesprachsverlauf",
        subject: "Betreff",
        description: "Details",
        send: "Senden",
        save: "Antwort speichern",
        responseLabel: "Antwort",
        responsePlaceholder: "Dem Benutzer antworten",
        noResults: "Keine Ergebnisse gefunden.",
        categories: {
          suggestion: "Vorschlag",
          complaint: "Beschwerde",
          quality: "Qualitatsvorfall"
        },
        status: {
          pending: "Ausstehend",
          inProgress: "In Bearbeitung",
          resolved: "Gelost"
        },
        errors: {
          required: "Betreff und Details ausfullen.",
          send: "Gesprach konnte nicht gesendet werden.",
          responseRequired: "Vor dem Speichern eine Antwort erfassen.",
          update: "Gesprach konnte nicht aktualisiert werden."
        }
      },
      budgetsPage: {
        subtitle: "Automatische Berechnung von Stunden, Basis, MwSt., Gesamt und Monatsschatzung.",
        searchPlaceholder: "Budget suchen",
        newBudget: "Neues Budget",
        createBudget: "Budget erstellen",
        history: "Verlauf",
        hours: "Stunden",
        hourlyRate: "Preis/Stunde",
        vat: "MwSt. %",
        ibanLast4: "Letzte 4 IBAN-Ziffern",
        base: "Basis",
        vatLabel: "MwSt.",
        total: "Gesamt",
        monthlyEstimate: "Monatsschatzung",
        directDebit: "Lastschriftbeleg",
        approved: "Genehmigt",
        pending: "Ausstehend",
        approve: "Genehmigen",
        noResults: "Keine Ergebnisse gefunden.",
        errors: {
          required: "Kunde, Stunden und Tarif ausfullen."
        }
      },
      activatePage: {
        title: "Konto aktivieren",
        subtitle: "Geben Sie den erhaltenen Token ein und erstellen Sie Ihr Passwort.",
        token: "Aktivierungstoken",
        newPassword: "Neues Passwort",
        activating: "Aktivierung...",
        submit: "Konto aktivieren",
        success: "Konto erfolgreich aktiviert. Sie konnen sich jetzt anmelden.",
        backToLogin: "Zuruck zum Zugang",
        errors: {
          required: "Token und Passwort mussen angegeben werden.",
          failed: "Konto konnte nicht aktiviert werden. Token prufen und erneut versuchen."
        }
      },
      resetPasswordPage: {
        title: "Passwort wiederherstellen",
        subtitle: "Fordern Sie einen Wiederherstellungslink an und legen Sie dann das neue Passwort fest.",
        email: "E-Mail",
        step1: "1. Wiederherstellung anfordern",
        step2: "2. Passwort andern",
        requestLink: "Link anfordern",
        requesting: "Wird angefordert...",
        recoveryToken: "Wiederherstellungstoken",
        newPassword: "Neues Passwort",
        updatePassword: "Passwort aktualisieren",
        updating: "Wird aktualisiert...",
        backToLogin: "Zuruck zum Zugang",
        messages: {
          recoveryToken: "Wiederherstellung angefordert. Temporarer Token: {{token}}",
          recoveryRequested: "Wiederherstellung angefordert. Prufen Sie Ihre E-Mail.",
          updated: "Passwort erfolgreich aktualisiert."
        },
        errors: {
          emailRequired: "Bitte E-Mail-Adresse angeben.",
          recovery: "Passwortwiederherstellung konnte nicht gestartet werden.",
          tokenPasswordRequired: "Token und neues Passwort mussen ausgefullt werden.",
          update: "Passwort konnte nicht aktualisiert werden."
        }
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