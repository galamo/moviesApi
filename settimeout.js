const DOM = {
    loader: document.getElementById("loader1"),
  };
  
  function init() {
    const btn = document.getElementById("apiCall");
    btn.addEventListener("click", () => {
      DOM.loader.style.display = "block";
      serverResponse((result) => {
        console.log("callback execution start");
        console.log("reslt from server", result);
        document.getElementById("content").innerText = JSON.stringify(result);
        DOM.loader.style.display = "none";
        console.log("callback execution done");
      });
    });
  
    setTimeout(() => {
      console.log("After 1 sec");
    }, 1000);
  }
  
  function serverResponse(cb) {
    setTimeout(() => {
      console.log("settimout execution");
      cb(["m1", "m2"]);
    }, 10000);
    console.log("finish function serverResponse");
  }
  
  init();
  