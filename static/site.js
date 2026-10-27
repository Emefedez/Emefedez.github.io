(() => {
  // 1. Live real-time date on the landing page ("Life is worth living at least as of... <date>")
  const liveDateEl = document.getElementById("live-date");
  if (liveDateEl) {
    try {
      const now = new Date();
      liveDateEl.textContent = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now);
    } catch (_) {
      // Fallback keeps the Hugo build-time date baked into the HTML
    }
  }

  // 2. Smooth image lazy-loading reveal
  const lazyImages = document.querySelectorAll("img.lazy-img");
  const markLoaded = (img) => img.classList.add("is-loaded");

  lazyImages.forEach((img) => {
    if (img.complete && img.naturalWidth > 0) {
      markLoaded(img);
    } else {
      img.addEventListener("load", () => markLoaded(img), { once: true });
      img.addEventListener("error", () => markLoaded(img), { once: true });
    }
  });

  // 3. Click-to-zoom lightbox for high-res zines and project previews
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  if (lightbox && lightboxImg) {
    const closeLightbox = () => {
      lightbox.hidden = true;
      lightboxImg.src = "";
    };

    document.querySelectorAll("img[data-zoom-src]").forEach((img) => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.getAttribute("data-zoom-src") || img.src;
        lightboxImg.alt = img.alt || "";
        lightbox.hidden = false;
      });
    });

    lightbox.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  // 4. Sidebar category jump + adjacent group card highlight
  const jumpLinks = document.querySelectorAll("[data-category-jump]");
  jumpLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const cat = link.getAttribute("data-category-jump");
      const target = document.getElementById(`group-${cat}`);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "center" });

      const groupCards = document.querySelectorAll(`.project-card[data-category="${cat}"]`);
      groupCards.forEach((card) => card.classList.add("is-group-highlighted"));
      window.setTimeout(() => {
        groupCards.forEach((card) => card.classList.remove("is-group-highlighted"));
      }, 1600);
    });
  });
})();
