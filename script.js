/* definimos un array vacio, donde vamos a volcar la info de todos los Pokemon */
let ALL_RESULTS = [];

/* definimos la variable que almacena el nodo del contenedor de todas las tarjetas de cada Pokémon */
const pokeContainer$$ = document.querySelector(".poke__container");

/* definimos un array con los colores que se van a asignar a cada tipo */
const typeColors = {
  electric: "#FFEA70",
  normal: "#B09398",
  fire: "#FF675C",
  water: "#0596C7",
  ice: "#AFEAFD",
  rock: "#999799",
  flying: "#7AE7C7",
  grass: "#4A9681",
  psychic: "#FFC6D9",
  ghost: "#561D25",
  bug: "#A2FAA3",
  poison: "#795663",
  ground: "#D2B074",
  dragon: "#DA627D",
  steel: "#1D8A99",
  fighting: "#2F2F2F",
  default: "#2A1A1F",
};

/* Construimos las dos funciones que van a tratar los datos de la API */

//hacemos la llamada a la API y guardarmos los datos en el array ALL_RESULTS
const callPokeAPI = async (id) => {

  const apiURL = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const pokeData = await fetch(apiURL);

  const pokeDataJSON = await pokeData.json();

  ALL_RESULTS.push(pokeDataJSON);

};

//iteramos sobre ID, el cual le pasamos cómo argumento a la función callPokeAPI, la cual va a almacenar los datos en el array ALL_RESULTS
const extractPokeData = async () => {

  for (let id = 1; id <= 151; id++) {

    await callPokeAPI(id);

  }

  drawPokeData(ALL_RESULTS);
};

/* pintamos todos las tarjetas de los 151 Pokémon */
const drawPokeData = (firstPokemon) => {

  pokeContainer$$.innerHTML = "";

  firstPokemon.forEach((poke) => {

    const pokeCard$$ = document.createElement("div");
    pokeCard$$.classList.add("poke__card");

    const drawPokeCard = `

      <h2 class="poke__name">${poke.name.toUpperCase()}</h2>
      <img src=${poke.sprites.front_default} alt=${poke.name} />
      <h3 class="poke__id">ID: ${poke.id}</h3>
      <div class"poke__info">
        <span class="poke__types" style=" color: ${typeColors[poke.types[0].type.name]};">
          ${poke.types[0].type.name.toUpperCase()}
        </span>  
        <span>
          <div class="poke__stats">
            <div class="stats__container">
              <div class="stats__name">
                ${poke.stats[0].stat.name} -->
              </div>
              <div class="stats__amount">
                ${poke.stats[0].base_stat}
              </div>
            </div>
            <div class="stats__container">
              <div class="stats__name">
                ${poke.stats[1].stat.name} -->
              </div>
              <div class="stats__amount">
                ${poke.stats[1].base_stat}
              </div>
            </div>
            <div class="stats__container">
              <div class="stats__name">
                ${poke.stats[2].stat.name} -->
              </div>
              <div class="stats__amount">
                ${poke.stats[2].base_stat}
              </div>
            </div>
            <div class="stats__container">
              <div class="stats__name">
                ${poke.stats[3].stat.name} -->
              </div>
              <div class="stats__amount">
                ${poke.stats[3].base_stat}
              </div>
            </div>
            <div class="stats__container">
              <div class="stats__name">
                ${poke.stats[4].stat.name} -->
              </div>
              <div class="stats__amount">
                ${poke.stats[4].base_stat}
              </div>
            </div>
            <div class="stats__container">
              <div class="stats__name">
                ${poke.stats[5].stat.name} -->
              </div>
              <div class="stats__amount">
                ${poke.stats[5].base_stat}
              </div>
            </div>
          </div>
        </span>
      </div>
    `;

    pokeCard$$.innerHTML = drawPokeCard;
    pokeContainer$$.appendChild(pokeCard$$);
  });
};

/* construimos las funciones que van a filtrar los pokemon por búsqueda y por tipos */

//filtramos los Pokemon con .filter, al cual le pasamos nuestro array con los datos, y hacemos un macheo en función de si buscamos por Nombre
const searchPokemons = (event) => {

  const ourInput = event.target.value.toLowerCase().trim();

  const filtered = ALL_RESULTS.filter((poke) => {

    const matchName = poke.name.toLowerCase().includes(ourInput);

    return matchName;

  });

  drawPokeData(filtered);
};


//de la misma manera que en la función anterior, pero buscando la coincidencia de tipos
const filterPokemons = (type) => {

  if (type === "all") {

    return drawPokeData(ALL_RESULTS);

  };

  const filterByType = ALL_RESULTS.filter((poke) => {

    let matchFirstType = false;

    if (poke.types[0]) {

      matchFirstType = poke.types[0].type.name === type;

    }

    return matchFirstType;
  });

  drawPokeData(filterByType);

};

//matcheamos el input de nuestro HTML y lanzamos la función searchPokemons()
document.getElementById("search-input").addEventListener("input", (event) => {
  
  searchPokemons(event);

});

//macheamos los botones de los tipos de nuestro HTML y lanzamos la función filterPokemons()
document.querySelectorAll(".types__filter").forEach((button) => {

  button.addEventListener("click", (event) => {

    filterPokemons(event.target.classList[1]);

  });

});

extractPokeData();