// Función para obtener las coordenadas geográficas de una ciudad
export async function getCoordinates(ciudad) {
  // Verificar si el nombre de la ciudad está vacío o contiene solo espacios
  if (!ciudad.trim()) return { error: 'Por favor, ingresa una ciudad.' };

  try {
    // Hacer una solicitud a la API de geocodificación para obtener coordenadas de la ciudad
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ciudad)}&count=1&language=es`
    );
    // Verificar si la respuesta de la API es exitosa
    if (!response.ok) throw new Error(`Error en la API: ${response.status}`);

    // Parsear la respuesta JSON
    const data = await response.json();

    // Verificar si no se encontraron resultados para la ciudad
    if (!data.results || data.results.length === 0) return { error: 'Ciudad no encontrada.' };

    // Extraer las coordenadas y otros datos de la respuesta
    const { latitude, longitude, name, country } = data.results[0];
    return { latitude, longitude, name, country };  // Retornar las coordenadas de la ciudad
  } catch (error) {
    // Si ocurre un error durante la solicitud, mostrar el error en la consola
    console.error('Error obteniendo las coordenadas:', error);
    return { error: 'Error al obtener la ubicación.' };  // Retornar un mensaje de error
  }
}

// Función para obtener los datos meteorológicos de una ubicación dada (latitud y longitud)
export async function obtenerDatosMeteorologicos(lat, lon) {
  // Construir la URL para obtener el pronóstico del clima usando la API de Open Meteo
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&timezone=auto`;

  try {
    // Hacer la solicitud a la API de Open Meteo para obtener los datos meteorológicos
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    
    // Retornar los datos de temperatura, humedad y velocidad del viento
    return {
      temperaturaMax: datos.hourly.temperature_2m[0],
      humedad: datos.hourly.relativehumidity_2m[0],
      viento: datos.hourly.windspeed_10m[0],
    };
  } catch (error) {
    // Si ocurre un error al obtener los datos meteorológicos, mostrar el error en la consola
    console.error('Error al obtener los datos meteorológicos:', error);
    return null;  // Retornar null si hay un error
  }
}

// Función para inicializar el mapa de Google con una ubicación especificada
export function initMap(lat, lon) {
  const mapDiv = document.getElementById('map');
  mapDiv.innerHTML = ''; // Limpiar el contenido previo del mapa

  // Crear un iframe que contiene el mapa de Google
  const map = document.createElement('iframe');
  map.width = '100%';  // Establecer el ancho del mapa al 100% del contenedor
  map.height = '400';  // Establecer una altura adecuada para el mapa
  map.src = `https://www.google.com/maps?q=${lat},${lon}&z=12&output=embed`;  // Configurar la URL del mapa para mostrar la ubicación
  mapDiv.appendChild(map);  // Agregar el iframe al contenedor del mapa
}

// Función para obtener la ubicación geográfica del usuario
export function obtenerUbicacionUsuario() {
  // Verificar si el navegador soporta la geolocalización
  if (navigator.geolocation) {
    // Obtener la posición del usuario (latitud y longitud)
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Obtener el contenedor donde se mostrará la información meteorológica
      const weatherDataDiv = document.getElementById('weatherData');
      // Obtener los datos meteorológicos usando las coordenadas del usuario
      const weather = await obtenerDatosMeteorologicos(lat, lon);

      // Mostrar la información meteorológica y el mapa en la página
      weatherDataDiv.innerHTML = `
        <p><strong>Ubicación actual:</strong> Usuario</p>
        <p><strong>Temperatura:</strong> ${weather.temperaturaMax}°C</p>
        <p><strong>Humedad:</strong> ${weather.humedad}%</p>
        <p><strong>Viento:</strong> ${weather.viento} m/s</p>
      `;

      // Inicializar y mostrar el mapa con las coordenadas del usuario
      initMap(lat, lon);
    }, (error) => {
      // Si ocurre un error al obtener la ubicación, mostrar un mensaje de error
      console.error("Error al obtener la ubicación del usuario", error);
      document.getElementById('weatherData').innerHTML = "<p>Error al obtener la ubicación.</p>";
    });
  } else {
    // Si el navegador no soporta geolocalización, mostrar un mensaje de error
    console.error("La geolocalización no es compatible con este navegador.");
    document.getElementById('weatherData').innerHTML = "<p>La geolocalización no está disponible.</p>";
  }
}

// Función para buscar el clima de una ciudad e insertar los datos en la página
export async function buscarCiudad() {
  // Obtener el nombre de la ciudad desde el input del usuario
  const city = document.getElementById('cityInput').value;
  const weatherDataDiv = document.getElementById('weatherData');

  // Obtener las coordenadas de la ciudad usando la función getCoordinates
  const coordinates = await getCoordinates(city);

  // Si hubo un error al obtener las coordenadas, mostrar el error
  if (coordinates.error) {
    weatherDataDiv.innerHTML = `<p style="color: red;">${coordinates.error}</p>`;
  } else {
    // Obtener los datos meteorológicos de la ciudad usando las coordenadas obtenidas
    const weather = await obtenerDatosMeteorologicos(coordinates.latitude, coordinates.longitude);
    weatherDataDiv.innerHTML = `
      <p><strong>Ciudad:</strong> ${coordinates.name}</p>
      <p><strong>Temperatura:</strong> ${weather.temperaturaMax}°C</p>
      <p><strong>Humedad:</strong> ${weather.humedad}%</p>
      <p><strong>Viento:</strong> ${weather.viento} m/s</p>
    `;

    // Inicializar y mostrar el mapa con las coordenadas de la ciudad
    initMap(coordinates.latitude, coordinates.longitude);
  }
}

// Función para inicializar la aplicación, obteniendo la ubicación del usuario y configurando la búsqueda de ciudad
export function inicializar() {
  obtenerUbicacionUsuario();  // Llamar para obtener la ubicación inicial del usuario
  // Configurar el evento de búsqueda de ciudad, para que al hacer clic en el botón se busque el clima de la ciudad
  document.getElementById('searchCity').addEventListener('click', buscarCiudad);
}
