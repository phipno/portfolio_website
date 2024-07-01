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
  await sleep(600);
  if (string != "resume-button") {
    switchToMobilMenuButton();
  }
  clickedBtn.classList.remove("enlarge-full-height");
}

export async function selectButtonAnimation(allSwitcherBtn, clickedBtn) {
  allSwitcherBtn.forEach(button => {
    if (button != clickedBtn) {
      button.classList.add("shrink-normal-width");
      button.classList.remove("enlarge-full-width");
    }
  });
  clickedBtn.classList.add("enlarge-full-width");
  clickedBtn.classList.remove("shrink-normal-width");
  await sleep(400);
}

export async function turnALlButtonsNormalWidth(allSwitcherBtn) {
  allSwitcherBtn.forEach((button) => {
    button.classList.add("shrink-normal-width");
    button.classList.remove("enlarge-full-width");
  });
  await sleep(200);
}

export async function removeAllNormalWidth(allSwitcherBtn) {
  allSwitcherBtn.forEach((button) => {
    button.classList.remove("shrink-normal-width");
  });
  await sleep(200);
}

export async function slideContentUp(contentElement) {
  contentElement.classList.add("slide-content-up");
  await sleep(400);
  contentElement.classList.remove("slide-content-up");
}

export async function slideContentUpAndContentSwitcher(contentElement, contentSwitcher) {
  contentElement.classList.add("slide-content-up");
  contentSwitcher.classList.add("shrink-small-content-switcher");
  await sleep(400);
  contentElement.classList.remove("slide-content-up");
  contentSwitcher.classList.remove("shrink-small-content-switcher");
}

export async function slideContentOut(contentElement) {
  contentElement.classList.add("slide-content-out");
  await sleep(400)
  contentElement.classList.remove("slide-content-out");
}

export async function slideContactAndSwitcherDown(contentElement, contentSwitcher) {
  contentElement.classList.add("slide-contact-down");
  contentSwitcher.classList.add("enlarge-content-switcher");
  await sleep(400);
  contentElement.classList.remove("slide-contact-down");
  contentSwitcher.classList.remove("enlarge-content-switcher");
}


/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
