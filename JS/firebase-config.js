// Importa los módulos específicos de Firebase desde el CDN de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";  // Importa la función para inicializar la app de Firebase
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";  // Importa las funciones de autenticación de Firebase

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDxzLl0jSbtKSYedyni-cQeVq2kmiuGWDY",  // Clave pública para acceder a la API de Firebase
  authDomain: "proyectoasier.firebaseapp.com",  // Dominio de autenticación de la app
  projectId: "proyectoasier",  // ID del proyecto en Firebase
  storageBucket: "proyectoasier.firebasestorage.app",  // Bucket de almacenamiento de la app
  messagingSenderId: "1099275857470",  // ID del remitente de mensajería de Firebase
  appId: "1:1099275857470:web:bae6cf9d4f7eded5e76b6f",  // ID único de la aplicación
  measurementId: "G-SJ8Y6BCN1P"  // ID de medición para Google Analytics
};

// Inicializa Firebase con la configuración definida anteriormente
const app = initializeApp(firebaseConfig);  // Llama a `initializeApp` con la configuración para inicializar la app de Firebase
const auth = getAuth(app);  // Obtiene el servicio de autenticación de Firebase para la app inicializada

// Exporta las funciones necesarias para ser utilizadas en otras partes del proyecto
export { 
  auth,  // Exporta el objeto `auth` que permite acceder a las funcionalidades de autenticación
  signInWithEmailAndPassword,  // Exporta la función para iniciar sesión con correo y contraseña
  createUserWithEmailAndPassword,  // Exporta la función para crear un nuevo usuario con correo y contraseña
  sendPasswordResetEmail  // Exporta la función para enviar un correo de recuperación de contraseña
};
