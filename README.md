Chrome Profile Locker
=====================

**Description**:\
Chrome Profile Locker is a Chrome extension designed to lock your Chrome profile with a password, preventing unauthorized access. The extension allows you to secure your profile by requiring a password each time the browser is started. It also includes an option to change the password after login.

* * * * *

Features:
---------

-   **Password Protection**: Lock your Chrome profile with a password.

-   **Password Update**: Update your password anytime via the extension's popup.

-   **Tab Management**: If not logged in, the extension will remove extra tabs to ensure privacy.

-   **Disabled Developer Tools**: Disables the F12 key, Ctrl + Shift + I, and Ctrl + U to prevent access to developer tools and protect your profile.

-   **Right-click Disabled**: Prevents right-clicking for extra security.

* * * * *

Installation:
-------------

1.  Clone or download this repository to your local machine.

2.  Open `chrome://extensions/` in your Chrome browser.

3.  Enable "Developer mode" by toggling the switch in the top-right corner.

4.  Click on the "Load unpacked" button.

5.  Select the folder where you downloaded the extension files.

6.  Once the extension is installed, the icon will appear in your Chrome toolbar.

* * * * *

How to Use:
-----------

1.  **Lock Profile**:

    -   Upon starting Chrome, the extension will prompt you for a password.

    -   Enter your password to unlock the profile.

    -   If the password is correct, you'll gain access to the profile.

2.  **Update Password**:

    -   Click on the extension icon to open the popup.

    -   Enter the current password and the new password to update your profile password.

* * * * *

File Structure:
---------------


```graphql
    ├── icons/                 # Folder containing icon images for the extension
    ├── lockScreen/            # Folder for the lock screen files
    │   ├── index.html         # Lock screen HTML file (initial password input)
    │   └── script.js          # Logic for handling the password entry and login in index.html
    ├── popup/                 # Folder for the popup files
    │   ├── popup.html         # Popup HTML file (for updating the password)
    │   └── popup.js           # Logic for handling the password update in popup.html
    ├── background.js          # Background script that manages login and password updates
    └── manifest.json          # Metadata for the Chrome extension
```
* * * * *

Permissions:
------------

The extension requires the following permissions:

-   `storage`: To store and retrieve the password securely.

-   `tabs`: To manage browser tabs, including closing unnecessary tabs.

-   `webNavigation`: To listen for navigation events and handle tab navigation.

-   `host_permissions`: To allow the extension to interact with all URLs.

* * * * *

Notes:
------

-   The password is stored locally in Chrome's storage and is not transmitted over the network.

-   Ensure you remember your password, as losing it could lock you out of your profile.

-   The extension restricts the use of developer tools, right-click context menus, and certain keyboard shortcuts to enhance security.

* * * * *

License:
--------

This project is open-source and licensed under the MIT License.