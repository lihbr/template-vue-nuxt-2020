(() => {
  const timeout = 5000;
  const duration = 2400;

  let inited = false;

  const transition = () => {
    if (inited) return;
    inited = true;

    document.documentElement.classList.remove("initialState--loading");

    setTimeout(() => {
      document.documentElement.classList.remove("initialState");
    }, duration * 1.1);
  };

  window.onNuxtReady(transition);

  setTimeout(transition, timeout);
})();
