const button = document.getElementById("button");
const errorMessage = document.getElementById("errorMessage");

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
    alert("Developer tools are disabled.");
  }
});

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  alert("Right-click is disabled.");
});
