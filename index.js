const DOM = {
  loader: document.getElementById("loader1"),
  apiCall: document.getElementById("apiCall"),
  watchList: document.getElementById("watchList"),
  searchInput: document.getElementById("searchInput"),
  content: document.getElementById("content"),
  mainTitle: document.getElementById("mainTitle"),
};

let watchList = [];

const CONFIG = {
  API_URL: `http://www.omdbapi.com/?apikey=ce8afb69`,
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
  console.log(`${CONFIG.API_URL}&s=${value}`);
  fetch(`${CONFIG.API_URL}&s=${value}`)
    .then((response) => response.json())
    .then((data) => {
      returnData(data);
    })
    .catch((error) => {
      console.log(error);
      alert("We Are sorry something went wrong");
    });
  console.log("end function getMoviesFromServer");
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

  const buttonAddToWatchList = _getActionButton("success", "Add", () => {
    addToWatchList(data);
  });

  const ButtonRemoveFromWatchList = _getActionButton("danger", "Remove", () => {
    removeFromWatchList(data);
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
  divCard.append(img, divCardBody, actionButton);

  return divCard;
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
