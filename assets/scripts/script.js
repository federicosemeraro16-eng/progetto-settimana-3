const lista = document.querySelector(".ex-list");
const inputForm = document.querySelector("#inputForm");
const headerSpan = document.querySelector(".header-span");
const searchEx = document.querySelector("#searchEx");
const selectStatus = document.querySelector("#selectStatus");
const dayResearch = document.querySelector("#dayResearch");
const submitBtn = document.querySelector("#submitBtn");
const notificationContainer = document.querySelector("#notification-container");
const switchModeBtn = document.querySelector('#switchModeBtn')

const allenamenti = [];
let editingID = null;

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();

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

  if (editingID) {
    const allenamento = allenamenti.find(
      (allenamento) => allenamento.id === editingID,
    );
    allenamento.nome = nomeEx;
    allenamento.giorno = giorno;
    allenamento.serie = serie;
    allenamento.ripetizioni = ripetizioni;

    showNotification('Esercizio modificato')

    editingID = null;
    submitBtn.textContent = "+ Aggiungi esercizio";
  } else {
    createTraining(nomeEx, giorno, serie, ripetizioni);

    showNotification('Esercizio aggiunto')
  }

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
    editBtn.dataset.action = "edit";

    const markedButton = document.createElement("button");
    if (allenamento.completed === false) {
      markedButton.textContent = "Contrassegna come fatto";
    } else {
      markedButton.textContent = "Segna come da fare";
    }
    markedButton.dataset.id = allenamento.id;
    markedButton.dataset.action = "toggle";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Elimina";
    deleteBtn.dataset.id = allenamento.id;
    deleteBtn.dataset.action = "delete";

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

  render(filtered);
});

selectStatus.addEventListener("change", (e) => {
  const status = e.target.value;
  if (status === "Allstates") {
    render();
  } else if (status === "completed") {
    render(allenamenti.filter((allenamento) => allenamento.completed));
  } else if (status === "toDo") {
    render(allenamenti.filter((allenamento) => !allenamento.completed));
  }
});

dayResearch.addEventListener("change", (e) => {
  const filterDay = e.target.value;
  if (filterDay === "") {
    render();
    return;
  }

  render(allenamenti.filter((allenamento) => allenamento.giorno === filterDay));
});

lista.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);
  const action = e.target.dataset.action;
  console.log(`Io sono ${action}`);
  if (action === "delete") {
    const index = allenamenti.findIndex((allenamento) => allenamento.id === id);
    allenamenti.splice(index, 1);
    showNotification('Esercizio eliminato')
    render();
  }

  if (action === "toggle") {
    const allenamento = allenamenti.find(
      (allenamento) => allenamento.id === id,
    );

    allenamento.completed = !allenamento.completed;

    showNotification('Esercizio contrassegnato')

    render();
  }

  if (action === "edit") {
    const allenamento = allenamenti.find(
      (allenamento) => allenamento.id === id,
    );
    editingID = id;
    inputEx.value = allenamento.nome;
    daySelect.value = allenamento.giorno;
    seriesInp.value = allenamento.serie;
    repInp.value = allenamento.ripetizioni;
    submitBtn.textContent = "Salva modifiche";
    
  }
});

const showNotification = (message) => {
  notificationContainer.innerHTML = "";
  const notification = document.createElement("span");
  notification.setAttribute("class", "notification-span");
  notification.textContent = message;
  notificationContainer.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 2000);
};

switchModeBtn.addEventListener('click',(e)=>{
  document.body.classList.toggle('dark-mode')
  if (document.body.classList.contains("dark-mode")) {
    switchModeBtn.textContent = "☀️ Modalità Chiara";
  } else {
    switchModeBtn.textContent = "🌙 Modalità Scura";
  }
})
