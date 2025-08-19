// Preload critical resources for better performance
export const preloadCriticalAssets = () => {
  // Preload hero image
  const heroImageLink = document.createElement('link');
  heroImageLink.rel = 'preload';
  heroImageLink.as = 'image';
  heroImageLink.href = '/src/assets/hero-image.webp';
  document.head.appendChild(heroImageLink);

  // Preload key game images
  const gameImages = [
    '/src/assets/quiz-game.webp',
    '/src/assets/charades-game.webp',
    '/src/assets/speed-game.webp'
  ];

  gameImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Initialize preloader when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalAssets);
  } else {
    preloadCriticalAssets();
  }
}