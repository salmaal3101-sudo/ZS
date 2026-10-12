(() => {
  const gateScene = document.getElementById("gateScene");
  const openGate = document.getElementById("openGate");
  const invitation = document.getElementById("invitation");
  const languageToggle = document.getElementById("languageToggle");
  const musicToggle = document.getElementById("musicToggle");
  const musicLabel = document.getElementById("musicLabel");
  const petalLayer = document.getElementById("petalLayer");
  let language = "fr";
  // Utilise le fichier MP3 placé à la racine du dépôt GitHub.
  // La lecture démarre au premier clic (règle anti-autoplay des navigateurs).
  const weddingAudio = new Audio("young-and-beautiful-instrumental.mp3");
  weddingAudio.loop = true;
  weddingAudio.preload = "auto";
  weddingAudio.volume = 0.48;
  let musicOn = true;
  let musicStarted = false;

  openGate.addEventListener("click", () => {
    const isOpen = gateScene.classList.toggle("opened");
    openGate.querySelector("span").textContent = isOpen
      ? (language === "fr" ? "Découvrir l’invitation" : "اكتشفوا الدعوة")
      : (language === "fr" ? "Ouvrir les portes" : "افتحوا الأبواب");
    if (isOpen) {
      invitation.classList.add("floral-awake");
      if (musicOn && !musicStarted) startMusic();
      setTimeout(() => invitation.scrollIntoView({ behavior: "smooth", block: "start" }), 850);
    } else {
      invitation.classList.remove("floral-awake");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  function applyLanguage() {
    document.documentElement.lang = language === "ar" ? "ar" : "fr";
    document.body.dir = language === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-fr][data-ar]").forEach(el => {
      el.textContent = el.dataset[language];
    });
    languageToggle.textContent = language === "fr" ? "العربية" : "Français";
    musicLabel.textContent = musicOn
      ? (language === "ar" ? "الموسيقى تعمل" : "Musique activée")
      : (language === "ar" ? "الموسيقى" : "Musique");
    openGate.querySelector("span").textContent = gateScene.classList.contains("opened")
      ? (language === "ar" ? "اكتشفوا الدعوة" : "Découvrir l’invitation")
      : (language === "ar" ? "افتحوا الأبواب" : "Ouvrir les portes");
    musicToggle.setAttribute("aria-label", language === "ar" ? "تشغيل أو إيقاف الموسيقى" : "Activer ou couper la musique");
  }

  languageToggle.addEventListener("click", () => {
    language = language === "fr" ? "ar" : "fr";
    applyLanguage();
  });

  // Lecture de la véritable musique MP3 fournie par Salma.
  function startMusic() {
    weddingAudio.play().then(() => {
      musicStarted = true;
      musicLabel.textContent = language === "ar" ? "الموسيقى تعمل" : "Musique activée";
      musicToggle.setAttribute("aria-pressed", "true");
    }).catch(() => {
      musicLabel.textContent = language === "ar" ? "اضغطوا للاستماع" : "Touchez pour écouter";
    });
  }

  function stopMusic() {
    weddingAudio.pause();
  }

  musicToggle.addEventListener("click", () => {
    musicOn = !musicOn;
    musicToggle.setAttribute("aria-pressed", String(musicOn));
    if (musicOn) startMusic(); else stopMusic();
    musicLabel.textContent = musicOn
      ? (language === "fr" ? "Musique activée" : "الموسيقى تعمل")
      : (language === "fr" ? "Musique" : "الموسيقى");
  });

  // Afficher clairement que la musique est activée dès l’arrivée.
  musicToggle.setAttribute("aria-pressed", "true");
  musicLabel.textContent = language === "ar" ? "الموسيقى تعمل" : "Musique activée";
  applyLanguage();

  // Les fleurs photographiques sont animées en douceur via CSS ; aucun emoji floral ni papillon.

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  const weddingDate = new Date("2027-01-30T18:00:00+01:00").getTime();
  function updateCountdown() {
    let distance = weddingDate - Date.now();
    if (distance < 0) distance = 0;
    const day = Math.floor(distance / 86400000);
    const hour = Math.floor((distance % 86400000) / 3600000);
    const minute = Math.floor((distance % 3600000) / 60000);
    const second = Math.floor((distance % 60000) / 1000);
    document.getElementById("days").textContent = String(day);
    document.getElementById("hours").textContent = String(hour).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minute).padStart(2, "0");
    document.getElementById("seconds").textContent = String(second).padStart(2, "0");
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
