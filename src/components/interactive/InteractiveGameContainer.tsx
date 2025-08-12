import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface InteractiveGameContainerProps {
  children: ReactNode;
  onExit: () => void;
  title: string;
}

export const InteractiveGameContainer = ({ children, onExit, title }: InteractiveGameContainerProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-glow to-accent">
      <div className="min-h-screen backdrop-blur-sm bg-white/5">
        {/* Header */}
        <header className="p-4 flex items-center justify-between">
          <Button
            onClick={onExit}
            variant="ghost"
            className="text-white hover:bg-white/20 border border-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Beenden
          </Button>
          <h1 className="text-xl font-bold text-white">{title}</h1>
          <div></div>
        </header>

        {/* Game Content */}
        <main className="px-4 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
};