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

window.matchMedia("(orientation: portrait)").addEventListener("change", async (e) => {
  const portrait = e.matches;
  const gameElement = document.querySelector(".game")
  const contentSwitcherButtons = getAllContentButtons();

  if (portrait) {
    gameElement.style.display = 'none'
    clearElement(".content");
    clearElement(".game");
    changeToBigContentButton();
    removeAllAnimations();
    switchToBigViewMobil();
  } else {
    clearElement(".content");
    clearElement(".game");
    await appendHtmlFromFile(gameElement, "../html/spaceInvader.html");
    setupGame(gameElement);
    changeToBigContentButton();
    gameElement.style.display = 'flex';
    switchToBigViewDesktop();
  }
});

export function getAllContentButtons() {
  let contentSwitcherButtons = document.querySelectorAll(".content-button")
  if (contentSwitcherButtons.length == 0) {
    contentSwitcherButtons = document.querySelectorAll(".content-button-small");
  }
  return contentSwitcherButtons;
}

export function changeToSmallContentButton() {
  const switcherElement = document.querySelector(".content-switcher");
  const contentButtons = getAllContentButtons();
  if (switcherElement) {
    switcherElement.classList.add("content-switcher-small")
    contentButtons.forEach(element => {
      element.classList.remove("content-button")
      element.classList.add("content-button-small")
    });
  }
}

function removeAllAnimations() {
  const contentSwitcherButtons = getAllContentButtons();

  contentSwitcherButtons.forEach(element => {
    element.classList.remove("shrink-normal-width");
    element.classList.remove("enlarge-full-width");
  })
}

export function changeToBigContentButton() {
  const switcherElement = document.querySelector(".content-switcher")
  const contentButtons = document.querySelectorAll(".content-button-small")
  
  if (switcherElement) {
    switcherElement.classList.remove("content-switcher-small")
    contentButtons.forEach(element => {
      element.classList.remove("content-button-small");
      element.classList.add("content-button");
      element.classList.remove("shrink-small-content-switcher");
      element.classList.remove("enlarge-full-width");
      if (!detectPortraitMode()) {
        element.classList.add("shrink-normal-width");
        element.classList.add("enlarge-content-switcher");
      }
    });
  }
}

export function switchToBigViewDesktop() {
  const gameElement = document.querySelector(".game")
  if (gameElement)
    gameElement.style.display = 'flex';
  const switcherElement = document.querySelector(".content-switcher")
  switcherElement.style.display = 'flex'
  const mobileElement = document.querySelector(".mobile-content-switcher")
  mobileElement.style.display = 'none';
}

export function switchToBigViewMobil() {
  const gameElement = document.querySelector(".game")
  if (gameElement)
    gameElement.style.display = 'none';
  clearElement(".content");

  changeToBigContentButton();
  const switcherElement = document.querySelector(".content-switcher")
  switcherElement.style.display = 'flex'
  const mobileElement = document.querySelector(".mobile-content-switcher")
  mobileElement.style.display = 'none';
}

export function switchToMobilMenuButton() {
  const switcherElement = document.querySelector(".content-switcher")
  switcherElement.style.display = 'none'
  const mobileElement = document.querySelector(".mobile-content-switcher")
  mobileElement.style.display = 'flex';
}

export async function appendHtmlFromFile(appElement, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const htmlContent = await response.text();
    appElement.innerHTML += htmlContent;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}


export function clearElement(string) {
  const contentElement = document.querySelector(string)
  if (contentElement)
    contentElement.innerHTML = "";
}

