// All profile sections and links work without JavaScript. These controls are enhancements.
const audio = document.querySelector('#bgm');
const soundControls = document.querySelector('#sound-controls');
const soundToggle = document.querySelector('#sound-toggle');
const soundLabel = document.querySelector('#sound-label');
const soundVolume = document.querySelector('#sound-volume');
const soundStatus = document.querySelector('#sound-status');

if (audio && soundControls && soundToggle && soundLabel && soundVolume && soundStatus) {
  let storedVolume = null;
  try { storedVolume = localStorage.getItem('amirinit_vol'); } catch { /* Storage is optional. */ }
  const volume = storedVolume === null ? 0.3 : Number(storedVolume);
  audio.volume = Number.isFinite(volume) && volume >= 0 && volume <= 1 ? volume : 0.3;
  soundVolume.value = String(Math.round(audio.volume * 100));

  function reflectPlayback() {
    const playing = !audio.paused;
    soundToggle.setAttribute('aria-pressed', String(playing));
    soundLabel.textContent = playing ? 'SOUND ON' : 'SOUND OFF';
    soundToggle.querySelector('.sound-icon').textContent = playing ? 'Ⅱ' : '▶';
  }

  soundToggle.addEventListener('click', async () => {
    soundStatus.textContent = '';
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      soundStatus.textContent = 'Audio could not start. Please try again.';
      reflectPlayback();
    }
  });
  soundVolume.addEventListener('input', () => {
    audio.volume = Number(soundVolume.value) / 100;
    try { localStorage.setItem('amirinit_vol', String(audio.volume)); } catch { /* Storage is optional. */ }
  });
  audio.addEventListener('play', reflectPlayback);
  audio.addEventListener('pause', reflectPlayback);
  audio.addEventListener('error', () => { soundStatus.textContent = 'Audio could not be loaded.'; });
  reflectPlayback();
  audio.controls = false;
  audio.hidden = true;
  soundControls.hidden = false;
}

// Opening a directory from a link reveals it before navigating to the section.
function revealSection(id) {
  const section = document.getElementById(id);
  if (section instanceof HTMLDetailsElement) section.open = true;
}
document.querySelectorAll('[data-reveal]').forEach(link => {
  link.addEventListener('click', () => revealSection(link.dataset.reveal));
});
window.addEventListener('hashchange', () => revealSection(location.hash.slice(1)));
revealSection(location.hash.slice(1));

const commandTrigger = document.querySelector('#command-trigger');
const commandMenu = document.querySelector('#command-menu');
const commandSearch = document.querySelector('#command-search');
const commandList = document.querySelector('#command-list');
const commandEmpty = document.querySelector('#command-empty');
if (commandTrigger && commandMenu && commandSearch && commandList && commandEmpty && typeof commandMenu.showModal === 'function') {
  const modifier = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘ K' : 'Ctrl K';
  commandTrigger.querySelector('kbd').textContent = modifier;
  const items = [...commandList.querySelectorAll('li')];
  function filterCommands() {
    const query = commandSearch.value.trim().toLowerCase();
    items.forEach(item => { item.hidden = !item.textContent.toLowerCase().includes(query); });
    commandEmpty.hidden = items.some(item => !item.hidden);
  }
  function openCommands() {
    if (commandMenu.open) return;
    commandSearch.value = '';
    filterCommands();
    commandMenu.showModal();
    commandSearch.focus();
  }
  commandTrigger.addEventListener('click', openCommands);
  commandSearch.addEventListener('input', filterCommands);
  commandList.addEventListener('click', event => {
    if (event.target.closest('a')) commandMenu.close();
  });
  commandMenu.addEventListener('click', event => { if (event.target === commandMenu) commandMenu.close(); });
  commandMenu.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      commandMenu.close();
    }
  });
  document.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openCommands();
    }
  });
  commandTrigger.hidden = false;
}

const copyButton = document.querySelector('#copy-address');
const copyStatus = document.querySelector('#copy-status');
const address = document.querySelector('#xmr-address');
if (copyButton && copyStatus && address && navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(address.textContent.trim());
      copyStatus.textContent = 'Address copied.';
    } catch {
      copyStatus.textContent = 'Could not copy automatically. Please select the address above.';
    }
  });
}
