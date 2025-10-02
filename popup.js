const checkbox = document.getElementById('banner-toggle');

const init = () => {
  chrome.storage.local.get('hideBanner', (result) => {
    const storedValue = result.hideBanner;
    const hide = storedValue === undefined ? true : Boolean(storedValue);
    checkbox.checked = hide;
    if (storedValue === undefined) {
      chrome.storage.local.set({ hideBanner: hide });
    }
  });
};

checkbox.addEventListener('change', () => {
  chrome.storage.local.set({ hideBanner: checkbox.checked });
});

init();
