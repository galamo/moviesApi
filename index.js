const DOM = {
  loader: document.getElementById("loader1"),
  apiCall: document.getElementById("apiCall"),
  watchList: document.getElementById("watchList"),
  searchInput: document.getElementById("searchInput"),
  content: document.getElementById("content"),
  mainTitle: document.getElementById("mainTitle"),
  fontSizeInput: document.getElementById("fontSize"),
};

const fontSize = {
  huge: "50px",
  big: "20px",
  small: "10px",
};

let watchList = [];

const CONFIG = {
  MOVIES_API_URL: `http://www.omdbapi.com/?apikey=ce8afb69`,
  COUNTRIES_API_URL: `  https://restcountries.eu/rest/v2/name`,
  moviesTitle: "Movies",
  watchList: "Watch List",
};

function setMainTitle(title) {
  if (typeof title !== "string") return;
  DOM.mainTitle.innerText = title;
}

function getState() {
  try {
    const result = JSON.parse(localStorage.getItem("watchList")) || [];
    return result;
  } catch (ex) {
    console.error("Local Storage is currupted ");
    return [];
  }
}

function init() {
  watchList = getState();
  setMainTitle(CONFIG.moviesTitle);
  DOM.fontSizeInput.addEventListener("change", function () {
    const val = this.value.toLowerCase();
    if (!val) return;
    const selectedFont = fontSize[val];
    if (!selectedFont) return;
    const elements = document.getElementsByClassName("card-title");
    for (let index = 0; index < elements.length; index++) {
      const cardTitle = elements[index];
      cardTitle.style.fontSize = selectedFont;
    }
  });
  DOM.watchList.addEventListener("click", () => {
    setMainTitle(CONFIG.watchList);
    draw(watchList);
  });
  DOM.apiCall.addEventListener("click", () => {
    setMainTitle(CONFIG.moviesTitle);
    DOM.loader.style.display = "block";
    fetchMoviesBySearchValue(searchInput.value, (data) => {
      const arrayOfMovies = data.Search;
      draw(arrayOfMovies);
      DOM.loader.style.display = "none";
    });
  });
}

function fetchMoviesBySearchValue(value, returnData) {
  if (!value) return;
  callApi(`${CONFIG.MOVIES_API_URL}&s=${value}`, returnData);
}

async function callApi(url, returnData) {
  try {
    const initResult = await fetch(url);
    const movies = await initResult.json();
    returnData(movies);
  } catch (ex) {
    alert("Failed to fetch data from API");
  }
}

init();
function clearHTML() {
  DOM.content.innerHTML = "";
}

function draw(movies) {
  if (!Array.isArray(movies)) return;
  clearHTML();
  const moviesCards = movies.map((movie) => getMovieCard(movie));
  DOM.content.append(...moviesCards);
}

function getMovieCard(data) {
  const divCard = document.createElement("div");
  divCard.className = "card col-lg-4";

  const img = document.createElement("img");
  img.className = "card-img-top";
  img.src = data.Poster;

  const divCardBody = document.createElement("div");
  divCardBody.className = "card-body";

  const h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.innerText = data.Title;

  const p = document.createElement("p");
  p.className = "card-text";
  p.innerText = `Year: ${data.Year}, Type: ${data.Type}`;

  const divMoreInfo = document.createElement("div");
  divMoreInfo.id = `more_info_${data.imdbID}`;
  // divMoreInfo.innerText = "Dumy text";

  const buttonAddToWatchList = _getActionButton("success", "Add", () => {
    addToWatchList(data);
  });

  const ButtonRemoveFromWatchList = _getActionButton("danger", "Remove", () => {
    removeFromWatchList(data);
  });

  const moreInfoButton = _getActionButton("primary", "More Info", () => {
    getMoreInfo(data);
  });

  function _getActionButton(className, title, action) {
    const button = document.createElement("button");
    button.className = `btn btn-${className}`;
    button.innerText = title;
    button.addEventListener("click", action);
    return button;
  }

  const isWatchList = DOM.mainTitle.innerText === CONFIG.watchList;
  const actionButton = isWatchList
    ? ButtonRemoveFromWatchList
    : buttonAddToWatchList;

  divCardBody.append(h5, p);
  divCard.append(img, divCardBody, actionButton, moreInfoButton, divMoreInfo);

  return divCard;
}

async function getMoreInfo(data) {
  const countryCode = await getExtendedMovieApi(data.imdbID);
  const countryObj = await getCountryApi(countryCode);

  _drawFlag(countryObj[0].flag, data.imdbID);
  function _drawFlag(flag, imdbID) {
    const moreInfoDiv = document.getElementById(`more_info_${imdbID}`);
    const img = document.createElement("img");
    img.src = flag;
    img.height = 150;
    img.width = 150;
    moreInfoDiv.append(img);
  }
}

async function getExtendedMovieApi(imdbID) {
  const result = await fetch(`${CONFIG.MOVIES_API_URL}&plot=full&i=${imdbID}`);
  const extendedMovie = await result.json();
  const { Actors, Country, Language, Type } = extendedMovie;

  _drawActors();

  return _getFirstCountryCode(Country);
  function _getFirstCountryCode(Country) {
    const countriesArr = Country.split(",");
    const [firstCountry] = countriesArr;
    return firstCountry;
  }

  function _drawActors() {
    const moreInfoDiv = document.getElementById(`more_info_${imdbID}`);
    moreInfoDiv.innerText = Actors;
  }
}

async function getCountryApi(countryCode) {
  const result = await fetch(`${CONFIG.COUNTRIES_API_URL}/${countryCode}`);
  const country = await result.json();
  return country;
}

function addToWatchList(movie) {
  if (typeof movie !== "object") return;
  const isAlreadyExist = watchList.some((m) => m.imdbID === movie.imdbID);
  if (isAlreadyExist) {
    alert("The movie is already exist");
    return;
  }
  watchList.push(movie);
  localStorage.setItem("watchList", JSON.stringify(watchList));
}

function removeFromWatchList(movie) {
  const deletedIndex = watchList.findIndex((m) => m.imdbID === movie.imdbID);
  if (deletedIndex === -1) return;
  watchList.splice(deletedIndex, 1);
  localStorage.setItem("watchList", JSON.stringify(watchList));
  draw(watchList);
}
