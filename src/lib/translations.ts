export type Language = 'es' | 'en';

export const translations = {
  es: {
    // Navigation & Common
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      delete: 'Eliminar',
      edit: 'Editar',
      save: 'Guardar',
      close: 'Cerrar',
      back: 'Volver',
      next: 'Siguiente',
      previous: 'Anterior',
      search: 'Buscar',
      logout: 'Cerrar Sesión',
      login: 'Iniciar Sesión',
      selectLanguage: 'Idioma'
    },

    // Home Page
    home: {
      title: 'KOA Estudio Multimedia',
      subtitle: 'Tu portal de fotografías',
      enterCode: 'Ingresa el código de tu evento',
      codePlaceholder: 'Código del evento',
      accessButton: 'Acceder',
      invalidCode: 'Código inválido o evento no encontrado',
      welcome: 'Bienvenido'
    },

    // Event Gallery
    gallery: {
      title: 'Galería del Evento',
      selectPhotos: 'Selecciona tus fotos favoritas',
      photosSelected: 'fotos seleccionadas',
      selectAll: 'Seleccionar Todo',
      clearSelection: 'Limpiar Selección',
      noPhotos: 'No hay fotos disponibles',
      loading: 'Cargando fotos...',
      watermarkNotice: 'Las fotos mostradas incluyen marca de agua. Recibirás las versiones en alta resolución sin marca de agua después de la compra.',
      pricePerPhoto: 'por foto'
    },

    // Shopping Cart
    cart: {
      title: 'Carrito',
      empty: 'Tu carrito está vacío',
      items: 'artículos',
      subtotal: 'Subtotal',
      total: 'Total',
      checkout: 'Proceder al Pago',
      continueSelection: 'Continuar Seleccionando',
      removeItem: 'Eliminar',
      photosSelected: 'fotos seleccionadas'
    },

    // Checkout
    checkout: {
      title: 'Finalizar Compra',
      contactInfo: 'Información de Contacto',
      name: 'Nombre Completo',
      namePlaceholder: 'Tu nombre',
      email: 'Correo Electrónico',
      emailPlaceholder: 'tu@email.com',
      phone: 'Teléfono (Opcional)',
      phonePlaceholder: '+595 XXX XXXXXX',
      orderSummary: 'Resumen del Pedido',
      photos: 'fotos',
      pricePerPhoto: 'Precio por foto',
      total: 'Total a Pagar',
      paymentMethod: 'Método de Pago',
      onlinePayment: 'Pago Online',
      onlinePaymentDesc: 'Tarjeta de crédito/débito',
      offlinePayment: 'Pago Manual',
      offlinePaymentDesc: 'Recibirás una contraseña después del pago',
      continueToPayment: 'Continuar al Pago',
      requiredFields: 'Por favor completa todos los campos requeridos',
      processing: 'Procesando...'
    },

    // Payment
    payment: {
      title: 'Completar Pago',
      choosMethod: 'Elige tu método de pago preferido',
      orderSummary: 'Resumen del Pedido',
      event: 'Evento',
      photosSelected: 'Fotos Seleccionadas',
      totalAmount: 'Monto Total',
      payWithCard: 'Pagar con Tarjeta (Stripe)',
      processing: 'Procesando...',
      or: 'o',
      qrPayment: 'Pago QR (Paraguay)',
      qrDescription: 'Escanea con tu app bancaria para pagar directamente',
      qrPlaceholder: 'El código QR se generará cuando se integre con el proveedor de pagos',
      completedQRPayment: 'He Completado el Pago QR',
      orderId: 'ID de Pedido',
      securePayment: 'Procesamiento de Pago Seguro',
      paymentError: 'Error al procesar el pago'
    },

    // Download
    download: {
      title: 'Descargar Fotos',
      enterPassword: 'Ingresa la Contraseña',
      passwordDescription: 'Ingresa la contraseña que recibiste del fotógrafo para acceder a tus fotos',
      passwordPlaceholder: 'Contraseña de descarga',
      unlockPhotos: 'Desbloquear Fotos',
      unlocking: 'Desbloqueando...',
      invalidPassword: 'Contraseña incorrecta',
      downloadReady: '¡Tus Fotos Están Listas!',
      downloadReadyDesc: 'Tus fotos de alta resolución están listas para descargar',
      expiresIn: 'El acceso expira en',
      hours: 'horas',
      downloadAll: 'Descargar Todas',
      downloadIndividual: 'Descargar Individual',
      downloading: 'Descargando...',
      paymentPending: 'Pago Pendiente',
      paymentPendingDesc: 'Tu pago aún está siendo procesado. Por favor verifica más tarde o contacta al fotógrafo.',
      paymentCompleted: 'Pago Completado',
      thankYou: '¡Gracias por tu compra!',
      photosIncluded: 'fotos incluidas'
    },

    // Admin Login
    adminLogin: {
      title: 'Panel de Administración',
      subtitle: 'Ingresa a tu cuenta de administrador',
      email: 'Correo Electrónico',
      emailPlaceholder: 'admin@koa.com',
      password: 'Contraseña',
      passwordPlaceholder: 'Tu contraseña',
      loginButton: 'Iniciar Sesión',
      loggingIn: 'Iniciando sesión...',
      loginError: 'Error al iniciar sesión',
      invalidCredentials: 'Credenciales inválidas'
    },

    // Admin Dashboard
    adminDashboard: {
      title: 'Panel de Administración',
      welcome: 'Bienvenido de vuelta',
      stats: {
        totalRevenue: 'Ingresos Totales',
        totalPhotos: 'Total de Fotos',
        totalOrders: 'Pedidos Completados',
        pendingOrders: 'Pedidos Pendientes',
        recentRevenue: 'Ingresos (30 días)',
        totalEvents: 'Eventos Activos'
      },
      events: 'Eventos',
      createNewEvent: 'Nuevo Evento',
      noEvents: 'No hay eventos creados',
      viewDetails: 'Ver Detalles',
      photos: 'fotos',
      revenue: 'ingresos'
    },

    // Create Event
    createEvent: {
      title: 'Crear Nuevo Evento',
      eventInfo: 'Información del Evento',
      eventName: 'Nombre del Evento',
      eventNamePlaceholder: 'Ej: Boda de María y Juan',
      description: 'Descripción (Opcional)',
      descriptionPlaceholder: 'Detalles adicionales del evento',
      eventDate: 'Fecha del Evento',
      pricing: 'Precio',
      pricePerPhoto: 'Precio por Foto',
      pricePerPhotoPlaceholder: '0.00',
      accessControl: 'Control de Acceso',
      accessCode: 'Código de Acceso',
      generateCode: 'Generar Código',
      createEvent: 'Crear Evento',
      creating: 'Creando...',
      eventCreated: 'Evento creado exitosamente',
      createError: 'Error al crear evento',
      requiredField: 'Este campo es requerido'
    },

    // Event Details
    eventDetails: {
      title: 'Detalles del Evento',
      code: 'Código',
      orders: 'Pedidos',
      noOrders: 'No hay pedidos aún',
      uploadPhotos: 'Subir Fotos',
      photos: 'fotos',
      revenue: 'ingresos',
      clientName: 'Cliente',
      clientEmail: 'Correo',
      amount: 'Monto',
      status: 'Estado',
      paymentMethod: 'Método de Pago',
      date: 'Fecha',
      actions: 'Acciones',
      generatePassword: 'Generar Contraseña',
      copyCode: 'Copiar Código',
      copied: 'Copiado',
      pending: 'Pendiente',
      completed: 'Completado',
      failed: 'Fallido',
      online: 'Online',
      offline: 'Manual'
    },

    // Photo Upload
    photoUpload: {
      title: 'Subir Fotos',
      description: 'Selecciona múltiples fotos para subir. Formatos soportados: JPEG, PNG, WebP (máx 50MB cada una)',
      selectFiles: 'Seleccionar Fotos',
      clickToSelect: 'Haz clic para seleccionar fotos o arrastra y suelta',
      uploading: 'Subiendo...',
      uploaded: 'subidas',
      failed: 'fallidas',
      uploadPhotos: 'Subir Fotos',
      invalidFileType: 'Tipo de archivo inválido. Solo se permiten imágenes JPEG, PNG y WebP.',
      fileTooLarge: 'Archivo muy grande. El tamaño máximo es 50MB.',
      uploadFailed: 'Falló la subida',
      processing: 'Procesando...'
    },

    // Email Templates
    email: {
      orderConfirmation: {
        subject: 'Confirmación de Pedido - KOA Estudio',
        greeting: 'Hola',
        thankYou: '¡Gracias por tu pedido!',
        received: 'Hemos recibido tu pedido y lo estamos procesando.',
        orderDetails: 'Detalles del Pedido',
        orderId: 'ID de Pedido',
        photosSelected: 'Fotos Seleccionadas',
        totalAmount: 'Monto Total',
        nextSteps: 'Recibirás otro correo cuando tus fotos estén listas para descargar.'
      },
      downloadReady: {
        subject: '¡Tus Fotos Están Listas! - KOA Estudio',
        greeting: 'Hola',
        ready: 'Tus fotos de alta resolución ya están disponibles para descargar.',
        downloadButton: 'Descargar Mis Fotos',
        expiryNotice: 'Este enlace de descarga expirará en 4 horas por motivos de seguridad.'
      },
      passwordProvided: {
        subject: 'Contraseña de Descarga - KOA Estudio',
        greeting: 'Hola',
        paymentConfirmed: '¡Pago Confirmado!',
        usePassword: 'Tu pago ha sido confirmado. Usa la contraseña a continuación para acceder a tus fotos:',
        yourPassword: 'Tu Contraseña de Descarga',
        instructions: 'Visita la página de tu pedido e ingresa esta contraseña para descargar tus fotos de alta resolución.'
      }
    },

    // Watermark
    watermark: {
      text: '©KOA'
    }
  },

  en: {
    // Navigation & Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      delete: 'Delete',
      edit: 'Edit',
      save: 'Save',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      search: 'Search',
      logout: 'Logout',
      login: 'Login',
      selectLanguage: 'Language'
    },

    // Home Page
    home: {
      title: 'KOA Estudio Multimedia',
      subtitle: 'Your photography portal',
      enterCode: 'Enter your event code',
      codePlaceholder: 'Event code',
      accessButton: 'Access',
      invalidCode: 'Invalid code or event not found',
      welcome: 'Welcome'
    },

    // Event Gallery
    gallery: {
      title: 'Event Gallery',
      selectPhotos: 'Select your favorite photos',
      photosSelected: 'photos selected',
      selectAll: 'Select All',
      clearSelection: 'Clear Selection',
      noPhotos: 'No photos available',
      loading: 'Loading photos...',
      watermarkNotice: 'Photos shown include watermark. You will receive high-resolution versions without watermark after purchase.',
      pricePerPhoto: 'per photo'
    },

    // Shopping Cart
    cart: {
      title: 'Cart',
      empty: 'Your cart is empty',
      items: 'items',
      subtotal: 'Subtotal',
      total: 'Total',
      checkout: 'Proceed to Checkout',
      continueSelection: 'Continue Selecting',
      removeItem: 'Remove',
      photosSelected: 'photos selected'
    },

    // Checkout
    checkout: {
      title: 'Checkout',
      contactInfo: 'Contact Information',
      name: 'Full Name',
      namePlaceholder: 'Your name',
      email: 'Email Address',
      emailPlaceholder: 'your@email.com',
      phone: 'Phone (Optional)',
      phonePlaceholder: '+595 XXX XXXXXX',
      orderSummary: 'Order Summary',
      photos: 'photos',
      pricePerPhoto: 'Price per photo',
      total: 'Total Amount',
      paymentMethod: 'Payment Method',
      onlinePayment: 'Online Payment',
      onlinePaymentDesc: 'Credit/debit card',
      offlinePayment: 'Manual Payment',
      offlinePaymentDesc: 'You will receive a password after payment',
      continueToPayment: 'Continue to Payment',
      requiredFields: 'Please fill in all required fields',
      processing: 'Processing...'
    },

    // Payment
    payment: {
      title: 'Complete Payment',
      choosMethod: 'Choose your preferred payment method',
      orderSummary: 'Order Summary',
      event: 'Event',
      photosSelected: 'Photos Selected',
      totalAmount: 'Total Amount',
      payWithCard: 'Pay with Card (Stripe)',
      processing: 'Processing...',
      or: 'or',
      qrPayment: 'QR Payment (Paraguay)',
      qrDescription: 'Scan with your banking app to pay directly',
      qrPlaceholder: 'QR code will be generated when integrated with payment provider',
      completedQRPayment: 'I Have Completed QR Payment',
      orderId: 'Order ID',
      securePayment: 'Secure Payment Processing',
      paymentError: 'Error processing payment'
    },

    // Download
    download: {
      title: 'Download Photos',
      enterPassword: 'Enter Password',
      passwordDescription: 'Enter the password you received from the photographer to access your photos',
      passwordPlaceholder: 'Download password',
      unlockPhotos: 'Unlock Photos',
      unlocking: 'Unlocking...',
      invalidPassword: 'Incorrect password',
      downloadReady: 'Your Photos Are Ready!',
      downloadReadyDesc: 'Your high-resolution photos are ready for download',
      expiresIn: 'Access expires in',
      hours: 'hours',
      downloadAll: 'Download All',
      downloadIndividual: 'Download Individual',
      downloading: 'Downloading...',
      paymentPending: 'Payment Pending',
      paymentPendingDesc: 'Your payment is still being processed. Please check back later or contact the photographer.',
      paymentCompleted: 'Payment Completed',
      thankYou: 'Thank you for your purchase!',
      photosIncluded: 'photos included'
    },

    // Admin Login
    adminLogin: {
      title: 'Admin Panel',
      subtitle: 'Sign in to your admin account',
      email: 'Email Address',
      emailPlaceholder: 'admin@koa.com',
      password: 'Password',
      passwordPlaceholder: 'Your password',
      loginButton: 'Sign In',
      loggingIn: 'Signing in...',
      loginError: 'Error signing in',
      invalidCredentials: 'Invalid credentials'
    },

    // Admin Dashboard
    adminDashboard: {
      title: 'Admin Dashboard',
      welcome: 'Welcome back',
      stats: {
        totalRevenue: 'Total Revenue',
        totalPhotos: 'Total Photos',
        totalOrders: 'Completed Orders',
        pendingOrders: 'Pending Orders',
        recentRevenue: 'Revenue (30 days)',
        totalEvents: 'Active Events'
      },
      events: 'Events',
      createNewEvent: 'New Event',
      noEvents: 'No events created',
      viewDetails: 'View Details',
      photos: 'photos',
      revenue: 'revenue'
    },

    // Create Event
    createEvent: {
      title: 'Create New Event',
      eventInfo: 'Event Information',
      eventName: 'Event Name',
      eventNamePlaceholder: 'e.g., Maria & Juan Wedding',
      description: 'Description (Optional)',
      descriptionPlaceholder: 'Additional event details',
      eventDate: 'Event Date',
      pricing: 'Pricing',
      pricePerPhoto: 'Price per Photo',
      pricePerPhotoPlaceholder: '0.00',
      accessControl: 'Access Control',
      accessCode: 'Access Code',
      generateCode: 'Generate Code',
      createEvent: 'Create Event',
      creating: 'Creating...',
      eventCreated: 'Event created successfully',
      createError: 'Error creating event',
      requiredField: 'This field is required'
    },

    // Event Details
    eventDetails: {
      title: 'Event Details',
      code: 'Code',
      orders: 'Orders',
      noOrders: 'No orders yet',
      uploadPhotos: 'Upload Photos',
      photos: 'photos',
      revenue: 'revenue',
      clientName: 'Client',
      clientEmail: 'Email',
      amount: 'Amount',
      status: 'Status',
      paymentMethod: 'Payment Method',
      date: 'Date',
      actions: 'Actions',
      generatePassword: 'Generate Password',
      copyCode: 'Copy Code',
      copied: 'Copied',
      pending: 'Pending',
      completed: 'Completed',
      failed: 'Failed',
      online: 'Online',
      offline: 'Manual'
    },

    // Photo Upload
    photoUpload: {
      title: 'Upload Photos',
      description: 'Select multiple photos to upload. Supported formats: JPEG, PNG, WebP (max 50MB each)',
      selectFiles: 'Select Photos',
      clickToSelect: 'Click to select photos or drag and drop',
      uploading: 'Uploading...',
      uploaded: 'uploaded',
      failed: 'failed',
      uploadPhotos: 'Upload Photos',
      invalidFileType: 'Invalid file type. Only JPEG, PNG and WebP images are allowed.',
      fileTooLarge: 'File too large. Maximum size is 50MB.',
      uploadFailed: 'Upload failed',
      processing: 'Processing...'
    },

    // Email Templates
    email: {
      orderConfirmation: {
        subject: 'Order Confirmation - KOA Estudio',
        greeting: 'Hello',
        thankYou: 'Thank you for your order!',
        received: 'We have received your order and are processing your request.',
        orderDetails: 'Order Details',
        orderId: 'Order ID',
        photosSelected: 'Photos Selected',
        totalAmount: 'Total Amount',
        nextSteps: 'You will receive another email once your photos are ready for download.'
      },
      downloadReady: {
        subject: 'Your Photos Are Ready! - KOA Estudio',
        greeting: 'Hello',
        ready: 'Your high-resolution photos are now available for download.',
        downloadButton: 'Download My Photos',
        expiryNotice: 'This download link will expire in 4 hours for security purposes.'
      },
      passwordProvided: {
        subject: 'Download Password - KOA Estudio',
        greeting: 'Hello',
        paymentConfirmed: 'Payment Confirmed!',
        usePassword: 'Your payment has been confirmed. Use the password below to access your photos:',
        yourPassword: 'Your Download Password',
        instructions: 'Visit your order page and enter this password to download your high-resolution photos.'
      }
    },

    // Watermark
    watermark: {
      text: '©KOA'
    }
  }
};

export type TranslationKey = keyof typeof translations.es;
