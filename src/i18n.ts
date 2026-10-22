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
        visits: "Visitas",
        incidents: "Incidencias",
        documentation: "Documentación",
        reports: "Informes",
        notifications: "Notificaciones",
        budgets: "Presupuestos",
        maintenance: "Línea técnica",
        complaints: "Quejas",
        reviews: "Reseñas",
        settings: "Configuración",
        myServices: "Mis servicios",
        agenda: "Agenda",
        assignedClients: "Clientes",
        profile: "Perfil",
        messages: "Mensajes",
        followUp: "Seguimiento",
        support: "Soporte",
        support24: "Atención continua 24/7",
        openMenu: "Abrir menú",
        closeMenu: "Cerrar menú",
        closePanel: "Cerrar panel"
      },

      agendaPage: {
        title: "Agenda",
        subtitle: "Calendario mensual con tus servicios programados y el estado de cada día.",
        openVisitLog: "Abrir registro de visitas",
        visibleServices: "Servicios visibles",
        todayServices: "Servicios de hoy",
        upcomingServices: "Próximos servicios",
        previousMonth: "Mes anterior",
        nextMonth: "Mes siguiente",
        month: "Mes",
        today: "Hoy",
        free: "Libre",
        dayServices: "Servicios del día",
        noDayVisits: "No hay servicios programados para este día.",
        upcomingList: "Próximos servicios",
        scheduled: "Programado",
        client: "Cliente",
        time: "Horario",
        status: "Estado",
        address: "Dirección",
        notes: "Observaciones",
        openVisitDetails: "Abrir registro de visita",
        noUpcoming: "No hay servicios próximos.",
        searchPlaceholder: "Buscar cliente, fecha o observación"
      },

      topbar: {
        goodMorning: "Buenos días",
        goodAfternoon: "Buenas tardes",
        goodEvening: "Buenas noches",
        notifications: "Notificaciones"
      },

      footer: {
        partnerName: "VITALY",
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
          homeLocation: "Ubicacion domicilio",
          homeLocationConfigured: "Configurada",
          homeLocationUnavailable: "No disponible",
          empty: "No se encontraron clientes."
        },
        familyMembers: {
          title: "Familiares",
          subtitle: "Gestiona los familiares de los clientes.",
          search: "Buscar familiar...",
          relationship: "Parentesco",
          primary: "Principal",
          portalAccess: "Acceso portal",
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
      loginPublic: {
        welcome: "Bienvenido"
      },

      publicHome: {
        hero: {
          badge: "CUIDADO PROFESIONAL A DOMICILIO",
          lead: "Somos una empresa especializada en la atención y acompañamiento de personas mayores en la Costa del Sol.",
          description1:
            "Ofrecemos servicios adaptados a las necesidades de cada familia, con personal cualificado y seleccionado cuidadosamente para garantizar un trato humano, respetuoso y profesional.",
          description2:
            "Nuestro equipo acompaña con respeto, empatía y una visión integral para que cada persona se sienta acompañada, segura y valorada.",
          imageAlt: "Profesional de Sol y Vida Cuidados"
        },
        presentation: {
          label: "Presentación",
          title1: "Atención cercana,",
          title2: "humana y profesional.",
          description1:
            "En Sol y Vida Cuidados creemos que el cuidado de las personas mayores debe basarse en la cercanía, la confianza y la empatía. Por eso, diseñamos nuestros servicios para adaptarse a cada situación y a cada persona.",
          description2:
            "Nuestros profesionales acompañan con sensibilidad, ofreciendo apoyo práctico, emocional y sanitario cuando se necesita, siempre con respeto por la dignidad y la autonomía."
        },
        reasons: {
          title: "¿Por qué elegirnos?",
          reason1: "Atención personalizada",
          reason2: "Personal cualificado",
          reason3: "Confianza y seguridad"
        },
        services: {
          card1: {
            title: "Acompañamiento y compañía",
            description:
              "Compañía, conversación y apoyo diario para que cada día se viva con mayor tranquilidad y bienestar."
          },
          card2: {
            title: "Ayuda a domicilio",
            description:
              "Asistencia práctica en casa para tareas cotidianas y un entorno más seguro y ordenado."
          },
          card3: {
            title: "Acompañamiento médico y hospitalario",
            description:
              "Apoyo y supervisión en los cuidados de salud, siempre con respeto y profesionalidad."
          },
          card4: {
            title: "Respiro familiar",
            description:
              "Ofrecemos apoyo para que las familias puedan recuperar tiempo y energía con confianza."
          }
        },
        contact: {
          title: "Estamos aquí para ayudarte",
          address: "Paseo del Colorado, 7 · Torremolinos",
          description:
            "Escríbenos y te responderemos con gusto para conocer tus necesidades y explicarte cómo podemos ayudarte."
        },
        reviews: {
          label: "Experiencias",
          title: "Lo que dicen nuestras familias",
          description: "Las reseñas publicadas han sido revisadas por nuestro equipo.",
          loading: "Cargando reseñas...",
          loadError: "No se pudieron cargar las reseñas.",
          empty: "Todavía no hay reseñas publicadas.",
          stars: "estrellas",
          submitTitle: "Comparte tu experiencia",
          rating: "Valoración",
          comment: "Comentario",
          submit: "Enviar reseña",
          submitting: "Enviando...",
          submitted: "Gracias. Tu reseña queda pendiente de moderación.",
          submitError: "No se pudo enviar la reseña. Revisa el comentario e inténtalo de nuevo.",
          adminTitle: "Moderación de reseñas",
          adminSubtitle: "Revisa y aprueba las reseñas antes de publicarlas.",
          adminError: "No se pudieron cargar o moderar las reseñas.",
          adminEmpty: "No hay reseñas para moderar.",
          approve: "Aprobar",
          reject: "Rechazar"
        }
      },

      publicAbout: {
        hero: {
          description1:
            "En Sol y Vida Cuidados creemos que el mejor cuidado nace de la cercanía, el respeto y la confianza.",
          description2:
            "Acompañamos a las personas mayores y a sus familias con un trato humano, profesional y completamente personalizado, adaptándonos a las necesidades de cada situación.",
          more: "Más sobre nosotros"
        },
        history: {
          title: "Nuestra historia",
          description1:
            "Sol y Vida Cuidados nace con el objetivo de ofrecer un servicio de atención domiciliaria cercano, profesional y personalizado para personas mayores y sus familias en la Costa del Sol.",
          description2:
            "Creemos que cada persona merece ser atendida con respeto, empatía y dedicación, adaptándonos siempre a sus necesidades."
        },
        mission: {
          title: "Cuidado profesional con valor humano",
          card1: {
            title: "Atención humana",
            description:
              "Ofrecemos un trato cercano y personalizado, poniendo siempre a la persona en el centro."
          },
          card2: {
            title: "Confianza",
            description:
              "Trabajamos con profesionales cualificados para ofrecer tranquilidad y seguridad a las familias."
          },
          card3: {
            title: "Calidad de vida",
            description:
              "Nuestro objetivo es mejorar el bienestar y la autonomía de las personas mayores en su propio hogar."
          }
        },
        reasons: {
          label: "¿Por qué elegirnos?",
          title: "Compromiso real con cada familia",
          reason1: "Atención personalizada",
          reason2: "Personal cualificado",
          reason3: "Cercanía y confianza",
          reason4: "Compromiso con las familias"
        },
        cta: {
          title: "¿Hablamos?",
          description: "Si deseas conocer más sobre nuestros servicios, estaremos encantados de ayudarte."
        }
      },

      roles: {
        admin: "Administradora",
        worker: "Trabajadora",
        client: "Cliente",
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
          loadList: "No se pudo cargar la lista.",
          loadOptions: "No se pudieron cargar las opciones de clientes o trabajadores.",
          savedRefresh: "Guardado correctamente, pero no se pudo refrescar la lista. No vuelvas a crear el registro; cierra el formulario y recarga.",
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
          assignedWorker: "Trabajador asignado",
          unassigned: "Sin asignar",
          noWorkers: "Sin trabajadores disponibles",
          preferredContact: "Canal preferido",
          preferredPhone: "Telefono",
          preferredEmail: "Email",
          notificationsEnabled: "Recibir notificaciones en el portal",
          createPortalAccess: "Crear acceso al portal del cliente",
          save: "Guardar cliente",
          homeLocation: {
            label: "Ubicacion del domicilio",
            configured: "Ubicacion del domicilio configurada",
            unavailable: "Ubicacion del domicilio no disponible",
            warnings: {
              configured: "Ubicacion del domicilio configurada correctamente.",
              notFound: "Cliente guardado, pero no se pudo localizar automaticamente el domicilio.",
              unavailable: "Cliente guardado, pero la geocodificacion del domicilio no esta disponible en este momento."
            }
          },
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
          clientLinked: "Cliente vinculado",
          selectClient: "Selecciona un cliente",
          save: "Crear familiar",
          portalAccess: {
            title: "ACCESO AL PORTAL FAMILIAR",
            enable: "Crear acceso al portal familiar",
            hint: "Permite que este familiar acceda a la aplicación con su propio email y contraseña.",
            editHint: "Para familiares ya creados, usa las acciones de acceso desde la tabla."
          },
          errors: {
            required: "Completa los campos obligatorios del familiar.",
            emailRequiredForPortal: "Debes indicar email para crear el acceso al portal familiar."
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
          edit: "Editar cliente",
          details: {
            view: "Ver ficha",
            title: "Ficha del cliente",
            subtitle: "Consulta la informacion principal del cliente y su asignacion.",
            loading: "Cargando ficha del cliente...",
            loadError: "No se pudo cargar la ficha del cliente.",
            notFound: "El cliente no existe o no tienes permisos para verlo.",
            backToClients: "Volver a clientes",
            personalData: "Datos personales",
            birthDate: "Fecha de nacimiento",
            contactData: "Contacto",
            assignment: "Asignacion",
            assignedWorkerId: "Trabajador asignado (ID)",
            noAssignedWorker: "Sin trabajador asignado"
          }
        },
        familyMembers: {
          title: "Familiares",
          subtitle: "Gestiona los familiares de los clientes.",
          new: "Nuevo familiar",
          edit: "Editar familiar"
        },
        familyMembersAccess: {
          status: {
            none: "Sin cuenta",
            pending: "Invitacion pendiente",
            active: "Cuenta activa",
            disabled: "Cuenta desactivada",
            unknown: "Estado no disponible"
          },
          actions: {
            create: "Crear acceso",
            resend: "Reenviar invitacion",
            reset: "Restablecer contrasena",
            deactivate: "Desactivar acceso"
          },
          notices: {
            activationToken: "Token de activacion",
            resetToken: "Token de restablecimiento"
          }
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
          startSuccess: "Check-in realizado correctamente.",
          finishSuccess: "Servicio finalizado e informe asistencial guardado.",
          finishError: "Completa el informe asistencial y permisos GPS para finalizar.",
          mobileTitle: "Visitas asignadas",
          client: "Cliente",
          worker: "Trabajadora",
          dateTime: "Fecha y hora",
          status: "Estado",
          startedAt: "Inicio",
          endedAt: "Fin",
          startedByUser: "Usuario inicio",
          endedByUser: "Usuario fin",
          address: "Dirección",
          notes: "Observaciones",
          details: "Detalles del servicio",
          checkInSection: "Check-in",
          checkOutSection: "Check-out",
          checkInLocation: "Ubicación de entrada",
          checkOutLocation: "Ubicación de salida",
          checkInPending: "Check-in pendiente",
          checkInDone: "Check-in realizado",
          checkOutPending: "Check-out pendiente",
          checkOutCompleted: "Check-out realizado",
          statusPending: "Pendiente",
          statusInProgress: "En curso",
          statusCompleted: "Completada",
          statusCancelled: "Cancelada",
          locationRecorded: "Ubicacion registrada",
          locationMissing: "Ubicacion pendiente",
          viewLocation: "Ver ubicacion",
          checkOutNotAvailable: "Check-out no disponible todavía",
          completedStateHelp: "La visita ya está finalizada y no volverá a solicitar ubicación.",
          processing: "Procesando...",
          hideFinishForm: "Ocultar finalización",
          startCheckIn: "Iniciar check-in",
          startVisit: "Iniciar visita",
          finishVisit: "Finalizar visita",
          noAssignedVisits: "No tienes visitas asignadas.",
          errors: {
            unauthenticated: "Debes iniciar sesión para registrar el check-in.",
            forbidden: "No tienes permiso para operar esta visita.",
            notFound: "La visita no existe o ya no está disponible.",
            network: "No se pudo contactar con el servidor.",
            gpsPermissionDenied: "Debes permitir la ubicación para realizar el check-in o check-out.",
            gpsTimeout: "La ubicación tardó demasiado en responder. Inténtalo de nuevo.",
            gpsUnavailable: "No se pudo obtener tu ubicación actual.",
            gpsNotSupported: "Este navegador no permite obtener la ubicación.",
            gpsGeneric: "No se pudo verificar la ubicación actual.",
            invalidCoordinates: "La ubicación enviada no es válida.",
            visitAlreadyStarted: "La visita ya tenía un check-in iniciado.",
            visitAlreadyFinished: "La visita ya fue finalizada.",
            visitNotStarted: "Primero debes iniciar el check-in de la visita.",
            visitAlreadyCompleted: "La visita ya estaba completada.",
            visitCancelled: "La visita está cancelada y no admite check-in ni check-out.",
            clientLocationNotConfigured: "No se puede validar la ubicación del domicilio. Contacta con la administración.",
            visitOutsideAllowedRadius: "Estas demasiado lejos del domicilio del cliente. Distancia actual: {{distance}} m. Radio permitido: {{allowed}} m.",
            finishRequirements: "Completa el informe asistencial obligatorio antes de finalizar."
          }
        }
      },
      branding: {
        name: "Sol y Vida",
        suffix: "Cuidados",
        company: "Sol y Vida Cuidados",
        supportPhone: "626 406 477",
        supportPhoneRaw: "+34626406477",
        supportEmail: "solyvidacare@gmail.com",
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
          noAssignedServices: "No tienes servicios asignados.",
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
      familyPortal: {
        visitStatus: {
          scheduled: "Programada",
          inProgress: "En curso",
          completed: "Completada",
          cancelled: "Cancelada",
          unknown: "Sin estado"
        },
        statusItems: {
          nextVisitTitle: "Proxima visita",
          nextVisitText: "{{date}} con {{professional}}.",
          lastReportTitle: "Ultimo informe",
          generalStatusTitle: "Estado general",
          noNews: "No hay novedades registradas por el momento."
        },
        generated: {
          visitReportTitle: "Informe de visita #{{id}}",
          checklistCompleted: "Checklist de cuidados completado.",
          checklistPending: "Checklist de cuidados pendiente de validacion.",
          noExtraDetails: "Sin detalles adicionales."
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
          load: "No se pudo cargar el perfil.",
          save: "No se pudo guardar el perfil."
        }
      },
      notificationsPage: {
        subtitle: "Historial de avisos y estado de lectura. Preparado para canal push.",
        history: "Historial",
        searchPlaceholder: "Buscar notificación",
        pushReady: "Push listo",
        pushEnabled: "Activadas",
        pushDisabled: "Pendiente de activar",
        pushBlocked: "Permiso denegado",
        pushUnsupported: "Navegador no compatible",
        pushSectionTitle: "Canal push",
        pushNotConfigured: "El canal push no está configurado.",
        inApp: "In-app",
        enablePush: "Activar notificaciones",
        disablePush: "Desactivar notificaciones",
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
        status: "Estado",
        statusPending: "Pendiente",
        statusInReview: "En revisión",
        statusResolved: "Resuelta",
        statusClosed: "Cerrada",
        closureNotes: "Notas de cierre",
        closureNotesPlaceholder: "Notas opcionales para el cierre",
        updateStatus: "Actualizar estado",
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
        loading: "Cargando conversaciones...",
        replyingTo: "Responder: {{subject}}",
        startAnother: "Nueva conversación",
        openConversation: "Abrir conversación",
        adminInbox: "Gestión de conversaciones",
        history: "Historial de conversaciones",
        subject: "Asunto",
        description: "Detalle",
        send: "Enviar",
        updateStatus: "Actualizar estado",
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
          inReview: "En revision",
          answered: "Respondida",
          resolved: "Resuelta",
          closed: "Cerrada"
        },
        threadEmpty: "Sin mensajes en el hilo.",
        messagePlaceholder: "Escribe un mensaje en la conversacion",
        errors: {
          required: "Completa asunto y detalle.",
          messageRequired: "Escribe un mensaje.",
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
        clientsLoadError: "No se pudieron cargar los clientes.",
        budgetsLoadError: "Error al cargar los presupuestos.",
        backendHint: "Revisa la conexión con el backend.",
        noClientsAvailable: "Debe existir al menos un cliente para crear un presupuesto.",
        empty: "No hay presupuestos registrados.",
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
        },
        lines: "Líneas del presupuesto",
        service: "Servicio",
        daysPerMonth: "Días al mes",
        daysShort: "días",
        kilometers: "Kilómetros",
        applicablePrice: "Precio aplicable",
        monthlyLineTotal: "Total mensual de línea",
        monthlySubtotal: "Subtotal mensual",
        observations: "Observaciones",
        addLine: "Añadir línea",
        removeLine: "Eliminar línea",
        manageTariffs: "Administrar catálogo de tarifas",
        basePrice: "Precio base",
        supplement: "Suplemento inicial",
        saveTariff: "Guardar tarifa",
        tariffsError: "No se pudieron cargar o guardar las tarifas.",
        tariffSaved: "Tarifa guardada correctamente.",
        tariffSaveInvalid: "Revisa los datos: el precio base y el suplemento deben estar entre 0 y 100.000, y el nombre del servicio personalizado no puede quedar vacío.",
        tariffSaveUnauthorized: "Tu sesión ha caducado. Vuelve a iniciar sesión para guardar la tarifa.",
        tariffSaveForbidden: "No tienes permiso para modificar tarifas. Solo la administración puede hacerlo.",
        tariffSaveServerError: "Error del servidor al guardar la tarifa. Inténtalo de nuevo más tarde.",
        createError: "No se pudo crear el presupuesto."
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

      loginPublic: {
        welcome: "Welcome"
      },

      publicHome: {
        hero: {
          badge: "PROFESSIONAL HOME CARE",
          lead: "We are a company specialized in the care and support of older people on the Costa del Sol.",
          description1:
            "We offer services tailored to each family's needs, with qualified and carefully selected staff to ensure respectful, human and professional care.",
          description2:
            "Our team accompanies each person with respect, empathy and a comprehensive approach so they feel supported, safe and valued.",
          imageAlt: "Sol y Vida Cuidados professional"
        },
        presentation: {
          label: "Introduction",
          title1: "Close care,",
          title2: "human and professional.",
          description1:
            "At Sol y Vida Cuidados we believe elder care should be based on closeness, trust and empathy. That is why we design our services to adapt to every person and situation.",
          description2:
            "Our professionals provide sensitive support, offering practical, emotional and health assistance whenever needed, always respecting dignity and autonomy."
        },
        reasons: {
          title: "Why choose us?",
          reason1: "Personalized care",
          reason2: "Qualified staff",
          reason3: "Trust and safety"
        },
        services: {
          card1: {
            title: "Companionship",
            description:
              "Daily company, conversation and support so each day is lived with greater calm and wellbeing."
          },
          card2: {
            title: "Home assistance",
            description:
              "Practical support at home for everyday tasks and a safer, more organized environment."
          },
          card3: {
            title: "Medical and hospital accompaniment",
            description:
              "Support and supervision in health care, always with respect and professionalism."
          },
          card4: {
            title: "Family respite",
            description:
              "We provide support so families can recover time and energy with confidence."
          }
        },
        contact: {
          title: "We are here to help you",
          address: "Paseo del Colorado, 7 · Torremolinos",
          description:
            "Write to us and we will gladly respond to learn about your needs and explain how we can help."
        },
        reviews: {
          label: "Experiences",
          title: "What our families say",
          description: "Published reviews are reviewed by our team.",
          loading: "Loading reviews...",
          loadError: "Reviews could not be loaded.",
          empty: "There are no published reviews yet.",
          stars: "stars",
          submitTitle: "Share your experience",
          rating: "Rating",
          comment: "Comment",
          submit: "Submit review",
          submitting: "Submitting...",
          submitted: "Thank you. Your review is pending moderation.",
          submitError: "The review could not be submitted. Check the comment and try again.",
          adminTitle: "Review moderation",
          adminSubtitle: "Review and approve submissions before publishing them.",
          adminError: "Reviews could not be loaded or moderated.",
          adminEmpty: "There are no reviews to moderate.",
          approve: "Approve",
          reject: "Reject"
        }
      },

      publicAbout: {
        hero: {
          description1:
            "At Sol y Vida Cuidados we believe the best care is born from closeness, respect and trust.",
          description2:
            "We accompany older people and their families with a human, professional and fully personalized approach, adapting to each situation.",
          more: "More about us"
        },
        history: {
          title: "Our history",
          description1:
            "Sol y Vida Cuidados was created to provide close, professional and personalized home care services for older people and their families on the Costa del Sol.",
          description2:
            "We believe every person deserves to be cared for with respect, empathy and dedication, always adapting to their needs."
        },
        mission: {
          title: "Professional care with human value",
          card1: {
            title: "Human care",
            description:
              "We provide close and personalized support, always placing the person at the center."
          },
          card2: {
            title: "Trust",
            description:
              "We work with qualified professionals to provide peace of mind and security to families."
          },
          card3: {
            title: "Quality of life",
            description:
              "Our goal is to improve wellbeing and autonomy of older adults in their own home."
          }
        },
        reasons: {
          label: "Why choose us?",
          title: "Real commitment to every family",
          reason1: "Personalized care",
          reason2: "Qualified staff",
          reason3: "Closeness and trust",
          reason4: "Commitment to families"
        },
        cta: {
          title: "Shall we talk?",
          description: "If you want to know more about our services, we will be delighted to help you."
        }
      },

      sidebar: {
        dashboard: "Dashboard",
        workers: "Workers",
        clients: "Clients",
        familyMembers: "Family members",
        services: "Services",
        calendar: "Calendar",
        visits: "Visits",
        incidents: "Incidents",
        documentation: "Documentation",
        reports: "Reports",
        notifications: "Notifications",
        budgets: "Budgets",
        maintenance: "Technical line",
        complaints: "Complaints",
        reviews: "Reviews",
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

      agendaPage: {
        title: "Agenda",
        subtitle: "Monthly calendar with your scheduled services and each day's status.",
        openVisitLog: "Open visits log",
        visibleServices: "Visible services",
        todayServices: "Today's services",
        upcomingServices: "Upcoming services",
        previousMonth: "Previous month",
        nextMonth: "Next month",
        month: "Month",
        today: "Today",
        free: "Free",
        dayServices: "Day services",
        noDayVisits: "No services scheduled for this day.",
        upcomingList: "Upcoming services",
        scheduled: "Scheduled",
        client: "Client",
        time: "Time",
        status: "Status",
        address: "Address",
        notes: "Notes",
        openVisitDetails: "Open visit log",
        noUpcoming: "No upcoming services.",
        searchPlaceholder: "Search client, date or note"
      },

      topbar: {
        goodMorning: "Good morning",
        goodAfternoon: "Good afternoon",
        goodEvening: "Good evening",
        notifications: "Notifications"
      },

      footer: {
        partnerName: "VITALY",
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
          homeLocation: "Home location",
          homeLocationConfigured: "Configured",
          homeLocationUnavailable: "Unavailable",
          empty: "No clients found."
        },
        familyMembers: {
          title: "Family members",
          subtitle: "Manage clients' family members.",
          search: "Search family member...",
          relationship: "Relationship",
          primary: "Primary",
          portalAccess: "Portal access",
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
        client: "Client",
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
          loadList: "Could not load the list.",
          loadOptions: "Could not load client or worker options.",
          savedRefresh: "Saved successfully, but the list could not be refreshed. Do not create the record again; close the form and reload.",
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
          assignedWorker: "Assigned worker",
          unassigned: "Unassigned",
          noWorkers: "No workers available",
          preferredContact: "Preferred contact channel",
          preferredPhone: "Phone",
          preferredEmail: "Email",
          notificationsEnabled: "Receive notifications in the portal",
          createPortalAccess: "Create client portal access",
          save: "Save client",
          homeLocation: {
            label: "Home location",
            configured: "Home location configured",
            unavailable: "Home location unavailable",
            warnings: {
              configured: "Home location configured successfully.",
              notFound: "Client saved, but the home address could not be geocoded automatically.",
              unavailable: "Client saved, but home geocoding is not available right now."
            }
          },
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
          clientLinked: "Linked client",
          selectClient: "Select a client",
          save: "Create family member",
          portalAccess: {
            title: "FAMILY PORTAL ACCESS",
            enable: "Create family portal access",
            hint: "Allows this family member to access the app with their own email and password.",
            editHint: "For existing family members, use the access actions from the table."
          },
          errors: {
            required: "Complete required family member fields.",
            emailRequiredForPortal: "Email is required to create family portal access."
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
          edit: "Edit client",
          details: {
            view: "View profile",
            title: "Client profile",
            subtitle: "Review the main client information and assignment.",
            loading: "Loading client profile...",
            loadError: "Could not load the client profile.",
            notFound: "Client not found or access denied.",
            backToClients: "Back to clients",
            personalData: "Personal data",
            birthDate: "Date of birth",
            contactData: "Contact",
            assignment: "Assignment",
            assignedWorkerId: "Assigned worker (ID)",
            noAssignedWorker: "No assigned worker"
          }
        },
        familyMembers: {
          title: "Family members",
          subtitle: "Manage clients' family members.",
          new: "New family member",
          edit: "Edit family member"
        },
        familyMembersAccess: {
          status: {
            none: "No account",
            pending: "Invitation pending",
            active: "Active account",
            disabled: "Disabled account",
            unknown: "Status unavailable"
          },
          actions: {
            create: "Create access",
            resend: "Resend invitation",
            reset: "Reset access",
            deactivate: "Disable access"
          },
          notices: {
            activationToken: "Activation token",
            resetToken: "Reset token"
          }
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
          startSuccess: "Check-in completed successfully.",
          finishSuccess: "Service finished and care report saved.",
          finishError: "Complete the care report and GPS permissions to finish.",
          mobileTitle: "Assigned visits",
          client: "Client",
          worker: "Care worker",
          dateTime: "Date and time",
          status: "Status",
          startedAt: "Started at",
          endedAt: "Ended at",
          startedByUser: "Started by user",
          endedByUser: "Ended by user",
          address: "Address",
          notes: "Notes",
          details: "Service details",
          checkInSection: "Check-in",
          checkOutSection: "Check-out",
          checkInLocation: "Start location",
          checkOutLocation: "End location",
          checkInPending: "Check-in pending",
          checkInDone: "Check-in completed",
          checkOutPending: "Check-out pending",
          checkOutCompleted: "Check-out completed",
          statusPending: "Pending",
          statusInProgress: "In progress",
          statusCompleted: "Completed",
          statusCancelled: "Cancelled",
          locationRecorded: "Location recorded",
          locationMissing: "Location pending",
          viewLocation: "View location",
          checkOutNotAvailable: "Check-out not available yet",
          completedStateHelp: "This visit is complete and will not request location again.",
          processing: "Processing...",
          hideFinishForm: "Hide finish form",
          startCheckIn: "Start check-in",
          startVisit: "Start visit",
          finishVisit: "Finish visit",
          noAssignedVisits: "You have no assigned visits.",
          errors: {
            unauthenticated: "You must sign in to register the check-in.",
            forbidden: "You do not have permission to operate this visit.",
            notFound: "The visit does not exist or is no longer available.",
            network: "The server could not be reached.",
            gpsPermissionDenied: "You must allow location access to perform check-in or check-out.",
            gpsTimeout: "Location took too long to respond. Please try again.",
            gpsUnavailable: "Your current location could not be obtained.",
            gpsNotSupported: "This browser cannot access location.",
            gpsGeneric: "The current location could not be verified.",
            invalidCoordinates: "The submitted location is not valid.",
            visitAlreadyStarted: "This visit already had a started check-in.",
            visitAlreadyFinished: "This visit has already been finished.",
            visitNotStarted: "You must start check-in before finishing the visit.",
            visitAlreadyCompleted: "This visit was already completed.",
            visitCancelled: "This visit is cancelled and cannot be started or finished.",
            clientLocationNotConfigured: "The client's home location is not configured. Please contact the administrator.",
            visitOutsideAllowedRadius: "You are too far from the client's home. Current distance: {{distance}} m. Allowed radius: {{allowed}} m.",
            finishRequirements: "Complete the mandatory care report before finishing."
          }
        }
      },
      branding: {
        name: "Sol y Vida",
        suffix: "Care",
        company: "Sol y Vida Cuidados",
        supportPhone: "626 406 477",
        supportPhoneRaw: "+34626406477",
        supportEmail: "solyvidacare@gmail.com",
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
          noAssignedServices: "You have no assigned services.",
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
      familyPortal: {
        visitStatus: {
          scheduled: "Scheduled",
          inProgress: "In progress",
          completed: "Completed",
          cancelled: "Cancelled",
          unknown: "No status"
        },
        statusItems: {
          nextVisitTitle: "Next visit",
          nextVisitText: "{{date}} with {{professional}}.",
          lastReportTitle: "Latest report",
          generalStatusTitle: "General status",
          noNews: "No updates have been recorded yet."
        },
        generated: {
          visitReportTitle: "Visit report #{{id}}",
          checklistCompleted: "Care checklist completed.",
          checklistPending: "Care checklist pending validation.",
          noExtraDetails: "No additional details."
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
          load: "Profile could not be loaded.",
          save: "Profile could not be saved."
        }
      },
      notificationsPage: {
        subtitle: "Alerts history and read status. Ready for push channel.",
        history: "History",
        searchPlaceholder: "Search notification",
        pushReady: "Push ready",
        pushEnabled: "Enabled",
        pushDisabled: "Pending activation",
        pushBlocked: "Permission denied",
        pushUnsupported: "Browser not supported",
        pushSectionTitle: "Push channel",
        pushNotConfigured: "Push channel is not configured.",
        inApp: "In-app",
        enablePush: "Enable notifications",
        disablePush: "Disable notifications",
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
        status: "Status",
        statusPending: "Pending",
        statusInReview: "In review",
        statusResolved: "Resolved",
        statusClosed: "Closed",
        closureNotes: "Closure notes",
        closureNotesPlaceholder: "Optional closure notes",
        updateStatus: "Update status",
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
        loading: "Loading conversations...",
        replyingTo: "Reply: {{subject}}",
        startAnother: "New conversation",
        openConversation: "Open conversation",
        adminInbox: "Conversation management",
        history: "Conversation history",
        subject: "Subject",
        description: "Details",
        send: "Send",
        updateStatus: "Update status",
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
          inReview: "In review",
          answered: "Answered",
          resolved: "Resolved",
          closed: "Closed"
        },
        threadEmpty: "No messages in this thread.",
        messagePlaceholder: "Write a message in the conversation",
        errors: {
          required: "Complete subject and details.",
          messageRequired: "Write a message.",
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
        clientsLoadError: "Clients could not be loaded.",
        budgetsLoadError: "Error loading budgets.",
        backendHint: "Check the backend connection.",
        noClientsAvailable: "At least one client must exist to create a budget.",
        empty: "No budgets registered yet.",
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
        },
        lines: "Budget lines",
        service: "Service",
        daysPerMonth: "Days per month",
        daysShort: "days",
        kilometers: "Kilometres",
        applicablePrice: "Applicable price",
        monthlyLineTotal: "Monthly line total",
        monthlySubtotal: "Monthly subtotal",
        observations: "Notes",
        addLine: "Add line",
        removeLine: "Remove line",
        manageTariffs: "Manage tariff catalog",
        basePrice: "Base price",
        supplement: "Initial supplement",
        saveTariff: "Save tariff",
        tariffsError: "Tariffs could not be loaded or saved.",
        tariffSaved: "Tariff saved successfully.",
        tariffSaveInvalid: "Please check the data: base price and supplement must be between 0 and 100,000, and the personalized service name cannot be empty.",
        tariffSaveUnauthorized: "Your session has expired. Please sign in again to save the tariff.",
        tariffSaveForbidden: "You do not have permission to modify tariffs. Only administrators can do this.",
        tariffSaveServerError: "Server error while saving the tariff. Please try again later.",
        createError: "The budget could not be created."
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
      about: {
        mission: "Notre mission"
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
      loginPublic: {
        welcome: "Bienvenue"
      },
      publicHome: {
        hero: {
          badge: "SOINS PROFESSIONNELS A DOMICILE",
          lead: "Nous sommes une entreprise specialisee dans l'accompagnement et les soins des personnes agees sur la Costa del Sol.",
          description1:
            "Nous proposons des services adaptes aux besoins de chaque famille, avec un personnel qualifie et soigneusement selectionne pour garantir un accompagnement humain, respectueux et professionnel.",
          description2:
            "Notre equipe accompagne avec respect, empathie et une vision globale afin que chaque personne se sente accompagnee, en securite et valorisee.",
          imageAlt: "Professionnel de Sol y Vida Cuidados"
        },
        presentation: {
          label: "Presentation",
          title1: "Un accompagnement proche,",
          title2: "humain et professionnel.",
          description1:
            "Chez Sol y Vida Cuidados, nous croyons que l'accompagnement des personnes agees doit reposer sur la proximite, la confiance et l'empathie. C'est pourquoi nous adaptons nos services a chaque situation et a chaque personne.",
          description2:
            "Nos professionnels accompagnent avec sensibilite, en offrant un soutien pratique, emotionnel et sanitaire lorsque c'est necessaire, toujours dans le respect de la dignite et de l'autonomie."
        },
        reasons: {
          title: "Pourquoi nous choisir ?",
          reason1: "Attention personnalisee",
          reason2: "Personnel qualifie",
          reason3: "Confiance et securite"
        },
        services: {
          card1: {
            title: "Accompagnement et compagnie",
            description:
              "Compagnie quotidienne, conversation et soutien pour vivre chaque jour avec plus de serenite et de bien-etre."
          },
          card2: {
            title: "Aide a domicile",
            description:
              "Aide pratique a la maison pour les taches quotidiennes et un environnement plus sur et mieux organise."
          },
          card3: {
            title: "Accompagnement medical et hospitalier",
            description:
              "Soutien et supervision des soins de sante, toujours avec respect et professionnalisme."
          },
          card4: {
            title: "Repit familial",
            description:
              "Nous apportons un soutien pour que les familles puissent retrouver du temps et de l'energie en toute confiance."
          }
        },
        contact: {
          title: "Nous sommes la pour vous aider",
          address: "Paseo del Colorado, 7 · Torremolinos",
          description:
            "Ecrivez-nous et nous vous repondrons avec plaisir pour comprendre vos besoins et vous expliquer comment nous pouvons vous aider."
        },
        reviews: {
          label: "Temoignages",
          title: "Ce que disent nos familles",
          description: "Les avis publies sont verifies par notre equipe.",
          loading: "Chargement des avis...",
          loadError: "Les avis n'ont pas pu etre charges.",
          empty: "Aucun avis publie pour le moment.",
          stars: "etoiles",
          submitTitle: "Partagez votre experience",
          rating: "Evaluation",
          comment: "Commentaire",
          submit: "Envoyer l'avis",
          submitting: "Envoi...",
          submitted: "Merci. Votre avis est en attente de moderation.",
          submitError: "L'avis n'a pas pu etre envoye. Verifiez le commentaire.",
          adminTitle: "Moderation des avis",
          adminSubtitle: "Verifiez et approuvez les avis avant publication.",
          adminError: "Les avis n'ont pas pu etre charges ou moderes.",
          adminEmpty: "Aucun avis a moderer.",
          approve: "Approuver",
          reject: "Refuser"
        }
      },
      publicAbout: {
        hero: {
          description1:
            "Chez Sol y Vida Cuidados, nous croyons que le meilleur accompagnement nait de la proximite, du respect et de la confiance.",
          description2:
            "Nous accompagnons les personnes agees et leurs familles avec une approche humaine, professionnelle et entierement personnalisee, adaptee a chaque situation.",
          more: "En savoir plus sur nous"
        },
        history: {
          title: "Notre histoire",
          description1:
            "Sol y Vida Cuidados est ne avec l'objectif d'offrir un service d'accompagnement a domicile proche, professionnel et personnalise pour les personnes agees et leurs familles sur la Costa del Sol.",
          description2:
            "Nous croyons que chaque personne merite d'etre accompagnee avec respect, empathie et dedication, en s'adaptant toujours a ses besoins."
        },
        mission: {
          title: "Un accompagnement professionnel a valeur humaine",
          card1: {
            title: "Attention humaine",
            description:
              "Nous offrons un accompagnement proche et personnalise, en plaçant toujours la personne au centre."
          },
          card2: {
            title: "Confiance",
            description:
              "Nous travaillons avec des professionnels qualifies pour offrir serenite et securite aux familles."
          },
          card3: {
            title: "Qualite de vie",
            description:
              "Notre objectif est d'ameliorer le bien-etre et l'autonomie des personnes agees a leur domicile."
          }
        },
        reasons: {
          label: "Pourquoi nous choisir ?",
          title: "Un engagement reel pour chaque famille",
          reason1: "Attention personnalisee",
          reason2: "Personnel qualifie",
          reason3: "Proximite et confiance",
          reason4: "Engagement envers les familles"
        },
        cta: {
          title: "On en parle ?",
          description: "Si vous souhaitez en savoir plus sur nos services, nous serons ravis de vous aider."
        }
      },
      sidebar: {
        dashboard: "Tableau de bord",
        workers: "Intervenants",
        clients: "Clients",
        familyMembers: "Proches",
        services: "Services",
        calendar: "Calendrier",
        visits: "Visites",
        incidents: "Incidents",
        documentation: "Documentation",
        reports: "Rapports",
        notifications: "Notifications",
        budgets: "Budgets",
        maintenance: "Assistance technique",
        complaints: "Reclamations",
        reviews: "Avis",
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

      agendaPage: {
        title: "Agenda",
        subtitle: "Calendrier mensuel avec vos services programmés et l'état de chaque jour.",
        openVisitLog: "Ouvrir le registre des visites",
        visibleServices: "Services visibles",
        todayServices: "Services d'aujourd'hui",
        upcomingServices: "Services à venir",
        previousMonth: "Mois précédent",
        nextMonth: "Mois suivant",
        month: "Mois",
        today: "Aujourd'hui",
        free: "Libre",
        dayServices: "Services du jour",
        noDayVisits: "Aucun service programmé pour ce jour.",
        upcomingList: "Services à venir",
        scheduled: "Programmé",
        client: "Client",
        time: "Horaire",
        status: "Statut",
        address: "Adresse",
        notes: "Observations",
        openVisitDetails: "Ouvrir le registre de visite",
        noUpcoming: "Aucun service à venir.",
        searchPlaceholder: "Rechercher un client, une date ou une note"
      },
      topbar: {
        goodMorning: "Bonjour",
        goodAfternoon: "Bon apres-midi",
        goodEvening: "Bonsoir",
        notifications: "Notifications"
      },
      footer: {
        partnerName: "VITALY",
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
          homeLocation: "Emplacement du domicile",
          homeLocationConfigured: "Configure",
          homeLocationUnavailable: "Indisponible",
          empty: "Aucun client trouve."
        },
        familyMembers: {
          title: "Proches",
          subtitle: "Gerez les proches des clients.",
          search: "Rechercher un proche...",
          relationship: "Lien",
          primary: "Principal",
          portalAccess: "Acces portail",
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
        title: "Nos services",
        subtitle: "Un accompagnement personnalise pour chaque besoin.",
        card1: "Accompagnement et compagnie",
        card2: "Aide a domicile",
        card3: "Accompagnement medical",
        card4: "Repit familial",
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
        client: "Client",
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
          loadList: "Impossible de charger la liste.",
          loadOptions: "Impossible de charger les options des clients ou des intervenants.",
          savedRefresh: "Enregistrement effectue, mais la liste n'a pas pu etre actualisee. Ne creez pas un doublon ; fermez le formulaire et rechargez.",
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
          assignedWorker: "Intervenant assigne",
          unassigned: "Aucun intervenant assigne",
          noWorkers: "Aucun intervenant disponible",
          preferredContact: "Canal de contact prefere",
          preferredPhone: "Telephone",
          preferredEmail: "E-mail",
          notificationsEnabled: "Recevoir des notifications dans le portail",
          createPortalAccess: "Creer un acces au portail du client",
          save: "Enregistrer le client",
          homeLocation: {
            label: "Emplacement du domicile",
            configured: "Emplacement du domicile configure",
            unavailable: "Emplacement du domicile indisponible",
            warnings: {
              configured: "L'emplacement du domicile a ete configure avec succes.",
              notFound: "Client enregistre, mais l'adresse du domicile n'a pas pu etre localisee automatiquement.",
              unavailable: "Client enregistre, mais la geocodification du domicile n'est pas disponible pour le moment."
            }
          },
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
          clientLinked: "Client lie",
          selectClient: "Selectionnez un client",
          save: "Creer le proche",
          portalAccess: {
            title: "ACCES AU PORTAIL FAMILIAL",
            enable: "Creer un acces au portail familial",
            hint: "Permet a ce proche d'acceder a l'application avec son propre e-mail et mot de passe.",
            editHint: "Pour les proches existants, utilisez les actions d'acces depuis le tableau."
          },
          errors: {
            required: "Completez les champs obligatoires du proche.",
            emailRequiredForPortal: "L'e-mail est obligatoire pour creer l'acces portail."
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
          edit: "Modifier le client",
          details: {
            view: "Voir la fiche",
            title: "Fiche client",
            subtitle: "Consultez les informations principales du client et son affectation.",
            loading: "Chargement de la fiche client...",
            loadError: "Impossible de charger la fiche client.",
            notFound: "Client introuvable ou acces refuse.",
            backToClients: "Retour aux clients",
            personalData: "Donnees personnelles",
            birthDate: "Date de naissance",
            contactData: "Contact",
            assignment: "Affectation",
            assignedWorkerId: "Intervenant assigne (ID)",
            noAssignedWorker: "Aucun intervenant assigne"
          }
        },
        familyMembers: {
          title: "Proches",
          subtitle: "Gerez les proches des clients.",
          new: "Nouveau proche",
          edit: "Modifier le proche"
        },
        familyMembersAccess: {
          status: {
            none: "Sans compte",
            pending: "Invitation en attente",
            active: "Compte actif",
            disabled: "Compte desactive",
            unknown: "Statut indisponible"
          },
          actions: {
            create: "Creer l'acces",
            resend: "Renvoyer l'invitation",
            reset: "Reinitialiser l'acces",
            deactivate: "Desactiver l'acces"
          },
          notices: {
            activationToken: "Token d'activation",
            resetToken: "Token de reinitialisation"
          }
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
          startSuccess: "Check-in effectue avec succes.",
          finishSuccess: "Service termine et rapport de soins enregistre.",
          finishError: "Completez le rapport de soins et les permissions GPS pour terminer.",
          mobileTitle: "Visites attribuees",
          client: "Client",
          worker: "Intervenante",
          dateTime: "Date et heure",
          status: "Statut",
          startedAt: "Debut",
          endedAt: "Fin",
          startedByUser: "Utilisateur debut",
          endedByUser: "Utilisateur fin",
          address: "Adresse",
          notes: "Observations",
          details: "Details du service",
          checkInSection: "Check-in",
          checkOutSection: "Check-out",
          checkInLocation: "Position de debut",
          checkOutLocation: "Position de fin",
          checkInPending: "Check-in en attente",
          checkInDone: "Check-in effectue",
          checkOutPending: "Check-out en attente",
          checkOutCompleted: "Check-out effectue",
          statusPending: "En attente",
          statusInProgress: "En cours",
          statusCompleted: "Terminee",
          statusCancelled: "Annulee",
          locationRecorded: "Position enregistree",
          locationMissing: "Position en attente",
          viewLocation: "Voir l'emplacement",
          checkOutNotAvailable: "Check-out pas encore disponible",
          completedStateHelp: "La visite est terminee et ne demandera plus la localisation.",
          processing: "Traitement...",
          hideFinishForm: "Masquer la finalisation",
          startCheckIn: "Demarrer le check-in",
          startVisit: "Demarrer la visite",
          finishVisit: "Terminer la visite",
          noAssignedVisits: "Vous n'avez aucune visite attribuee.",
          errors: {
            unauthenticated: "Vous devez vous connecter pour enregistrer le check-in.",
            forbidden: "Vous n'avez pas le droit d'agir sur cette visite.",
            notFound: "La visite n'existe pas ou n'est plus disponible.",
            network: "Le serveur n'a pas pu etre contacte.",
            gpsPermissionDenied: "Vous devez autoriser la localisation pour faire le check-in ou le check-out.",
            gpsTimeout: "La localisation a mis trop de temps a repondre. Reessayez.",
            gpsUnavailable: "Impossible d'obtenir votre position actuelle.",
            gpsNotSupported: "Ce navigateur ne permet pas d'obtenir la localisation.",
            gpsGeneric: "Impossible de verifier la position actuelle.",
            invalidCoordinates: "La position envoyee n'est pas valide.",
            visitAlreadyStarted: "La visite avait deja un check-in demarre.",
            visitAlreadyFinished: "La visite a deja ete terminee.",
            visitNotStarted: "Vous devez d'abord lancer le check-in de la visite.",
            visitAlreadyCompleted: "La visite etait deja terminee.",
            visitCancelled: "La visite est annulee et n'accepte ni check-in ni check-out.",
            clientLocationNotConfigured: "L'emplacement du domicile du client n'est pas configure. Contactez l'administration.",
            visitOutsideAllowedRadius: "Vous etes trop loin du domicile du client. Distance actuelle : {{distance}} m. Rayon autorise : {{allowed}} m.",
            finishRequirements: "Completez le rapport de soins obligatoire avant de terminer."
          }
        }
      },
      branding: {
        name: "Sol y Vida",
        suffix: "Cuidados",
        company: "Sol y Vida Cuidados",
        supportPhone: "626 406 477",
        supportPhoneRaw: "+34626406477",
        supportEmail: "solyvidacare@gmail.com",
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
          noAssignedServices: "Vous n'avez aucun service assigne.",
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
      familyPortal: {
        visitStatus: {
          scheduled: "Planifiee",
          inProgress: "En cours",
          completed: "Terminee",
          cancelled: "Annulee",
          unknown: "Sans statut"
        },
        statusItems: {
          nextVisitTitle: "Prochaine visite",
          nextVisitText: "{{date}} avec {{professional}}.",
          lastReportTitle: "Dernier rapport",
          generalStatusTitle: "Etat general",
          noNews: "Aucune nouveaute enregistree pour le moment."
        },
        generated: {
          visitReportTitle: "Rapport de visite #{{id}}",
          checklistCompleted: "Checklist de soins completee.",
          checklistPending: "Checklist de soins en attente de validation.",
          noExtraDetails: "Aucun detail supplementaire."
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
          load: "Le profil n'a pas pu etre charge.",
          save: "Le profil n'a pas pu etre enregistre."
        }
      },
      notificationsPage: {
        subtitle: "Historique des alertes et etat de lecture. Pret pour le canal push.",
        history: "Historique",
        searchPlaceholder: "Rechercher une notification",
        pushReady: "Push pret",
        pushEnabled: "Activees",
        pushDisabled: "En attente d'activation",
        pushBlocked: "Permission refusee",
        pushUnsupported: "Navigateur non compatible",
        pushSectionTitle: "Canal push",
        pushNotConfigured: "Le canal push n'est pas configure.",
        inApp: "In-app",
        enablePush: "Activer les notifications",
        disablePush: "Desactiver les notifications",
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
        status: "Statut",
        statusPending: "En attente",
        statusInReview: "En revision",
        statusResolved: "Resolue",
        statusClosed: "Fermee",
        closureNotes: "Notes de cloture",
        closureNotesPlaceholder: "Notes de cloture facultatives",
        updateStatus: "Mettre a jour le statut",
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
        loading: "Chargement des conversations...",
        replyingTo: "Repondre : {{subject}}",
        startAnother: "Nouvelle conversation",
        openConversation: "Ouvrir la conversation",
        adminInbox: "Gestion des conversations",
        history: "Historique des conversations",
        subject: "Sujet",
        description: "Detail",
        send: "Envoyer",
        updateStatus: "Mettre a jour le statut",
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
          inReview: "En revision",
          answered: "Repondue",
          resolved: "Resolue",
          closed: "Fermee"
        },
        threadEmpty: "Aucun message dans ce fil.",
        messagePlaceholder: "Ecrivez un message dans la conversation",
        errors: {
          required: "Completez le sujet et le detail.",
          messageRequired: "Ecrivez un message.",
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
        clientsLoadError: "Les clients n'ont pas pu etre charges.",
        budgetsLoadError: "Erreur lors du chargement des budgets.",
        backendHint: "Verifiez la connexion avec le backend.",
        noClientsAvailable: "Au moins un client doit exister pour creer un budget.",
        empty: "Aucun budget enregistre.",
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
        },
        lines: "Lignes du devis",
        service: "Service",
        daysPerMonth: "Jours par mois",
        daysShort: "jours",
        kilometers: "Kilomètres",
        applicablePrice: "Prix applicable",
        monthlyLineTotal: "Total mensuel de la ligne",
        monthlySubtotal: "Sous-total mensuel",
        observations: "Observations",
        addLine: "Ajouter une ligne",
        removeLine: "Supprimer la ligne",
        manageTariffs: "Gérer le catalogue des tarifs",
        basePrice: "Prix de base",
        supplement: "Supplément initial",
        saveTariff: "Enregistrer le tarif",
        tariffsError: "Impossible de charger ou d'enregistrer les tarifs.",
        tariffSaved: "Tarif enregistré avec succès.",
        tariffSaveInvalid: "Vérifiez les données : le prix de base et le supplément doivent être compris entre 0 et 100 000, et le nom du service personnalisé ne peut pas être vide.",
        tariffSaveUnauthorized: "Votre session a expiré. Reconnectez-vous pour enregistrer le tarif.",
        tariffSaveForbidden: "Vous n'avez pas l'autorisation de modifier les tarifs. Seule l'administration peut le faire.",
        tariffSaveServerError: "Erreur du serveur lors de l'enregistrement du tarif. Réessayez plus tard.",
        createError: "Impossible de créer le devis."
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
      about: {
        mission: "Unsere Mission"
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
      loginPublic: {
        welcome: "Willkommen"
      },
      publicHome: {
        hero: {
          badge: "PROFESSIONELLE HÄUSLICHE PFLEGE",
          lead: "Wir sind ein Unternehmen, das auf die Betreuung und Begleitung alterer Menschen an der Costa del Sol spezialisiert ist.",
          description1:
            "Wir bieten auf die Bedurfnisse jeder Familie zugeschnittene Dienstleistungen mit qualifiziertem und sorgfaltig ausgewahltem Personal fur eine menschliche, respektvolle und professionelle Betreuung.",
          description2:
            "Unser Team begleitet mit Respekt, Empathie und einem ganzheitlichen Ansatz, damit sich jede Person begleitet, sicher und wertgeschatzt fuhlt.",
          imageAlt: "Fachkraft von Sol y Vida Cuidados"
        },
        presentation: {
          label: "Vorstellung",
          title1: "Nahe Betreuung,",
          title2: "menschlich und professionell.",
          description1:
            "Bei Sol y Vida Cuidados glauben wir, dass die Betreuung alterer Menschen auf Nahe, Vertrauen und Empathie beruhen sollte. Deshalb gestalten wir unsere Leistungen individuell fur jede Situation und Person.",
          description2:
            "Unsere Fachkrafte begleiten sensibel und bieten praktische, emotionale und gesundheitliche Unterstutzung, immer mit Respekt fur Wurde und Autonomie."
        },
        reasons: {
          title: "Warum uns wahlen?",
          reason1: "Personliche Betreuung",
          reason2: "Qualifiziertes Personal",
          reason3: "Vertrauen und Sicherheit"
        },
        services: {
          card1: {
            title: "Begleitung und Gesellschaft",
            description:
              "Tagliche Gesellschaft, Gesprach und Unterstutzung, damit jeder Tag mit mehr Ruhe und Wohlbefinden erlebt wird."
          },
          card2: {
            title: "Hilfe zu Hause",
            description:
              "Praktische Hilfe im Haushalt fur alltagliche Aufgaben und eine sichere, geordnete Umgebung."
          },
          card3: {
            title: "Medizinische und klinische Begleitung",
            description:
              "Unterstutzung und Begleitung bei gesundheitlicher Versorgung, stets mit Respekt und Professionalitat."
          },
          card4: {
            title: "Entlastung fur Familien",
            description:
              "Wir bieten Unterstutzung, damit Familien mit Vertrauen Zeit und Energie zuruckgewinnen konnen."
          }
        },
        contact: {
          title: "Wir sind hier, um Ihnen zu helfen",
          address: "Paseo del Colorado, 7 · Torremolinos",
          description:
            "Schreiben Sie uns, und wir antworten Ihnen gern, um Ihre Bedurfnisse zu verstehen und zu erklaren, wie wir helfen konnen."
        },
        reviews: {
          label: "Erfahrungen",
          title: "Was unsere Familien sagen",
          description: "Veroffentlichte Bewertungen werden von unserem Team gepruft.",
          loading: "Bewertungen werden geladen...",
          loadError: "Bewertungen konnten nicht geladen werden.",
          empty: "Noch keine Bewertungen veroffentlicht.",
          stars: "Sterne",
          submitTitle: "Teilen Sie Ihre Erfahrung",
          rating: "Bewertung",
          comment: "Kommentar",
          submit: "Bewertung senden",
          submitting: "Wird gesendet...",
          submitted: "Danke. Ihre Bewertung wartet auf Moderation.",
          submitError: "Die Bewertung konnte nicht gesendet werden. Bitte prufen Sie den Kommentar.",
          adminTitle: "Bewertungsmoderation",
          adminSubtitle: "Bewertungen vor der Veroffentlichung prufen und freigeben.",
          adminError: "Bewertungen konnten nicht geladen oder moderiert werden.",
          adminEmpty: "Keine Bewertungen zur Moderation.",
          approve: "Freigeben",
          reject: "Ablehnen"
        }
      },
      publicAbout: {
        hero: {
          description1:
            "Bei Sol y Vida Cuidados glauben wir, dass die beste Betreuung aus Nahe, Respekt und Vertrauen entsteht.",
          description2:
            "Wir begleiten altere Menschen und ihre Familien mit einem menschlichen, professionellen und vollstandig personalisierten Ansatz, angepasst an jede Situation.",
          more: "Mehr uber uns"
        },
        history: {
          title: "Unsere Geschichte",
          description1:
            "Sol y Vida Cuidados wurde mit dem Ziel gegrundet, einen nahen, professionellen und personalisierten hauslichen Betreuungsservice fur altere Menschen und ihre Familien an der Costa del Sol anzubieten.",
          description2:
            "Wir glauben, dass jeder Mensch Betreuung mit Respekt, Empathie und Hingabe verdient, immer angepasst an seine Bedurfnisse."
        },
        mission: {
          title: "Professionelle Betreuung mit menschlichem Wert",
          card1: {
            title: "Menschliche Betreuung",
            description:
              "Wir bieten eine nahe und personalisierte Begleitung und stellen die Person stets in den Mittelpunkt."
          },
          card2: {
            title: "Vertrauen",
            description:
              "Wir arbeiten mit qualifizierten Fachkraften, um Familien Sicherheit und Ruhe zu geben."
          },
          card3: {
            title: "Lebensqualitat",
            description:
              "Unser Ziel ist es, das Wohlbefinden und die Autonomie alterer Menschen im eigenen Zuhause zu verbessern."
          }
        },
        reasons: {
          label: "Warum uns wahlen?",
          title: "Echtes Engagement fur jede Familie",
          reason1: "Personliche Betreuung",
          reason2: "Qualifiziertes Personal",
          reason3: "Nahe und Vertrauen",
          reason4: "Engagement fur Familien"
        },
        cta: {
          title: "Sprechen wir?",
          description: "Wenn Sie mehr uber unsere Dienstleistungen erfahren mochten, helfen wir Ihnen gerne weiter."
        }
      },
      sidebar: {
        dashboard: "Dashboard",
        workers: "Mitarbeitende",
        clients: "Kunden",
        familyMembers: "Angehorige",
        services: "Leistungen",
        calendar: "Kalender",
        visits: "Besuche",
        incidents: "Vorfalle",
        documentation: "Dokumentation",
        reports: "Berichte",
        notifications: "Benachrichtigungen",
        budgets: "Budgets",
        maintenance: "Technischer Support",
        complaints: "Beschwerden",
        reviews: "Bewertungen",
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

      agendaPage: {
        title: "Agenda",
        subtitle: "Monatskalender mit deinen geplanten Diensten und dem Status jedes Tages.",
        openVisitLog: "Besuchsprotokoll öffnen",
        visibleServices: "Sichtbare Dienste",
        todayServices: "Heutige Dienste",
        upcomingServices: "Anstehende Dienste",
        previousMonth: "Vorheriger Monat",
        nextMonth: "Nächster Monat",
        month: "Monat",
        today: "Heute",
        free: "Frei",
        dayServices: "Tagesdienste",
        noDayVisits: "Für diesen Tag sind keine Dienste geplant.",
        upcomingList: "Anstehende Dienste",
        scheduled: "Geplant",
        client: "Kunde",
        time: "Uhrzeit",
        status: "Status",
        address: "Adresse",
        notes: "Bemerkungen",
        openVisitDetails: "Besuchsprotokoll öffnen",
        noUpcoming: "Keine anstehenden Dienste.",
        searchPlaceholder: "Kunde, Datum oder Notiz suchen"
      },
      topbar: {
        goodMorning: "Guten Morgen",
        goodAfternoon: "Guten Tag",
        goodEvening: "Guten Abend",
        notifications: "Benachrichtigungen"
      },
      footer: {
        partnerName: "VITALY",
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
          homeLocation: "Standort des Zuhauses",
          homeLocationConfigured: "Konfiguriert",
          homeLocationUnavailable: "Nicht verfugbar",
          empty: "Keine Kunden gefunden."
        },
        familyMembers: {
          title: "Angehorige",
          subtitle: "Verwalten Sie die Angehorigen der Kunden.",
          search: "Angehorige suchen...",
          relationship: "Verhaltnis",
          primary: "Hauptkontakt",
          portalAccess: "Portalzugang",
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
        title: "Unsere Leistungen",
        subtitle: "Personalisierte Betreuung fur jeden Bedarf.",
        card1: "Begleitung und Gesellschaft",
        card2: "Hilfe zu Hause",
        card3: "Medizinische Begleitung",
        card4: "Familienentlastung",
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
        client: "Kunde",
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
          loadList: "Die Liste konnte nicht geladen werden.",
          loadOptions: "Kunden- oder Mitarbeiteroptionen konnten nicht geladen werden.",
          savedRefresh: "Gespeichert, aber die Liste konnte nicht aktualisiert werden. Nicht erneut anlegen; Formular schliessen und neu laden.",
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
          assignedWorker: "Zugewiesener Mitarbeitender",
          unassigned: "Nicht zugewiesen",
          noWorkers: "Keine Mitarbeitenden verfugbar",
          preferredContact: "Bevorzugter Kontaktkanal",
          preferredPhone: "Telefon",
          preferredEmail: "E-Mail",
          notificationsEnabled: "Benachrichtigungen im Portal erhalten",
          createPortalAccess: "Portalzugang fur den Kunden erstellen",
          save: "Kunde speichern",
          homeLocation: {
            label: "Standort des Zuhauses",
            configured: "Standort des Zuhauses konfiguriert",
            unavailable: "Standort des Zuhauses nicht verfugbar",
            warnings: {
              configured: "Der Standort des Zuhauses wurde erfolgreich konfiguriert.",
              notFound: "Kunde gespeichert, aber die Wohnadresse konnte nicht automatisch lokalisiert werden.",
              unavailable: "Kunde gespeichert, aber die Geokodierung des Zuhauses ist derzeit nicht verfugbar."
            }
          },
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
          clientLinked: "Verknupfter Kunde",
          selectClient: "Kunden auswahlen",
          save: "Angehorigen erstellen",
          portalAccess: {
            title: "FAMILIENPORTAL-ZUGANG",
            enable: "Zugang zum Familienportal erstellen",
            hint: "Ermoglicht diesem Angehorigen den Zugriff auf die App mit eigener E-Mail und eigenem Passwort.",
            editHint: "Fur bestehende Angehorige die Zugriffsaktionen in der Tabelle verwenden."
          },
          errors: {
            required: "Bitte Pflichtfelder des Angehorigen ausfullen.",
            emailRequiredForPortal: "Fur den Portalzugang ist eine E-Mail erforderlich."
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
          edit: "Kunde bearbeiten",
          details: {
            view: "Profil anzeigen",
            title: "Kundenprofil",
            subtitle: "Prufen Sie die wichtigsten Kundendaten und die Zuweisung.",
            loading: "Kundenprofil wird geladen...",
            loadError: "Kundenprofil konnte nicht geladen werden.",
            notFound: "Kunde nicht gefunden oder kein Zugriff.",
            backToClients: "Zuruck zu Kunden",
            personalData: "Personliche Daten",
            birthDate: "Geburtsdatum",
            contactData: "Kontakt",
            assignment: "Zuweisung",
            assignedWorkerId: "Zugewiesene Fachkraft (ID)",
            noAssignedWorker: "Keine Fachkraft zugewiesen"
          }
        },
        familyMembers: {
          title: "Angehorige",
          subtitle: "Verwalten Sie die Angehorigen der Kunden.",
          new: "Neuer Angehoriger",
          edit: "Angehorigen bearbeiten"
        },
        familyMembersAccess: {
          status: {
            none: "Kein Konto",
            pending: "Einladung ausstehend",
            active: "Konto aktiv",
            disabled: "Konto deaktiviert",
            unknown: "Status nicht verfugbar"
          },
          actions: {
            create: "Zugang erstellen",
            resend: "Einladung erneut senden",
            reset: "Passwort zurucksetzen",
            deactivate: "Zugang deaktivieren"
          },
          notices: {
            activationToken: "Aktivierungstoken",
            resetToken: "Zurucksetzen-Token"
          }
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
          startSuccess: "Check-in erfolgreich durchgefuhrt.",
          finishSuccess: "Service beendet und Pflegebericht gespeichert.",
          finishError: "Pflegebericht und GPS-Berechtigungen zum Beenden ausfullen.",
          mobileTitle: "Zugewiesene Besuche",
          client: "Kunde",
          worker: "Betreuerin",
          dateTime: "Datum und Uhrzeit",
          status: "Status",
          startedAt: "Beginn",
          endedAt: "Ende",
          startedByUser: "Startbenutzer",
          endedByUser: "Endbenutzer",
          address: "Adresse",
          notes: "Bemerkungen",
          details: "Servicedetails",
          checkInSection: "Check-in",
          checkOutSection: "Check-out",
          checkInLocation: "Startposition",
          checkOutLocation: "Endposition",
          checkInPending: "Check-in ausstehend",
          checkInDone: "Check-in erfolgt",
          checkOutPending: "Check-out ausstehend",
          checkOutCompleted: "Check-out erfolgt",
          statusPending: "Ausstehend",
          statusInProgress: "In Bearbeitung",
          statusCompleted: "Abgeschlossen",
          statusCancelled: "Storniert",
          locationRecorded: "Standort erfasst",
          locationMissing: "Standort ausstehend",
          viewLocation: "Standort anzeigen",
          checkOutNotAvailable: "Check-out noch nicht verfugbar",
          completedStateHelp: "Der Besuch ist abgeschlossen und fordert keine Standortdaten mehr an.",
          processing: "Wird verarbeitet...",
          hideFinishForm: "Abschluss ausblenden",
          startCheckIn: "Check-in starten",
          startVisit: "Besuch starten",
          finishVisit: "Besuch beenden",
          noAssignedVisits: "Du hast keine zugewiesenen Besuche.",
          errors: {
            unauthenticated: "Sie mussen sich anmelden, um den Check-in zu speichern.",
            forbidden: "Sie haben keine Berechtigung fur diesen Besuch.",
            notFound: "Der Besuch existiert nicht oder ist nicht mehr verfugbar.",
            network: "Der Server konnte nicht erreicht werden.",
            gpsPermissionDenied: "Sie mussen den Standort erlauben, um Check-in oder Check-out auszufuhren.",
            gpsTimeout: "Der Standort hat zu lange fur eine Antwort gebraucht. Bitte erneut versuchen.",
            gpsUnavailable: "Ihr aktueller Standort konnte nicht ermittelt werden.",
            gpsNotSupported: "Dieser Browser unterstutzt keinen Standortabruf.",
            gpsGeneric: "Der aktuelle Standort konnte nicht verifiziert werden.",
            invalidCoordinates: "Der gesendete Standort ist ungueltig.",
            visitAlreadyStarted: "Der Besuch hatte bereits einen gestarteten Check-in.",
            visitAlreadyFinished: "Der Besuch wurde bereits beendet.",
            visitNotStarted: "Sie mussen den Check-in zuerst starten, bevor Sie den Besuch beenden.",
            visitAlreadyCompleted: "Der Besuch war bereits abgeschlossen.",
            visitCancelled: "Der Besuch ist storniert und erlaubt keinen Check-in oder Check-out.",
            clientLocationNotConfigured: "Der Standort des Kundenhaushalts ist nicht konfiguriert. Bitte wenden Sie sich an die Verwaltung.",
            visitOutsideAllowedRadius: "Sie sind zu weit vom Wohnort des Kunden entfernt. Aktuelle Distanz: {{distance}} m. Erlaubter Radius: {{allowed}} m.",
            finishRequirements: "Pflichtigen Pflegebericht vor dem Abschluss ausfullen."
          }
        }
      },
      branding: {
        name: "Sol y Vida",
        suffix: "Cuidados",
        company: "Sol y Vida Cuidados",
        supportPhone: "626 406 477",
        supportPhoneRaw: "+34626406477",
        supportEmail: "solyvidacare@gmail.com",
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
          noAssignedServices: "Ihnen sind keine Leistungen zugewiesen.",
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
      familyPortal: {
        visitStatus: {
          scheduled: "Geplant",
          inProgress: "Laufend",
          completed: "Abgeschlossen",
          cancelled: "Storniert",
          unknown: "Kein Status"
        },
        statusItems: {
          nextVisitTitle: "Nachster Besuch",
          nextVisitText: "{{date}} mit {{professional}}.",
          lastReportTitle: "Letzter Bericht",
          generalStatusTitle: "Allgemeiner Status",
          noNews: "Derzeit sind keine Neuigkeiten erfasst."
        },
        generated: {
          visitReportTitle: "Besuchsbericht #{{id}}",
          checklistCompleted: "Pflege-Checkliste abgeschlossen.",
          checklistPending: "Pflege-Checkliste wartet auf Validierung.",
          noExtraDetails: "Keine zusatzlichen Details."
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
          load: "Profil konnte nicht geladen werden.",
          save: "Profil konnte nicht gespeichert werden."
        }
      },
      notificationsPage: {
        subtitle: "Verlauf von Hinweisen und Lesestatus. Fur Push-Kanal vorbereitet.",
        history: "Verlauf",
        searchPlaceholder: "Benachrichtigung suchen",
        pushReady: "Push bereit",
        pushEnabled: "Aktiviert",
        pushDisabled: "Aktivierung ausstehend",
        pushBlocked: "Berechtigung verweigert",
        pushUnsupported: "Browser nicht unterstutzt",
        pushSectionTitle: "Push-Kanal",
        pushNotConfigured: "Der Push-Kanal ist nicht konfiguriert.",
        inApp: "In-app",
        enablePush: "Benachrichtigungen aktivieren",
        disablePush: "Benachrichtigungen deaktivieren",
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
        status: "Status",
        statusPending: "Ausstehend",
        statusInReview: "In Prufung",
        statusResolved: "Gelost",
        statusClosed: "Geschlossen",
        closureNotes: "Abschlussnotizen",
        closureNotesPlaceholder: "Optionale Abschlussnotizen",
        updateStatus: "Status aktualisieren",
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
        loading: "Gespraeche werden geladen...",
        replyingTo: "Antworten: {{subject}}",
        startAnother: "Neues Gesprach",
        openConversation: "Gesprach offnen",
        adminInbox: "Gesprachsverwaltung",
        history: "Gesprachsverlauf",
        subject: "Betreff",
        description: "Details",
        send: "Senden",
        updateStatus: "Status aktualisieren",
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
          inReview: "In Prufung",
          answered: "Beantwortet",
          resolved: "Gelost",
          closed: "Geschlossen"
        },
        threadEmpty: "Keine Nachrichten in diesem Verlauf.",
        messagePlaceholder: "Schreiben Sie eine Nachricht in die Unterhaltung",
        errors: {
          required: "Betreff und Details ausfullen.",
          messageRequired: "Schreiben Sie eine Nachricht.",
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
        clientsLoadError: "Die Kunden konnten nicht geladen werden.",
        budgetsLoadError: "Fehler beim Laden der Budgets.",
        backendHint: "Bitte prüfen Sie die Verbindung zum Backend.",
        noClientsAvailable: "Es muss mindestens ein Kunde existieren, um ein Budget zu erstellen.",
        empty: "Keine Budgets registriert.",
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
        },
        lines: "Budgetpositionen",
        service: "Leistung",
        daysPerMonth: "Tage pro Monat",
        daysShort: "Tage",
        kilometers: "Kilometer",
        applicablePrice: "Anwendbarer Preis",
        monthlyLineTotal: "Monatlicher Positionsbetrag",
        monthlySubtotal: "Monatliche Zwischensumme",
        observations: "Hinweise",
        addLine: "Position hinzufügen",
        removeLine: "Position entfernen",
        manageTariffs: "Tarifkatalog verwalten",
        basePrice: "Grundpreis",
        supplement: "Anfangszuschlag",
        saveTariff: "Tarif speichern",
        tariffsError: "Tarife konnten nicht geladen oder gespeichert werden.",
        tariffSaved: "Tarif erfolgreich gespeichert.",
        tariffSaveInvalid: "Bitte Daten prüfen: Grundpreis und Zuschlag müssen zwischen 0 und 100.000 liegen, und der Name des individuellen Dienstes darf nicht leer sein.",
        tariffSaveUnauthorized: "Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an, um den Tarif zu speichern.",
        tariffSaveForbidden: "Sie haben keine Berechtigung, Tarife zu ändern. Nur die Verwaltung darf dies.",
        tariffSaveServerError: "Serverfehler beim Speichern des Tarifs. Bitte später erneut versuchen.",
        createError: "Das Budget konnte nicht erstellt werden."
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
  lng: typeof window !== "undefined" ? window.localStorage.getItem("language") ?? "es" : "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (language) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("language", language);
  }
});

const accountEmailTranslations = {
  es: {
    sent: "Correo aceptado por el proveedor. Comprueba la bandeja de entrada.",
    notConfigured: "Correo no enviado: falta configurar el proveedor. El acceso queda pendiente.",
    failed: "Correo no enviado: fallo del proveedor. Puedes reintentar la invitacion.",
  },
  en: {
    sent: "Email accepted by the provider. Check the inbox.",
    notConfigured: "Email not sent: provider configuration is missing. Access remains pending.",
    failed: "Email not sent: provider failure. You can retry the invitation.",
  },
  fr: {
    sent: "Courriel accepte par le fournisseur. Verifiez la boite de reception.",
    notConfigured: "Courriel non envoye : fournisseur non configure. Acces en attente.",
    failed: "Courriel non envoye : echec du fournisseur. Vous pouvez renvoyer l'invitation.",
  },
  de: {
    sent: "E-Mail vom Anbieter angenommen. Bitte Posteingang pruefen.",
    notConfigured: "E-Mail nicht gesendet: Anbieter nicht konfiguriert. Zugang bleibt ausstehend.",
    failed: "E-Mail nicht gesendet: Anbieterfehler. Einladung kann erneut gesendet werden.",
  },
};

for (const [language, accountEmail] of Object.entries(accountEmailTranslations)) {
  i18n.addResourceBundle(language, "translation", { accountEmail }, true, true);
}

const workerProfileTranslations = {
  es: { loading: "Cargando perfil...", saved: "Perfil guardado.", loadError: "No se pudo cargar el perfil.", specialty: "Especialidad" },
  en: { loading: "Loading profile...", saved: "Profile saved.", loadError: "Could not load the profile.", specialty: "Specialty" },
  fr: { loading: "Chargement du profil...", saved: "Profil enregistre.", loadError: "Impossible de charger le profil.", specialty: "Specialite" },
  de: { loading: "Profil wird geladen...", saved: "Profil gespeichert.", loadError: "Profil konnte nicht geladen werden.", specialty: "Fachgebiet" },
};

for (const [language, workerProfile] of Object.entries(workerProfileTranslations)) {
  i18n.addResourceBundle(language, "translation", { workerProfile }, true, true);
}

const serviceCatalogTranslations = {
  es: { title: "Catálogo de servicios", subtitle: "Servicios disponibles", service: "Servicio", category: "Categoría", rate: "Precio por hora", duration: "Duración", frequency: "Frecuencia", view: "Ver detalle", loading: "Cargando servicios...", empty: "No hay servicios disponibles para esta búsqueda.", error: "No se pudo cargar el catálogo." },
  en: { title: "Service catalog", subtitle: "Available services", service: "Service", category: "Category", rate: "Hourly rate", duration: "Duration", frequency: "Frequency", view: "View details", loading: "Loading services...", empty: "No services available for this search.", error: "Could not load the catalog." },
  fr: { title: "Catalogue des services", subtitle: "Services disponibles", service: "Service", category: "Categorie", rate: "Tarif horaire", duration: "Duree", frequency: "Frequence", view: "Voir les details", loading: "Chargement des services...", empty: "Aucun service disponible pour cette recherche.", error: "Impossible de charger le catalogue." },
  de: { title: "Leistungskatalog", subtitle: "Verfuegbare Leistungen", service: "Leistung", category: "Kategorie", rate: "Stundensatz", duration: "Dauer", frequency: "Haeufigkeit", view: "Details anzeigen", loading: "Leistungen werden geladen...", empty: "Keine Leistungen fuer diese Suche verfuegbar.", error: "Katalog konnte nicht geladen werden." },
};

for (const [language, serviceCatalog] of Object.entries(serviceCatalogTranslations)) {
  i18n.addResourceBundle(language, "translation", { serviceCatalog }, true, true);
}

const budgetPdfTranslations = {
  es: { download: "Descargar PDF del presupuesto", error: "No se pudo descargar el PDF del presupuesto." },
  en: { download: "Download budget PDF", error: "Could not download the budget PDF." },
  fr: { download: "Telecharger le PDF du devis", error: "Impossible de telecharger le PDF du devis." },
  de: { download: "Angebot als PDF herunterladen", error: "Das Angebots-PDF konnte nicht heruntergeladen werden." },
};

for (const [language, budgetPdf] of Object.entries(budgetPdfTranslations)) {
  i18n.addResourceBundle(language, "translation", { budgetPdf }, true, true);
}

const assignedServiceTranslations = {
  es: { client: "Cliente", address: "Domicilio", start: "Inicio", end: "Fin", tasks: "Tareas", notes: "Observaciones", noWorker: "Trabajador no asignado", noClient: "Cliente no asignado", required: "Indica nombre, precio y duración positivos. Para asignar un trabajador, selecciona cliente, tareas y un horario de inicio y fin válido." },
  en: { client: "Client", address: "Address", start: "Start", end: "End", tasks: "Tasks", notes: "Notes", noWorker: "No assigned worker", noClient: "No assigned client", required: "Enter a name, positive price and duration. Worker assignments require a client, tasks and a valid start/end schedule." },
  fr: { client: "Client", address: "Adresse", start: "Debut", end: "Fin", tasks: "Taches", notes: "Observations", noWorker: "Aucun intervenant affecte", noClient: "Aucun client affecte", required: "Indiquez un nom, un prix et une duree positifs. Une affectation exige un client, des taches et un horaire valide." },
  de: { client: "Kunde", address: "Adresse", start: "Beginn", end: "Ende", tasks: "Aufgaben", notes: "Anmerkungen", noWorker: "Kein Mitarbeiter zugewiesen", noClient: "Kein Kunde zugewiesen", required: "Name, positiver Preis und Dauer sind erforderlich. Eine Zuweisung erfordert Kunde, Aufgaben und einen gueltigen Zeitraum." },
};

for (const [language, assignedService] of Object.entries(assignedServiceTranslations)) {
  i18n.addResourceBundle(language, "translation", { assignedService }, true, true);
}

export default i18n;