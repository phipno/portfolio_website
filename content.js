function appendHtmlFromFile(appElement, filePath, callback) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(htmlContent => {
      appElement.innerHTML = htmlContent;
      if (callback) callback();
    })
    .catch(error => {
       console.error('There was a problem with the fetch operation:', error);
    });
}


const changeContent = (string) => {
  const appElement = document.querySelector(".content")
  appElement.innerHTML = "";

  const switcherElement = document.querySelector(".content-switcher")
  const contentButton = document.querySelectorAll(".content-button")
  if (switcherElement) {
    switcherElement.classList.add("content-switcher-small")
    contentButton.forEach(element => {
      element.classList.remove("content-button")
      element.classList.add("content-button-small")
    });
  }
  
  if (string == "coding") {
    appendHtmlFromFile(appElement, "coding.html", initModal)
  } else if (string == "creative") {
    appendHtmlFromFile(appElement, "creative.html", initModal)
  } else if (string == "journey") {
    appendHtmlFromFile(appElement, "journey.html", initModal)
  } else if (string == "resumee") {
  }
}


function initModal() {
  console.log("hi")
  const modal = document.getElementById('project-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const closeButton = document.querySelector('.close-button');
  const projectCards = document.querySelectorAll('.project-card');
  console.log(projectCards)
  projectCards.forEach(card => {
    card.addEventListener('click', function () {
      modal.style.display = 'flex';
      modalImg.src = "images/alien.png"
      modalTitle.textContent = this.dataset.title;
      modalDescription.textContent = this.dataset.description;
    });
  });
  closeButton.addEventListener('click', function () {
    modal.style.display = 'none';
  });
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
}
