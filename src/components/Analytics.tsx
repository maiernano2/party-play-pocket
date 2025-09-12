import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';

export const Analytics = () => {
  const location = useLocation();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    // Track page views on route changes
    const page_title = document.title;
    trackPageView(page_title);
  }, [location.pathname, trackPageView]);

  return null;
};