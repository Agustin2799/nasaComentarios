document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("inputBuscar");
  const contenedor = document.getElementById("contenedor");
  const boton = document.getElementById("btnBuscar");

  function mostrarDatos(datos) {
    datos.collection.items.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("resultado");
      div.innerHTML = `
                <h1>${item.data[0].title}</h1>
                <img src="${item.links[0].href}" alt="Descripción de la imagen">
                <p>Descripción: ${item.data[0].description}</p>
                <p>Fecha: ${item.data[0].date_created}</p>
            `;
      contenedor.appendChild(div);
    });
  }
  boton.addEventListener("click", () => {
    const contenedor = document.getElementById("contenedor");

    contenedor.innerHTML = "";
    const valorInput = input.value;
    fetch(`https://images-api.nasa.gov/search?q=${valorInput}`)
      .then((response) => response.json())
      .then((data) => {
        mostrarDatos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const jsonCom = "comentarios.json";
  fetch(jsonCom)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      mostrarComentarios(data);
    });

  const botonEnvio = document.getElementById("enviarComentario");
  const comentario = document.getElementById("valorComentario");
  const emoji = document.getElementById("emoji");
  const usuario = document.getElementById("usuario");
  const divComentarios = document.getElementById("comentarios");

  botonEnvio.addEventListener("click", (e) => {
    e.preventDefault();
    const contComentario = document.createElement("div");
    contComentario.innerHTML += `<h3>${usuario.value}</h3><p>${comentario.value}</p><p>${emoji.value}</p>`;
    divComentarios.appendChild(contComentario);
  });
});
function mostrarComentarios(array) {
  const divComentarios = document.getElementById("comentarios");
  array.forEach((comentario) => {
    let divComentario = document.createElement("div");
    divComentario.classList.add("coment");
    divComentario.innerHTML = `<h3>${comentario.user}</h3><p>${
      comentario.description
    }</p><p>${emojis(comentario.score)}</p>`;
    divComentarios.appendChild(divComentario);
  });
}
function emojis(numero) {
  switch (numero) {
    case 0:
      return "💩";
    case 1:
      return "😒";
    case 2:
      return "😐";
    case 3:
      return "👍";
    case 4:
      return "😊";
    case 5:
      return "🔥";
    default:
      break;
  }
}
