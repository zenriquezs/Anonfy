firebase.firestore().collection("mensajes").orderBy("fecha", "desc").onSnapshot(snapshot => {
  const contenedor = document.getElementById("mensajes");
  contenedor.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.marginBottom = "10px";
    div.style.padding = "10px";
    div.innerHTML = `
      <p>${data.mensaje}</p>
      <small>${data.anonimo ? "🕵️‍♂️ Anónimo" : "👤 " + data.nombre}</small>
      <br><small>${new Date(data.fecha).toLocaleString()}</small>
    `;
    contenedor.appendChild(div);
  });
});
