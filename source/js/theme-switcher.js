(function() {
  const themes = ['dark', 'light', 'white', 'classic'];
  const STORAGE_KEY = 'cactus-theme';
  
  function getCurrentTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'dark';
  }
  
  function setTheme(theme, animate = false) {
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);

    // Add transition class if animating
    if (animate) {
      document.body.style.transition = 'opacity 0.15s ease-in-out';
      document.body.style.opacity = '0.7';
    }

    // Enable new theme first
    const newLink = document.getElementById(`theme-${theme}`);
    if (newLink) {
      newLink.disabled = false;
    }

    // Wait a frame, then disable others and restore opacity
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        themes.forEach(t => {
          if (t !== theme) {
            const link = document.getElementById(`theme-${t}`);
            if (link) {
              link.disabled = true;
            }
          }
        });

        if (animate) {
          document.body.style.opacity = '1';
          setTimeout(() => {
            document.body.style.transition = '';
          }, 150);
        }
      });
    });
  }
  
  function cycleTheme() {
    const current = getCurrentTheme();
    const currentIndex = themes.indexOf(current);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex], true);
    updateButton();
  }
  
  function updateButton() {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      const theme = getCurrentTheme();
      const icons = {
        'dark': '🌙',
        'light': '☀️',
        'white': '⚪',
        'classic': '🎨'
      };
      btn.textContent = icons[theme];
      btn.title = `Current: ${theme} (click to switch)`;
    }
  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function() {
    setTheme(getCurrentTheme());
    updateButton();
    
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', cycleTheme);
    }
  });
})();
