/**
 * Inline script injected before hydration to set the initial theme,
 * preventing a flash of the wrong theme. Reads localStorage, then the
 * OS preference. Runs synchronously in <head>.
 */
export function ThemeScript() {
  const code = `
    (function () {
      try {
        var stored = localStorage.getItem('biopc-theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var isDark = stored ? stored === 'dark' : prefersDark;
        document.documentElement.classList.toggle('dark', isDark);
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
