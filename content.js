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

function changeToSmallContentButton() {
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

function changeToBigContentButton() {
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

function switchToBigContent() {
  const gameElement = document.querySelector(".game")
  if (gameElement)
    gameElement.style.display = 'none';
  const switcherElement = document.querySelector(".content-switcher")
  switcherElement.style.display = 'flex'
  const mobileElement = document.querySelector(".mobile-content-switcher")
  mobileElement.style.display = 'none';
}

window.switchToBigContent = switchToBigContent;

function switchToMobilContent() {
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
import { detectMobileDevice } from './module.js';

function changeContent(string) {
  const appElement = document.querySelector(".content")
  appElement.innerHTML = "";
  const gameElement = document.querySelector(".game")
  gameElement.style.display = 'none';

  if (detectMobileDevice) {
    switchToMobilContent();
  } else {
    changeToSmallContentButton();
  }

  if (string == "coding") {
    appendHtmlFromFile(appElement, "coding.html", initModal, fitText)
  } else if (string == "creative") {
    appendHtmlFromFile(appElement, "creative.html", initModal)
  } else if (string == "journey") {
    appendHtmlFromFile(appElement, "journey.html", initModal, initCosmos)
  } else if (string == "games") { 
    const gridElement = document.querySelector(".grid")
    if (gridElement)
      gridElement.remove();
    setupGame(gameElement)
    gameElement.style.display = 'flex'
  }
}

window.changeContent = changeContent;

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

openPdf = function(path_to_pdf) {
  window.open(path_to_pdf, '_blank')
}

function fitText() {
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

window.addEventListener('load', fitText);
window.addEventListener('resize', fitText);

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
