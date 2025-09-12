import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useAnalytics } from '@/hooks/useAnalytics';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { trackEvent } = useAnalytics();

  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    trackEvent('theme_toggle', { theme: newTheme });
    toggleTheme();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className="w-9 h-9 p-0"
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">Theme umschalten</span>
    </Button>
  );
};