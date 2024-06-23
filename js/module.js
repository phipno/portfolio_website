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

console.log("ASDASDASD")

import { moveShip, fire, play, setupGame } from './spaceInvader.js'
import {
  changeContent, fitText, detectMobileDevice, switchToBigViewDesktop,
  switchToBigViewMobil, switchToMobilMenuButton
} from './content.js';
import { closeopenForm } from './contact.js';

window.changeContent = changeContent;
window.switchToBigViewDesktop = switchToBigViewDesktop;
window.switchToBigViewMobil = switchToBigViewMobil;
window.switchToMobilMenuButton = switchToMobilMenuButton;
window.addEventListener('load', fitText);
window.addEventListener('resize', fitText);

window.closeopenForm = closeopenForm;

window.play = play;
window.fire = fire;
window.moveShip = moveShip;

if (!detectMobileDevice()) {
  const appElement = document.querySelector(".game")
  setupGame(appElement)
}

console.log("Moudle Script Loaded")

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
