function appendHtmlFromFile(appElement, filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(htmlContent => {
      appElement.innerHTML = htmlContent;
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
    console.log("hi")
    appendHtmlFromFile(appElement, "coding.html")
  } else if (string == "creative") {
    appendHtmlFromFile(appElement, "creative.html")
  } else if (string == "journey") {
    appendHtmlFromFile(appElement, "journey.html")
  } else if (string == "resumee") {
  }
}
