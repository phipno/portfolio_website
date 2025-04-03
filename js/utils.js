/* -------------------------8<---------------------------------------------- */
/*                                                                       .|  */
/* utils.js                                  /     (__)          |/          */
/*                                                 (oo)------/'   ,__,    ,  */
/* By: phipno <phipno@gmail.com>                |  (__)     ||    (oo)_____/ */
/*                                                    ||---/||    (__)    || */
/* Created: 2024/06/15 11:48 by phipno       |/                 ,    ||--w|| */
/*                                         ,,       !              |'        */
/*                                              ,           ,|             | */
/* -----[ mooooooo ]-------------------------------------------------------- */

export function getAllContentButtons() {
  let contentSwitcherButtons = document.querySelectorAll(".content-button");
  if (contentSwitcherButtons.length == 0) {
    contentSwitcherButtons = document.querySelectorAll(".content-button-small");
  }
  return contentSwitcherButtons;
}

export function openPdf(path_to_pdf) {
  window.open(path_to_pdf, "_blank");
}

export function fitText(string) {
  const headers = document.querySelectorAll(string);
  const minFontSize = 10;
  const maxFontSize = 100;

  headers.forEach((header) => {
    header.style.fontSize = maxFontSize + "px";
    let fontSize = maxFontSize;
    while (
      (header.scrollHeight > header.clientHeight ||
        header.scrollWidth > header.clientWidth) &&
      fontSize > minFontSize
    ) {
      fontSize--;
      header.style.fontSize = fontSize + "px";
      // Prevent infinite loop in case of very long text
    }
  });
}

export function detectPortraitMode() {
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  return isPortrait;
}

export function detectMobileDevice() {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  return isMobile;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

import { playSnake, setupGameSnake } from "/js/snake.js";
import { setupGame, stopInterval, play} from "/js/spaceInvader.js";

const games = {
  spaceInvader: {
    name: "spaceInvader",
    setup: (gameParent) => setupGame(gameParent),
    start: (event) => play(event),
    stop: () => stopInterval(),
  },
  snake: {
    name: "snake",
    setup: (gameParent) => setupGameSnake(gameParent),
    start: () => playSnake(),
    stop: () => stopIntervalSnake(),
  },
}
let index = 0;

import { appendHtmlFromFile } from "/js/content.js";

export function cycleGame(direction) {
  const gameParent = document.querySelector(".game-interface").parentElement;
  games[Object.keys(games)[index]].stop();
  for (let i = 0; i < 2; i++) {
    if (gameParent.firstChild) {
      gameParent.removeChild(gameParent.firstChild);
    }
  }

  if (direction === "right") {
    index++;
    if (index >= Object.keys(games).length) {
      index = 0;
    }
  } else if (direction === "left") {
    index--;
    if (index < 0) {
      index = Object.keys(games).length - 1;
    }
  }
  console.log(index)
  console.log("Switching to game: ",games[Object.keys(games)[index]].name);
  games[Object.keys(games)[index]].setup(gameParent);
}

export function startGame(event) {
  if (games[Object.keys(games)[index]] && typeof games[Object.keys(games)[index]].start === "function") {
    games[Object.keys(games)[index]].start(event);
  } else {
    console.error("Invalid game index or start method not found.");
  }
}

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
