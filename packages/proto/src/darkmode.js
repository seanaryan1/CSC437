
const label = document.querySelector('label[for="dark-mode-toggle"]') 
             || document.querySelector('#dark-mode-toggle').parentNode;

label.onchange = e => {
  e.stopPropagation();
  const isDark = e.target.checked;
  const toggleEvent = new CustomEvent('darkmode:toggle', {
    detail: { checked: isDark }
  });
  document.body.dispatchEvent(toggleEvent);
};


document.body.addEventListener('darkmode:toggle', e => {
  document.body.classList.toggle('dark-mode', e.detail.checked);
});
