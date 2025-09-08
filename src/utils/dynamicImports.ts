import { lazy } from 'react';

// Dynamic imports for interactive components to enable code splitting
export const InteractiveChaosChallenge = lazy(() => 
  import('@/components/interactive/InteractiveChaosChallenge').then(module => ({
    default: module.InteractiveChaosChallenge
  }))
);

export const InteractiveDerDuemmsteFliegt = lazy(() => 
  import('@/components/interactive/InteractiveDerDuemmsteFliegt').then(module => ({
    default: module.InteractiveDerDuemmsteFliegt
  }))
);

export const InteractiveSchnellantwort = lazy(() => 
  import('@/components/interactive/InteractiveSchnellantwort').then(module => ({
    default: module.InteractiveSchnellantwort
  }))
);

export const InteractiveTeamQuiz = lazy(() => 
  import('@/components/interactive/InteractiveTeamQuiz').then(module => ({
    default: module.InteractiveTeamQuiz
  }))
);

export const InteractiveBegriffBeschreiben = lazy(() => 
  import('@/components/interactive/InteractiveBegriffBeschreiben').then(module => ({
    default: module.InteractiveBegriffBeschreiben
  }))
);

export const InteractivePantomimeRaten = lazy(() => 
  import('@/components/interactive/InteractivePantomimeRaten').then(module => ({
    default: module.InteractivePantomimeRaten
  }))
);

export const InteractiveTruthOrDare = lazy(() => 
  import('@/components/interactive/InteractiveTruthOrDare').then(module => ({
    default: module.InteractiveTruthOrDare
  }))
);

export const InteractiveImposterGame = lazy(() => 
  import('@/components/interactive/InteractiveImposterGame').then(module => ({
    default: module.InteractiveImposterGame
  }))
);

export const InteractiveWavelength = lazy(() => 
  import('@/components/interactive/InteractiveWavelength').then(module => ({
    default: module.InteractiveWavelength
  }))
);

export const InteractiveAssoziation = lazy(() => 
  import('@/components/interactive/InteractiveAssoziation').then(module => ({
    default: module.InteractiveAssoziation
  }))
);