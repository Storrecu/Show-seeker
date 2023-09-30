'use strict';

//VARIABLES:
//Elementos de HTML que nos traemos a JS:
const input = document.querySelector('.js-input-search'); // casilla de búsqueda
const btnSearch = document.querySelector('.js-btn-search'); // botón para buscar
const listForm = document.querySelector('.js-form-list'); // lista que muestra la serie que has buscado
const listFav = document.querySelector('.js-fav-list'); // lista que almacenará los favoritos

//Otras variables:
const defaultImageHTML =
  '<img class="search_img" src="//via.placeholder.com/210x295/ffffff/666666/?text=TV'; // Imágen de respaldo
const URL = '//api.tvmaze.com/search/shows?q='; //URL de la API
let favList = []; //lista de favoritos
let showsList = []; // lista de resultados

/* Con este bloque de código, compruebo al arrancar la página, que hayan datos en el local stroage. favList es la variable que tiene la lista de favoritos. Cuando storedFavorites tiene datos, los copiamos a favList y luego llamamos a la función renderFavouriteShows(favList) para mostrarlos en el HTML */
const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
if (storedFavorites) {
  favList = storedFavorites;
  renderFavouriteShows(favList);
} else {
  renderShow();
}

//FUNCIONES:
//Función para pintar la lista de resultados:
function renderShow() {
  const inputValue = input.value;
  const URL = `//api.tvmaze.com/search/shows?q=${inputValue}`;

  if (inputValue !== '') {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        showsList = data;
        //Compruebo que lo buscado coincide con los datos que contiene la respuesta
        listForm.innerHTML = '';
        if (data.length === 0) {
          listForm.innerHTML = 'No matches found.Try a diferent TV show';
        } else {
          //En caso que lo que busco, coincida con la info que tiene la respuesta lo pinto en el HTML
          listForm.innerHTML = '';
          for (const item of showsList) {
            let showElement = '';
            showElement += `
            <div id="${item.show.id}" class="js-card" >
            <img class="img" src="${
              item.show.image
                ? item.show.image.medium
                : '//via.placeholder.com/210x295/ffffff/666666/?text=TV'
            }"/> 
            <h2> ${item.show.name} </h2>`;
            showElement += '</div>';
            listForm.innerHTML += showElement;
          }
          addToFavourites();
        }
      });
  } else {
    listForm.innerHTML = 'Write any TV show to start';
  }
}
//Función para pintar la lista de favoritos:
function renderFavouriteShows(favoritesShows) {
  listFav.innerHTML = '';
  for (const item of favoritesShows) {
    let showElement = '';
    showElement += `
    <div id="${item.show.id}" class="js-fav">
    <span class="cross"> X </span> 
    <img src="${
      item.show.image
        ? item.show.image.medium
        : '//via.placeholder.com/210x295/ffffff/666666/?text=TV'
    }" 
    <h2> ${item.show.name} </h2>`;
    showElement += '</div>';
    listFav.innerHTML += showElement;
  }
}

//llamamos a todos los div con clase js-card, se les añade evento listener tipo click.
const addToFavourites = () => {
  const allShows = document.querySelectorAll('.js-card');
  for (const item of allShows) {
    item.addEventListener('click', handleClickShow);
  }
};

//FUNCIONES MANEJADORAS:
//Función manejadora del botón de "buscar":
function handleSearchButton(event) {
  event.preventDefault();
  renderShow();
}

//Función manejadora al hacer click sobre los divs o cartas de las series:
function handleClickShow(event) {
  event.preventDefault();
  const idShow = event.currentTarget.id;
  let foundShow = showsList.find((item) => item.show.id.toString() === idShow);
  const indexFav = favList.findIndex(
    (item) => item.show.id === foundShow.show.id
  );
  //Si no está (-1) lo añade
  if (indexFav === -1) {
    favList.push(foundShow);
    //Si está lo eliminará
  } else {
    favList.splice(indexFav, 1);
  }
  localStorage.setItem('favorites', JSON.stringify(favList)); // guardamos en local storage las series añadidas a favoritos. La llamamos aquí porque es en este punto donde de generan cambios en la lista de favoritos
  renderFavouriteShows(favList);
}

function handleClickDelete() {
  listFav.innerHTML = '';
}

//Con esta función manejadora del input, quitamos el mensaje de error, si se inicia búsqueda sin rellenar input
function handleInput() {
  listForm.innerHTML = '';
}

const crossDeleteFavs = () => {
  const deletAllFavs = document.querySelectorAll('.cross');
  for (const item of deletAllFavs) {
    item.addEventListener('click', handleClickDelete);
  }
};

//Eventos:
btnSearch.addEventListener('click', handleSearchButton);
input.addEventListener('change', handleInput);
