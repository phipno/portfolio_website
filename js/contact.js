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

export function formSubmit() {
  const form = document.getElementById("form");
  const result = document.getElementById("result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    
    // Validate form inputs
    let errors = [];
    if (!object.name) {
      errors.push("Name is required.");
    }
    if (!object.email) {
      errors.push("Email is required.");
    }
    if (!object.message) {
      errors.push("Message is required.");
    }
    
    if (errors.length > 0) {
      result.style.display = "block";
      result.innerHTML = errors.join("<br>");
      return;
    }
    
    const json = JSON.stringify(object);
    result.style.display = "block";
    result.innerHTML = "Please wait...";

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch(error => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
  });
}
import { clearElement, changeToBigContentButton } from "./content.js";

export async function closeForm() {
  await changeToBigContentButton();
  clearElement(".content");
  document.querySelector(".pop-up").style.display = "flex";
  document.querySelector(".pop-down").style.display = "none";
}

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
