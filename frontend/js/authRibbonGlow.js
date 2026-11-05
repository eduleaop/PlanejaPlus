import { initRibbonGlow } from './ribbonGlow.js';

const authWrapper = document.getElementById('auth-bg-field');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (authWrapper && !reducedMotion) {
  let disposeRibbonGlow;
  const initializeRibbonGlow = (theme = document.documentElement.dataset.theme) => {
    if (disposeRibbonGlow) disposeRibbonGlow();
    const isDark = theme === 'dark';
    disposeRibbonGlow = initRibbonGlow(authWrapper, {
      background: isDark ? '#080A12' : '#f7f8ff',
      color1: isDark ? '#5E79E8' : '#ffffff',
      color2: isDark ? '#5667D9' : '#0010FF',
      intensity: isDark ? 0.8 : 1,
      size: 134,
      speed: 50,
      angle: -180,
      hover: 100,
      reach: 240,
    });
  };

  initializeRibbonGlow();
  document.addEventListener('planeja:themechange', (event) => {
    initializeRibbonGlow(event.detail.theme);
  });
}
