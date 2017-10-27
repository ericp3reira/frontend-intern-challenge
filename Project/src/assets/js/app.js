const linkBtn = document.querySelector(".link-form-btn");
const linkBtnText = document.querySelector(".link-form-btn-text");
const linkInput = document.querySelector(".link-form-input");
const listItemUrl = document.querySelectorAll(".top5-list-item-url");
const listItemHits = document.querySelectorAll(".top5-list-item-hits");
const linkResult = document.querySelector(".link-form-result");
const linkResultText = document.querySelector(".link-form-result-text");
const linkResultClose = document.querySelector(".link-form-result-close");

document.addEventListener("DOMContentLoaded", () => getLinksJSON(), false);

linkInput.addEventListener("click", () => {
  if (linkBtnText.textContent === "ENCURTAR") {
    linkInput.value = "";
  }
});

linkResultClose.addEventListener("click", () => showInput());

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

const generateUrl = () => {
  let url = "http://chr.dc/";
  for (let i = 0; i < 6; i++) {
    url +=
      Math.random() * 2 < 1
        ? String.fromCharCode(Math.floor(Math.random() * 26) + 97)
        : Math.floor(Math.random() * 9);
  }
  return url;
};

const copyToClipboard = () => {
  linkInput.select();
  document.execCommand("Copy");
  alert("Copiado!");
};

const getLinksJSON = () => {
  const request = new Request("./assets/data/urls.json");
  fetch(request)
    .then(response => response.json())
    .then(data => {
      let links = data;
      links.sort((a, b) => {
        return a.hits < b.hits ? 1 : -1;
      });
      for (let i = 0; i < 5; i++) {
        listItemUrl[i].textContent = links[i].shortUrl;
        listItemUrl[i].href = links[i].url;
        listItemHits[i].textContent = links[i].hits;
      }
      let hits = links.map(link => link.hits);
      document.querySelector(".hits-counter").textContent = hits
        .reduce((sum, hits) => sum + hits)
        .toLocaleString();
    });
};
