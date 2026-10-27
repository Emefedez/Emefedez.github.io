(() => {
  // 0. Animated dancing banana tab icon (Firefox animates GIF favicons natively;
  //    Chromium/Brave/Vivaldi need canvas frame cycling via ImageDecoder)
  const faviconEl = document.getElementById("site-favicon");
  if (faviconEl && "ImageDecoder" in window && !/Firefox\//i.test(navigator.userAgent)) {
    fetch("/images/GIFs/dancing-banana.gif")
      .then((r) => r.arrayBuffer())
      .then(async (buf) => {
        const decoder = new ImageDecoder({ data: buf, type: "image/gif" });
        await decoder.tracks.ready;
        const count = decoder.tracks.selectedTrack.frameCount;
        if (!count || count < 2) return;
        const canvas = document.createElement("canvas");
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext("2d");
        const frames = [];
        for (let i = 0; i < count; i++) {
          const { image } = await decoder.decode({ frameIndex: i });
          ctx.clearRect(0, 0, 32, 32);
          ctx.drawImage(image, 0, 0, 32, 32);
          frames.push(canvas.toDataURL("image/png"));
          image.close();
        }
        let idx = 0;
        window.setInterval(() => {
          faviconEl.type = "image/png";
          faviconEl.href = frames[idx];
          idx = (idx + 1) % frames.length;
        }, 110);
      })
      .catch(() => {});
  }

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

  // 3. Project card expand / collapse sliver button
  const updateCardOverflow = () => {
    document.querySelectorAll(".project-card").forEach((card) => {
      if (card.classList.contains("is-expanded")) return;
      const collapsible = card.querySelector(".project-collapsible");
      if (!collapsible) return;
      const overflows = collapsible.scrollHeight > collapsible.clientHeight + 8;
      card.classList.toggle("is-short", !overflows);
    });
  };

  document.querySelectorAll(".project-card").forEach((card) => {
    const btn = card.querySelector(".project-expand-btn");
    const label = card.querySelector(".expand-label");
    const collapsible = card.querySelector(".project-collapsible");
    if (!btn || !label || !collapsible) return;

    btn.addEventListener("click", () => {
      const startHeight = collapsible.clientHeight;
      const expanded = card.classList.toggle("is-expanded");
      btn.setAttribute("aria-expanded", expanded ? "true" : "false");
      label.textContent = expanded ? "▲ Collapse" : "▼ Expand";

      if (expanded) {
        collapsible.style.maxHeight = startHeight + "px";
        void collapsible.offsetHeight;
        collapsible.style.maxHeight = (collapsible.scrollHeight + 16) + "px";
      } else {
        collapsible.style.maxHeight = collapsible.scrollHeight + "px";
        void collapsible.offsetHeight;
        collapsible.style.maxHeight = "215px";
        updateCardOverflow();
      }
    });

    collapsible.addEventListener("transitionend", (e) => {
      if (e.propertyName === "max-height" && !card.classList.contains("is-expanded")) {
        collapsible.style.maxHeight = "";
      }
    });
  });

  updateCardOverflow();
  window.addEventListener("resize", updateCardOverflow);

  // 4. Click-to-zoom lightbox for high-res zines and project previews
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

  // 5. Sidebar category jump + adjacent group card highlight
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
