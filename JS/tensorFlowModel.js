// Importar las bibliotecas necesarias de TensorFlow.js y el modelo COCO-SSD
import * as cocoSsd from "https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd"; // Importa el modelo COCO-SSD, utilizado para la detección de objetos
import * as tf from "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"; // Importa TensorFlow.js, la librería para operaciones matemáticas y de machine learning

// Variable para almacenar el modelo cargado
let model;

// Función asíncrona para cargar el modelo de detección de objetos COCO-SSD
export const loadModel = async () => {
  // Si el modelo no está cargado, lo cargamos desde el CDN
  if (!model) {
    model = await cocoSsd.load(); // Carga el modelo COCO-SSD
  }
  return model; // Devuelve el modelo cargado
};

// Función para realizar la predicción sobre una imagen
export const predict = async (imageElement) => {
  // Llama al método detect del modelo COCO-SSD para hacer la detección de objetos en la imagen
  const predictions = await model.detect(imageElement); 
  return predictions; // Devuelve las predicciones obtenidas
};
