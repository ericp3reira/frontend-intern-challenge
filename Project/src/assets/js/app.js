// Mapeia algumas tags do DOM que serão usadas
const linkBtn = document.querySelector(".link-form-btn");
const linkBtnText = document.querySelector(".link-form-btn-text");
const linkInput = document.querySelector(".link-form-input");
const listItemUrl = document.querySelectorAll(".top5-list-item-url");
const listItemHits = document.querySelectorAll(".top5-list-item-hits");
const linkResult = document.querySelector(".link-form-result");
const linkResultText = document.querySelector(".link-form-result-text");
const linkResultClose = document.querySelector(".link-form-result-close");

// Adquire o JSON de links e põe os dados no DOM
document.addEventListener("DOMContentLoaded", () => getLinksJSON(), false);

// Limpa o input quando o usuário seleciona
linkInput.addEventListener("click", () => {
  if (linkBtnText.textContent === "ENCURTAR") {
    linkInput.value = "";
  }
});

// Volta para o input quando o usuário clica
// no ícone para fechar a url encurtada
linkResultClose.addEventListener("click", () => showInput());

// Faz a animação e a transformação do input
// e do botão usando JS
linkBtn.addEventListener("click", () => {
  event.preventDefault();
  if (linkBtnText.textContent === "ENCURTAR") {
    linkBtnText.style.opacity = 0;
    linkInput.style.opacity = 0;
    linkResultText.textContent = generateUrl();
    setTimeout(() => {
      linkBtnText.textContent = "COPIAR";
      linkBtnText.style.opacity = 1;
      linkResult.style.display = "block";
      linkInput.style.display = "none";
      linkResultText.style.opacity = 1;
      linkResultClose.style.opacity = 1;
    }, 300);
  } else {
    copyToClipboard();
    showInput();
  }
});

// Volta o encurtador ao estado inicial da página
const showInput = () => {
  linkResultText.style.opacity = 0;
  linkResultClose.style.opacity = 0;
  linkBtnText.style.opacity = 0;
  linkInput.value = "Cole o seu link aqui";
  setTimeout(() => {
    linkBtnText.textContent = "ENCURTAR";
    linkBtnText.style.opacity = 1;
    linkInput.style.display = "block";
    linkResult.style.display = "none";
    linkInput.style.opacity = 1;
  }, 300);
};

// Gera a url encurtada aleatoriamente
const generateUrl = () => {
  let url = "http://chr.dc/";
  for (let i = 0; i < 6; i++) {
    url +=
      Math.random() * 2 < 1 // 0~1 para letra, 1~2 para número
        ? String.fromCharCode(Math.floor(Math.random() * 26) + 97) // Alfabeto em ascii
        : Math.floor(Math.random() * 9); // 0 a 9
  }
  return url;
};

// Copia a url encurtada para o clipboard
const copyToClipboard = () => {
  linkInput.select();
  document.execCommand("Copy");
  alert("Copiado!");
};

// Manipula o JSON de links
const getLinksJSON = () => {
  const request = new Request("./assets/data/urls.json"); // Acessa o JSON
  fetch(request) // Gera a promise para o request
    .then(response => response.json())
    // Dados do JSON transformados em array
    .then(data => {
      let links = data;
      // Ordena pelo número de hits
      links.sort((a, b) => {
        return a.hits < b.hits ? 1 : -1;
      });
      // Popula o Top 5 com links
      for (let i = 0; i < 5; i++) {
        listItemUrl[i].textContent = links[i].shortUrl;
        listItemUrl[i].href = links[i].url;
        listItemHits[i].textContent = links[i].hits;
      }
      // Array com hits de todos os links do JSON
      let hits = links.map(link => link.hits);
      // Soma os hits e mostra no DOM,
      // de acordo com o país
      document.querySelector(".hits-counter").textContent = hits
        .reduce((sum, hits) => sum + hits)
        .toLocaleString();
    });
};
