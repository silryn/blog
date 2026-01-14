// Build script to generate CSS for all three color schemes
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const themes = ['dark', 'light', 'classic'];
const configPath = '_config.cactus.yml';

// Read original config
const originalConfig = fs.readFileSync(configPath, 'utf8');

themes.forEach(theme => {
  console.log(`Building ${theme} theme...`);

  // Update config with current theme
  const newConfig = originalConfig.replace(/colorscheme: \w+/, `colorscheme: ${theme}`);
  fs.writeFileSync(configPath, newConfig);

  // Build
  execSync('bunx hexo generate', { stdio: 'inherit' });

  // Copy the generated CSS
  const srcCss = 'dist/css/style.css';
  const destCss = `dist/css/style-${theme}.css`;

  if (fs.existsSync(srcCss)) {
    fs.copyFileSync(srcCss, destCss);
    console.log(`Created ${destCss}`);
  }
});

// Restore original config
fs.writeFileSync(configPath, originalConfig);
console.log('All themes built successfully!');
