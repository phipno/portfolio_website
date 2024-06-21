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

export function switchToBigContent() {
  const gameElement = document.querySelector(".game")
  if (gameElement)
    gameElement.style.display = 'none';
  const switcherElement = document.querySelector(".content-switcher")
  switcherElement.style.display = 'flex'
  const mobileElement = document.querySelector(".mobile-content-switcher")
  mobileElement.style.display = 'none';
}

export function switchToMobilContent() {
  const switcherElement = document.querySelector(".content-switcher")
  switcherElement.style.display = 'none'
  const mobileElement = document.querySelector(".mobile-content-switcher")
  mobileElement.style.display = 'flex';
}

function appendHtmlFromFile(appElement, filePath, callback, callback2) {
  fetch(filePath)
  .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(htmlContent => {
      appElement.innerHTML += htmlContent;
      if (callback) callback();
      if (callback2) callback2();
    })
    .catch(error => {
       console.error('There was a problem with the fetch operation:', error);
    });
}

import { setupGame } from './spaceInvader.js'
import { initCosmos } from './journey.js';

export function changeContent(string) {
  const appElement = document.querySelector(".content")
  const gameElement = document.querySelector(".game")
  
  appElement.innerHTML = "";

  if (detectMobileDevice()) {
    gameElement.style.display = 'none';
    switchToMobilContent();
  } else {
    changeToSmallContentButton();
  }

  if (string == "coding") {
    appendHtmlFromFile(appElement, "html/coding.html", initModal, fitText)
  } else if (string == "creative") {
    appendHtmlFromFile(appElement, "html/creative.html", initModal)
  } else if (string == "journey") {
    appendHtmlFromFile(appElement, "html/journey.html", initModal, initCosmos)
  } else if (string == "resume") {
    openPdf("./images/resume.pdf")
  } else if (string == "games") { 
    const gridElement = document.querySelector(".grid")
    if (gridElement)
      gridElement.remove();
    setupGame(gameElement)
    gameElement.style.display = 'flex'
  }
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

export function fitText() {
  const headers = document.querySelectorAll('.project-card h3')
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

export function detectMobileDevice() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  return isMobile && isPortrait;
}

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