function disableorenableButtons(buttons, bool) {
  buttons.forEach(button => {
    button.disabled = bool;
  });
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

import { setupGame } from './spaceInvader.js'
import { initCosmos } from './journey.js';
import { closeForm, formSubmit } from './contact.js';

export async function changeContent(string) {
  const appElement = document.querySelector(".content")
  const animation = document.getElementById(string);
  const contentSwitcherButtons = getAllContentButtons();

  disableorenableButtons(contentSwitcherButtons, true);

  if (document.getElementById("contactForm")) {
    closeForm();
  }
  if (appElement.childElementCount != 0) {
    appElement.classList.add("slide-content-out")
    await sleep(400)
  }
  appElement.classList.remove("slide-content-out");
  clearElement(".content");

  if (detectPortraitMode()) {
    animation.classList.add("enlarge-full-height");
    await sleep(900);
    if (string != "resume-button")
      switchToMobilMenuButton();
  } else {
    if (string != "contact-button") {
      contentSwitcherButtons.forEach(button => {
        button.classList.remove("enlarge-full-width");
        if (animation == button) {
          button.classList.add("shrink-normal-width")
        }
      })
      animation.classList.add("enlarge-full-width")
      await sleep(400);
    }
  }

  if (string == "code-button") {
    await appendHtmlFromFile(appElement, "../html/coding.html")
    document.querySelector(".content").classList.add("slide-content-up");
    initModal()
    fitText(".project-card h3");
    initFitText(".project-card h3")
  } else if (string == "creative-button") {
    await appendHtmlFromFile(appElement, "../html/creative.html")
    initModal();
    fitText(".project-card h3");
    initFitText(".project-card h3")
  } else if (string == "journey-button") {
    await appendHtmlFromFile(appElement, "../html/journey.html")
    initModal();
    initCosmos();
  } else if (string == "resume-button") {
    openPdf("../images/resume.pdf");
    changeToBigContentButton();
  } else if (string == "game-button") {
    if (detectPortraitMode()) {
      await appendHtmlFromFile(appElement, "../html/spaceInvader.html");
      setupGame(appElement);
    }
  } else if (string == "contact-button") {
    await appendHtmlFromFile(appElement, "../html/contact.html");
    if (!detectPortraitMode()) {
      document.querySelector(".pop-up").style.display = "none"
      document.querySelector(".pop-down").style.display = "flex"
    }
    formSubmit();
  }
  
  if (detectPortraitMode()) {
    if (string != "resume-button")
      switchToMobilMenuButton();
    animation.classList.remove("enlarge-full-height");
  }
  else {
    if (string != "resume-button")
      changeToSmallContentButton();
    contentSwitcherButtons.forEach(element => {
      element.classList.remove("enlarge-content-switcher");
      element.classList.add("shrink-small-content-switcher");
    });
    document.querySelector(".content").classList.add("slide-content-up");
    await sleep(400)
    document.querySelector(".content").classList.remove("slide-content-up");
  }
  disableorenableButtons(contentSwitcherButtons, false);
}

function initModal() {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const closeButton = document.querySelector('.close-button');
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', function () {
      modal.style.display = 'flex';
      modalTitle.textContent = this.dataset.title;
      modalDescription.textContent = this.dataset.description;
      if (this.querySelector('.costum-content')) {
        const costumContent = this.querySelector('.costum-content').cloneNode(true);
        console.log(costumContent)
        costumContent.style.display = 'flex';
        modalContent.appendChild(costumContent);
      }
    });
  });
  closeButton.addEventListener('click', function () {
    const removeContent = modalContent.querySelector('.costum-content');
    if (removeContent)
      modalContent.removeChild(removeContent);
    modal.style.display = 'none';
  });
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      const removeContent = modalContent.querySelector('.costum-content');
      if (removeContent)
        modalContent.removeChild(removeContent);
      modal.style.display = 'none';
    }
  });
}

function openPdf(path_to_pdf) {
  window.open(path_to_pdf, '_blank')
}

export function fitText(string) {
  const headers = document.querySelectorAll(string)
  const minFontSize = 10;
  const maxFontSize = 100;
  
  headers.forEach(header => {
    header.style.fontSize = maxFontSize + 'px';
    let fontSize = maxFontSize;
    while ((header.scrollHeight > header.clientHeight || header.scrollWidth > header.clientWidth) && fontSize > minFontSize) {
      fontSize--;
      header.style.fontSize = fontSize + 'px'; // Prevent infinite loop in case of very long text
    }
  });
}

function initFitText(string) {
  window.addEventListener('load', fitText(string));
  window.addEventListener('resize', fitText(string));
}

export function detectPortraitMode() {
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  return isPortrait;
}

export function detectMobileDevice() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return isMobile;
}

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
