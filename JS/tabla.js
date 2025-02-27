// Lista de 50 ciudades con sus coordenadas (lat, lon)
const cities = [
    { name: "Londres", lat: 51.5074, lon: -0.1278 },
    { name: "Nueva York", lat: 40.7128, lon: -74.0060 },
    { name: "París", lat: 48.8566, lon: 2.3522 },
    { name: "Tokio", lat: 35.6762, lon: 139.6503 },
    { name: "Ciudad de México", lat: 19.4326, lon: -99.1332 },
    { name: "Madrid", lat: 40.4168, lon: -3.7038 },
    { name: "Berlín", lat: 52.5200, lon: 13.4050 },
    { name: "Roma", lat: 41.9028, lon: 12.4964 },
    { name: "Los Ángeles", lat: 34.0522, lon: -118.2437 },
    { name: "São Paulo", lat: -23.5505, lon: -46.6333 },
    { name: "Buenos Aires", lat: -34.6037, lon: -58.3816 },
    { name: "Moscú", lat: 55.7558, lon: 37.6176 },
    { name: "Seúl", lat: 37.5665, lon: 126.9780 },
    { name: "Sídney", lat: -33.8688, lon: 151.2093 },
    { name: "Estambul", lat: 41.0082, lon: 28.9784 },
    { name: "Lagos", lat: 6.5244, lon: 3.3792 },
    { name: "Cairo", lat: 30.0444, lon: 31.2357 },
    { name: "Lima", lat: -12.0464, lon: -77.0428 },
    { name: "Santiago", lat: -33.4489, lon: -70.6693 },
    { name: "Kuala Lumpur", lat: 3.1390, lon: 101.6869 },
    { name: "Bangkok", lat: 13.7563, lon: 100.5018 },
    { name: "Jakarta", lat: -6.2088, lon: 106.8456 },
    { name: "Kiev", lat: 50.4501, lon: 30.5236 },
    { name: "Dublín", lat: 53.3498, lon: -6.2603 },
    { name: "Toronto", lat: 43.65107, lon: -79.347015 },
    { name: "Ámsterdam", lat: 52.3676, lon: 4.9041 },
    { name: "Dubai", lat: 25.276987, lon: 55.296249 },
    { name: "Karachi", lat: 24.8607, lon: 67.0011 },
    { name: "Riyad", lat: 24.7136, lon: 46.6753 },
    { name: "Bogotá", lat: 4.7110, lon: -74.0721 },
    { name: "Hong Kong", lat: 22.3193, lon: 114.1694 },
    { name: "Teherán", lat: 35.6892, lon: 51.3890 },
    { name: "Dakar", lat: 14.6928, lon: -17.4467 },
    { name: "Jartum", lat: 15.5007, lon: 32.5599 },
    { name: "Addis Abeba", lat: 9.145, lon: 40.4897 },
    { name: "Nairobi", lat: -1.286389, lon: 36.817223 },
    { name: "Ginebra", lat: 46.2044, lon: 6.1432 },
    { name: "Chicago", lat: 41.8781, lon: -87.6298 },
    { name: "Chennai", lat: 13.0827, lon: 80.2707 },
    { name: "Melbourne", lat: -37.8136, lon: 144.9631 },
    { name: "Bangalore", lat: 12.9716, lon: 77.5946 },
    { name: "Helsinki", lat: 60.1692, lon: 24.9402 },
    { name: "Montreal", lat: 45.5017, lon: -73.5673 },
    { name: "Bagdad", lat: 33.3152, lon: 44.3661 },
    { name: "Copenhague", lat: 55.6761, lon: 12.5683 }
];

