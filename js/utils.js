const showToast = (message, duration = 3000) => {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  const container = document.getElementById('toast-container');
  container.appendChild(toast);

  // Trigger CSS animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => container.removeChild(toast), 400); // wait for transition
  }, duration);
}


export {showToast}