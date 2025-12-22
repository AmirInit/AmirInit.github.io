document.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.getElementById('boot-screen');
    const bootLog = document.getElementById('boot-log');
    const gate = document.getElementById('gate');
    const app = document.getElementById('app');
    const audio = document.getElementById('bgm');
    const musicToggle = document.getElementById('musicToggle');
    const musicVol = document.getElementById('musicVol');

    const STORAGE_KEY_VOL = 'amirinit_vol';
    const STORAGE_KEY_MUTED = 'amirinit_muted';

    let savedVol = localStorage.getItem(STORAGE_KEY_VOL);
    let savedMuted = localStorage.getItem(STORAGE_KEY_MUTED);
    
    let currentVol = savedVol ? parseFloat(savedVol) : 0.3;
    let isMuted = savedMuted === 'true';
    let fadeRaf = 0;

    musicVol.value = currentVol * 100;
    updateMusicIcon(isMuted);

    const bootMessages = [
        "Initializing kernel...",
        "ACPI: Early table checksum verification disabled",
        "ACPI: RSDP 0x00000000000F68D0 000024 (v02 BOCHS )",
        "DMAR: Host address width 39",
        "Detecting AmirInit Polymath Engine...",
        "CPU: Topology detected, 1 nodes, 16 cores",
        "Loading /etc/sysctl.conf...",
        "[ WARN ] Minimal swap partition detected",
        "Mounting /sys/fs/cgroup...",
        "Starting Network Manager...",
        "Connected to uplink (10Gbps)",
        "Loading neural interface...",
        "Decrypting keys...",
        "Reached target Graphical Interface.",
        "System Ready."
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

            if(isLast) {
                setTimeout(showGate, 800);
            }
        }, delay);
        delay += Math.random() * 200 + 50; 
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        showGate();
    } else {
        bootMessages.forEach((msg, index) => {
            addLog(msg, index === bootMessages.length - 1);
        });
    }

    function showGate() {
        bootScreen.style.display = 'none'; 
        gate.hidden = false;
        gate.style.display = 'flex';
        gate.focus();
        
        // Prepare audio
        audio.muted = isMuted;
        audio.volume = 0;
    }

    // Audio Fade Logic (RAF based)
    function cancelFade() {
        if (fadeRaf) cancelAnimationFrame(fadeRaf);
        fadeRaf = 0;
    }

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
            playPromise.then(() => {
                if (!isMuted) fadeAudioIn(currentVol);
            }).catch(() => {
                // Keep UI consistent if play fails
                isMuted = true;
                audio.muted = true;
                updateMusicIcon(true);
                localStorage.setItem(STORAGE_KEY_MUTED, 'true');
            });
        }
        
        gate.style.opacity = '0';
        setTimeout(() => {
            gate.style.display = 'none';
            app.hidden = false;
            setTimeout(() => { app.style.opacity = '1'; }, 50);
        }, 500);
    }

    gate.addEventListener('click', enterSystem);
    gate.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Prevent scrolling
            enterSystem();
        }
    });

    musicToggle.addEventListener('click', () => {
        cancelFade();
        if (audio.paused || audio.muted) {
            isMuted = false;
            audio.muted = false;
            audio.volume = currentVol;
            if (audio.paused) audio.play();
            updateMusicIcon(false);
        } else {
            isMuted = true;
            audio.muted = true;
            updateMusicIcon(true);
        }
        localStorage.setItem(STORAGE_KEY_MUTED, isMuted);
    });

    musicVol.addEventListener('input', (e) => {
        cancelFade();
        currentVol = parseFloat(e.target.value) / 100;
        audio.volume = currentVol;
        localStorage.setItem(STORAGE_KEY_VOL, currentVol);

        if(isMuted && currentVol > 0) {
            isMuted = false;
            audio.muted = false;
            updateMusicIcon(false);
            localStorage.setItem(STORAGE_KEY_MUTED, false);
        }
    });

    function updateMusicIcon(muted) {
        if (muted) {
            musicToggle.innerHTML = `<svg class="speaker-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
        } else {
            musicToggle.innerHTML = `<svg class="speaker-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
        }
    }

    // Canvas Starfield (DPR Fixed)
    const canvas = document.getElementById('bg-canvas');
    if (canvas && !prefersReducedMotion) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let stars = [];

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            width = window.innerWidth;
            height = window.innerHeight;
            
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            
            // Fix: Reset transform before scaling
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            
            initStars();
        }

        function initStars() {
            stars = [];
            const count = Math.floor(width * height / 10000); 
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 1.5,
                    speed: Math.random() * 0.2 + 0.1
                });
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
                star.y -= star.speed;
                if (star.y < 0) star.y = height;
            });
            
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        animate();
    }
});