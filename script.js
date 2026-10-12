(() => {
  const gateScene = document.getElementById("gateScene");
  const openGate = document.getElementById("openGate");
  const invitation = document.getElementById("invitation");
  const languageToggle = document.getElementById("languageToggle");
  const musicToggle = document.getElementById("musicToggle");
  const musicLabel = document.getElementById("musicLabel");
  const petalLayer = document.getElementById("petalLayer");
  let language = "fr";
  let audioContext = null;
  let musicTimer = null;
  // La musique est activée par défaut, mais le navigateur exige un premier geste de l’invité.
  let musicOn = true;
  let musicStarted = false;
  let noteIndex = 0;
  let masterGain = null;

  openGate.addEventListener("click", () => {
    if (musicOn && !musicStarted) startMusic();
    const isOpen = gateScene.classList.toggle("opened");
    openGate.querySelector("span").textContent = isOpen
      ? (language === "fr" ? "Découvrir l’invitation" : "اكتشفوا الدعوة")
      : (language === "fr" ? "Ouvrir les portes" : "افتحوا الأبواب");
    if (isOpen) {
      createPetals(24);
      setTimeout(() => invitation.scrollIntoView({ behavior: "smooth", block: "start" }), 850);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  languageToggle.addEventListener("click", () => {
    language = language === "fr" ? "ar" : "fr";
    document.documentElement.lang = language;
    document.body.dir = language === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-fr][data-ar]").forEach(el => {
      el.textContent = el.dataset[language];
    });
    languageToggle.textContent = language === "fr" ? "العربية" : "Français";
    musicLabel.textContent = musicOn
      ? (language === "fr" ? "Musique activée" : "الموسيقى تعمل")
      : (language === "fr" ? "Musique désactivée" : "الموسيقى متوقفة");
    openGate.querySelector("span").textContent = gateScene.classList.contains("opened")
      ? (language === "fr" ? "Découvrir l’invitation" : "اكتشفوا الدعوة")
      : (language === "fr" ? "Ouvrir les portes" : "افتحوا الأبواب");
    musicToggle.setAttribute("aria-label", language === "fr" ? "Activer ou couper la musique" : "تشغيل أو إيقاف الموسيقى");
  });

  // Bande-son choisie par les mariés : placer le fichier audio autorisé à la racine.
  // Le navigateur ne permet pas de démarrer le son avant un premier clic de l'invité.
  const weddingAudio = new Audio("young-and-beautiful-instrumental.mp3");
  weddingAudio.loop = true;
  weddingAudio.preload = "auto";
  weddingAudio.volume = 0.42;

  async function startMusic() {
    try {
      await weddingAudio.play();
      musicStarted = true;
      musicOn = true;
      musicToggle.setAttribute("aria-pressed", "true");
      musicLabel.textContent = language === "fr" ? "Musique activée" : "الموسيقى تعمل";
    } catch (error) {
      musicStarted = false;
      musicLabel.textContent = language === "fr" ? "Ajouter la musique" : "أضيفوا الموسيقى";
      console.info("Ajoutez le fichier audio instrumental à la racine du site.", error);
    }
  }

  function stopMusic() {
    musicOn = false;
    weddingAudio.pause();
    musicToggle.setAttribute("aria-pressed", "false");
    musicLabel.textContent = language === "fr" ? "Musique désactivée" : "الموسيقى متوقفة";
  }

  musicToggle.setAttribute("aria-pressed", "true");
  musicLabel.textContent = language === "fr" ? "Musique activée" : "الموسيقى تعمل";
  musicToggle.setAttribute("aria-label", language === "fr" ? "Couper ou activer la musique" : "إيقاف أو تشغيل الموسيقى");

  musicToggle.addEventListener("click", async () => {
    if (musicOn && !musicStarted) {
      await startMusic();
    } else if (musicStarted) {
      stopMusic();
    } else {
      musicOn = true;
      await startMusic();
    }
  });

  function createPetals(amount) {
    const symbols = ["✿", "❀", "✽", "·"];
    for (let i = 0; i < amount; i++) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.fontSize = (10 + Math.random() * 19) + "px";
      petal.style.animationDuration = (5 + Math.random() * 7) + "s";
      petal.style.animationDelay = (Math.random() * 1.6) + "s";
      petal.style.setProperty("--drift", ((Math.random() - .5) * 180) + "px");
      petalLayer.appendChild(petal);
      setTimeout(() => petal.remove(), 14500);
    }
  }
  setInterval(() => createPetals(2), 3600);

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
