function processPelicula(pelicula) {
    //console.log("verPeliculas.js -> ", pelicula);
    //console.log("verPeliculas.js -> ", pelicula.Title);

    //Crear tarjeta de la pelicula con los datos Poster, Title, Year, Genre, Director, Runtime, imdbRating

    //1. Crear la tarjeta
    const nuevaCard = document.createElement("div");//Crea un elemento de tipo div
    nuevaCard.setAttribute("class", "card");

    //2. Crear la imagen
    const nuevaImg = document.createElement("img");
    nuevaImg.setAttribute("src", pelicula.Poster);
    nuevaImg.setAttribute("alt", `Póster de la película ${pelicula.Title}`);
    nuevaCard.appendChild(nuevaImg);

    //3. Crear el contenido de la tarjeta
    const nuevoContenido = document.createElement("div");
    nuevoContenido.setAttribute("class", "card-content");
    nuevaCard.appendChild(nuevoContenido);

    //4. Crear el h3 del título <h3>El Padrino</h3>
    const nuevoTitulo = document.createElement("h3");
    nuevoTitulo.textContent = pelicula.Title;
    nuevoContenido.appendChild(nuevoTitulo);

    //5. Año <p><strong>Año:</strong> 1972</p>
    const nuevoParrafoAnyo = document.createElement("p");
    const nuevaNegritaAnyo = document.createElement("strong");
    nuevoParrafoAnyo.appendChild(nuevaNegritaAnyo);
    nuevaNegritaAnyo.textContent = "Año: ";
    nuevoContenido.appendChild(nuevoParrafoAnyo);
    const textoAnyo = document.createTextNode(pelicula.Year)
    nuevoParrafoAnyo.appendChild(textoAnyo);

    //6. Género <p><span class="genre">Género:</span> Drama, Crimen</p>
    const nuevoParrafoGenero = document.createElement("p");
    const nuevoSpanGenero = document.createElement("span");
    nuevoSpanGenero.setAttribute("class","genre");
    nuevoSpanGenero.textContent = "Género: ";
    nuevoParrafoGenero.appendChild(nuevoSpanGenero);
    nuevoParrafoGenero.appendChild(document.createTextNode(pelicula.Genre));
    nuevoContenido.appendChild(nuevoParrafoGenero);

    //7. Director <p><span class="genre">Director:</span> Nombre director</p>
    const nuevoParrafoDirector = document.createElement("p");
    const nuevoSpanDirector = document.createElement("span");
    nuevoSpanDirector.setAttribute("class","genre");
    nuevoSpanDirector.textContent = "Director: ";
    nuevoParrafoDirector.appendChild(nuevoSpanDirector);
    nuevoParrafoDirector.appendChild(document.createTextNode(pelicula.Director));
    nuevoContenido.appendChild(nuevoParrafoDirector);

    //8. Runtime <p><span class="genre">Duración:</span> Duración pelicula</p>
    const nuevoParrafoRuntime = document.createElement("p");
    const nuevoSpanRuntime = document.createElement("span");
    nuevoSpanRuntime.setAttribute("class","genre");
    nuevoSpanRuntime.textContent = "Duración: ";
    nuevoParrafoRuntime.appendChild(nuevoSpanRuntime);
    nuevoParrafoRuntime.appendChild(document.createTextNode(pelicula.Runtime));
    nuevoContenido.appendChild(nuevoParrafoRuntime);

    //9. imdbRating <p><span class="genre">Rating:</span> Puntuación</p>
    const nuevoParrafoRating = document.createElement("p");
    const nuevoSpanRating = document.createElement("span");
    nuevoSpanRating.setAttribute("class","genre");
    nuevoSpanRating.textContent = "Rating: ";
    nuevoParrafoRating.appendChild(nuevoSpanRating);
    nuevoParrafoRating.appendChild(document.createTextNode(pelicula.imdbRating));
    nuevoContenido.appendChild(nuevoParrafoRating);

    //Último paso: Agregar al contenedor la ficha recién creada
    document.querySelector("#container").appendChild(nuevaCard);//Agregamos el div al contenedor
}

document.querySelector("#volver").addEventListener("click", () => {
    history.back();
})
    
const urlParams = new URLSearchParams(window.location.search);
const tituloPelicula = urlParams.get("peli");
console.log("verPeliculas.js -> ", tituloPelicula);

//https://www.omdbapi.com/
//https://www.omdbapi.com/?apikey=45ee35c9&s="spider-man"

//https://www.omdbapi.com/?apikey=45ee35c9&t="Spider-Man"
//https://www.omdbapi.com/?apikey=45ee35c9&t="Spider-Man:%20Homecoming"


//Hacer Fetch
//let URL = 'https://www.omdbapi.com/?apikey=45ee35c9';
let URL = 'https://www.omdbapi.com/?apikey=' + getApiKey();
let nuevaURL = `${URL}&t=${tituloPelicula}`;
console.log("verPelicula.js -> ", nuevaURL);
console.log("verPelicula.js api_key -> ", getApiKey());
//Esto funciona si lo hacemos con sessionStorage y se ve en el inspector en almacenamiento. OK

//console.log("verPelicula.js api_key 2 ->", API_KEY_STORAGE_KEY);
//console.log("verPelicula.js api_key 2 ->", localStorage.getItem('api_key'));
//console.log("verPelicula.js localStorage ->", window.localStorage);
doGetRequest(nuevaURL, processPelicula);
