import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Common
      "welcome": "Welcome to HealSpace",
      "login": "Login",
      "register": "Register", 
      "email": "Email",
      "password": "Password",
      "confirmPassword": "Confirm Password",
      "fullName": "Full Name",
      "phone": "Phone Number",
      "selectRole": "Select Your Role",
      "admin": "Admin",
      "user": "User",
      "continue": "Continue",
      "submit": "Submit",
      "cancel": "Cancel",
      "save": "Save",
      "edit": "Edit",
      "delete": "Delete",
      "view": "View",
      "search": "Search",
      "filter": "Filter",
      "loading": "Loading...",
      "noData": "No data available",
      
      // Navigation
      "dashboard": "Dashboard",
      "home": "Home",
      "doctors": "Doctors",
      "myDoctors": "My Doctors",
      "history": "History", 
      "profile": "Profile",
      "settings": "Settings",
      "manageDoctors": "Manage Doctors",
      "manageUsers": "Manage Users",
      "historyLogs": "History Logs",
      
      // Dashboard
      "welcomeBack": "Welcome Back",
      "availableDoctors": "Available Doctors",
      "onlineDoctors": "Online Doctors",
      "totalUsers": "Total Users",
      "recentActivity": "Recent Activity",
      "quickActions": "Quick Actions",
      
      // Profile
      "personalInfo": "Personal Information",
      "accountSettings": "Account Settings",
      "notifications": "Notifications",
      "changePassword": "Change Password",
      "deleteAccount": "Delete Account",
      "theme": "Theme",
      "language": "Language",
      
      // Theme
      "light": "Light",
      "dark": "Dark",
      "system": "System",
      
      // Status
      "online": "Online",
      "offline": "Offline",
      "busy": "Busy",
      "available": "Available"
    }
  },
  fr: {
    translation: {
      "welcome": "Bienvenue à HealSpace",
      "login": "Connexion",
      "register": "S'inscrire",
      "email": "E-mail",
      "password": "Mot de passe",
      "confirmPassword": "Confirmer le mot de passe",
      "fullName": "Nom complet",
      "phone": "Numéro de téléphone",
      "selectRole": "Sélectionnez votre rôle",
      "admin": "Administrateur",
      "user": "Utilisateur",
      "continue": "Continuer"
      // Add more French translations as needed
    }
  },
  ta: {
    translation: {
      "welcome": "ஹீல்ஸ்பேஸுக்கு வரவேற்கிறோம்",
      "login": "உள்நுழைவு",
      "register": "பதிவு செய்யவும்",
      "email": "மின்னஞ்சல்",
      "password": "கடவுச்சொல்",
      "confirmPassword": "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
      "fullName": "முழுப் பெயர்",
      "phone": "தொலைபேசி எண்",
      "selectRole": "உங்கள் பாத்திரத்தைத் தேர்ந்தெடுக்கவும்",
      "admin": "நிர்வாகி",
      "user": "பயனர்",
      "continue": "தொடரவும்"
      // Add more Tamil translations as needed
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;