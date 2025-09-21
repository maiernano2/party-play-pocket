import { useCallback } from 'react';

// Google Analytics 4 Event Types
interface GAEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

// Custom Analytics Events for Party Games App
type AnalyticsEventType = 
  | 'page_view'
  | 'scroll_to_games'
  | 'filter_games'
  | 'game_view'
  | 'game_start'
  | 'game_complete'
  | 'game_exit'
  | 'team_created'
  | 'round_completed'
  | 'interactive_mode_enter'
  | 'interactive_mode_exit'
  | 'game_pause'
  | 'game_resume'
  | 'score_achieved'
  | 'feedback_submit'
  | 'beta_signup'
  | 'theme_toggle'
  | 'engagement_time';

interface AnalyticsParams {
  game_id?: string;
  game_type?: 'einzelspiel' | 'teamspiel';
  game_duration?: number;
  player_count?: number;
  round_number?: number;
  score?: number;
  filter_type?: string;
  theme?: 'light' | 'dark';
  engagement_time?: number;
  page_title?: string;
  [key: string]: any;
}

declare global {
  interface Window {
    gtag: (command: string, target: string, params?: any) => void;
  }
}

export const useAnalytics = () => {
  const trackEvent = useCallback((eventType: AnalyticsEventType, params?: AnalyticsParams) => {
    // Only track if gtag is available (production environment)
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        // Map our custom events to GA4 events
        const eventMapping: Record<AnalyticsEventType, string> = {
          'page_view': 'page_view',
          'scroll_to_games': 'scroll',
          'filter_games': 'search',
          'game_view': 'select_content',
          'game_start': 'select_item',
          'game_complete': 'level_end',
          'game_exit': 'level_start',
          'team_created': 'join_group',
          'round_completed': 'level_up',
          'interactive_mode_enter': 'engage',
          'interactive_mode_exit': 'engage',
          'game_pause': 'pause',
          'game_resume': 'resume',
          'score_achieved': 'earn_virtual_currency',
          'feedback_submit': 'generate_lead',
          'beta_signup': 'sign_up',
          'theme_toggle': 'select_content',
          'engagement_time': 'user_engagement'
        };

        const gaEventName = eventMapping[eventType] || 'custom_event';
        
        // Prepare GA4 event parameters
        const gaParams: Record<string, any> = {
          event_category: 'party_games',
          ...params
        };

        // Add specific parameters based on event type
        switch (eventType) {
          case 'game_view':
            gaParams.content_type = 'game';
            gaParams.item_id = params?.game_id;
            break;
          case 'game_start':
            gaParams.item_category = params?.game_type;
            gaParams.item_name = params?.game_id;
            break;
          case 'filter_games':
            gaParams.search_term = params?.filter_type;
            break;
          case 'score_achieved':
            gaParams.virtual_currency_name = 'points';
            gaParams.value = params?.score;
            break;
        }

        window.gtag('event', gaEventName, gaParams);
        
        // Console log for development
        if (process.env.NODE_ENV === 'development') {
          console.log('Analytics Event:', eventType, gaParams);
        }
      } catch (error) {
        console.warn('Analytics tracking error:', error);
      }
    }
  }, []);

  const trackPageView = useCallback((page_title: string, page_location?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title,
        page_location: page_location || window.location.href,
        custom_map: {
          dimension1: 'game_type',
          dimension2: 'player_count'
        }
      });
    }
  }, []);

  const trackTiming = useCallback((name: string, value: number, category = 'performance') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'timing_complete', {
        name,
        value,
        event_category: category
      });
    }
  }, []);

  return {
    trackEvent,
    trackPageView,
    trackTiming
  };
};