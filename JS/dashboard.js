// Importaciones de módulos
import { manejarInicioSesion, manejarRegistro, manejarRecuperarContraseña } from './auth.js'; // Importa las funciones de autenticación (inicio de sesión, registro, recuperación de contraseña)
import { stopCamera, startCamera, captureImage } from './imageAnalysis.js'; // Importa las funciones para manejar la cámara y capturar imágenes
import { buscarCiudad, inicializar } from './mapa.js'; // Importa funciones para obtener datos meteorológicos y manejar el mapa
import { auth } from './firebase-config.js'; // Firebase ya inicializado, para manejar la autenticación
import { fetchWeatherData, displayWeatherData } from './tabla.js'; // Importa funciones para manejar los datos meteorológicos y mostrarlos en la tabla

// Variables globales para manejar la cámara y sus elementos
let isCameraOn = false; // Estado de la cámara, inicialmente apagada
let videoElement = document.getElementById('videoElement'); // Elemento de video donde se muestra la transmisión de la cámara
let canvasElement = document.getElementById('canvasElement'); // Elemento de lienzo donde se capturarán las imágenes de la cámara

// Función que se ejecuta cuando se carga el contenido del DOM
document.addEventListener('DOMContentLoaded', inicio);

// Función de inicio de la aplicación, se llama cuando se carga la página
function inicio() {
  verificarUsuario();  // Verifica si el usuario está autenticado
  configurarEventos();  // Configura los eventos de los botones
  inicializar();  // Inicializa el mapa
}

// Verificar si el usuario ya está autenticado
function verificarUsuario() {
  // Se escucha el cambio de estado de autenticación del usuario (si se loguea o se desconecta)
  auth.onAuthStateChanged(user => {
    if (user) {
      mostrarApp(); // Si el usuario está logueado, muestra la app
      cargarDatosMeteorologicos(); // Carga los datos meteorológicos cuando el usuario está autenticado
    } else {
      mostrarLogin(); // Si no hay usuario, muestra solo el login
    }
  });
}

// Cargar los datos meteorológicos y mostrarlos en la tabla
async function cargarDatosMeteorologicos() {
  // Llama a la función fetchWeatherData para obtener los datos meteorológicos
  const weatherData = await fetchWeatherData(); 
  // Llama a displayWeatherData para mostrar los datos en la tabla
  displayWeatherData(weatherData); 
}

// Configuración de eventos (para botones de registro, login, etc.)
function configurarEventos() {
  // Configura el evento para el botón de registro, ejecutando la función manejarRegistro cuando se haga clic
  document.getElementById('botonRegistro').addEventListener('click', manejarRegistro);

  // Configura el evento para el botón de recuperación de contraseña
  document.getElementById('botonRecuperarContraseña').addEventListener('click', manejarRecuperarContraseña);
  
  // Configura el evento para el botón de inicio de sesión
  document.getElementById('botonInicioSesion').addEventListener('click', async (event) => {
    event.preventDefault();  // Prevenir el envío del formulario (comportamiento por defecto)
    const respuesta = await manejarInicioSesion();  // Llama a la función de inicio de sesión
    if (respuesta) {
      mostrarApp(); // Si el inicio de sesión es exitoso, muestra la app
      cargarDatosMeteorologicos(); // Carga los datos meteorológicos después de iniciar sesión
    }
  });

  // Evento para el botón de Cerrar sesión
  document.getElementById('botonCerrarSesion').addEventListener('click', cerrarSesion);

  // Eventos para los controles de la cámara
  document.getElementById('toggleCamera').addEventListener('click', () => {
    // Alterna entre iniciar y detener la cámara cuando se haga clic en el botón de "Iniciar/Detener Cámara"
    if (isCameraOn) {
      stopCamera(); // Detiene la cámara
      document.getElementById('toggleCamera').textContent = "Iniciar Cámara"; // Cambia el texto del botón
    } else {
      startCamera(); // Inicia la cámara
      document.getElementById('toggleCamera').textContent = "Detener Cámara"; // Cambia el texto del botón
    }
    isCameraOn = !isCameraOn; // Cambia el estado de la cámara de encendido a apagado o viceversa
  });

  // Evento para capturar la imagen al hacer clic en el botón de captura
  document.getElementById('captureImage').addEventListener('click', captureImage); 
}

// Función para cerrar sesión
function cerrarSesion() {
  // Llama al método signOut de Firebase para cerrar sesión
  auth.signOut().then(() => {
    mostrarLogin(); // Después de cerrar sesión, muestra el formulario de login
  }).catch((error) => {
    console.error("Error al cerrar sesión: ", error); // Si ocurre un error al cerrar sesión, lo muestra en la consola
  });
}

// Mostrar solo el formulario de login/registro (ocultar la app)
function mostrarLogin() {
  document.getElementById("sesion").style.display = "block"; // Muestra el formulario de login
  document.getElementById("todo").style.display = "none"; // Oculta la app
}

// Mostrar la app después de iniciar sesión (ocultar el formulario de login)
function mostrarApp() {
  document.getElementById("sesion").style.display = "none"; // Oculta el formulario de login
  document.getElementById("todo").style.display = "block"; // Muestra la app
}
