document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const bootScreen = document.getElementById('boot-screen');
    const bootLog = document.getElementById('boot-log');
    const gate = document.getElementById('gate');
    const app = document.getElementById('app');
    const audio = document.getElementById('bgm');
    const musicVol = document.getElementById('musicVol');

    // --- Phase 1: Boot Sequence (Realistic Linux Boot) ---
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
    
    // Add log lines with hex addresses
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
            window.scrollTo(0, document.body.scrollHeight);

            if(isLast) {
                setTimeout(showGate, 800);
            }
        }, delay);
        delay += Math.random() * 200 + 50; // Random delay between lines
    }

    // Execute Boot
    bootMessages.forEach((msg, index) => {
        addLog(msg, index === bootMessages.length - 1);
    });

    // --- Phase 2: Gate Transition ---
    function showGate() {
        bootScreen.style.display = 'none'; 
        gate.hidden = false;
        gate.style.display = 'flex';
    }

    // --- Phase 3: Enter App & Audio ---
    gate.addEventListener('click', () => {
        // Play Audio
        audio.volume = 0.3;
        audio.play().catch(e => console.log("Audio requires user interaction"));
        
        // Animation
        gate.style.opacity = '0';
        setTimeout(() => {
            gate.style.display = 'none';
            app.hidden = false;
            // Fade in app
            setTimeout(() => { app.style.opacity = '1'; }, 50);
        }, 500);
    });

    // Volume Control
    musicVol.addEventListener('input', (e) => {
        audio.volume = e.target.value / 100;
    });

    // --- Background Canvas (Starfield Effect) ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let stars = [];

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        }

        function initStars() {
            stars = [];
            const count = Math.floor(width * height / 10000); // Density
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
                
                // Move stars slowly upwards
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