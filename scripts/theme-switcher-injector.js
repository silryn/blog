hexo.extend.injector.register('head_end', () => {
  return `
    <!-- Theme Switcher Styles -->
    <link rel="stylesheet" id="theme-dark" href="/css/style-dark.css">
    <link rel="stylesheet" id="theme-light" href="/css/style-light.css" disabled>
    <link rel="stylesheet" id="theme-white" href="/css/style-white.css" disabled>
    <link rel="stylesheet" id="theme-classic" href="/css/style-classic.css" disabled>
    <link rel="stylesheet" href="/css/custom.css">
    <style>
      #theme-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--theme-toggle-bg, #333);
        color: var(--theme-toggle-color, #fff);
        border: 2px solid var(--theme-toggle-border, #666);
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        transition: transform 0.2s, box-shadow 0.2s;
        z-index: 1000;
      }
      #theme-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 15px rgba(0,0,0,0.4);
      }
      #theme-toggle:active {
        transform: scale(0.95);
      }
      [data-theme="dark"] {
        --theme-toggle-bg: #2d2d2d;
        --theme-toggle-color: #fff;
        --theme-toggle-border: #555;
      }
      [data-theme="light"] {
        --theme-toggle-bg: #f5f5f5;
        --theme-toggle-color: #333;
        --theme-toggle-border: #ddd;
      }
      [data-theme="white"] {
        --theme-toggle-bg: #ffffff;
        --theme-toggle-color: #000;
        --theme-toggle-border: #ccc;
      }
      [data-theme="classic"] {
        --theme-toggle-bg: #f4f4f4;
        --theme-toggle-color: #222;
        --theme-toggle-border: #999;
      }
    </style>
  `;
}, 'default');

hexo.extend.injector.register('body_end', () => {
  return `
    <!-- Theme Switcher Button -->
    <button id="theme-toggle" title="Switch theme"></button>
    <script src="/js/theme-switcher.js"></script>
  `;
}, 'default');
