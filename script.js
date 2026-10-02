/**
 * Bodas de Seda • Paola & John (12 Años de Matrimonio)
 * Mobile-First Interactive Architecture
 * Crafted with design-taste-frontend + impeccable
 */

document.addEventListener('DOMContentLoaded', () => {
  const plans = {
    plan1: {
      title: "Atardecer en Rooftop & Cócteles de Autor",
      category: "Vista Panorámica & Coctelería",
      waText: "¡Mi amor John! ❤️ Acabo de ver nuestra página de aniversario. Para celebrar nuestros 12 años juntos el 4 de octubre elijo: 'Atardecer en Rooftop & Cócteles de Autor'. ¡Te amo con todo mi corazón!"
    },
    plan2: {
      title: "Escapada Mágica en la Naturaleza",
      category: "Cabaña & Noche Bajo las Estrellas",
      waText: "¡Mi amor John! ❤️ Acabo de ver nuestra página de aniversario. Para celebrar nuestros 12 años juntos el 4 de octubre elijo: 'Escapada Mágica en la Naturaleza' (Cabaña, fogata y estrellas). ¡Te amo con todo mi corazón!"
    },
    plan3: {
      title: "Cena Romántica",
      category: "Gastronomía Romántica",
      waText: "¡Mi amor John! ❤️ Acabo de ver nuestra página de aniversario. Para celebrar nuestros 12 años juntos el 4 de octubre elijo: 'Cena Romántica'. ¡Te amo con todo mi corazón!"
    }
  };

  const planCards = document.querySelectorAll('.mobile-plan-card');
  const bottomDock = document.getElementById('mobileBottomDock');
  const dockTitle = document.getElementById('dockSelectedTitle');
  const dockWhatsAppBtn = document.getElementById('dockWhatsAppBtn');
  const btnCloseDock = document.getElementById('btnCloseDock');
  const soundBtn = document.getElementById('soundBtn');
  const soundLabel = document.getElementById('soundLabel');

  // Select Plan
  planCards.forEach(card => {
    card.addEventListener('click', () => {
      const planKey = card.getAttribute('data-plan');
      if (!planKey || !plans[planKey]) return;

      planCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      const planInfo = plans[planKey];
      dockTitle.textContent = `${planInfo.title}`;

      // WhatsApp URL
      const encodedMsg = encodeURIComponent(planInfo.waText);
      dockWhatsAppBtn.href = `https://api.whatsapp.com/send?text=${encodedMsg}`;

      // Show dock
      bottomDock.classList.add('dock-open');

      // Play soft harmonic tone
      playGentleTone();
    });
  });

  // Close dock
  if (btnCloseDock) {
    btnCloseDock.addEventListener('click', () => {
      bottomDock.classList.remove('dock-open');
      planCards.forEach(c => c.classList.remove('selected'));
    });
  }

  // --- AUDIO SYNTHESIS ---
  let audioCtx = null;
  let isSoundActive = false;
  let chordTimer = null;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playGentleTone() {
    try {
      initAudio();
      if (!audioCtx) return;
      const now = audioCtx.currentTime;
      [329.63, 440.00, 554.37].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.0001, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.03, now + idx * 0.04 + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 1.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 1.2);
      });
    } catch (e) {}
  }

  function startAmbientChords() {
    initAudio();
    const chords = [
      [261.63, 329.63, 392.00], // C
      [220.00, 261.63, 329.63], // Am
      [174.61, 220.00, 261.63], // F
      [196.00, 246.94, 293.66]  // G
    ];
    let idx = 0;

    chordTimer = setInterval(() => {
      if (!isSoundActive || !audioCtx) return;
      const chord = chords[idx];
      const now = audioCtx.currentTime;
      chord.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.0001, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.015, now + i * 0.08 + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 3.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 3.3);
      });
      idx = (idx + 1) % chords.length;
    }, 4000);
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const playlistElem = document.getElementById('playlist');
      if (playlistElem) {
        playlistElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      playGentleTone();
    });
  }

  // --- HW-PATH-TEXT: Handwriting Along SVG Path (HyperFrames inspired) ---
  const journeyTextPath = document.getElementById('journeyTextPath');
  const journeyGuide = document.getElementById('journeyPath');
  const pathTextWrapper = document.getElementById('pathTextWrapper');

  if (journeyTextPath && journeyGuide) {
    const phrase = "Gracias por acompañarme en este viaje...";
    const NS = "http://www.w3.org/2000/svg";
    journeyTextPath.innerHTML = "";
    
    // Create per-character tspans initially hidden
    const chars = Array.from(phrase);
    chars.forEach(ch => {
      const tspan = document.createElementNS(NS, "tspan");
      tspan.textContent = ch;
      tspan.style.opacity = "0";
      tspan.style.transition = "opacity 0.12s ease";
      journeyTextPath.appendChild(tspan);
    });

    const tspans = journeyTextPath.querySelectorAll("tspan");
    const totalLen = journeyGuide.getTotalLength ? journeyGuide.getTotalLength() : 450;
    journeyGuide.style.strokeDasharray = "3 8";
    journeyGuide.style.strokeDashoffset = totalLen;
    journeyGuide.style.transition = "stroke-dashoffset 1.2s ease";

    let hasRevealed = false;
    let revealTimeouts = [];

    function resetPathText() {
      revealTimeouts.forEach(t => clearTimeout(t));
      revealTimeouts = [];
      journeyGuide.style.transition = "none";
      journeyGuide.style.strokeDashoffset = totalLen;
      tspans.forEach(span => {
        span.style.opacity = "0";
      });
    }

    function animatePathReveal() {
      resetPathText();
      hasRevealed = true;

      // Draw the guide curve first
      requestAnimationFrame(() => {
        journeyGuide.style.transition = "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
        journeyGuide.style.strokeDashoffset = "0";
      });

      // Reveal each character one-by-one along the curve like handwriting
      tspans.forEach((span, index) => {
        const timeout = setTimeout(() => {
          span.style.opacity = "1";
        }, 350 + index * 50);
        revealTimeouts.push(timeout);
      });
    }

    // Strict observer: ONLY fires when the user scrolls down and the element is in the active reading area
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasRevealed) {
          animatePathReveal();
        } else if (!entry.isIntersecting && entry.boundingClientRect.top > window.innerHeight) {
          // If scrolled back up to the top Hero, reset so it replays when coming back down
          hasRevealed = false;
          resetPathText();
        }
      });
    }, { 
      threshold: 0.5,
      rootMargin: "0px 0px -40px 0px"
    });

    if (pathTextWrapper) {
      observer.observe(pathTextWrapper);
      
      // Tap to re-play animation anytime
      pathTextWrapper.addEventListener('click', () => {
        animatePathReveal();
        playGentleTone();
      });
    }
  }

  // --- HW-TITLE: Handwriting Reveal for "Nuestra Banda Sonora" ---
  const hwTitleWrapper = document.getElementById('hwTitleWrapper');
  const hwTitleText = document.getElementById('hwTitleText');
  const hwTitleGuide = document.getElementById('hwTitleGuide');

  if (hwTitleWrapper && hwTitleText && hwTitleGuide) {
    const titlePhrase = "Nuestra Banda Sonora";
    const NS = "http://www.w3.org/2000/svg";
    hwTitleText.innerHTML = "";

    const titleChars = Array.from(titlePhrase);
    titleChars.forEach(ch => {
      const span = document.createElementNS(NS, "tspan");
      span.textContent = ch;
      span.style.opacity = "0";
      span.style.transition = "opacity 0.12s ease";
      hwTitleText.appendChild(span);
    });

    const tspans = hwTitleText.querySelectorAll("tspan");
    const totalLen = hwTitleGuide.getTotalLength ? hwTitleGuide.getTotalLength() : 310;
    hwTitleGuide.style.strokeDasharray = "3 6";
    hwTitleGuide.style.strokeDashoffset = totalLen;
    hwTitleGuide.style.transition = "stroke-dashoffset 1s ease";

    let titleRevealed = false;
    let titleTimeouts = [];

    function resetHwTitle() {
      titleTimeouts.forEach(t => clearTimeout(t));
      titleTimeouts = [];
      hwTitleGuide.style.transition = "none";
      hwTitleGuide.style.strokeDashoffset = totalLen;
      tspans.forEach(s => s.style.opacity = "0");
    }

    function animateHwTitle() {
      resetHwTitle();
      titleRevealed = true;

      // Draw underline brush guide
      requestAnimationFrame(() => {
        hwTitleGuide.style.transition = "stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
        hwTitleGuide.style.strokeDashoffset = "0";
      });

      // Write each letter one by one
      tspans.forEach((span, i) => {
        const t = setTimeout(() => {
          span.style.opacity = "1";
        }, 220 + i * 45);
        titleTimeouts.push(t);
      });
    }

    // Start completely hidden
    resetHwTitle();

    // Mirror the exact proven observer logic of journeyPath
    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !titleRevealed) {
          animateHwTitle();
        } else if (!entry.isIntersecting && entry.boundingClientRect.top > window.innerHeight) {
          titleRevealed = false;
          resetHwTitle();
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -20px 0px"
    });

    titleObserver.observe(hwTitleWrapper);

    hwTitleWrapper.addEventListener('click', () => {
      animateHwTitle();
      playGentleTone();
    });
  }

  // --- NUMBER-WHEEL ANIMATION (Inspired by HyperFrames number-wheel) ---
  const metricsSection = document.getElementById('metricsSection');
  const wheelElements = document.querySelectorAll('.number-wheel');

  if (metricsSection && wheelElements.length > 0) {
    // Build digit tracks for each wheel
    wheelElements.forEach(wheel => {
      const targetStr = wheel.getAttribute('data-target') || '';
      wheel.innerHTML = ''; // Clear fallback

      Array.from(targetStr).forEach(char => {
        if (char === ',') {
          const comma = document.createElement('span');
          comma.className = 'wheel-comma';
          comma.textContent = ',';
          wheel.appendChild(comma);
        } else if (/\d/.test(char)) {
          const col = document.createElement('span');
          col.className = 'wheel-column';

          const track = document.createElement('span');
          track.className = 'wheel-track';
          track.setAttribute('data-digit', char);

          // Digits 0 to 9 twice to give realistic slot/odometer spinning motion
          // [0, 1, 2, ..., 9, 0, 1, 2, ..., target]
          const targetNum = parseInt(char, 10);
          const digitsList = [];
          for (let i = 0; i <= 9; i++) digitsList.push(i);
          for (let i = 0; i <= targetNum; i++) digitsList.push(i);

          digitsList.forEach(num => {
            const digit = document.createElement('span');
            digit.className = 'wheel-digit';
            digit.textContent = num;
            track.appendChild(digit);
          });

          col.appendChild(track);
          wheel.appendChild(col);
        }
      });
    });

    let wheelsAnimated = false;

    function resetWheels() {
      const tracks = metricsSection.querySelectorAll('.wheel-track');
      tracks.forEach(track => {
        track.style.transition = 'none';
        track.style.transform = 'translateY(0%)';
      });
    }

    function spinWheels() {
      wheelsAnimated = true;
      resetWheels();

      // Trigger spin with staggered timing across digits
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          wheelElements.forEach((wheel, wheelIdx) => {
            const tracks = wheel.querySelectorAll('.wheel-track');
            tracks.forEach((track, digitIdx) => {
              const targetNum = parseInt(track.getAttribute('data-digit'), 10);
              // Number of total items rolled: 10 + targetNum
              const rollCount = 10 + targetNum;
              const totalItems = track.children.length;
              const percentage = (rollCount / totalItems) * 100;

              // Staggered roll duration & delay for physical odometer realism
              const duration = 1.6 + (wheelIdx * 0.25) + (digitIdx * 0.15);
              track.style.transition = `transform ${duration}s cubic-bezier(0.12, 0.95, 0.25, 1)`;
              track.style.transform = `translateY(-${percentage}%)`;
            });
          });
        });
      });
    }

    // Strict Scroll Observer: only starts when the metrics block is scrolled into view
    const metricsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !wheelsAnimated) {
          spinWheels();
        } else if (!entry.isIntersecting && entry.boundingClientRect.top > window.innerHeight) {
          // If scrolled back up, reset so it spins again when coming back down
          wheelsAnimated = false;
          resetWheels();
        }
      });
    }, {
      threshold: 0.35,
      rootMargin: "0px 0px -30px 0px"
    });

    metricsObserver.observe(metricsSection);

    // Click to replay wheel spin anytime
    metricsSection.addEventListener('click', () => {
      spinWheels();
      playGentleTone();
    });
  }
});
