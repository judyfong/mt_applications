# IS-EN MT

## What it does ##

The extension includes:

* a browser action with a popup including HTML, CSS, and JS
* a content script to translate selected text

When the user clicks the browser action button, the popup is shown, enabling
the user to choose to translate.

When it is shown, the popup injects a content script into the current page.

When the user chooses to translate, the extension sends the content script a
message containing translate.

When the content script receives this message, it sends the selected text to be
translated then creates an alert.

Note that:

* if the user reloads the tab, or switches tabs, while the popup is open, then the popup won't be able to translate the page any more (because the content script was injected into the original tab).

* by default [`tabs.executeScript()`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/executeScript) injects the script only when the web page and its resources have finished loading. This means that clicks in the popup will have no effect until the page has finished loading.

* it's not possible to inject content scripts into certain pages, including privileged browser pages like "about:debugging" and the [addons.mozilla.org](https://addons.mozilla.org/) website. If the user clicks the IS-EN MT icon when such a page is loaded into the active tab, the popup displays an error message.

## What it shows ##

* write a browser action with a popup
* give the popup style and behavior using CSS and JS
* inject a content script programmatically using `tabs.executeScript()`
* send a message from the main extension to a content script

# Credit

This README was mostly written by the mdn webapplications-example repo and has been edited to work for the IS-EN MT extension.
