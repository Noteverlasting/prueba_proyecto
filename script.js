const draggables = document.querySelectorAll('.draggable');
const dropArea = document.getElementById('drop-area');
const checkBtn = document.getElementById('check');
const feedback = document.getElementById('feedback');

// DRAG & DROP
draggables.forEach(elem => {
  elem.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData("text/plain", e.target.dataset.tag);
  });
});

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  const tag = e.dataTransfer.getData("text/plain");
  const newElem = document.createElement("div");
  newElem.textContent = tag;
  dropArea.appendChild(newElem);
});

// COMPROBAR RESPUESTA
checkBtn.addEventListener('click', () => {
  const insertedTags = Array.from(dropArea.children).map(child => child.textContent.trim());
  const correctSequence = ["<h1>", "</h1>", "<p>", "</p>"];

  if (JSON.stringify(insertedTags) === JSON.stringify(correctSequence)) {
    feedback.textContent = "¡Correcto! Has reconstruido el HTML.";
    feedback.style.color = "lime";
  } else {
    feedback.textContent = "Algo no está bien… prueba otro orden.";
    feedback.style.color = "red";
  }
});
