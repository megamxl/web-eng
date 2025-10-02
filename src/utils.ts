/*
  AI generated i do not write my own toast ...
*/
const showToast = (message: string, duration = 3000) => {
  const toast: HTMLDivElement = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  const container: HTMLElement | null =
    document.getElementById('toast-container');

  if (container === null) {
    console.error("can't find toast container");
    return;
  }

  container.appendChild(toast);

  // Trigger CSS animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => container.removeChild(toast), 400); // wait for transition
  }, duration);
};

export { showToast };
