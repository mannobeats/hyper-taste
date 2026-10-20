// Shared by every pair page: draw the icons, and take the theme from ?theme=dark.
if (new URLSearchParams(location.search).get('theme') === 'dark') document.documentElement.dataset.theme = 'dark';
lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
