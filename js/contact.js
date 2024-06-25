/* -------------------------8<---------------------------------------------- */
/*                                                                       .|  */
/* contact.js                                /     (__)          |/          */
/*                                                 (oo)------/'   ,__,    ,  */
/* By: phipno <phipno@gmail.com>                |  (__)     ||    (oo)_____/ */
/*                                                    ||---/||    (__)    || */
/* Created: 2024/05/29 12:56 by phipno       |/                 ,    ||--w|| */
/*                                         ,,       !              |'        */
/*                                              ,           ,|             | */
/* -----[ mooooooo ]-------------------------------------------------------- */

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.style.display = "block";
  result.innerHTML = "Please wait..."

  // fetch('https://api.web3forms.com/submit', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   },
  //   body: json
  // })
  //   .then(async (response) => {
  //     let json = await response.json();
  //     if (response.status == 200) {
  //       result.innerHTML = json.message;
  //     } else {
  //       console.log(response);
  //       result.innerHTML = json.message;
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     result.innerHTML = "Something went wrong!";
  //   })
  //   .then(function () {
  //     form.reset();
  //     setTimeout(() => {
  //       result.style.display = "hidden";
  //     }, 5000);
  //   });
}); 

import { changeToBigContentButton } from "./content.js";
import { changeToSmallContentButton } from './content.js'

export function closeopenForm() {
  if (document.getElementById("contactForm").style.display == "flex") {
    document.getElementById("contactForm").style.display = "none";
    if (!document.querySelector(".content-container"))
      changeToBigContentButton()
  } else {
    document.getElementById("contactForm").style.display = "flex";
    changeToSmallContentButton()
  }
}

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
