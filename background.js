chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.set({ loggedIn: false });
});
function loggIn({ userInput }, sender, callback) {
  chrome.storage.local.get(["password"], (result) => {
    const storedPassword = result.password;

    if (!storedPassword || storedPassword === userInput) {
      chrome.storage.local.set({ loggedIn: true, password: userInput }, () => {
        if (sender.tab && sender.tab.id) {
          callback(true);
          chrome.tabs.update(sender.tab.id, { url: "chrome://newtab" });
          chrome.action.setPopup({ popup: "popup.html" });
        }
      });
    } else {
      callback(false);
    }
  });
}
function updatePassword({ currentPassword, newPassword }, callback) {
  chrome.storage.local.get(["password"], (result) => {
    const storedPassword = result.password;
    if (currentPassword === storedPassword) {
      chrome.storage.local.set({ password: newPassword }, () => {
        callback(true);
      });
    } else {
      callback(false);
    }
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { msg } = message;

  if (msg === "loggIn") {
    loggIn(message, sender, (loggedIn) => {
      sendResponse({ loggedIn });
    });
  }

  if (msg === "updatePassword") {
    updatePassword(message, (isUpdated) => {
      sendResponse({ isUpdated });
    });
  }
  return true;
});

// Listen for navigation events
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId !== 0) {
    return;
  }

  chrome.storage.local.get(["loggedIn"], (result) => {
    const loggedIn = result.loggedIn;
    if (loggedIn) {
      return;
    }

    // Ensure there's more than one tab before attempting to remove
    chrome.tabs.query({}, (tabs) => {
      if (tabs.length > 1) {
        // Remove second tab if there are more than one
        if (tabs[1].url !== chrome.runtime.getURL("index.html")) {
          console.log(tabs[1]);
          chrome.tabs.remove(tabs[1].id);
        }
      } else {
        chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
        chrome.tabs.remove(tabs[0].id);
      }
    });
  });
});
