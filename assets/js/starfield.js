// A subtle background that pauses when the page is hidden or motion is reduced.
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

    function resizeSky() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(75, Math.floor(width * height / 17000));
      stars = Array.from({length: count}, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * .8 + .25,
        speed: Math.random() * 5 + 2,
        alpha: Math.random() * .35 + .15
      }));
    }
    function drawSky(now) {
      const elapsed = previous ? Math.min((now - previous) / 1000, .1) : 0;
      previous = now;
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        star.y -= star.speed * elapsed;
        if (star.y < 0) star.y = height;
        context.fillStyle = `rgba(215, 235, 204, ${star.alpha})`;
        context.beginPath();
        context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        context.fill();
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
    document.addEventListener('visibilitychange', syncMotion);
    motionPreference.addEventListener('change', syncMotion);
    resizeSky();
    syncMotion();
  }
}
