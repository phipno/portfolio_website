/* -------------------------8<---------------------------------------------- */
/*                                                                       .|  */
/* content.js                                /     (__)          |/          */
/*                                                 (oo)------/'   ,__,    ,  */
/* By: phipno <phipno@gmail.com>                |  (__)     ||    (oo)_____/ */
/*                                                    ||---/||    (__)    || */
/* Created: 2024/05/29 12:56 by phipno       |/                 ,    ||--w|| */
/*                                         ,,       !              |'        */
/*                                              ,           ,|             | */
/* -----[ mooooooo ]-------------------------------------------------------- */

window
  .matchMedia("(orientation: portrait)")
  .addEventListener("change", async (e) => {
    const portrait = e.matches;
    const gameElement = document.querySelector(".game");

    if (portrait) {
      gameElement.style.display = "none";
      clearElement(".content");
      clearElement(".game");
      changeToBigContentButton();
      switchToBigViewMobil();
    } else {
      clearElement(".content");
      clearElement(".game");
      await appendHtmlFromFile(gameElement, "../html/spaceInvader.html");
      setupGame(gameElement);
      changeToBigContentButton();
      gameElement.style.display = "flex";
      switchToBigViewDesktop();
    }
  });

function switchToBigViewDesktop() {
  const gameElement = document.querySelector(".game");
  if (gameElement) {
    gameElement.style.display = "flex";
  }
  const switcherElement = document.querySelector(".content-switcher");
  switcherElement.style.display = "flex";
  const mobileElement = document.querySelector(".mobile-content-switcher");
  mobileElement.style.display = "none";
}

export function switchToBigViewMobil() {
  const gameElement = document.querySelector(".game");
  if (gameElement) {
    gameElement.style.display = "none";
  }
  clearElement(".content");

  changeToBigContentButton();
  const switcherElement = document.querySelector(".content-switcher");
  switcherElement.style.display = "flex";
  const mobileElement = document.querySelector(".mobile-content-switcher");
  mobileElement.style.display = "none";
}

//
//changeContent: is the main function of my website
//which initiates DOM changes, animations and class manipulation
import { detectPortraitMode, getAllContentButtons } from "./utils.js";
import { slideContentUp } from "./animation.js";

export async function changeContent(string) {
  const contentElement = document.querySelector(".content");
  const clickedBtn = document.getElementById(string);
  const allSwitcherBtn = getAllContentButtons();

  disableorenableButtons(allSwitcherBtn, true);

  await cleanUpContent(contentElement);

  //animates so the button increases in width or height deppending on screen
  if (string != "contact-button") {
    await animateFirstClick(contentElement, allSwitcherBtn, clickedBtn, string);
  }

  //chooses and inserts the content into the DOM
  await switcherOfContent(contentElement, string);
  
  //turns the content-switcher to its small version or lets it disapear depending on screen
  if (string != "resume-button") {
    if (!document.querySelector(".content-switcher-small")) {
      changeToSmallSwitcher(string, allSwitcherBtn, contentElement);
    } else {
      await slideContentUp(contentElement);
    }
  }

  disableorenableButtons(allSwitcherBtn, false);
}

//
import { formSubmit } from "./contact.js";
import { setupGame } from "./spaceInvader.js";
import { openPdf } from "./utils.js";
import { turnALlButtonsNormalWidth } from "./animation.js";

async function switcherOfContent(contentElement, string) {
  switch (string) {
    case "code-button":
      await initCodeOrArt(contentElement, "../html/coding.html");
      break;
    case "creative-button":
      await initCodeOrArt(contentElement, "../html/creative.html");
      break;
    case "journey-button":
      await initJourney(contentElement, "../html/journey.html");
      break;
    case "resume-button":
      openPdf("../images/resume.pdf");
      if (!detectPortraitMode()) {
        turnALlButtonsNormalWidth(getAllContentButtons());
        changeToBigContentButton();
      }
      break;
    case "game-button":
      await appendHtmlFromFile(contentElement, "../html/spaceInvader.html");
      setupGame(contentElement);
      break;
    case "contact-button":
      if (!detectPortraitMode()) {
        await turnALlButtonsNormalWidth(getAllContentButtons());
      }
      await appendHtmlFromFile(contentElement, "../html/contact.html");
      if (!detectPortraitMode()) {
        document.querySelector(".pop-up").style.display = "none";
        document.querySelector(".pop-down").style.display = "flex";
      }
      formSubmit();
      break;
    default:
      console.error("Unknown button type");
      break;
  }
}

