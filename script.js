/**
 * VIVEK KELKAR PORTFOLIO - CORE ENGINE
 * Interactive Terminal, Procedural Web Audio, Packet Telemetry, & Matrix Backdrop
 */

document.addEventListener("DOMContentLoaded", () => {
  initAudio();
  initMatrixRain();
  initUptime();
  initScanlineToggle();
  initThemeToggle();
  initNavigation();
  initProjectsFilter();
  initPacketSimulator();
  initTerminal();
  initContactForm();
});

/* ==========================================================================
   1. PROCEDURAL AUDIO SYNTHESIZER (Web Audio API - Zero External Files)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = false;

function initAudio() {
  const soundBtn = document.getElementById("soundToggle");
  if (!soundBtn) return;

  soundBtn.addEventListener("click", () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    soundEnabled = !soundEnabled;
    soundBtn.innerHTML = soundEnabled 
      ? `<span>🔊</span> <span>AUDIO: ON</span>` 
      : `<span>🔇</span> <span>AUDIO: OFF</span>`;
    soundBtn.classList.toggle("primary", soundEnabled);

    if (soundEnabled) {
      playBeep(650, 0.08, "sine");
    }
  });
}

function playBeep(freq = 440, duration = 0.05, type = "sine") {
  if (!soundEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio context may require user interaction
  }
}

function playKeyClick() {
  if (!soundEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(800 + Math.random() * 400, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.03);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);
  } catch (e) {}
}

/* ==========================================================================
   2. MATRIX RAIN BACKDROP
   ========================================================================== */
let matrixRunning = true;
function initMatrixRain() {
  const canvas = document.getElementById("matrixCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const chars = "0101010101アイウエオカキクケコサシスセソタチツテトAIMLDEEPLEARNINGCYBERSEC";
  const fontSize = 14;
  const columns = Math.floor(w / fontSize);
  const drops = Array(columns).fill(1);

  function drawMatrix() {
    if (!matrixRunning) return;
    ctx.fillStyle = "rgba(7, 9, 14, 0.06)";
    ctx.fillRect(0, 0, w, h);

    const theme = document.documentElement.getAttribute("data-theme");
    let rainColor = "#00ff66";
    if (theme === "cyan") rainColor = "#00f0ff";
    if (theme === "amber") rainColor = "#f59e0b";

    ctx.fillStyle = rainColor;
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > h && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    requestAnimationFrame(drawMatrix);
  }

  requestAnimationFrame(drawMatrix);
}

/* ==========================================================================
   3. SYSTEM UPTIME TRACKER
   ========================================================================== */
function initUptime() {
  const uptimeEl = document.getElementById("systemUptime");
  if (!uptimeEl) return;

  // Let's count uptime from academic semester start
  const startDate = new Date("2024-08-01T08:00:00");

  function update() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    uptimeEl.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   4. SCANLINE & THEME TOGGLES
   ========================================================================== */
function initScanlineToggle() {
  const scanlineBtn = document.getElementById("scanlineToggle");
  const scanlineEl = document.querySelector(".scanlines");
  if (!scanlineBtn || !scanlineEl) return;

  scanlineBtn.addEventListener("click", () => {
    playBeep(520, 0.05);
    scanlineEl.classList.toggle("off");
    const isOff = scanlineEl.classList.contains("off");
    scanlineBtn.classList.toggle("primary", !isOff);
    scanlineBtn.innerHTML = isOff 
      ? `<span>📺</span> <span>CRT: OFF</span>` 
      : `<span>📺</span> <span>CRT: ON</span>`;
  });
}

function initThemeToggle() {
  const themeBtn = document.getElementById("themeToggle");
  if (!themeBtn) return;

  const themes = ["default", "cyan", "amber"];
  let currentIndex = 0;

  themeBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[currentIndex];
    playBeep(700, 0.06);

    if (nextTheme === "default") {
      document.documentElement.removeAttribute("data-theme");
      themeBtn.innerHTML = `<span>🎨</span> <span>THEME: GREEN</span>`;
    } else if (nextTheme === "cyan") {
      document.documentElement.setAttribute("data-theme", "cyan");
      themeBtn.innerHTML = `<span>🎨</span> <span>THEME: CYAN</span>`;
    } else {
      document.documentElement.setAttribute("data-theme", "amber");
      themeBtn.innerHTML = `<span>🎨</span> <span>THEME: AMBER</span>`;
    }
  });
}

