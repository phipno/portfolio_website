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
import { detectPortraitMode } from "./utils.js";
import {
  changeContent,
  appendHtmlFromFile,
  switchToBigViewMobil
} from "./content.js";

window.changeContent = changeContent;
window.switchToBigViewMobil = switchToBigViewMobil;

window.closeForm = closeForm;

window.play = play;
window.fire = fire;
window.moveShip = moveShip;

if (!detectPortraitMode()) {
  const gameElement = document.querySelector(".game");
  await appendHtmlFromFile(gameElement, "../html/spaceInvader.html");
  setupGame(gameElement);
}

console.log("Moudle Script Loaded");

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
