/* -------------------------8<---------------------------------------------- */
/*                                                                       .|  */
/* modal.js                                 /      (__)          |/          */
/*                                                 (oo)------/'   ,__,    ,  */
/* By: phipno <phipno@gmail.com>                |  (__)     ||    (oo)_____/ */
/*                                                    ||---/||    (__)    || */
/* Created: 2024/06/15 11:48 by phipno       |/                 ,    ||--w|| */
/*                                         ,,       !              |'        */
/*                                              ,           ,|             | */
/* -----[ mooooooo ]-------------------------------------------------------- */

import { sleep } from "./utils.js"

export function initModal() {
  const modal = document.getElementById("project-modal");
  const something = modal;
  const modalContent = document.getElementById("modal-content");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const closeButton = document.querySelector(".close-button");
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("click", async function () {
      await sleep(200);
      modal.style.display = "flex";
      modalTitle.textContent = this.dataset.title;
      modalDescription.textContent = this.dataset.description;
      if (this.querySelector(".costum-content")) {
        const costumContent =
          this.querySelector(".costum-content").cloneNode(true);
        console.log(costumContent);
        costumContent.style.display = "flex";
        modalContent.appendChild(costumContent);
      }
    });
  });
  closeButton.addEventListener("click", function () {
    const removeContent = modalContent.querySelector(".costum-content");
    if (removeContent) modalContent.removeChild(removeContent);
    modal.style.display = "none";
  });
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      const removeContent = modalContent.querySelector(".costum-content");
      if (removeContent) modalContent.removeChild(removeContent);
      modal.style.display = "none";
    }
  });
}

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
