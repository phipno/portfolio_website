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
    gMouseDownX = e.clientX;
    gMouseDownY = e.clientY;

    var div = document.getElementById('coin-hand');

    //The following block gets the X offset (the difference between where it starts and where it was clicked)
    let leftPart = "";
    if(!div.style.left)
        leftPart+="0px";    //In case this was not defined as 0px explicitly.
    else
        leftPart = div.style.left;
    let leftPos = leftPart.indexOf("px");
    let leftNumString = leftPart.slice(0, leftPos); // Get the X value of the object.
    gMouseDownOffsetX = gMouseDownX - parseInt(leftNumString,10);

    //The following block gets the Y offset (the difference between where it starts and where it was clicked)
    let topPart = "";
    if(!div.style.top)
        topPart+="0px";     //In case this was not defined as 0px explicitly.
    else
        topPart = div.style.top;
    let topPos = topPart.indexOf("px");
    let topNumString = topPart.slice(0, topPos);    // Get the Y value of the object.
    gMouseDownOffsetY = gMouseDownY - parseInt(topNumString,10);

    window.addEventListener('mousemove', divMove, true);
}

function divMove(e){
    var div = document.getElementById('coin-hand');
    div.style.position = 'absolute';
    let topAmount = e.clientY - gMouseDownOffsetY;
    div.style.top = topAmount + 'px';
    let leftAmount = e.clientX - gMouseDownOffsetX;
    div.style.left = leftAmount + 'px';
}

addListeners();