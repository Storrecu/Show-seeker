/* eslint-disable indent */
/* eslint-disable no-unused-vars */
'use strict';

//Elementos de HTML que nos traemos a JS:
const input = document.querySelector('.js-input-search'); // casilla de búsqueda
const btnSearch = document.querySelector('.js-btn-search'); // botón para buscar
const listForm = document.querySelector('.js-form-list'); // lista que muestra la serie que has buscado
const listFav = document.querySelector('.js-fav-list'); // lista que almacenará los favoritos
const btnDelete = document.querySelector('.js-delete-fav'); // botón para eliminar lista de favoritos

//Otras variables:
let favList = []; //lista de favoritos
let showsList = []; // lista de resultados
const defaultUrl = 'https://api.tvmaze.com/search/shows?q=Simpsons';

// NOTE:Con este bloque de código, compruebo al arrancar la página, que hayan datos en el local stroage
const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
if (storedFavorites) {
  favList = storedFavorites;
  renderFavouriteShows(favList);
} else {
  renderShow();
}

// Función arrow con la que llamamos a todos los li con clase js-card y se les añade evento listener tipo click.
const addToFavourites = () => {
  const allShows = document.querySelectorAll('.js-card');
  for (const item of allShows) {
    item.addEventListener('click', handleClickShow);
  }
};

function loadDefaultShow() {
  fetch(defaultUrl)
    .then((response) => response.json())
    .then((data) => {
      showsList = data;
      renderShow();
    });
}
loadDefaultShow();

// :Función para pintar la lista de resultados:
function renderShow() {
  let inputValue = input.value;
  const URL = `//api.tvmaze.com/search/shows?q=${inputValue}`;

  if (inputValue !== '') {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        showsList = data;
        // NOTE:Compruebo que lo buscado coincide con los datos que contiene la respuesta
        listForm.innerHTML = '';
        if (data.length === 0) {
          listForm.innerHTML = 'No matches found.Try a diferent show';
        } else {
          // NOTE:En caso que lo que busco, coincida con la info que tiene la respuesta lo pinto en el HTML
          listForm.innerHTML = '';
          for (const item of showsList) {
            let showElement = '';
            showElement += `
            <li id="${item.show.id}" class="js-card" >
            <img class="js-card-img" src="${
              item.show.image
                ? item.show.image.medium
                : '//via.placeholder.com/210x295/ffffff/666666/?text=TV'
            }"/> 
            <h2 class="js-card-title">${item.show.name} </h2>`;
            showElement += '</li>';
            listForm.innerHTML += showElement;
          }
          addToFavourites();
        }
      });
  } else {
    listForm.innerHTML = 'Write any show to start';
  }
}
renderShow();

// Función para pintar la lista de favoritos:
function renderFavouriteShows() {
  listFav.innerHTML = '';
  for (const item of favList) {
    let showElement = '';
    showElement += `
    <li id="${item.show.id}" class="js-fav">
    <span class="js-fav-cross"> X </span>
    <img class="js-fav-img" src="${
      item.show.image
        ? item.show.image.medium
        : '//via.placeholder.com/210x295/ffffff/666666/?text=TV'
    }" /> 
    <h2 class="js-fav-title" >${item.show.name}</h2> `;
    showElement += '</li>';
    listFav.innerHTML += showElement;
  }
}

// Función arrow con la que añadimos evento listener a las X de las series de favoritos
const crossDeleteFavs = () => {
  listFav.addEventListener('click', handleClickDelete);
};

crossDeleteFavs(); // Llama a esta función una vez al inicio

// Función manejadora del botón 'Erase all'
function handleDeleteBtn() {
  listFav.innerHTML = '';
  favList = [];
  localStorage.clear();
}

// Función manejadora del botón de "Search"
function handleSearchButton(event) {
  event.preventDefault();
  renderShow();
}

// Función manejadora li dinámicos
function handleClickShow(event) {
  event.preventDefault();
  const idShow = event.currentTarget.id;
  let foundShow = showsList.find((item) => item.show.id.toString() === idShow);
  const indexFav = favList.findIndex(
    (item) => item.show.id === foundShow.show.id
  );
  const showElement = event.currentTarget; // NOTE: con esta variable cambia el estilo al hacer click
  if (indexFav === -1) {
    favList.push(foundShow);
    showElement.classList.add('is-favorite');
  } else {
    favList.splice(indexFav, 1);
    showElement.classList.remove('is-favorite');
  }
  localStorage.setItem('favorites', JSON.stringify(favList)); // NOTE: guardamos en local storage las series añadidas a favoritos. La llamo aquí porque es en este punto donde se generan cambios en la lista de favoritos
  renderFavouriteShows(favList);
}

// Función manejadora X dinámica
function handleClickDelete(event) {
  const clickedItemId = event.target.closest('.js-fav').id;

  if (event.target.classList.contains('js-fav-cross')) {
    const indexFav = favList.findIndex(
      (item) => item.show.id === parseInt(clickedItemId)
    );

    if (indexFav !== -1) {
      favList.splice(indexFav, 1);
      localStorage.setItem('favorites', JSON.stringify(favList)); // Actualiza el localStorage
      renderFavouriteShows(favList); // Actualiza la vista
    }

    event.target.parentElement.remove();
  }
}

// Función manejadora del input, para que el mensaje de error no esté siempre visible
function handleInput() {
  listForm.innerHTML = '';
}

// Eventos
btnDelete.addEventListener('click', handleDeleteBtn);
btnSearch.addEventListener('click', handleSearchButton);
input.addEventListener('change', handleInput);
