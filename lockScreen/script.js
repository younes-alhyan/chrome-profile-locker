const button = document.getElementById("button");
const errorMessage = document.getElementById("errorMessage");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const popupMessage = document.getElementById("popupMessage");

function showPopup(message) {
  popupMessage.textContent = message;
  popup.style.display = "flex";
  setTimeout(() => {
    popup.style.opacity = "1";
  }, 50); // Delay to trigger opacity transition
}

function hidePopup() {
  popup.style.opacity = "0";
  setTimeout(() => {
    popup.style.display = "none";
  }, 300); // Wait for the fade-out effect to complete before hiding
}

function handleInput() {
  const userInput = document.getElementById("input").value.trim();
  if (!userInput) {
    return;
  }
  chrome.runtime.sendMessage({ msg: "loggIn", userInput }, (response) => {
    if (response && response.loggedIn) {
      errorMessage.style.display = "none";
    } else {
      errorMessage.style.display = "block";
    }
  });

  document.getElementById("input").value = "";
}

button.addEventListener("click", handleInput);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleInput();
  }
});

document.addEventListener("keydown", function (e) {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && e.key === "I") ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
    showPopup("DevTools are blocked!");
  }
});

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  showPopup("right-click is blocked!");
});

window.addEventListener("blur", () => {
  chrome.runtime.sendMessage({ msg: "blur" });
});

document.addEventListener("click", hidePopup);
