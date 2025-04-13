const button = document.getElementById("updateButton");
const errorMessage = document.getElementById("errorMessage");

function updatePassword() {
  const currentPassword = document
    .getElementById("currentPassword")
    .value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();

  if (!currentPassword || !newPassword) return;

  chrome.runtime.sendMessage(
    {
      msg: "updatePassword",
      currentPassword,
      newPassword,
    },
    (response) => {
      if (response && response.isUpdated) {
        errorMessage.style.display = "none";
      } else {
        errorMessage.style.display = "block";
      }
    }
  );

  document.getElementById("currentPassword").value = "";
  document.getElementById("newPassword").value = "";
}

button.addEventListener("click", updatePassword);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    updatePassword();
  }
});
