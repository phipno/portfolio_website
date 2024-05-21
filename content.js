const changeContent = (string) => {
  const appElement = document.querySelector(".content")
  appElement.innerHTML = "";

  const switcherElement = document.querySelector(".content-switcher")
  const contentButton = document.querySelectorAll(".content-button")
  if (switcherElement) {
    switcherElement.classList.add("content-switcher-small")
    contentButton.forEach(element => {
      element.classList.remove("content-button")
      element.classList.add("content-button-small")
    });
  }
    
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
