# AgriWeb-AppDAW203
Aplicación Web de Reconocimiento de Imágenes y Meteorología

Descripción
El Proyecto Asier es una aplicación web que combina varias funcionalidades, como el inicio de sesión de usuarios, análisis de imágenes usando TensorFlow, visualización de datos meteorológicos y geolocalización. Los usuarios pueden iniciar sesión, ver el clima actual en su ubicación o en cualquier ciudad del mundo, y capturar imágenes desde su cámara para realizar un análisis de objetos utilizando el modelo de COCO-SSD.

Funcionalidades principales:
Autenticación de usuarios: Iniciar sesión, registrarse y recuperar la contraseña usando Firebase.
Análisis de imágenes: Captura imágenes desde la cámara y analiza los objetos utilizando el modelo COCO-SSD.
Datos Meteorológicos: Obtener el clima actual en cualquier ubicación o ciudad usando la API de Open Meteo.
Mapa de ubicación: Visualizar la ubicación en un mapa interactivo usando Google Maps.
Interfaz de tabla de datos: Visualizar los datos meteorológicos en una tabla interactiva con opciones de exportación (CSV, Excel, PDF, etc.).

Requisitos
Tener acceso a un navegador web moderno.
Conexión a Internet para interactuar con Firebase, Open Meteo y otros servicios.
Usar un entorno que permita la ejecución de módulos de JavaScript (como un servidor local para desarrollo).

Instalación
1. Clonar el repositorio
Para comenzar a trabajar con el proyecto, clona el repositorio en tu máquina local:
  git clone https://github.com/tu-usuario/AgriWeb-AppDAW203.git

2. Configuración de Firebase
Antes de ejecutar la aplicación, asegúrate de configurar Firebase correctamente. Si aún no tienes una cuenta de Firebase:

Dirígete a Firebase Console.
Crea un nuevo proyecto o usa uno existente.
Obtén las credenciales de tu aplicación desde la consola de Firebase.
Modifica el archivo firebase-config.js con tus credenciales personalizadas de Firebase.

3. Instalar dependencias
Si el proyecto usa algún gestor de dependencias, como npm o yarn, puedes instalar las dependencias necesarias para el proyecto:
  npm install
Sin embargo, dado que estás utilizando los módulos CDN directamente (como tensorflow y firebase), no será necesario instalar dependencias adicionales.

4. Ejecutar el proyecto
Simplemente abre el archivo index.html en tu navegador para ejecutar la aplicación.

Estructura del Proyecto

proyectoAsier/
│
├── CSS/
│   └── index.css                  # Estilos principales de la aplicación.
│
├── JS/
│   ├── auth.js                    # Funciones de autenticación (inicio de sesión, registro, etc.).
│   ├── dashboard.js               # Funciones relacionadas con el panel de usuario o el manejo de la interfaz.
│   ├── firebase-config.js         # Configuración de Firebase para la autenticación.
│   ├── imageAnalysis.js           # Funciones para el análisis de imágenes (uso de la cámara y análisis con COCO-SSD).
│   ├── mapa.js                    # Funciones de geolocalización y visualización de mapas.
│   ├── tabla.js                   # Funciones para manejar la tabla de datos meteorológicos.
│   └── tensorFlowModel.js         # Carga y uso del modelo COCO-SSD para análisis de imágenes.
│
└── index.html                     # Página principal de la aplicación.


Uso

1. Autenticación de Usuarios
Los usuarios pueden registrarse, iniciar sesión y recuperar su contraseña utilizando Firebase Authentication. Para ello, se usa el sistema de autenticación con correo y contraseña.

Iniciar sesión: El usuario ingresa su correo electrónico y contraseña.

Registro: Permite crear una cuenta nueva si el usuario no tiene una cuenta registrada.

Recuperación de contraseña: Si el usuario olvida su contraseña, puede solicitar un correo de recuperación.

2. Análisis de Imágenes
Utilizando el modelo COCO-SSD de TensorFlow.js, los usuarios pueden capturar imágenes desde su cámara web. El modelo detecta objetos en las imágenes y muestra si hay personas presentes en la imagen.

3. Obtener Datos Meteorológicos
La aplicación obtiene datos meteorológicos en tiempo real para cualquier ciudad utilizando la API de Open Meteo. Los usuarios pueden ver:

  Temperatura actual
  Humedad
  Velocidad del viento

4. Geolocalización y Mapa
La aplicación también puede obtener la ubicación del usuario utilizando la API de Geolocalización del navegador. El mapa se muestra con la ubicación actual del usuario o de cualquier ciudad que se busque.

5. Tabla Interactiva
Los datos meteorológicos se presentan en una tabla interactiva, la cual permite a los usuarios:

Exportar los datos a diferentes formatos (CSV, Excel, PDF).
Visualizar la información de manera responsiva, compatible con dispositivos móviles.
Tecnologías Utilizadas
Firebase: Para la autenticación de usuarios y gestión de cuentas.
TensorFlow.js (coco-ssd): Para el análisis de imágenes y detección de objetos en tiempo real.
Open Meteo API: Para obtener los datos meteorológicos.
Google Maps Embed API: Para la visualización del mapa con la ubicación geográfica.
jQuery DataTables: Para la visualización y exportación de datos meteorológicos en formato tabla.
