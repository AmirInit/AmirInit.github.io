document.addEventListener('DOMContentLoaded', () => {
    const BANNER_TEXT = "Amir./init";
    const TYPE_SPEED = 100;
    
    const gate = document.getElementById('gate');
    const app = document.getElementById('app');
    const audio = document.getElementById('bgm');
    const typewriterElement = document.getElementById('typewriter');
    const musicToggle = document.getElementById('musicToggle');
    const musicVol = document.getElementById('musicVol');

    let charIndex = 0;
    function typeWriter() {
        if (charIndex < BANNER_TEXT.length) {
            typewriterElement.innerHTML += BANNER_TEXT.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, TYPE_SPEED);
        } else {
            typewriterElement.innerHTML += '<span class="cursor">_</span>';
        }
    }
    typeWriter();

    audio.volume = 0;
    
    function enterSite() {
        gate.style.opacity = '0';
        gate.style.pointerEvents = 'none';
        setTimeout(() => {
            gate.style.display = 'none';
            app.hidden = false;
        }, 500);

        audio.play().then(() => {
            fadeInAudio();
        }).catch(e => console.log("Audio block:", e));
    }

    gate.addEventListener('click', enterSite);

    function fadeInAudio() {
        let vol = 0;
        const targetVol = musicVol.value / 100;
        const interval = setInterval(() => {
            if (vol < targetVol) {
                vol += 0.02;
                audio.volume = Math.min(vol, targetVol);
            } else {
                clearInterval(interval);
            }
        }, 50);
    }

    musicVol.addEventListener('input', (e) => {
        audio.volume = e.target.value / 100;
    });

    musicToggle.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            musicToggle.innerText = "Music: On";
        } else {
            audio.pause();
            musicToggle.innerText = "Music: Off";
        }
    });

    const canvas = document.getElementById('dstat');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        
        function resize() {
            width = canvas.parentElement.offsetWidth;
            height = 240;
            canvas.width = width;
            canvas.height = height;
        }
        window.addEventListener('resize', resize);
        resize();

        let data = new Array(60).fill(0);

        function draw() {
            ctx.fillStyle = 'rgba(0,0,0,0.2)';
            ctx.fillRect(0, 0, width, height);

            data.shift();
            const boost = audio.paused ? 1 : 3;
            const value = Math.random() * (height / 2) * boost;
            data.push(value);

            ctx.beginPath();
            ctx.strokeStyle = '#b26cff';
            ctx.lineWidth = 2;
            
            for(let i=0; i<data.length; i++) {
                const x = (i / (data.length - 1)) * width;
                const y = height - data[i] - 10;
                if(i===0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.fillStyle = 'rgba(178, 108, 255, 0.1)';
            ctx.fill();

            requestAnimationFrame(draw);
        }
        draw();
    }
});