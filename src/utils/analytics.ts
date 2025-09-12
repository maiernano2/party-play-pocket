// Analytics utility for game-specific tracking

export const trackGameEvent = (eventType: string, gameData: {
  gameId: string;
  phase?: string;
  duration?: number;
  playerCount?: number;
  score?: number;
  round?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventType, {
      event_category: 'game_interaction',
      custom_parameters: {
        game_id: gameData.gameId,
        game_phase: gameData.phase,
        game_duration: gameData.duration,
        player_count: gameData.playerCount,
        score: gameData.score,
        round_number: gameData.round
      }
    });
  }
};

export const trackPerformance = (metricName: string, value: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: metricName,
      value: Math.round(value),
      event_category: 'performance'
    });
  }
};

// Track Web Vitals automatically
export const trackWebVitals = () => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    // Track Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      trackPerformance('LCP', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Track First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as any;
        trackPerformance('FID', fidEntry.processingStart - fidEntry.startTime);
      }
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Track Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const clsEntry = entry as any;
        if (!clsEntry.hadRecentInput) {
          clsValue += clsEntry.value;
        }
      }
      trackPerformance('CLS', clsValue);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }
};