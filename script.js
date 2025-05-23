const draggables = document.querySelectorAll('.draggable');
const dropSlots = document.querySelectorAll('.drop-slot');
const checkBtn = document.getElementById('check');
const feedback = document.getElementById('feedback');

// DRAG & DROP
draggables.forEach(elem => {
  elem.addEventListener('dragstart', (e) => {
    // Guardamos el id o el tag en el que estamos arrastrando
    e.dataTransfer.setData("text", e.target.dataset.tag);
    e.target.classList.add('dragging'); // Establecemos la clase para visualización
  });

  elem.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
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

    // Verificamos si ya hay una etiqueta en este slot
    const existingTag = slot.querySelector('.inserted-tag');
    if (existingTag) {
      // Si ya hay una etiqueta en el slot, no hacemos nada
      return;
    }

    // Si no hay etiqueta, creamos una nueva etiqueta en el slot
    const newElem = document.createElement("div");
    newElem.textContent = tag; // Le asignamos el contenido del tag
    newElem.classList.add("inserted-tag"); // Aseguramos que esta es la etiqueta insertada
    newElem.setAttribute("draggable", "true"); // Permitimos que sea arrastrable de nuevo
    newElem.dataset.tag = tag; // Guardamos el tag de la etiqueta

    // Hacemos que esta etiqueta también sea arrastrable
    newElem.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData("text", tag);
      e.target.classList.add('dragging');
    });

    newElem.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
    });

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

  if (isTitleCorrect && isParaCorrect) {
    feedback.textContent = "¡Correcto! Has estructurado el HTML.";
    feedback.style.color = "#00ff99";
  } else {
    feedback.textContent = "Algo no está bien… revisa las etiquetas.";
    feedback.style.color = "#ff4444";
  }

  // Quitar animaciones después de un tiempo
  setTimeout(() => {
    contentTitle.classList.remove("correct", "incorrect");
    contentPara.classList.remove("correct", "incorrect");
  }, 1000);
});
