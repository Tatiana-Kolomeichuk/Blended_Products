import { refs } from "./refs";

export function toggleTheme(theme) {

    document.body.setAttribute('data-theme', theme);
    document.body.dataset.theme = theme;

    refs.themeToggleBtn.innerHTML = theme === 'light' ? '🌙' : '☀️';
}
