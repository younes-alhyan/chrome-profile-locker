chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.set({ loggedIn: false });
  chrome.tabs.query({}, (tabs) => {
    chrome.tabs.create({
      url: chrome.runtime.getURL("./lockScreen/index.html"),
    });
    chrome.tabs.remove(tabs[0].id);
  });
});
function loggIn({ userInput }, sender, callback) {
  chrome.storage.local.get(["password"], (result) => {
    const storedPassword = result.password;

    if (!storedPassword || storedPassword === userInput) {
      chrome.storage.local.set({ loggedIn: true, password: userInput }, () => {
        if (sender.tab && sender.tab.id) {
          callback(true);
          chrome.tabs.update(sender.tab.id, { url: "chrome://newtab" });
          chrome.action.setPopup({ popup: "./popup/popup.html" });
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

function exit() {
  chrome.storage.local.get(["loggedIn"], (result) => {
    if (result.loggedIn) {
      return;
    }
    chrome.tabs.query({}, (tabs) => {
      for (let index = 0; index < tabs.length; index++) {
        chrome.tabs.remove(tabs[index].id);
      }
    });
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

  if (msg === "blur") {
    exit();
    return false;
  }
  return true;
});
// Listen for navigation events
chrome.webNavigation.onBeforeNavigate.addListener(() => {
  chrome.storage.local.get(["loggedIn"], (result) => {
    const loggedIn = result.loggedIn;
    if (loggedIn) {
      return;
    }
    chrome.tabs.query({}, (tabs) => {
      if (tabs[0].url !== chrome.runtime.getURL("./lockScreen/index.html")) {
        chrome.tabs.update(tabs[0].id, {
          url: chrome.runtime.getURL("./lockScreen/index.html"),
        });
      }
    });
  });
});