//
import { runMobileAnimation, selectButtonAnimation } from "./animation.js";

async function animateFirstClick(
  contentElement,
  allSwitcherBtn,
  clickedBtn,
  string
) {
  if (detectPortraitMode()) {
    await runMobileAnimation(clickedBtn, string);
  } else {
    if (string != "contact-button") {
      //one button gets bigger the other one smaller
      await selectButtonAnimation(allSwitcherBtn, clickedBtn);
    }
  }
}

function changeToSmallSwitcher(string, allSwitcherBtn, contentElement) {
  if (detectPortraitMode()) {
    if (string != "resume-button") {
      switchToMobilMenuButton();
    }
  } else {
    if (string != "resume-button") {
      changeToSmallContentButton(contentElement, allSwitcherBtn);
    }
  }
}

import { slideContactAndSwitcherDown, removeAllNormalWidth } from "./animation.js";

export async function changeToBigContentButton() {
  const switcherElement = document.querySelector(".content-switcher");
  const contentButtons = getAllContentButtons(".content-button-small");
  const contentElement = document.querySelector(".content");

  if (!detectPortraitMode()) {
    await turnALlButtonsNormalWidth(contentButtons);
    await slideContactAndSwitcherDown(contentElement, switcherElement);
  }
  else {
    removeAllNormalWidth(contentButtons);
  }
  contentButtons.forEach((element) => {
    element.classList.remove("content-button-small");
    element.classList.add("content-button");
  });
  switcherElement.classList.remove("content-switcher-small");
  contentElement.style.display = "none";
}

import { slideContentUpAndContentSwitcher } from "./animation.js";

export async function changeToSmallContentButton(
  contentElement,
  allSwitcherBtn
) {
  const switcherElement = document.querySelector(".content-switcher");

  if (switcherElement) {
    allSwitcherBtn.forEach((button) => {
      button.classList.remove("content-button");
      button.classList.add("content-button-small");
    });
    switcherElement.classList.add("content-switcher-small");
    await slideContentUpAndContentSwitcher(contentElement, switcherElement);
  }
}

export function switchToMobilMenuButton() {
  const switcherElement = document.querySelector(".content-switcher");
  switcherElement.style.display = "none";
  const mobileElement = document.querySelector(".mobile-content-switcher");
  mobileElement.style.display = "flex";
}

export async function appendHtmlFromFile(appElement, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const htmlContent = await response.text();
    appElement.innerHTML += htmlContent;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

export function clearElement(string) {
  const contentElement = document.querySelector(string);
  if (contentElement) contentElement.innerHTML = "";
}

function disableorenableButtons(buttons, bool) {
  buttons.forEach((button) => {
    button.disabled = bool;
  });
}

import { closeForm } from "./contact.js";
import { slideContentOut } from "./animation.js";

async function cleanUpContent(contentElement) {
  contentElement.style.display = "block";
  if (contentElement.children.length > 0) {
    console.log("hi");
    await slideContentOut(contentElement);
    clearElement(".content");
  }
}

import { fitText } from "./utils.js";

function initFitText(string) {
  window.addEventListener("load", fitText(string));
  window.addEventListener("resize", fitText(string));
}


import { initModal } from "./modal.js";

async function initCodeOrArt(contentElement, stringToHtml) {
  await appendHtmlFromFile(contentElement, stringToHtml);
  initModal();
  // fitText(".project-card h3");
  // // initFitText(".project-card h3");
}

import { initCosmos } from "./journey.js";

async function initJourney(contentElement, stringToHtml) {
  await appendHtmlFromFile(contentElement, stringToHtml);
  await initCosmos();
}

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
