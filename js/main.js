'use strict';

//Variables y constantes:

//Elementos de HTML que nos traemos a JS:
const input = document.querySelector('.js-input-search');
const btnSearch = document.querySelector('.js-btn-search');
const listForm = document.querySelector('.js-form-list'); // carta que muestra la serie que has buscado
const listFav = document.querySelector('.js-fav-list'); // lista que almacenará los favoritos

//Imagen de apoyo en caso que data no retorne una imagen de la serie:
const defaultImageHTML =
  '<img class="search_img" src="//via.placeholder.com/210x295/ffffff/666666/?text=TV';

//Otras variables:
let showsList = [];
const inputValue = input.value;
const URL = `https://api.tvmaze.com/search/shows?q=${inputValue}`;

//Peticiones al servidor:

function getDataApi() {
  // if (response) {
  //   //comprobación de si hay info en localStorage
  // } else {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      showsList = data; // data es el elemento recibido de la API
      renderShow(showsList);
      localStorage.setItem('shows', JSON.stringify(showsList));
    });
}
// }

//Funciones:

// La función renderShow chace varias tareas: 1. revisa si se recibe respuesta del API tomando como parámetro el array que guarda la respuesta y 2. recorre la respuesta del API para poder renderizar contenido en el HTML.
function renderShow(showsList) {
  getDataApi();
  let content = '';
  if (showsList.length > 0) {
    for (const showItem of showsList) {
      content += `<h2> ${showItem.show.name} </h2>`;
      content += `<img ${showItem.image.medium}/>`;
    }
  } else {
    content += 'ha habido un error';
  }
  return content;
}

//Funciones manejadoras:

function handleSearchButton(event) {
  event.preventDefault();
  getDataApi();
  renderShow();
}

//Eventos:
btnSearch.addEventListener('click', handleSearchButton);
