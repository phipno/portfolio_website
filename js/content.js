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

  if (portrait) {
    gameElement.style.display = 'none'
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
    gameElement.style.display = 'flex';
    switchToBigViewDesktop();
  }
});


export function changeToSmallContentButton() {
  const switcherElement = document.querySelector(".content-switcher")
  const contentButton = document.querySelectorAll(".content-button")
  if (switcherElement) {
    switcherElement.classList.add("content-switcher-small")
    contentButton.forEach(element => {
      element.classList.remove("content-button")
      element.classList.add("content-button-small")
    });
  }
}

export function changeToBigContentButton() {
  const switcherElement = document.querySelector(".content-switcher")
  const contentButton = document.querySelectorAll(".content-button-small")
  if (switcherElement) {
    switcherElement.classList.remove("content-switcher-small")
    contentButton.forEach(element => {
      element.classList.remove("content-button-small")
      element.classList.add("content-button")
    });
  }
}

export function switchToBigViewDesktop() {
  const gameElement = document.querySelector(".game")
  if (gameElement)
    gameElement.style.display = 'flex';
  const switcherElement = document.querySelector(".content-switcher")
  switcherElement.style.display = 'grid'
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
  console.log(string);
  const contentElement = document.querySelector(string)
  if (contentElement)
    contentElement.innerHTML = "";
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

import { setupGame } from './spaceInvader.js'
import { initCosmos } from './journey.js';
import { formSubmit } from './contact.js';

export async function changeContent(string) {
  const appElement = document.querySelector(".content")
  const testAnimation = document.getElementById(string);
  const contentSwitcherButtons = document.querySelectorAll(".content-button")

  contentSwitcherButtons.forEach(button => {
    button.disabled = true;
  });

  closeForm();
  clearElement(".content");  

  if (detectPortraitMode()) {
    testAnimation.classList.add("enlarge-full-height");
    await sleep(900);
    if (string != "resume-button")
      switchToMobilMenuButton();
  } else {
    changeToSmallContentButton();
  }
  

  if (string == "code-button") {
    await appendHtmlFromFile(appElement, "../html/coding.html")
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
    testAnimation.classList.remove("enlarge-full-height");
  }
  contentSwitcherButtons.forEach(button => {
    button.disabled = false;
  });
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