/* ==========================================================================
   5. NAVIGATION & KEYBOARD SHORTCUTS ([1]-[6])
   ========================================================================== */
function initNavigation() {
  const toggle = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      playKeyClick();
      navLinks.classList.toggle("open");
    });

    links.forEach(link => {
      link.addEventListener("click", () => {
        playKeyClick();
        navLinks.classList.remove("open");
      });
    });
  }

  // Active section scroll spy using IntersectionObserver
  const sectionIds = ["about", "stack", "projects", "security-lab", "cli-terminal", "contact"];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;
          links.forEach(l => {
            const secAttr = l.getAttribute("data-section");
            if (secAttr === currentId) {
              l.classList.add("active");
            } else {
              l.classList.remove("active");
            }
          });
        }
      });
    }, {
      rootMargin: "-25% 0px -50% 0px",
      threshold: 0.1
    });

    sections.forEach(s => observer.observe(s));
  }

  // Global Keyboard Shortcuts (Press 1-6 to navigate directly)
  window.addEventListener("keydown", (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
    if (activeTag === "input" || activeTag === "textarea") return;

    const keyMap = {
      "1": "about",
      "2": "stack",
      "3": "projects",
      "4": "security-lab",
      "5": "cli-terminal",
      "6": "contact"
    };

    if (keyMap[e.key]) {
      const targetSec = document.getElementById(keyMap[e.key]);
      if (targetSec) {
        playKeyClick();
        targetSec.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
}

/* ==========================================================================
   6. PROJECT CATEGORY FILTERING
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      playKeyClick();
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        const cardCats = card.getAttribute("data-category") || "";
        if (category === "all" || cardCats.includes(category)) {
          card.style.display = "flex";
          card.style.animation = "fadeIn 0.3s ease";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   7. LIVE PACKET TELEMETRY & AI ANOMALY DETECTION SIMULATOR
   ========================================================================== */
function initPacketSimulator() {
  const feed = document.getElementById("packetFeed");
  const toggleBtn = document.getElementById("simToggleBtn");
  const injectBtn = document.getElementById("simInjectBtn");
  const totalEl = document.getElementById("simTotalPackets");
  const alertEl = document.getElementById("simAlertPackets");
  const rateEl = document.getElementById("simRate");

  if (!feed || !toggleBtn) return;

  let isSimulating = true;
  let totalPackets = 1420;
  let alertCount = 18;
  let simInterval = null;

  const protocols = ["TCP", "UDP", "TLSv1.3", "HTTPS", "DNS", "ICMP"];
  const benignIps = [
    { src: "192.168.1.104:49152", dst: "142.250.190.46:443" },
    { src: "192.168.1.104:51220", dst: "104.244.42.1:443" },
    { src: "192.168.1.104:53310", dst: "8.8.8.8:53" },
    { src: "192.168.1.104:58201", dst: "185.199.108.153:443" }
  ];

  function getTimestamp() {
    const d = new Date();
    return d.toTimeString().split(" ")[0] + "." + Math.floor(d.getMilliseconds() / 100);
  }

  function addPacket(isAttack = false) {
    totalPackets++;
    if (isAttack) alertCount++;

    const proto = isAttack ? (Math.random() > 0.5 ? "TCP-SYN" : "UDP-FLOOD") : protocols[Math.floor(Math.random() * protocols.length)];
    const pair = isAttack 
      ? { src: `198.51.100.${Math.floor(Math.random() * 250)}:${Math.floor(Math.random() * 65535)}`, dst: "192.168.1.104:80" }
      : benignIps[Math.floor(Math.random() * benignIps.length)];

    let classificationHtml = `<span class="packet-classification class-benign">BENIGN [99.8%]</span>`;
    if (isAttack) {
      classificationHtml = `<span class="packet-classification class-alert">ANOMALY DETECTED [99.2%]</span>`;
      playBeep(220, 0.15, "sawtooth");
    }

    const row = document.createElement("div");
    row.className = "packet-entry";
    row.innerHTML = `
      <span class="packet-time">${getTimestamp()}</span>
      <span class="packet-proto">${proto}</span>
      <span class="packet-ips">${pair.src} → ${pair.dst}</span>
      ${classificationHtml}
    `;

    feed.appendChild(row);
    if (feed.children.length > 25) {
      feed.removeChild(feed.children[0]);
    }
    feed.scrollTop = feed.scrollHeight;

    if (totalEl) totalEl.textContent = totalPackets;
    if (alertEl) alertEl.textContent = alertCount;
    if (rateEl) {
      const rate = ((1 - (alertCount / totalPackets)) * 100).toFixed(1);
      rateEl.textContent = rate + "%";
    }
  }

  function startSim() {
    if (simInterval) clearInterval(simInterval);
    simInterval = setInterval(() => {
      // 8% chance of random anomaly simulation
      const attack = Math.random() < 0.08;
      addPacket(attack);
    }, 1600);
  }

  startSim();

  toggleBtn.addEventListener("click", () => {
    isSimulating = !isSimulating;
    playKeyClick();
    if (isSimulating) {
      startSim();
      toggleBtn.textContent = "[ Pause Stream ]";
      toggleBtn.classList.add("active");
    } else {
      clearInterval(simInterval);
      toggleBtn.textContent = "[ Resume Stream ]";
      toggleBtn.classList.remove("active");
    }
  });

  if (injectBtn) {
    injectBtn.addEventListener("click", () => {
      playKeyClick();
      addPacket(true);
    });
  }
}

/* ==========================================================================
   8. INTERACTIVE EMBEDDED CLI TERMINAL
   ========================================================================== */
function initTerminal() {
  const cliInput = document.getElementById("terminalInput");
  const cliOutput = document.getElementById("terminalOutput");
  const quickPills = document.querySelectorAll(".quick-cmd-pill");

  if (!cliInput || !cliOutput) return;

  const history = [];
  let historyIdx = -1;

  const commands = {
    help: `Available commands:
  whoami       - Display identity and academic status
  skills       - Print tech stack & proficiencies (ML, Cyber, Vibe Coding)
  projects     - List repositories & active engineering work
  hackathons   - View Smart India Hackathon & Meta Hackathon merits
  cyber        - View cybersecurity & networking lab roadmap
  erp          - View College ERP ethical security disclosure (Dec 2025)
  vibe         - View Vibe Coding & Agentic AI workflows
  cat bio.md   - Read Vivek's background & vision
  cat resume   - Summarize education, domain skills & achievements
  clear        - Clear the terminal screen
  theme [arg]  - Change theme (green, cyan, amber)
  matrix       - Toggle background matrix rain
  date         - Print current system date and time
  uptime       - Display session uptime
  sudo [cmd]   - Administrative privilege attempt
  contact      - Display communication endpoints & links`,

    whoami: `Name      : Vivek Kelkar
Role      : 3rd Year B.Tech in Artificial Intelligence & Machine Learning (AIML)
Focus     : Deep Learning, Computer Vision, Vibe Coding & Network Defense
Location  : Pune (MH), India
Status    : Actively training neural models, building agentic apps & security research.`,

    skills: `================ TECHNICAL STACK ================
[AI / ML]      : PyTorch, TensorFlow, Scikit-Learn, OpenCV, Hugging Face, NumPy, Pandas
[Vibe Coding]  : Prompt Orchestration, Autonomous Coding Agents, Cursor, Rapid Prototyping
[Languages]    : Python, C/C++, SQL, Shell / Bash Scripting
[Networking]   : TCP/IP, UDP, DNS, Wireshark, Packet Sniffing, Network Sockets
[Cyber Labs]   : ERP Security Auditing, Responsible Disclosure, Nmap, Linux Hardening
[Infra/DevOps] : Git, GitHub, Linux, Kubernetes, Docker, VS Code, Colab`,

    projects: `================ FEATURED PROJECTS ================
1. smartcity-traffic       : Real-time Computer Vision & DL Traffic Density Estimator
2. dl-neural-classifier    : Deep Convolutional Image Classification Architecture
3. ai-network-ids          : [UPCOMING] Flow Anomaly & Threat Detection Engine
4. nlp-insights-engine     : Transformer & Recurrent Document Intelligence
5. net-packet-telemetry    : Low-level Packet Dissector & Protocol Analyzer
Type 'hackathons' for competitive awards or visit // 03_PROJECTS for full code.`,

    hackathons: `================ COMPETITIVE HACKATHON ACCOLADES ================
1. Smart India Hackathon (SIH)
   Category   : National Level Open Innovation Hackathon
   Authority  : Ministry of Education & AICTE, Govt. of India
   Role       : AI/ML Algorithm Architecture & Real-World Solution Engineering
   Details    : Multi-day intensive hackathon building intelligent deployed solutions.

2. Meta Developer Hackathon
   Category   : Global Developer Innovation Hackathon
   Authority  : Meta Platforms & Developer Circles
   Role       : Generative AI, Open Models, Vibe Coding & Fullstack APIs
   Details    : Rapid engineering sprint applying next-gen AI models to solve real user challenges.`,

    sih: function() { return this.hackathons; },
    meta: function() { return this.hackathons; },

    erp: `================ RESPONSIBLE VULNERABILITY DISCLOSURE ================
Target      : Institutional College ERP & Faculty Directory Gateway
Date        : December 2025
Researcher  : Vivek Kelkar (White-Hat Security Assessment)
Class       : Broken Object Level Authorization (BOLA / IDOR)
Findings    : Discovered parameter traversal exposing restricted faculty profiles
Action      : Safely documented & responsibly reported directly to College IT
Outcome     : [PATCHED] Successfully mitigated by administration. Zero data leaked.`,

    disclosure: function() { return this.erp; },

    vibe: `================ VIBE CODING & AGENTIC AI ================
Philosophy  : AI-Assisted Rapid Engineering & Prompt Orchestration
Tooling     : Antigravity IDE, Cursor, Claude 3.5 Sonnet, Gemini Flash, Copilot
Methodology : Architecting complex software and neural systems at lightspeed using
              autonomous AI coding agents, rapid iteration, and prompt engineering.`,

    cyber: `================ CYBER & NETWORKING RESEARCH ================
Current Phase : Active Network Telemetry & Protocol Analysis
Focus Areas   :
  - Deep Learning for Network Intrusion Detection Systems (IDS/IPS)
  - Raw Packet Flow Feature Extraction with Scapy / Wireshark
  - Adversarial Machine Learning & Automated Defensive Hardening
Vision        : Bridging AI/ML with real-time cybersecurity defenses.`,

    "cat bio.md": `# Vivek Kelkar - Bio
I am a 3rd-year B.Tech undergraduate student specializing in Artificial
Intelligence and Machine Learning (AIML).

My day-to-day work centers around deep learning architectures, computer vision,
and data engineering pipelines. Alongside my ML focus, I hold a deep-rooted
interest in cybersecurity and computer networking. While my initial timeline
was heavily invested in foundational research, I am actively turning these
networking and protocol concepts into real-world AI-driven security projects.`,

    "cat resume": `================ RESUME SUMMARY ================
Education    : B.Tech in AIML (Artificial Intelligence & Machine Learning)
Year         : 3rd Year (Class of 2026 - 2028)
Location     : Pune, Maharashtra, India
Hackathons   : Smart India Hackathon (SIH) · Meta Developer Hackathon
Security     : College ERP Vulnerability Responsible Disclosure (Dec 2025)
Core Focus   : Machine Learning, Deep Neural Networks, Vibe Coding, Network Security
Profiles     : GitHub: https://github.com/thevivekkelkar
LinkedIn     : https://www.linkedin.com/in/vivek-kailas-kelkar-4b015b32b`,

    matrix: () => {
      matrixRunning = !matrixRunning;
      if (matrixRunning) {
        initMatrixRain();
        return "Matrix rain backdrop: [ENABLED]";
      }
      return "Matrix rain backdrop: [DISABLED]";
    },

    date: () => new Date().toString(),

    uptime: () => {
      const up = document.getElementById("systemUptime");
      return `Current System Uptime: ${up ? up.textContent : "Active"}`;
    },

    sudo: () => `Permission denied: Vivek is the sole root administrator. Nice try! 😉`,

    contact: `================ TRANSMISSION CHANNELS ================
GitHub   : https://github.com/thevivekkelkar
LinkedIn : https://www.linkedin.com/in/vivek-kailas-kelkar-4b015b32b
Email    : vivekkelkar2004@gmail.com
Location : Pune, Maharashtra, India
Status   : Open to ML/DL Internships & Research Collaborations`
  };

  function executeCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    playKeyClick();
    history.push(trimmed);
    historyIdx = history.length;

    const tokens = trimmed.split(" ");
    const cmd = tokens[0].toLowerCase();
    const arg = tokens[1]?.toLowerCase();

    // Render command prompt in terminal
    const cmdLine = document.createElement("div");
    cmdLine.className = "cli-entry-cmd";
    cmdLine.innerHTML = `<span>root@thevivekkelkar:~$</span> <span>${escapeHtml(trimmed)}</span>`;
    cliOutput.appendChild(cmdLine);

    if (cmd === "clear") {
      cliOutput.innerHTML = "";
      return;
    }

    const resLine = document.createElement("div");
    resLine.className = "cli-entry-res";

    if (cmd === "theme") {
      if (arg === "green" || arg === "default") {
        document.documentElement.removeAttribute("data-theme");
        resLine.textContent = "Theme set to: Terminal Emerald [DEFAULT]";
      } else if (arg === "cyan") {
        document.documentElement.setAttribute("data-theme", "cyan");
        resLine.textContent = "Theme set to: Cyber Cyan";
      } else if (arg === "amber") {
        document.documentElement.setAttribute("data-theme", "amber");
        resLine.textContent = "Theme set to: Matrix Amber";
      } else {
        resLine.textContent = "Usage: theme [green | cyan | amber]";
        resLine.className += " error";
      }
    } else if (commands[trimmed.toLowerCase()]) {
      const output = commands[trimmed.toLowerCase()];
      resLine.textContent = typeof output === "function" ? output() : output;
      resLine.className += " success";
    } else if (commands[cmd]) {
      const output = commands[cmd];
      resLine.textContent = typeof output === "function" ? output() : output;
      resLine.className += " success";
    } else {
      resLine.textContent = `zsh: command not found: ${trimmed}. Type 'help' to inspect accessible directives.`;
      resLine.className += " error";
      playBeep(260, 0.08, "sawtooth");
    }

    cliOutput.appendChild(resLine);
    const cliBody = document.querySelector(".cli-body");
    if (cliBody) cliBody.scrollTop = cliBody.scrollHeight;
  }

  cliInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = cliInput.value;
      cliInput.value = "";
      executeCommand(val);
    } else if (e.key === "ArrowUp") {
      if (historyIdx > 0) {
        historyIdx--;
        cliInput.value = history[historyIdx];
      }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (historyIdx < history.length - 1) {
        historyIdx++;
        cliInput.value = history[historyIdx];
      } else {
        historyIdx = history.length;
        cliInput.value = "";
      }
      e.preventDefault();
    } else {
      playKeyClick();
    }
  });

  quickPills.forEach(pill => {
    pill.addEventListener("click", () => {
      const cmd = pill.getAttribute("data-cmd");
      if (cmd) {
        cliInput.value = cmd;
        executeCommand(cmd);
      }
    });
  });
}

