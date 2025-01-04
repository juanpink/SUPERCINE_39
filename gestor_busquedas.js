/* Variables JUANMA para paginación */
const PELIS_POR_PAGINA = 10;

let numPelis = 0;
let numPaginas = 0;
let paginaActual = 1;


//Obtención de películas de OMDB
document.querySelector("#b-buscar-omdb").addEventListener("click", () => {
    let tituloBuscado = document.querySelector("#t-titulo-omdb").value;
    let apikey = document.querySelector("#t-apikey").value;
    storeApiKey(apikey);//Almacenamos la apikey en el localstorage
    let nuevaURL = `${URL}${apikey}&s=${tituloBuscado}`;
    doGetRequest(nuevaURL, processMovie);

    //Lo hago para obtener el número de páginas
    doGetRequest(nuevaURL, processPages);
})

//Busqueda por Título, escribiendo en la caja de texto
document.querySelector("#t-titulo").addEventListener("input", () => {
    filtrarPeliculas("#t-titulo", "Title");
});

//Busqueda por Género, cambiando la selección del desplegable
document.querySelector("#s-tipo").addEventListener("change", () => {
    filtrarPeliculas("#s-tipo", "Type");
});

//Busqueda por Año, pulsando el botón Buscar
document.querySelector("#b-anyo").addEventListener("click", () => {
    filtrarPeliculas("#t-anyo", "Year");
});

document.querySelector("#b-reiniciar").addEventListener("click", () => {
    document.querySelector("#t-titulo").value = "";
    filtrarPeliculas("#t-titulo", "Title");
})

/**
 * Función de búsqeuda 
 * 
 * @param {*} idElementoBusqueda Nombre del elemento en el que está el texto de búsqueda
 * @param {*} nombreAtributoBusqueda Nombre del atributo del JSON sobre el que hay que buscar
 */
function filtrarPeliculas(idElementoBusqueda, nombreAtributoBusqueda) {
    clearCards();
    const textoBusqueda = document.querySelector(idElementoBusqueda).value;
    peliculasFiltradas =
        peliculas.filter(pelicula =>
            pelicula[nombreAtributoBusqueda]
                .toUpperCase()
                .includes(textoBusqueda.trim().toUpperCase()));
    peliculasFiltradas.map(generateCard);
}

/* JUANMA PAGINACION */
//Función para obtener número de páginas
function processPages(data) {
    //console.log("Número de registros -> ", data.totalResults);
    //spider-man = 386, naranja = 28
    numPelis = data.totalResults;
    numPaginas = Math.trunc(numPelis/PELIS_POR_PAGINA) +1;
}

//Obtención de películas de OMDB por página anterior
document.querySelector("#b-anterior").addEventListener("click", () => {
    //console.log("Página Actual -> ", paginaActual);
    //console.log("Anterior -> ", paginaActual-1);
    paginaActual--;

    let tituloBuscado = document.querySelector("#t-titulo-omdb").value;
    let apikey = document.querySelector("#t-apikey").value;
    let nuevaURL = `${URL}${apikey}&s=${tituloBuscado}&page=${paginaActual}`;

    paginaActual === 0 ? paginaActual = 1 : doGetRequest(nuevaURL, processMovie);
})

//Obtención de películas de OMDB por página anterior
document.querySelector("#b-siguiente").addEventListener("click", () => {
    //console.log("Página Actual -> ", paginaActual);
    //console.log("Siguiente -> ",paginaActual+1);
    paginaActual++;

    let tituloBuscado = document.querySelector("#t-titulo-omdb").value;
    let apikey = document.querySelector("#t-apikey").value;
    let nuevaURL = `${URL}${apikey}&s=${tituloBuscado}&page=${paginaActual}`;

    paginaActual > numPaginas ? paginaActual = numPaginas : doGetRequest(nuevaURL, processMovie);
})