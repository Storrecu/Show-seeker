// 'use strict';

// const defaultUrl = 'https://api.tvmaze.com/search/shows?q=Simpsons';

// // Función con la que se pretende mostrar los resultados de una búsqueda por defecto, para que no se vea la páhina vacía al arrancarla
// function loadDefaultShow() {
//   fetch(defaultUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       showsList = data;
//       renderShow();
//     });
// }
// loadDefaultShow();

// const renderList = (resultsList) => {
//   listFav.innerHTML = '';
//   for (const item of resultsList) {
//     let showElement = '';
//     showElement += `
//             <li id="${item.show.id}" class="js-card" >
//             <img class="js-card-img" src="${
//               item.show.image
//                 ? item.show.image.medium
//                 : '//via.placeholder.com/210x295/ffffff/666666/?text=TV'
//             }"/>
//             <h2 class="js-card-title">${item.show.name} </h2>`;
//     showElement += '</li>';
//     listForm.innerHTML += showElement;
//   }
// };

// const renderFavs = (favList) => {
//   listFav.innerHTML = '';
//   for (const item of favList) {
//     let showElement = '';
//     showElement += `
//     <li id="${item.show.id}" class="js-fav">
//     <span class="js-fav-cross"> X </span>
//     <img class="js-fav-img" src="${
//       item.show.image
//         ? item.show.image.medium
//         : '//via.placeholder.com/210x295/ffffff/666666/?text=TV'
//     }" />
//     <h2 class="js-fav-title" >${item.show.name}</h2> `;
//     showElement += '</li>';
//     listFav.innerHTML += showElement;
//   }
// };
