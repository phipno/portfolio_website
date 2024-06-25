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

import { moveShip, fire, play, setupGame } from './spaceInvader.js'
import {
  changeContent, fitText, switchToBigViewDesktop,
  switchToBigViewMobil, switchToMobilMenuButton,
  detectPortraitMode, appendHtmlFromFile
} from './content.js';
import { closeopenForm } from './contact.js';

window.changeContent = changeContent;
window.switchToBigViewDesktop = switchToBigViewDesktop;
window.switchToBigViewMobil = switchToBigViewMobil;
window.switchToMobilMenuButton = switchToMobilMenuButton;

window.closeopenForm = closeopenForm;

window.play = play;
window.fire = fire;
window.moveShip = moveShip;

window.addEventListener('load', fitText);
window.addEventListener('resize', fitText);

if (!detectPortraitMode()) {
  const gameElement = document.querySelector(".game")
  await appendHtmlFromFile(gameElement, "../html/spaceInvader.html")
  setupGame(gameElement);
}


console.log("Moudle Script Loaded")

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
