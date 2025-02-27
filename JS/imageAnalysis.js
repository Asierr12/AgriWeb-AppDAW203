let isCameraOn = false;  // Variable que indica si la cámara está activada o no
let videoElement = document.getElementById('videoElement');  // Elemento HTML donde se mostrará el video de la cámara
let canvasElement = document.getElementById('canvasElement');  // Elemento HTML para capturar la imagen del video

// Función para iniciar la cámara
export async function startCamera() {
  try {
    // Solicitar acceso a la cámara del usuario
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    // Asignar el flujo de video obtenido al elemento de video HTML
    videoElement.srcObject = stream;

    // Establecer que la cámara está encendida
    isCameraOn = true;
  } catch (err) {
    // Si ocurre un error al acceder a la cámara, mostrar un mensaje en la consola
    console.error("Error al acceder a la cámara: ", err);
  }
}

// Función para detener la cámara
export function stopCamera() {
  // Verificar si el elemento de video tiene un flujo de cámara activo
  if (videoElement.srcObject) {
    // Obtener el flujo de la cámara desde el elemento de video
    const stream = videoElement.srcObject;

    // Obtener todas las pistas de video y detener cada una
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());

    // Detener la transmisión de video y establecer el objeto del flujo a nulo
    videoElement.srcObject = null;

    // Establecer que la cámara está apagada
    isCameraOn = false;
  }
}

// Función para capturar una imagen del video
export function captureImage() {
  // Obtener el contexto del lienzo para dibujar en él
  const context = canvasElement.getContext('2d');

  // Establecer el tamaño del lienzo basado en el tamaño del video
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;

  // Dibujar la imagen del video en el lienzo
  context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

  // Obtener la URL de la imagen en formato PNG
  const imageUrl = canvasElement.toDataURL('image/png');

  // Llamar a la función que analizará la imagen
  analyzeImage(imageUrl);
}

// Función para analizar la imagen utilizando el modelo COCO-SSD
async function analyzeImage(imageUrl) {
  // Obtener el elemento HTML donde se mostrarán los resultados del análisis
  const analysisResults = document.getElementById("analysisResults");

  // Mostrar un mensaje de que se está analizando la imagen
  analysisResults.innerHTML = "Analizando la imagen...";

  // Cargar el modelo COCO-SSD
  const model = await cocoSsd.load();

  // Crear un objeto de imagen y establecer su fuente como la URL de la imagen capturada
  const img = new Image();
  img.src = imageUrl;

  // Esperar a que la imagen se cargue y luego realizar la predicción
  img.onload = async () => {
    // Realizar la detección de objetos en la imagen usando el modelo COCO-SSD
    const predictions = await model.detect(img);

    // Verificar si alguna de las predicciones es una persona
    const isHuman = predictions.some(pred => pred.class === 'person');

    // Mostrar el resultado del análisis en la página
    if (isHuman) {
      analysisResults.innerHTML = "<h3>Se ha detectado un humano en la imagen.</h3>";
    } else {
      analysisResults.innerHTML = "<h3>No se ha detectado un humano en la imagen.</h3>";
    }
  };
}
