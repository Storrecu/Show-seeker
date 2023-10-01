
# Evaluación final módulo 2: JavaScript.
Bienvenida/o al proyecto de la evaluación final del módulo 2. 

## Objetivo:

En este proyecto el objetivo era crear un buscador de series, el cual, permite seleccionar una serie y guardarla en un listado de favoritos. 
En el listado de favoritos se puede implementar de forma opcional diversas formas de eliminar las series agregadas:
- pulsando la 'X' en el lateral de la imágen
- pulsando en botón 'Erase all' que además también vacía el localStorage del navegador.

! [Diagrama de flujo](https://raw.githubusercontent.com/Storrecu/modulo-2-evaluacion-final-Storrecu/main/assets/images/diagrama.png)

## Primer punto a cubrir: 

1. Crear una estructura básica que incluye: 
- Un título.
- Un input de tipo texto para introducir el nombre de la serie.
- Un botón para iniciar la búsqueda.
- Un listado que guardará los resultados obtenidos.

## Segundo punto a cubrir:

2. AL hacer click en el botón de buscar, hacer una petición a la URL: https://api.tvmaze.com/search/shows?q=girls
- Modificar la dirección de la URL para que se busque el valor introducido por el usuario en el input.
- Por cada resultado obtenido, hay que pintar una tarjeta donde mostraremos una imagen de la serie y su título.
- Poner una imágen por defecto en caso que el servidor retorne una serie sin imagen.

## Tercer punto a cubrir: 
3. Una vez aparecen los resultados de la búsqueda al hacer click en una de ellas se añade en la lista de favoritos. Al hacer click debe pasar lo siguiente: 
- El color de fondo y el de fuente se inetercambian, indicando que es una serie favorita. (**punto no logrado**)
- El listado de favoritos debe quedar en la parte izquierda de la pantalla bajo el formulario de busqueda. 
- Las series favoritas se siguen mostrando en la izquierda aunque los usuarios realicen otra búsqueda.

## Cuarto punto a curbir: 
4. En este punto, debíamos guardar el listado de favoritos en el localStorage del navegador, haciendo que aunque se refresque la página sigan apareciendo las series añadidas en favoritos.

## Quinto punto (BONUS): 
- Hacer funcional la X al lado de cada serie de la lista de favoritos de forma que se elimine la serie clicada también del localStorage. (**punto logrado parcialmente, no se elimina del localStorage**)
- Al hacer click sobre una serie de la lista de resultados, hacer que se añada o se elimine de la lista de favoritos.
- Al realizar una búsqueda nueva, si aparece alguna de las series que tenemos en favoritos, debe mantener el estilo resaltado comentado en el tercer punto. (**punto no logrado**)
- Incluir un botón que elimine toda la lista de favoritos.

## Sexto punto (BONUS):
Darle estilo a la página.

## Teconologías usadas: 

- HTML
- CSS
- JavaScript
- Adalab Starter Kit
- GitHub Pages

## Contribución: 
No dudes en hacer un pull request con aquellos cambios o mejoras que creas que puedan encajar en este proyecto. 
Así mismo, no seas una persona tímida y **¡déjame tu feedback!**

**Te estoy muy agradecida por tu tiempo y tu feedback.**


![Alt Text](https://media.giphy.com/media/cPRerhEQe5I0RTspX3/giphy.gif)





