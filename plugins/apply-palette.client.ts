// plugins/apply-palette.client.ts
export default defineNuxtPlugin(() => {
  const localStorageKey = 'app-color-palette';

  const applyPalette = (paletteName: string | null) => {
    if (process.client && document.documentElement) {
      if (paletteName && paletteName !== 'default') {
        document.documentElement.setAttribute('data-theme', paletteName);
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  };

  if (process.client) {
    const storedPalette = localStorage.getItem(localStorageKey);
    // Apply stored palette or default if nothing is stored or if 'default' is stored.
    // The PaletteSwitcher defaults to 'default' if nothing is stored, so we mirror that behavior.
    applyPalette(storedPalette || 'default'); 
  }
});