/* ==========================================================================
   9. CONTACT FORM TRANSMISSION HANDLER (Direct Email Delivery)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const statusMsg = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    playBeep(880, 0.1, "sine");

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim() || `Portfolio inquiry from ${name}`;
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
      if (statusMsg) {
        statusMsg.innerHTML = `<span style="color: var(--term-red)">[ERROR] Please specify all mandatory parameters (Name, Email, Message).</span>`;
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>[ TRANSMITTING TO VIVEK'S INBOX... ]</span>`;
    }

    if (statusMsg) {
      statusMsg.innerHTML = `<span style="color: var(--term-cyan)">> encrypting_payload... establishing_tls_session... delivering_to: vivekkelkar2004@gmail.com</span>`;
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/vivekkelkar2004@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: `[PORTFOLIO TRANSMISSION] ${subject}`,
          message: message,
          _template: "table",
          _captcha: "false"
        })
      });

      const data = await response.json();

      if (response.ok && (data.success === "true" || data.success === true)) {
        playBeep(1040, 0.15, "sine");
        if (statusMsg) {
          statusMsg.innerHTML = `<span style="color: var(--term-green); font-weight: bold;">[TRANSMISSION SUCCESSFUL] Packet delivered directly to vivekkelkar2004@gmail.com! Vivek will review and respond shortly.</span>`;
        }
        form.reset();
      } else {
        throw new Error(data.message || "Endpoint error");
      }
    } catch (err) {
      // Fallback: Dispatch directly via default email client
      playBeep(300, 0.2, "sawtooth");
      if (statusMsg) {
        statusMsg.innerHTML = `<span style="color: var(--term-amber)">[PACKET DISPATCH FALLBACK] Opening mail client to dispatch directly to vivekkelkar2004@gmail.com...</span>`;
      }
      const mailtoUri = `mailto:vivekkelkar2004@gmail.com?subject=${encodeURIComponent(`[PORTFOLIO CONTACT] ${subject}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
      setTimeout(() => {
        window.location.href = mailtoUri;
      }, 500);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>[ TRANSMIT_PACKET() ]</span>`;
      }
    }
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
