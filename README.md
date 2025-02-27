# Proyecto Asier

Este es un proyecto desarrollado como parte de la asignatura de Desarrollo de Aplicaciones Web (DAW). El proyecto tiene como objetivo proporcionar una aplicación web que integre diversas funcionalidades como la autenticación de usuarios, la captura de imágenes mediante la cámara, el análisis de esas imágenes utilizando TensorFlow, la visualización de datos meteorológicos y la integración de un mapa interactivo con la geolocalización del usuario.

## Funcionalidades

- **Autenticación de Usuarios**: Permite a los usuarios registrarse, iniciar sesión y recuperar su contraseña mediante Firebase Authentication.
- **Análisis de Imágenes**: Captura imágenes desde la cámara y las analiza para detectar objetos, como personas, utilizando el modelo preentrenado de COCO-SSD en TensorFlow.js.
- **Visualización de Clima**: Utiliza la geolocalización del usuario o permite buscar el clima de cualquier ciudad, mostrando datos como la temperatura, humedad y velocidad del viento.
- **Mapa Interactivo**: Muestra la ubicación del usuario en un mapa interactivo utilizando la API de Google Maps.
- **Exportación de Datos**: Los datos meteorológicos se pueden exportar en diferentes formatos como CSV, Excel, PDF y copiar al portapapeles.
  
## Enlace de la Aplicación

Puedes acceder a la aplicación en vivo a través de GitHub Pages:

[Acceder a la aplicación](https://asierr12.github.io/AgriWeb-AppDAW203/)

## Estructura del Proyecto

proyectoAsier/ ├── CSS/ │ └── index.css ├── JS/ │ ├── auth.js │ ├── dashboard.js │ ├── firebase-config.js │ ├── imageAnalysis.js │ ├── mapa.js │ ├── tabla.js │ └── tensorFlowModel.js ├── index.html ├── README.md


### Descripción de los Archivos

- **index.html**: Página principal de la aplicación.
- **CSS/index.css**: Estilos utilizados en la aplicación.
- **JS/**: Carpeta con los archivos JavaScript que implementan la lógica de la aplicación:
  - **auth.js**: Gestión de la autenticación de usuarios con Firebase.
  - **imageAnalysis.js**: Funciones para iniciar y detener la cámara, capturar imágenes y analizarlas con TensorFlow.
  - **mapa.js**: Funciones para la integración del mapa y la obtención de datos meteorológicos.
  - **tabla.js**: Funciones para mostrar y exportar los datos meteorológicos.
  - **tensorFlowModel.js**: Funciones para cargar y utilizar el modelo COCO-SSD para el análisis de imágenes.

## Cómo Usar la Aplicación

1. **Accede a la aplicación** mediante el enlace proporcionado.
2. **Regístrate o inicia sesión** con tu cuenta para acceder a las funcionalidades completas.
3. **Activa la cámara** para capturar imágenes y analizarlas.
4. **Consulta el clima** de tu ubicación actual o de cualquier ciudad buscando en la barra de búsqueda.
5. **Exporta los datos** meteorológicos a los formatos que prefieras (CSV, Excel, PDF).
6. **Visualiza el mapa** para ver la ubicación del usuario.

## Requisitos

- Navegador web moderno (Chrome, Firefox, etc.)
- Conexión a internet para acceder a los servicios externos (Firebase, Google Maps, Open-Meteo API, etc.)


