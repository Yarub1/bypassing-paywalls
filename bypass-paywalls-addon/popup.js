// popup.js
document.getElementById("deleteElement").addEventListener("click", function () {
  const elementToDelete = document.getElementById("elementToDelete").value;
  // Send a message to content script with the selected element
  browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    browser.tabs.sendMessage(tabs[0].id, { elementToDelete });
  });
});

// Open "10minemail.com" in a new iframe
document
  .getElementById("open10minemail")
  .addEventListener("click", function () {
    const iframeContainer = document.getElementById("iframeContainer1");
    openIframeInContainer("https://10minutemail.net/", iframeContainer);
  });

// Open "bugmenot.com" in a new iframe
document.getElementById("openBugMeNot").addEventListener("click", function () {
  const iframeContainer = document.getElementById("iframeContainer2");
  openIframeInContainer("https://bugmenot.com/", iframeContainer);
});

// Function to open an iframe in a container
function openIframeInContainer(src, container) {
  // Hide all other iframe containers
  const allContainers = document.querySelectorAll(".iframe-container");
  allContainers.forEach((c) => (c.style.display = "none"));

  // Create an iframe element
  const iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.width = "100%";
  iframe.height = "500px";
  iframe.style.border = "1px solid #ccc";

  // Append the iframe to the specified container
  container.appendChild(iframe);

  // Display the container
  container.style.display = "block";
}
