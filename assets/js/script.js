// Mostrar o esconder el input de nombre
document.querySelectorAll('input[name="tipo"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const inputNombre = document.getElementById('nombreUsuario');
    inputNombre.classList.toggle('hidden', radio.value !== 'publico');
  });
});

// Función para mostrar el toast
function mostrarToast(mensaje, tiempo = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = mensaje;
  toast.classList.remove('hidden');
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 500);
  }, tiempo);
}

// Enviar mensaje
document.getElementById('enviar').addEventListener('click', async () => {
  const mensaje = document.getElementById('mensaje').value.trim();
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  const nombre = document.getElementById('nombreUsuario').value.trim();

  if (!mensaje) return mostrarToast("✉️ Escribe un mensaje antes de enviar");

  const doc = {
    mensaje,
    anonimo: tipo === "anonimo",
    nombre: tipo === "publico" ? nombre : null,
    fecha: new Date().toISOString()
  };

  try {
    await firebase.firestore().collection("mensajes").add(doc);
    mostrarToast("✅ Mensaje enviado");
    document.getElementById('mensaje').value = "";
    document.getElementById('nombreUsuario').value = "";
  } catch (error) {
    console.error("Error al enviar:", error);
    mostrarToast("❌ Hubo un error al enviar");
  }
});
