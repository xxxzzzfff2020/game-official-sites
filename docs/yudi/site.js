(function () {
  document.documentElement.classList.add("js");

  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  const heroVideo = document.querySelector("[data-hero-video]");
  const audioToggle = document.querySelector("[data-audio-toggle]");
  const audioLabel = document.querySelector("[data-audio-label]");
  const mainTrailer = document.querySelector("[data-main-trailer]");

  const closeNavigation = () => {
    if (!header || !navToggle) return;
    header.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "打开导航");
  };

  if (header && navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "关闭导航" : "打开导航");
    });
  }

  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNavigation));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });

  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 16);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const updateAudioState = () => {
    if (!heroVideo || !audioToggle || !audioLabel) return;
    const isMuted = heroVideo.muted || heroVideo.volume === 0;
    audioToggle.setAttribute("aria-pressed", String(!isMuted));
    audioLabel.textContent = isMuted ? "开启声音" : "关闭声音";
  };

  if (heroVideo && audioToggle) {
    heroVideo.muted = false;
    heroVideo.volume = 1;
    updateAudioState();
    audioToggle.addEventListener("click", async () => {
      if (heroVideo.paused && heroVideo.dataset.autoplayBlocked === "true") {
        heroVideo.muted = false;
      } else {
        heroVideo.muted = !heroVideo.muted;
      }
      try {
        await heroVideo.play();
        delete heroVideo.dataset.autoplayBlocked;
      } catch {
        // The poster and the dedicated trailer section remain available.
      }
      updateAudioState();
    });
    heroVideo.addEventListener("volumechange", updateAudioState);

    heroVideo.play().catch(() => {
      heroVideo.dataset.autoplayBlocked = "true";
      audioLabel.textContent = "播放并开启声音";
    });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const unlockSoundOnFirstInteraction = async () => {
        if (heroVideo.dataset.autoplayBlocked !== "true") return;
        heroVideo.muted = false;
        try {
          await heroVideo.play();
          delete heroVideo.dataset.autoplayBlocked;
          updateAudioState();
        } catch {
          audioLabel.textContent = "播放并开启声音";
        }
      };
      window.addEventListener("pointerdown", unlockSoundOnFirstInteraction, { once: true });
      window.addEventListener("keydown", unlockSoundOnFirstInteraction, { once: true });
    }
  }

  if (mainTrailer && heroVideo) {
    mainTrailer.addEventListener("play", () => {
      heroVideo.muted = true;
      heroVideo.pause();
      updateAudioState();
    });
  }

  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroVideo?.pause();
    if (heroVideo && audioLabel) {
      heroVideo.dataset.autoplayBlocked = "true";
      audioLabel.textContent = "播放并开启声音";
    }
  }
})();
