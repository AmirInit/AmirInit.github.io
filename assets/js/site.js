document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const bootScreen = document.getElementById('boot-screen');
    const bootLog = document.getElementById('boot-log');
    const gate = document.getElementById('gate');
    const app = document.getElementById('app');
    const audio = document.getElementById('bgm');
    const musicToggle = document.getElementById('musicToggle');
    const musicVol = document.getElementById('musicVol');
    const toastContainer = document.getElementById('toast-container');

    // Modal & Discord Buttons
    const donateBtn = document.getElementById('donate-btn');
    const modal = document.getElementById('monero-modal');
    const closeModal = document.getElementById('close-modal');
    const copyXmrBtn = document.getElementById('copy-xmr-btn');
    const xmrAddr = document.getElementById('xmr-addr');
    const copyMsg = document.getElementById('copy-msg');
    
    const discordBtn = document.getElementById('discord-btn');

    // Audio Init
    const STORAGE_KEY_VOL = 'amirinit_vol';
    const STORAGE_KEY_MUTED = 'amirinit_muted';
    let savedVol = localStorage.getItem(STORAGE_KEY_VOL);
    let savedMuted = localStorage.getItem(STORAGE_KEY_MUTED);
    let currentVol = savedVol ? parseFloat(savedVol) : 0.3;
    let isMuted = savedMuted === 'true';
    let fadeRaf = 0;

    musicVol.value = currentVol * 100;
    updateMusicIcon(isMuted);

    // --- Boot Sequence ---
    const bootMessages = [
        "Initializing kernel...", "ACPI: Early table checksum verification disabled",
        "ACPI: RSDP 0x00000000000F68D0 000024 (v02 BOCHS )", "DMAR: Host address width 39",
        "Detecting AmirInit Polymath Engine...", "CPU: Topology detected, 1 nodes, 16 cores",
        "Loading /etc/sysctl.conf...", "[ WARN ] Minimal swap partition detected",
        "Mounting /sys/fs/cgroup...", "Starting Network Manager...",
        "Connected to uplink (10Gbps)", "Loading neural interface...",
        "Decrypting keys...", "Reached target Graphical Interface.", "System Ready."
    ];

    let delay = 0;
    
    function addLog(msg, isLast = false) {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = 'log-line';
            const time = (Math.random() * 4).toFixed(6);
            const hex = "0x" + Math.floor(Math.random()*16777215).toString(16).padStart(8, '0');
            let status = `<span class="log-ok">[ OK ]</span>`;
            if(msg.includes("WARN")) status = `<span class="log-warn">[WARN]</span>`;
            line.innerHTML = `<span class="log-time">[${time}]</span> <span class="log-hex">${hex}</span> ${status} ${msg}`;
            bootLog.appendChild(line);
            bootScreen.scrollTop = bootScreen.scrollHeight;
            if(isLast) { setTimeout(showGate, 800); }
        }, delay);
        delay += Math.random() * 200 + 50; 
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) { showGate(); } 
    else { bootMessages.forEach((msg, index) => { addLog(msg, index === bootMessages.length - 1); }); }

    function showGate() {
        bootScreen.style.display = 'none'; 
        gate.hidden = false; 
        gate.style.display = 'flex'; 
        gate.focus();
        audio.muted = isMuted; 
        audio.volume = 0;
    }

    // Audio Functions
    function cancelFade() { if (fadeRaf) cancelAnimationFrame(fadeRaf); fadeRaf = 0; }

    function fadeAudioIn(target, ms = 1800) {
        cancelFade();
        const start = performance.now();
        const from = audio.volume;
        const step = (now) => {
            if (audio.muted) return cancelFade();
            const t = Math.min(1, (now - start) / ms);
            const eased = t * t * (3 - 2 * t);
            audio.volume = from + (target - from) * eased;
            if (t < 1) fadeRaf = requestAnimationFrame(step);
        };
        fadeRaf = requestAnimationFrame(step);
    }

    function enterSystem() {
        cancelFade();
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => { if (!isMuted) fadeAudioIn(currentVol); })
            .catch(() => { isMuted = true; audio.muted = true; updateMusicIcon(true); localStorage.setItem(STORAGE_KEY_MUTED, 'true'); });
        }
        gate.style.opacity = '0';
        setTimeout(() => { 
            gate.style.display = 'none'; 
            app.hidden = false; 
            setTimeout(() => { app.style.opacity = '1'; }, 50); 
        }, 500);
    }

    gate.addEventListener('click', enterSystem);
    gate.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enterSystem(); } });

    musicToggle.addEventListener('click', () => {
        cancelFade();
        if (audio.paused || audio.muted) { isMuted = false; audio.muted = false; audio.volume = currentVol; if (audio.paused) audio.play(); updateMusicIcon(false); } 
        else { isMuted = true; audio.muted = true; updateMusicIcon(true); }
        localStorage.setItem(STORAGE_KEY_MUTED, isMuted);
    });

    musicVol.addEventListener('input', (e) => {
        cancelFade(); currentVol = parseFloat(e.target.value) / 100; audio.volume = currentVol;
        localStorage.setItem(STORAGE_KEY_VOL, currentVol);
        if(isMuted && currentVol > 0) { isMuted = false; audio.muted = false; updateMusicIcon(false); localStorage.setItem(STORAGE_KEY_MUTED, false); }
    });

    function updateMusicIcon(muted) {
        const path = muted 
            ? '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>'
            : '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
        musicToggle.innerHTML = `<svg class="speaker-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
    }

    // --- Toast Function ---
    function showToast(message, icon = '✅') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        // Remove after 3s
        setTimeout(() => {
            toast.classList.add('hiding');
            toast.addEventListener('animationend', () => toast.remove());
        }, 3000);
    }

    // --- Monero Modal Logic ---
    if(donateBtn) { 
        donateBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            modal.hidden = false; 
        }); 
    }
    if(closeModal) { 
        closeModal.addEventListener('click', () => { 
            modal.hidden = true; 
        }); 
    }
    window.addEventListener('click', (e) => { 
        if (e.target === modal) { 
            modal.hidden = true; 
        } 
    });

    if(copyXmrBtn) {
        copyXmrBtn.addEventListener('click', () => {
            const addr = xmrAddr.innerText;
            navigator.clipboard.writeText(addr).then(() => {
                copyMsg.innerText = "Address Copied!";
                copyMsg.classList.add('visible');
                setTimeout(() => { copyMsg.classList.remove('visible'); }, 2000);
            });
        });
    }

    // --- Discord Copy Logic ---
    if(discordBtn) {
        discordBtn.addEventListener('click', () => {
            const textToCopy = "amirinit"; // Your discord username
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Copied Username: amirinit`, '👾');
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }
});