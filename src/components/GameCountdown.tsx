import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface GameCountdownProps {
  onCountdownComplete: () => void;
  onSkip?: () => void;
}

export const GameCountdown = ({ onCountdownComplete, onSkip }: GameCountdownProps) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onCountdownComplete();
    }
  }, [count, onCountdownComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        <div className="relative">
          <div className={`text-8xl font-bold text-white transition-all duration-300 ${
            count === 0 ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
          }`}>
            {count === 0 ? 'LOS!' : count}
          </div>
          
          {count > 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-white/30 rounded-full animate-ping"></div>
            </div>
          )}
        </div>
        
        <div className="text-xl text-white/80 font-medium">
          {count === 0 ? 'Viel Spaß beim Spielen!' : 'Macht euch bereit...'}
        </div>

        {onSkip && count > 0 && (
          <Button
            onClick={onSkip}
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            Countdown überspringen
          </Button>
        )}
      </div>
    </div>
  );
};