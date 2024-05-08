const changeContent = (string) => {
  const appElement = document.querySelector(".content")
  appElement.innerHTML = "";
  if (string == "welcome") {
    appElement.innerHTML = "\
    <h1 class='welcome'>Welcome Welcome</h1>\
    <p>i like doing things, sometimes to many at the same time and also sometimes nothing at all</p>\
    "
  } else if (string == "coding") {

  } else if (string == "creative") {

  } else if (string == "journey") {

  } else if (string == "resumee") {

  }
}


//50.3% are humans internet activity