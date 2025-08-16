# 🔒 Chrome Profile Locker

![Chrome](https://img.shields.io/badge/Chrome-Extension-blue?logo=google-chrome\&logoColor=white) ![Version](https://img.shields.io/badge/Version-1.0.0-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

> Protect your Chrome profile with a password! 🛡️


## ✨ Features

* 🔑 **Password Protection** – Lock your Chrome profile with a password.
* 🔄 **Password Update** – Update your password anytime via the popup.
* 🗂 **Tab Management** – Extra tabs are removed if you’re not logged in.
* 🛠 **Disabled Developer Tools** – F12, Ctrl + Shift + I, Ctrl + U blocked.
* 🚫 **Right-click Disabled** – Prevents right-click context menus for extra security.


## 🛠 Installation

> **Note:** Chrome extensions must be loaded in developer mode.

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (toggle top-right).
4. Click **Load unpacked**.
5. Select the folder containing the extension files.
6. ✅ Extension icon will appear in your Chrome toolbar.


## 📝 How to Use

### 1️⃣ Lock Profile

> On Chrome startup, the extension will prompt for a password.

* Enter your password to unlock your profile.
* If correct, you gain access.

### 2️⃣ Update Password

* Click the extension icon to open the popup.
* Enter your **current password** and **new password**.
* Click **Save** to update your profile password. 🔄


## 📂 File Structure

```text
├── icons/                 # Icon images for the extension
├── lockScreen/            # Lock screen files
│   ├── index.html         # Lock screen HTML (initial password input)
│   └── script.js          # Password entry & login logic
├── popup/                 # Popup files
│   ├── popup.html         # Popup HTML (password update)
│   └── popup.js           # Password update logic
├── background.js          # Background script for login & password management
└── manifest.json          # Chrome extension metadata
```


## 🔐 Permissions

* `storage` – Store and retrieve the password securely.
* `tabs` – Manage browser tabs, including closing unnecessary ones.
* `webNavigation` – Listen for navigation events and handle tab navigation.
* `host_permissions` – Interact with all URLs.


## ⚠️ Notes & Warnings

> **Important:**

* Password is stored **locally** in Chrome, never transmitted online.
* ❗ Forgetting your password may lock you out.
* Developer tools, right-click menus, and some keyboard shortcuts are restricted for security.


