// The portfolio remains usable without JavaScript; this is an optional convenience.
const copyButton = document.querySelector('.copy-address');
const copyStatus = document.querySelector('.copy-status');
const address = document.querySelector('.footer-detail code');

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
