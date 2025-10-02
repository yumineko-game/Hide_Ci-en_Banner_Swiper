(() => {
  const style = document.createElement('style');
  style.textContent = `.banner-swiper { display: none !important; }`;

  let isApplied = false;

  const ensureHead = () => document.head || document.documentElement;

  const applyStyle = () => {
    if (isApplied) return;
    const parent = ensureHead();
    if (!parent) return;
    parent.appendChild(style);
    isApplied = true;
  };

  const removeStyle = () => {
    if (!isApplied) return;
    if (style.parentNode) {
      style.parentNode.removeChild(style);
    }
    isApplied = false;
  };

  const setState = (shouldHide) => {
    if (shouldHide) {
      applyStyle();
    } else {
      removeStyle();
    }
  };

  // Apply immediately to avoid flicker until storage state loads.
  applyStyle();

  chrome.storage.local.get('hideBanner', (result) => {
    const storedValue = result.hideBanner;
    if (storedValue === undefined) {
      chrome.storage.local.set({ hideBanner: true });
      setState(true);
      return;
    }
    setState(Boolean(storedValue));
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'local' || !changes.hideBanner) return;
    setState(Boolean(changes.hideBanner.newValue));
  });
})();
