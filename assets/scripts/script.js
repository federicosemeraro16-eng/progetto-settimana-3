const lista = document.querySelector(".ex-list");
const inputForm = document.querySelector("#inputForm");
const headerSpan = document.querySelector(".header-span");
const searchEx = document.querySelector("#searchEx");

const allenamenti = [];

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(headerSpan);

  const nomeEx = inputEx.value.trim();
  const giorno = daySelect.value;
  const serie = seriesInp.value;
  const ripetizioni = repInp.value;

  if (!nomeEx || !giorno || !serie || !ripetizioni) {
    headerSpan.textContent = "Inserire tutti i campi";
    return;
  }

  headerSpan.textContent =
    "Imposta serie e ripetizioni per il tuo prossimo allenamento";

  createTraining(nomeEx, giorno, serie, ripetizioni);

  render();

  inputForm.reset();
});

const createTraining = (nome, giorno, serie, ripetizioni) => {
  const allenamento = {
    nome,
    giorno,
    serie,
    ripetizioni,
    completed: false,
    id: Date.now(),
  };

  allenamenti.push(allenamento);
};

const render = (array = allenamenti) => {
  lista.innerHTML = "";

  array.forEach((allenamento) => {
    console.log(allenamento);
    const newLi = document.createElement("li");
    newLi.textContent = allenamento.nome;
    const infoDiv = document.createElement("div");
    const actionsDiv = document.createElement("div");
    infoDiv.setAttribute("class", "info-Div");
    actionsDiv.setAttribute("class", "actions-Div");

    const daySpan = document.createElement("span");
    daySpan.textContent = `Giorno: ${allenamento.giorno}`;

    const serieSpan = document.createElement("span");
    serieSpan.textContent = `Serie: ${allenamento.serie}`;

    const repSpan = document.createElement("span");
    repSpan.textContent = `Ripetizioni: ${allenamento.ripetizioni}`;

    const statSpan = document.createElement("span");
    if (allenamento.completed === false) {
      statSpan.textContent = "Da fare";
    } else {
      statSpan.textContent = "Completato";
    }
    const editBtn = document.createElement("button");
    editBtn.textContent = "Modifica";
    editBtn.dataset.id = allenamento.id;

    const markedButton = document.createElement("button");
    if (allenamento.completed === false) {
      markedButton.textContent = "Contrassegna come fatto";
    } else {
      markedButton.textContent = "Segna come da fare";
    }
    markedButton.dataset.id = allenamento.id;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Elimina";
    deleteBtn.dataset.id = allenamento.id;

    infoDiv.append(daySpan, serieSpan, repSpan, statSpan);
    actionsDiv.append(editBtn, deleteBtn, markedButton);
    newLi.append(infoDiv, actionsDiv);

    lista.appendChild(newLi);
  });
};

searchEx.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();

  const filtered = allenamenti.filter((allenamento) => {
    return allenamento.nome.toLowerCase().includes(searchTerm);
  });
  console.log(filtered);

  render(filtered)
});
