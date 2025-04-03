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

import { moveShip, fire, setupGame } from "./spaceInvader.js";
import { closeForm } from "./contact.js";
import { cycleGame, startGame, detectPortraitMode, getAllContentButtons } from "./utils.js";
import {
  changeContent,
  appendHtmlFromFile,
  switchToBigViewMobil,
  router
} from "./content.js";
import { turnALlButtonsNormalWidth } from "./animation.js";
import { moveSnake } from "/js/snake.js";

window.changeContent = changeContent;
window.switchToBigViewMobil = switchToBigViewMobil;

window.closeForm = closeForm;

window.startGame = startGame;
window.fire = fire;
window.moveShip = moveShip;
window.moveSnake = moveSnake;

window.cycleGame = cycleGame;

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

function checkDirection() {
  const deltaX = touchendX - touchstartX;
  const deltaY = touchendY - touchstartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > window.innerWidth / 3) {
      changeContent("home"); 
    } else if (deltaX < -window.innerWidth / 3) {
    }
  } else {
    // Vertikaler Swipe
    if (deltaY > 70) {
    } else if (deltaY < -70) {
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
  await appendHtmlFromFile(gameElement, "../html/games.html");
  setupGame(gameElement);
  turnALlButtonsNormalWidth(getAllContentButtons());
}

router();



console.log("Moudle Script Loaded");

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
