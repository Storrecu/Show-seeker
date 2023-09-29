'use strict';

//Variables y constantes:

//Elementos de HTML que nos traemos a JS:
const input = document.querySelector('.js-input-search'); // casilla de búsqueda
const btnSearch = document.querySelector('.js-btn-search'); // botón para buscar
const listForm = document.querySelector('.js-form-list'); // lista que muestra la serie que has buscado
const listFav = document.querySelector('.js-fav-list'); // lista que almacenará los favoritos

//Otras variables:
const defaultImageHTML =
  '<img class="search_img" src="//via.placeholder.com/210x295/ffffff/666666/?text=TV'; // Imágen de respaldo
const URL = '//api.tvmaze.com/singlesearch/shows?q='; //URL de la API

//Funciones:
function renderShow() {
  let showsList = [];
  const inputValue = input.value;
  const URL = `//api.tvmaze.com/search/shows?q=${inputValue}`;
  if (inputValue !== '') {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        showsList = data;

        listForm.innerHTML = '';
        for (const item of showsList) {
          const showElement = document.createElement('div');
          showElement.innerHTML = `
          <h2> ${item.show.name} </h2>
          <img src="${
            item.show.image
              ? item.show.image.medium
              : '//via.placeholder.com/210x295/ffffff/666666/?text=TV'
          }"/> `;
          listForm.appendChild(showElement);
        }
      });
  } else {
    listForm.innerHTML = 'Write any TV show to start';
  }
}

//Funciones manejadoras:
function handleSearchButton(event) {
  event.preventDefault();
  renderShow();
}

//Eventos:
btnSearch.addEventListener('click', handleSearchButton);
