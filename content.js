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

let gMouseDownX = 0;
let gMouseDownY = 0;
let gMouseDownOffsetX = 0;
let gMouseDownOffsetY = 0;

function addListeners() {
  document.getElementById('coin-hand').addEventListener('mousedown', mouseDown, false);
  window.addEventListener('mouseup', mouseUp, false);
}

function mouseUp() {
  console.log("hello")
  window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e) {
  console.log("ayyy")
  gMouseDownX = e.clientX;
  gMouseDownY = e.clientY;
  window.addEventListener('mousemove', divMove, true)
}

function divMove(e) {
  var div = document.getElementById('coin-hand')
  div.style.transform = "translate(0,-" + gMouseDownY + "px)";
}

addListeners();