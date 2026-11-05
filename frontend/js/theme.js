const THEME_STORAGE_KEY = 'planeja_theme';
const root = document.documentElement;

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch (error) {
    console.error('Não foi possível ler a preferência de tema.', error);
    return 'light';
  }
}

function applyTheme(theme, persist = false) {
  const isDark = theme === 'dark';
  root.dataset.theme = isDark ? 'dark' : 'light';

  document.querySelectorAll('[data-theme-toggle]').forEach((toggle) => {
    toggle.checked = isDark;
    toggle.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo escuro');
  });

  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Não foi possível salvar a preferência de tema.', error);
    }

    document.dispatchEvent(new CustomEvent('planeja:themechange', {
      detail: { theme: isDark ? 'dark' : 'light' },
    }));
  }
}

applyTheme(getStoredTheme());

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-theme-toggle]').forEach((toggle) => {
    toggle.addEventListener('change', () => {
      applyTheme(toggle.checked ? 'dark' : 'light', true);
    });
  });
  applyTheme(root.dataset.theme);
});
