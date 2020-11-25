const DOM = {
  loader: document.getElementById("loader1"),
  apiCall: document.getElementById("apiCall"),
};

function init() {
  DOM.apiCall.addEventListener("click", () => {
    getMoviesFromServer();
  });
}

function getMoviesFromServer() {
  // fetch("URL ?").then(//success).catch(//er)
  fetch("http://www.omdbapi.com/?s=batman&apikey=ce8afb69")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      alert(111);
    });
  console.log("end function getMoviesFromServer");
}

init();
