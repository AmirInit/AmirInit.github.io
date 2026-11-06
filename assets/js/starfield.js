// Rising pixels respond gently to the pointer and pause when motion is reduced.
const canvas = document.querySelector('#bg-canvas');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if (canvas) {
  const context = canvas.getContext('2d');
  if (context) {
    let stars = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let previous = 0;
    const pointer = { x: 0, y: 0, active: false };
    const radius = 125;

    function resizeSky() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(220, Math.floor(width * height / 7000));
      stars = Array.from({length: count}, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.4 + .8,
        speed: Math.random() * 20 + 12,
        drift: (Math.random() - .5) * 3,
        alpha: Math.random() * .3 + .3,
        color: Math.random() < .18 ? '197, 182, 233' : '195, 242, 180'
      }));
    }
    function drawSky(now) {
      const elapsed = previous ? Math.min((now - previous) / 1000, .1) : 0;
      previous = now;
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        star.y -= star.speed * elapsed;
        star.x += star.drift * elapsed;
        if (pointer.active) {
          const dx = star.x - pointer.x;
          const dy = star.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < radius) {
            const push = (1 - distance / radius) * 36 * elapsed;
            star.x += (dx / distance) * push;
            star.y += (dy / distance) * push;
          }
        }
        if (star.y < -star.size) {
          star.y = height + star.size;
          star.x = Math.random() * width;
        }
        if (star.x < -star.size) star.x = width + star.size;
        if (star.x > width + star.size) star.x = -star.size;
        context.fillStyle = `rgba(${star.color}, ${star.alpha})`;
        context.fillRect(Math.round(star.x), Math.round(star.y), star.size, star.size);
      }
      frame = requestAnimationFrame(drawSky);
    }
    function syncMotion() {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      context.clearRect(0, 0, width, height);
      if (!document.hidden && !motionPreference.matches) frame = requestAnimationFrame(drawSky);
    }
    window.addEventListener('resize', resizeSky);
    window.addEventListener('pointermove', event => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    }, { passive: true });
    window.addEventListener('pointerout', event => {
      if (!event.relatedTarget) pointer.active = false;
    }, { passive: true });
    window.addEventListener('pointerup', event => {
      if (event.pointerType !== 'mouse') pointer.active = false;
    }, { passive: true });
    window.addEventListener('pointercancel', () => { pointer.active = false; }, { passive: true });
    window.addEventListener('blur', () => { pointer.active = false; });
    document.addEventListener('visibilitychange', syncMotion);
    motionPreference.addEventListener('change', syncMotion);
    resizeSky();
    syncMotion();
  }
}
