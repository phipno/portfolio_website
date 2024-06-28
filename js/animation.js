/* -------------------------8<---------------------------------------------- */
/*                                                                       .|  */
/* animation.js                                /   (__)          |/          */
/*                                                 (oo)------/'   ,__,    ,  */
/* By: phipno <phipno@gmail.com>                |  (__)     ||    (oo)_____/ */
/*                                                    ||---/||    (__)    || */
/* Created: 2024/05/29 12:56 by phipno       |/                 ,    ||--w|| */
/*                                         ,,       !              |'        */
/*                                              ,           ,|             | */
/* -----[ mooooooo ]-------------------------------------------------------- */

//
import { sleep } from "./utils.js";
import { switchToMobilMenuButton } from "./content.js";

export async function runMobileAnimation(clickedBtn, string) {
  clickedBtn.classList.add("enlarge-full-height");
  await sleep(900);
  if (string != "resume-button") {
    switchToMobilMenuButton();
  }
  clickedBtn.classList.remove("enlarge-full-height");
}

export async function selectButtonAnimation(allSwitcherBtn, clickedBtn) {
  allSwitcherBtn.forEach(button => {
    if (button != clickedBtn) {
      button.classList.remove("enlarge-full-width");  
    }
  })
  clickedBtn.classList.add("enlarge-full-width");
  await sleep(400);
}

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
