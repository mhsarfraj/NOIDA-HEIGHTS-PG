/* NOIDA HEIGHTS PG — static website + Google Sheets enquiry form */
const GOOGLE_SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzp3sC3kUXyZCC4H8ZhrNGqL074pdas0q_VSunAzn3LnrsAHIIF1MynWLeM1LI2uurVzg/exec";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("enquiry-form");
  const message = document.getElementById("formmsg");

  document.querySelectorAll("[data-room]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const select = document.getElementById("f_room");
      if (select) select.value = btn.getAttribute("data-room");
    });
  });

  const burger = document.getElementById("burger");
  if (burger) {
    burger.addEventListener("click", function () {
      const nav = document.querySelector(".hdr-nav");
      if (nav) nav.classList.toggle("mobile-open");
    });
  }

  /* Native HTML form POST is intentional: it works from file:// without CORS/fetch. */
  if (form) {
    form.addEventListener("submit", function (event) {
      if (!GOOGLE_SHEETS_WEB_APP_URL || GOOGLE_SHEETS_WEB_APP_URL.indexOf("PASTE_") === 0) {
        event.preventDefault();
        if (message) {
          message.textContent = "Add your Google Apps Script /exec URL in script.js first.";
          message.className = "formmsg error";
        }
        return;
      }

      form.action = GOOGLE_SHEETS_WEB_APP_URL;
      if (message) {
        message.textContent = "✓ Enquiry sent. We will contact you soon.";
        message.className = "formmsg success";
      }
      window.setTimeout(function () { form.reset(); }, 500);
    });
  }

  /* Photo lightbox */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  document.querySelectorAll(".gallery-grid img").forEach(function (img) {
    img.addEventListener("click", function () {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "Property photo";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  const closeButton = document.querySelector(".lightbox-close");
  if (closeButton) closeButton.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  document.querySelectorAll(".hdr-nav a").forEach(function (a) {
    a.addEventListener("click", function () {
      const nav = document.querySelector(".hdr-nav");
      if (nav) nav.classList.remove("mobile-open");
    });
  });
});
