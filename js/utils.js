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

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
