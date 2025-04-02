/* -------------------------8<---------------------------------------------- */
/*                                                                       .|  */
/* module.js                                 /     (__)          |/          */
/*                                                 (oo)------/'   ,__,    ,  */
/* By: phipno <phipno@gmail.com>                |  (__)     ||    (oo)_____/ */
/*                                                    ||---/||    (__)    || */
/* Created: 2024/06/15 11:48 by phipno       |/                 ,    ||--w|| */
/*                                         ,,       !              |'        */
/*                                              ,           ,|             | */
/* -----[ mooooooo ]-------------------------------------------------------- */

import { moveShip, fire, play, setupGame } from "./spaceInvader.js";
import { closeForm } from "./contact.js";
import { detectPortraitMode, getAllContentButtons } from "./utils.js";
import {
  changeContent,
  appendHtmlFromFile,
  switchToBigViewMobil,
  router
} from "./content.js";
import { turnALlButtonsNormalWidth } from "./animation.js";

window.changeContent = changeContent;
window.switchToBigViewMobil = switchToBigViewMobil;

window.closeForm = closeForm;

window.play = play;
window.fire = fire;
window.moveShip = moveShip;

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

function checkDirection() {
  const deltaX = touchendX - touchstartX;
  const deltaY = touchendY - touchstartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 70) {
      changeContent("home"); 
    } else if (deltaX < -70) {
      console.log("Swipe nach links erkannt");
    }
  } else {
    // Vertikaler Swipe
    if (deltaY > 70) {
      console.log("Swipe nach unten erkannt");
    } else if (deltaY < -70) {
      console.log("Swipe nach oben erkannt");
    }
  }
}

document.addEventListener("touchstart", (e) => {
  touchstartX = e.changedTouches[0].screenX;
  touchstartY = e.changedTouches[0].screenY;
});

document.addEventListener("touchend", (e) => {
  touchendX = e.changedTouches[0].screenX;
  touchendY = e.changedTouches[0].screenY;
  checkDirection();
});

if (!detectPortraitMode()) {
  const gameElement = document.querySelector(".game");
  await appendHtmlFromFile(gameElement, "../html/spaceInvader.html");
  setupGame(gameElement);
  turnALlButtonsNormalWidth(getAllContentButtons());
}

router();



console.log("Moudle Script Loaded");

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
