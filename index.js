const DOM = {
  loader: document.getElementById("loader1"),
  apiCall: document.getElementById("apiCall"),
  searchInput: document.getElementById("searchInput"),
  content: document.getElementById("content"),
};

const CONFIG = {
  API_URL: `http://www.omdbapi.com/?apikey=ce8afb69`,
};

function init() {
  DOM.apiCall.addEventListener("click", () => {
    fetchMoviesBySearchValue(searchInput.value, (data) => {
      const arrayOfMovies = data.Search;
      draw(arrayOfMovies);
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

  divCardBody.append(h5, p);
  divCard.append(img, divCardBody);
  return divCard;
}
