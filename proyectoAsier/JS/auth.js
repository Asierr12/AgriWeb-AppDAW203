import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from './firebase-config.js';

// Función para manejar el inicio de sesión
export async function manejarInicioSesion(event) {
  if (event) event.preventDefault();  // Prevenir el comportamiento predeterminado del formulario (recarga de página) si se pasa el evento

  // Obtener los valores del correo y la contraseña ingresados por el usuario
  const correo = document.getElementById('correo').value;
  const contraseña = document.getElementById('contraseña').value;

  try {
    // Intentar iniciar sesión con el correo y la contraseña
    const userCredential = await signInWithEmailAndPassword(auth, correo, contraseña);
    console.log("Usuario autenticado:", userCredential.user);  // Mostrar el usuario autenticado en la consola
    document.getElementById('mensaje').textContent = "Inicio de sesión exitoso. Bienvenido de nuevo.";  // Mostrar un mensaje de éxito
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);  // Mostrar el error en la consola

    // Manejar errores específicos según el código de error devuelto por Firebase
    switch (error.code) {
      case 'auth/user-not-found':
        document.getElementById('mensaje').textContent = "No se encontró una cuenta con este correo. Por favor, regístrate.";  // Error: usuario no encontrado
        break;
      case 'auth/wrong-password':
        document.getElementById('mensaje').textContent = "Contraseña incorrecta. Intenta de nuevo.";  // Error: contraseña incorrecta
        break;
      case 'auth/invalid-email':
        document.getElementById('mensaje').textContent = "Correo electrónico inválido. Verifica tu dirección de correo.";  // Error: correo inválido
        break;
      default:
        document.getElementById('mensaje').textContent = "Error al iniciar sesión. Intenta nuevamente.";  // Mensaje genérico de error
        break;
    }
  }
}

// Función para manejar el registro
export async function manejarRegistro() {
  // Obtener los valores del correo y la contraseña ingresados por el usuario
  const correo = document.getElementById('correo').value;
  const contraseña = document.getElementById('contraseña').value;

  try {
    // Intentar registrar al usuario con el correo y la contraseña proporcionados
    const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
    console.log("Usuario registrado:", userCredential.user);  // Mostrar el usuario registrado en la consola
    document.getElementById('mensaje').textContent = "Registro exitoso. Ahora puedes iniciar sesión.";  // Mensaje de éxito
  } catch (error) {
    console.error("Error al registrar:", error.message);  // Mostrar el error en la consola

    // Manejar errores específicos según el código de error devuelto por Firebase
    switch (error.code) {
      case 'auth/email-already-in-use':
        document.getElementById('mensaje').textContent = "Este correo ya está registrado. Intenta iniciar sesión.";  // Error: correo ya registrado
        break;
      case 'auth/invalid-email':
        document.getElementById('mensaje').textContent = "Correo electrónico inválido. Verifica tu dirección de correo.";  // Error: correo inválido
        break;
      case 'auth/weak-password':
        document.getElementById('mensaje').textContent = "La contraseña debe tener al menos 6 caracteres. Intenta de nuevo.";  // Error: contraseña débil
        break;
      default:
        document.getElementById('mensaje').textContent = "Error al registrar. Intenta nuevamente.";  // Mensaje genérico de error
        break;
    }
  }
}

// Función para manejar la recuperación de contraseña
export async function manejarRecuperarContraseña() {
  // Obtener el correo proporcionado por el usuario para la recuperación de contraseña
  const correo = document.getElementById('correo').value;

  try {
    // Intentar enviar el correo de recuperación de contraseña
    await sendPasswordResetEmail(auth, correo);
    document.getElementById('mensaje').textContent = "Correo de recuperación enviado. Revisa tu bandeja de entrada.";  // Mensaje de éxito
  } catch (error) {
    console.error("Error al recuperar contraseña:", error.message);  // Mostrar el error en la consola

    // Manejar errores específicos según el código de error devuelto por Firebase
    switch (error.code) {
      case 'auth/user-not-found':
        document.getElementById('mensaje').textContent = "No se encontró ninguna cuenta con ese correo. Verifica la dirección.";  // Error: usuario no encontrado
        break;
      case 'auth/invalid-email':
        document.getElementById('mensaje').textContent = "Correo electrónico inválido. Verifica tu dirección de correo.";  // Error: correo inválido
        break;
      default:
        document.getElementById('mensaje').textContent = "Error al recuperar la contraseña. Intenta nuevamente.";  // Mensaje genérico de error
        break;
    }
  }
}
