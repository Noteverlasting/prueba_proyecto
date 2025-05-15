const draggables = document.querySelectorAll('.draggable');
const dropSlots = document.querySelectorAll('.drop-slot');
const checkBtn = document.getElementById('check');
const resetBtn = document.getElementById('reset');
const feedback = document.getElementById('feedback');

// DRAG & DROP
draggables.forEach(elem => {
  elem.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData("text", e.target.dataset.tag);
  });
});

// Manejo del drop
dropSlots.forEach(slot => {
  slot.addEventListener('dragover', (e) => {
    e.preventDefault(); // Necesario para permitir el drop
  });

  slot.addEventListener('drop', (e) => {
    e.preventDefault();
    const tag = e.dataTransfer.getData("text"); // Obtenemos el tag de la etiqueta arrastrada

    // Si ya hay una etiqueta en este slot, no hacemos nada
    if (slot.children.length > 0) {
      return; // Si ya tiene una etiqueta, no hacemos nada
    }

    // Si no hay etiqueta, la insertamos
    const newElem = document.createElement("div");
    newElem.textContent = tag; // Le asignamos el contenido del tag
    newElem.classList.add("inserted-tag"); // Clase para marcar que ya está insertada
    newElem.setAttribute("draggable", "false"); // Deshabilitamos el arrastre después de soltarla

    // Agregamos la nueva etiqueta al slot
    slot.appendChild(newElem);
  });
});

// COMPROBAR RESPUESTA
checkBtn.addEventListener('click', () => {
  const openTitle = document.querySelector('[data-slot="open-title"]');
  const closeTitle = document.querySelector('[data-slot="close-title"]');
  const openPara = document.querySelector('[data-slot="open-paragraph"]');
  const closePara = document.querySelector('[data-slot="close-paragraph"]');

  const contentTitle = document.querySelector('#drop-area-title .html-content');
  const contentPara = document.querySelector('#drop-area-paragraph .html-content');

  const tags = {
    titleOpen: openTitle.textContent.trim(),
    titleClose: closeTitle.textContent.trim(),
    paraOpen: openPara.textContent.trim(),
    paraClose: closePara.textContent.trim()
  };

  const isTitleCorrect = tags.titleOpen === "<h1>" && tags.titleClose === "</h1>";
  const isParaCorrect = tags.paraOpen === "<p>" && tags.paraClose === "</p>";

  // Verificación de las etiquetas (Coloreado)
  if (isTitleCorrect) {
    contentTitle.classList.add("correct");
    contentTitle.classList.remove("incorrect");
  } else {
    contentTitle.classList.add("incorrect");
    contentTitle.classList.remove("correct");
  }

  if (isParaCorrect) {
    contentPara.classList.add("correct");
    contentPara.classList.remove("incorrect");
  } else {
    contentPara.classList.add("incorrect");
    contentPara.classList.remove("correct");
  }

  // Mensaje de feedback
const dialog = document.getElementById('npc-dialog-text');
const anotacion = document.querySelector('.anotacion');  // Seleccionamos la anotación
const npc = document.querySelector('.npc'); //selecionamos el npc

if (isTitleCorrect && isParaCorrect) {
  dialog.textContent = "✅ ¡Correcto! Has estructurado el HTML.";
  dialog.style.color = "#00ff99";
  anotacion.style.display = "none"; // Ocultamos la anotación
  npc.classList.add('paused-glitch'); // Pausamos la animación del glitch
} else {
  dialog.textContent = "❌ Algo no está bien… revisa las etiquetas.";
  dialog.style.color = "#ff4444";
  
}

  // Quitar animaciones después de un tiempo
  setTimeout(() => {
    contentTitle.classList.remove("correct", "incorrect");
    contentPara.classList.remove("correct", "incorrect");
  }, 1000);
});

// Botón de reset
resetBtn.addEventListener('click', () => {
  // Limpiamos todos los slots
  dropSlots.forEach(slot => {
    slot.innerHTML = ''; // Elimina cualquier etiqueta existente
  });

  // Restauramos los elementos arrastrables
  draggables.forEach(elem => {
    elem.setAttribute("draggable", "true"); // Volver a habilitar el drag
  });

  // Limpiar el feedback
  feedback.textContent = '';
});
