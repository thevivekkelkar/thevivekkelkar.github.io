# ⚡ Vivek Kelkar - Terminal & Cyber Web Portfolio

> A terminal-inspired, cyberpunk developer portfolio for **Vivek Kelkar**, 3rd-year B.Tech in Artificial Intelligence & Machine Learning (AIML), Deep Learning practitioner, and Network Security enthusiast.
> 
> Inspired by the command-line aesthetics of **adityaalok.dev**.

---

## 🌟 Live Features & Architecture

- **👤 Cyber Biometric Profile HUD**: Embedded authentic identity card with custom photo, corner HUD reticles, scanning beam line, face match telemetry (`99.8% VERIFIED`), and operator specs.
- **🛡️ College ERP Vulnerability Case Study**: Highlights Vivek's December 2025 ethical discovery and responsible disclosure of an authorization bypass (BOLA/IDOR) in the college ERP system.
- **🔮 Vibe Coding & Agentic AI**: Showcases prompt orchestration, autonomous coding agents, and rapid prototyping capabilities across the stack.
- **🧭 Enhanced Terminal Ribbon Navigation**: Sleek frosted glass HUD ribbon with active scroll-spying and **instant keyboard shortcuts `[1]` to `[6]`** to jump between sections.
- **✉️ Direct Inbox Delivery (`vivekkelkar2004@gmail.com`)**: Integrated with FormSubmit API for asynchronous encrypted message delivery straight to your email inbox without page reloads.
- **🖥️ Unix/Linux Terminal Aesthetic**: Modeled with command prompts (`root@thevivekkelkar:~$`), terminal window chrome (🔴 🟡 🟢), Neofetch ASCII profile, and monospaced typography (*JetBrains Mono*).
- **📟 Interactive CLI Terminal Sandbox**: Visitors can type real commands (`whoami`, `skills`, `projects`, `cyber`, `erp`, `vibe`, `cat resume`, `matrix`, `theme`, `clear`) with history navigation (Arrow Up / Down) and shortcut pills.
- **🛡️ Live Packet Telemetry & AI Anomaly Simulator**: Real-time packet stream monitor (TCP, UDP, TLS, DNS) with simulated AI anomaly classification (`[BENIGN]` vs `[ANOMALY DETECTED]`), and an interactive `[+ Inject Attack]` button.
- **🔊 Procedural Web Audio Sound Effects**: Synthesizes realistic mechanical keyboard clicks and terminal beeps on-the-fly using the native Web Audio API (100% offline, zero external audio assets).
- **📺 Retro CRT Scanline Overlay**: Toggleable vintage CRT screen scanlines.
- **🎨 Dynamic Cyber Themes**: 1-click theme switcher between Terminal Emerald (`#00ff66`), Cyber Cyan (`#00f0ff`), and Matrix Amber (`#f59e0b`).
- **⚡ Zero Build Step / 100% Static**: Pure HTML5, modern CSS3, and vanilla JavaScript. Runs out-of-the-box anywhere without requiring npm or Node.js.

---

## 📬 Activating Your Contact Form (1-Time Setup)

When a message is submitted through the website for the very first time:
1. **FormSubmit** sends an activation email to **`vivekkelkar2004@gmail.com`**.
2. Open that email and click **"Activate Form"** (takes 2 seconds).
3. From that moment forward, every message submitted on your portfolio will arrive directly in your inbox!

---

## 📂 Project Structure

```
vivek-kelkar-portfolio/
│
├── index.html       # Semantic HTML5 layout with all portfolio modules
├── styles.css       # Complete dark cyber/terminal styling, glow effects, responsive grid
├── script.js        # Terminal interpreter, Web Audio synthesizer, packet simulator, matrix
└── README.md        # Documentation and GitHub Pages deployment guide
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch
Simply double-click `index.html` or drag and drop it into Google Chrome, Microsoft Edge, Firefox, or Brave.

### Option 2: Using VS Code Live Server
1. Open this folder in VS Code.
2. Right-click `index.html` and click **"Open with Live Server"**.

### Option 3: Using Python HTTP Server
Open your terminal in this folder and run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 🌐 How to Deploy to GitHub Pages (`thevivekkelkar.github.io`)

Deploy your portfolio live on the web for free in 4 simple steps:

### Step 1: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. If you want your site at `https://thevivekkelkar.github.io`, name the repository:
   ```text
   thevivekkelkar.github.io
   ```
3. Set the repository to **Public**.

### Step 2: Push your Files
Run the following commands in the `vivek-kelkar-portfolio` directory:
```bash
git init
git add .
git commit -m "Initial commit: Vivek Kelkar Terminal Portfolio"
git branch -M main
git remote add origin https://github.com/thevivekkelkar/thevivekkelkar.github.io.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. On your GitHub repository page, go to **Settings** → **Pages** (under Code and automation).
2. Under **Build and deployment > Source**, select **Deploy from a branch**.
3. Choose branch `main` and folder `/ (root)`.
4. Click **Save**.

Within 60 seconds, your portfolio will be live at:
👉 **`https://thevivekkelkar.github.io/`**

---

## ✏️ How to Customize Your Content

- **Personal Details & Links**: Open `index.html` and update your email, LinkedIn URL, or project links in the `// 06_CONTACT` section.
- **Add New Projects**: In `index.html`, duplicate one of the `.project-card` blocks inside `<div class="projects-grid">` and fill in your repository title, tags, and summary.
- **Update Terminal Directives**: In `script.js`, edit the `commands` object inside `initTerminal()` to add custom terminal commands or change output text.

---

## 💡 Recommended Active Workspace

To work seamlessly inside your Antigravity IDE, set this directory as your active workspace:
`C:\Users\Rohit Gholap\.gemini\antigravity\scratch\vivek-kelkar-portfolio`
