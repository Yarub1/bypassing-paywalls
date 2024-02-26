// content.js
// Content script to automatically change user agent, bypass paywalls, delete site cookies,
// intelligently remove overlaying elements, and bypass paywalls on various websites

// Set the user agent to mimic Google Bot
Object.defineProperty(navigator, "userAgent", {
  value:
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  writable: false,
  configurable: true,
  enumerable: true,
});

// Function to create clickjacking iframe
function createClickjackingIframe(url) {
  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.style.border = "none";
  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  document.body.appendChild(iframe);
}

// Function to manipulate UI for paywall bypass
function manipulateUI() {
  const paywallElements = document.querySelectorAll(".paywall");
  paywallElements.forEach((element) => {
    element.style.display = "none";
  });
}

// Function to bypass paywall on specific websites
function bypassPaywall() {
  // Bypass logic for The Athletic
  document.querySelectorAll(".tp-modal").forEach((element) => element.remove());
  document
    .querySelectorAll(".tp-backdrop")
    .forEach((backdrop) => backdrop.remove());
  document
    .querySelectorAll(".tp-container")
    .forEach((container) => container.remove());
  document
    .querySelectorAll(".paywall")
    .forEach((paywall) => (paywall.style.display = "none"));
}

// Function to delete all cookies
const deleteAllCookies = () => {
  const cookies = document.cookie.split("; ");
  cookies.forEach((cookie) => {
    const [name] = cookie.split("=");
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
};

// Call the functions to bypass paywalls and delete cookies
createClickjackingIframe("https://theathletic.com"); // Replace with the desired URL
manipulateUI();
bypassPaywall();
deleteAllCookies();

// Delete specified elements by ID
const deleteElementById = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.remove();
  }
};

// Delete the first element
const slideupPaywallElement = document.getElementById("slideup-paywall");
if (slideupPaywallElement) {
    slideupPaywallElement.remove();
}

// Delete the second element
const darkenOverlayElement = document.getElementById("darken-overlay");
if (darkenOverlayElement) {
    darkenOverlayElement.remove();
}

// Change the style of the element with class "noscroll" to use position: absolute
const noscrollElement = document.querySelector(".noscroll");
if (noscrollElement) {
  noscrollElement.style.position = "absolute";
}

// Delete the specified overlay container
const overlayContainer = document.getElementById("paywall-1176d186cb35");
if (overlayContainer) {
  overlayContainer.remove();
}

// Change the style of the body element
document.body.style.height = "100%";
document.body.style.width = "100%";
document.body.style.position = "absolute";
document.body.style.minWidth = "100%";
document.body.style.maxWidth = "100%";

// Run the functions after a short delay to ensure the page is fully loaded
setTimeout(() => {
  deleteSpecifiedElements();
}, 2000);
