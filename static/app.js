const editDoneButtonId = "btn-edit-done";

// Credit: https://freefrontend.com/css-snow-effects/
// Snowflake generation
function createSnowflakes() {
  // Create snowflake area if it doesn't exist
  let snowflakeArea = document.querySelector(".snowflake-area");
  if (!snowflakeArea) {
    snowflakeArea = document.createElement("div");
    snowflakeArea.className = "snowflake-area";
    document.body.appendChild(snowflakeArea);
  }

  const numberOfSnowflake = 250;
  const numberOfSnowflakeMd = 50;
  const numberOfSnowflakeLg = 50;

  // Generate CSS for snowflakes dynamically
  let css = "";

  // Regular snowflakes
  for (let i = 1; i <= numberOfSnowflake; i++) {
    const left = Math.random() * 120 - 20;
    const blur = Math.floor(Math.random() * 2);
    const flickrDuration = (Math.random() * 20 + 20) / 10;
    const flickrDelay = (Math.random() * 20) / -10;
    const fallDuration = (Math.random() * 100 + 50) / 5;
    const fallDelay = (Math.random() * 100) / -5;

    css += `.snowflake._${i} { 
                left: ${left}vw; 
                filter: blur(${blur}px); 
                animation: ${flickrDuration}s flickr ${flickrDelay}s infinite, ${fallDuration}s fall ${fallDelay}s infinite; 
            }\n`;

    // Create snowflake element
    const snowflake = document.createElement("div");
    snowflake.className = `snowflake _${i}`;
    snowflake.textContent = "❄";
    snowflakeArea.appendChild(snowflake);
  }

  // Medium snowflakes
  for (let i = 1; i <= numberOfSnowflakeMd; i++) {
    const left = Math.random() * 120 - 20;
    const blur = Math.floor(Math.random() * 2);
    const flickrDuration = (Math.random() * 20 + 20) / 10;
    const flickrDelay = (Math.random() * 20) / -10;
    const fallDuration = (Math.random() * 100 + 50) / 5;
    const fallDelay = (Math.random() * 100) / -5;

    css += `.snowflake._md-${i} { 
                left: ${left}vw; 
                filter: blur(${blur}px); 
                animation: ${flickrDuration}s flickr ${flickrDelay}s infinite, ${fallDuration}s fall ${fallDelay}s infinite; 
            }\n`;

    // Create snowflake element
    const snowflake = document.createElement("div");
    snowflake.className = `snowflake _md _md-${i}`;
    snowflake.textContent = "❄";
    snowflakeArea.appendChild(snowflake);
  }

  // Large snowflakes
  for (let i = 1; i <= numberOfSnowflakeLg; i++) {
    const left = Math.random() * 120 - 20;
    const flickrDuration = (Math.random() * 20 + 20) / 10;
    const flickrDelay = (Math.random() * 20) / -10;
    const fallDuration = (Math.random() * 100 + 50) / 5;
    const fallDelay = (Math.random() * 100) / -5;

    css += `.snowflake._lg-${i} { 
                left: ${left}vw; 
                animation: ${flickrDuration}s flickr ${flickrDelay}s infinite, ${fallDuration}s fall ${fallDelay}s infinite; 
            }\n`;

    // Create snowflake element
    const snowflake = document.createElement("div");
    snowflake.className = `snowflake _lg _lg-${i}`;
    snowflake.textContent = "❄";
    snowflakeArea.appendChild(snowflake);
  }

  // Add CSS to the page
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}

// Hilfsfunktion: Uint8Array -> Base64 (URL-safe)
function uint8ToBase64Url(uint8) {
  let binary = "";
  const len = uint8.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8[i]);
  }
  const b64 = btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return b64;
}

document.addEventListener("DOMContentLoaded", () => {
  // Create snowflakes
  createSnowflakes();

  const editDoneButton = document.getElementById(editDoneButtonId);
  if (editDoneButton) {
    editDoneButton.addEventListener("click", () => {
      const salutation = document.querySelector(
        "select[name='salutation']"
      ).value;
      const toName = document.querySelector("input[name='to_name']").value;
      const content = document.querySelector("textarea[name='content']").value;
      const greeting = document.querySelector("select[name='greeting']").value;
      const fromName = document.querySelector("input[name='from_name']").value;

      const dataObj = {
        to_name: toName,
        content: content,
        from_name: fromName,
        salutation: salutation,
        greeting: greeting,
      };

      const jsonStr = JSON.stringify(dataObj);

      // UTF-8 Bytes
      const utf8Bytes = new TextEncoder().encode(jsonStr);
      // Deflate-Komprimierung mit maximaler Kompression
      const deflated = pako.deflate(utf8Bytes, { level: 9, windowBits: -15 });
      // Base64 URL-safe ohne Padding
      const base64Url = uint8ToBase64Url(deflated);

      const cardUrl = `/card?data=${base64Url}`;

      const qrcodeContainer = document.getElementById("qrcode");
      const linkContainer = document.getElementById("link");
      qrcodeContainer.innerHTML = "";
      linkContainer.innerHTML = `<p>Teile diesen Link zu deiner Karte: <a href="${
        window.location.origin + cardUrl
      }" target="_blank">${window.location.origin + cardUrl}</a></p>`;

      // QR-Code mit optimierten Einstellungen für längere URLs
      new QRCode(qrcodeContainer, {
        text: window.location.origin + cardUrl,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L, // Niedrigste Fehlerkorrektur = mehr Datenkapazität
      });
    });
  }
});
