export type Language = 'en' | 'fr' | 'rw'

export const translations = {
  en: {
    common: {
      dashboard: 'Dashboard',
      patients: 'Patients',
      appointments: 'Appointments',
      pharmacy: 'Pharmacy',
      logout: 'Logout',
      search: 'Search',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      back: 'Back',
    },
    dashboard: {
      title: 'Dashboard',
      totalPatients: 'Total Patients',
      appointmentsToday: 'Appointments Today',
      activeDoctors: 'Active Doctors',
      criticalAlerts: 'Critical Alerts',
    },
    patients: {
      title: 'Patients',
      addNew: 'Add New Patient',
      search: 'Search patients...',
      id: 'Patient ID',
      name: 'Full Name',
      age: 'Age',
      phone: 'Phone Number',
      address: 'Address',
    },
    appointments: {
      title: 'Appointments',
      schedule: 'Schedule Appointment',
      date: 'Date',
      time: 'Time',
      doctor: 'Doctor',
      status: 'Status',
    },
  },
  fr: {
    common: {
      dashboard: 'Tableau de bord',
      patients: 'Patients',
      appointments: 'Rendez-vous',
      pharmacy: 'Pharmacie',
      logout: 'Déconnexion',
      search: 'Recherche',
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Éditer',
      add: 'Ajouter',
      back: 'Retour',
    },
    dashboard: {
      title: 'Tableau de bord',
      totalPatients: 'Total des patients',
      appointmentsToday: 'Rendez-vous aujourd\'hui',
      activeDoctors: 'Médecins actifs',
      criticalAlerts: 'Alertes critiques',
    },
    patients: {
      title: 'Patients',
      addNew: 'Ajouter un nouveau patient',
      search: 'Rechercher des patients...',
      id: 'ID patient',
      name: 'Nom complet',
      age: 'Âge',
      phone: 'Numéro de téléphone',
      address: 'Adresse',
    },
    appointments: {
      title: 'Rendez-vous',
      schedule: 'Planifier un rendez-vous',
      date: 'Date',
      time: 'Heure',
      doctor: 'Médecin',
      status: 'Statut',
    },
  },
  rw: {
    common: {
      dashboard: 'Dashboard',
      patients: 'Abanyamedicine',
      appointments: 'Appointment',
      pharmacy: 'Pharmacy',
      logout: 'Sohoka',
      search: 'Saguta',
      save: 'Kubika',
      cancel: 'Guhagarika',
      delete: 'Gusiba',
      edit: 'Gucika',
      add: 'Kongera',
      back: 'Inyuma',
    },
    dashboard: {
      title: 'Dashboard',
      totalPatients: 'Umubare w\'Abanyamedicine',
      appointmentsToday: 'Appointment Ababyakira',
      activeDoctors: 'Muganga Mwiza',
      criticalAlerts: 'Igikonti Kinini',
    },
    patients: {
      title: 'Abanyamedicine',
      addNew: 'Kongera Umuryango Mushya',
      search: 'Saguta abanyamedicine...',
      id: 'ID y\'Umuryango',
      name: 'Izina Riziga',
      age: 'Imyaka',
      phone: 'Numero ya Telefoni',
      address: 'Aho Atuye',
    },
    appointments: {
      title: 'Appointment',
      schedule: 'Shingira Appointment',
      date: 'Italiki',
      time: 'Isaha',
      doctor: 'Muganga',
      status: 'Status',
    },
  },
}

export const useTranslation = (language: Language) => {
  return (key: string): string => {
    const keys = key.split('.')
    let current: any = translations[language]

    for (const k of keys) {
      current = current?.[k]
      if (!current) return key
    }

    return current
  }
}

export const getLanguageName = (lang: Language): string => {
  const names = {
    en: 'English',
    fr: 'Français',
    rw: 'Kinyarwanda',
  }
  return names[lang]
}