// Función para obtener los datos meteorológicos de Open-Meteo
export const fetchWeatherData = async () => {
    const weatherData = [];

    // Consultar los datos para cada ciudad
    for (let city of cities) {
        const { name, lat, lon } = city; // Usar lat y lon en lugar de latitude y longitude
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&timezone=auto`;

        try {
            const response = await fetch(apiUrl);

            // Verificar si la respuesta es exitosa
            if (response.ok) {
                const data = await response.json();

                // Asegurarse de que los datos necesarios existen
                if (data.hourly) {
                    weatherData.push({
                        city: name,
                        temperature: data.hourly.temperature_2m ? data.hourly.temperature_2m[0] : 'N/A',
                        humidity: data.hourly.relativehumidity_2m ? data.hourly.relativehumidity_2m[0] : 'N/A',
                        windSpeed: data.hourly.windspeed_10m ? data.hourly.windspeed_10m[0] : 'N/A',
                        timestamp: new Date().toLocaleString() // Hora de consulta
                    });
                } else {
                    console.warn(`No se encontraron datos para ${name}`);
                }
            } else {
                console.error(`Error en la solicitud para ${name}: ${response.status} ${response.statusText}`);
                if (response.status === 400) {
                    console.error("Bad Request: Verifica los parámetros de la URL.");
                }
            }
        } catch (error) {
            console.error(`Error en la solicitud para ${name}: ${error}`);
        }
    }

    return weatherData;
};

// Función para mostrar los datos en la tabla y activar DataTables
export const displayWeatherData = (data) => {
    if (!data || data.length === 0) {
        console.warn('No hay datos para mostrar.');
        return;
    }

    const table = document.getElementById('weatherTable'); 
    const tableBody = table.getElementsByTagName('tbody')[0];

    // Limpiar la tabla antes de agregar nuevos datos
    tableBody.innerHTML = '';

    // Crear filas para cada ciudad con los datos
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.city}</td>
            <td>${item.temperature} °C</td>
            <td>${item.humidity} %</td>
            <td>${item.windSpeed} km/h</td>
            <td>${item.timestamp}</td>
        `;
        tableBody.appendChild(row);
    });

    // Verificar si DataTable ya está inicializado y destruirlo si es necesario
    if ($.fn.DataTable.isDataTable('#weatherTable')) {
        $('#weatherTable').DataTable().destroy();
    }

   // Inicializar DataTables con exportación y visualización de datos
$('#weatherTable').DataTable({
    // Configuración del DOM para mostrar la interfaz de DataTable y los botones de exportación
    dom: 'Bfrtip',
    buttons: [
        // Botón para copiar los datos de la tabla al portapapeles
        {
            extend: 'copy',  // Tipo de botón: Copiar
            text: 'Copiar',  // Texto que se mostrará en el botón
            title: 'Datos Meteorológicos'  // Título que se utilizará al copiar los datos
        },
        // Botón para exportar los datos de la tabla a formato CSV
        {
            extend: 'csv',  // Tipo de botón: CSV
            text: 'CSV',  // Texto que se mostrará en el botón
            title: 'Datos Meteorológicos'  // Título para el archivo CSV exportado
        },
        // Botón para exportar los datos de la tabla a formato Excel
        {
            extend: 'excel',  // Tipo de botón: Excel
            text: 'Excel',  // Texto que se mostrará en el botón
            title: 'Datos Meteorológicos'  // Título para el archivo Excel exportado
        },
        // Botón para exportar los datos de la tabla a formato PDF
        {
            extend: 'pdf',  // Tipo de botón: PDF
            text: 'PDF',  // Texto que se mostrará en el botón
            title: 'Datos Meteorológicos'  // Título para el archivo PDF exportado
        }
    ],
    // Definir las columnas de la tabla, con sus títulos
    columns: [
        { title: "Ciudad" },  // Columna para el nombre de la ciudad
        { title: "Temperatura (°C)" },  // Columna para la temperatura en grados Celsius
        { title: "Humedad (%)" },  // Columna para la humedad relativa en porcentaje
        { title: "Velocidad del Viento (km/h)" },  // Columna para la velocidad del viento en km/h
        { title: "Fecha y Hora" }  // Columna para la fecha y hora de la medición
    ],
    destroy: true,  // Permite destruir y volver a inicializar la tabla correctamente cuando sea necesario
    responsive: true  // Hace que la tabla sea responsive, adaptándose bien en dispositivos móviles
});

};
