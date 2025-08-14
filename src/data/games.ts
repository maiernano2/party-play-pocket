import { Game } from '@/types/game';
import quizGameImage from '@/assets/quiz-thinking-new.jpg';
import charadesGameImage from '@/assets/charades-game.jpg';
import teamGameImage from '@/assets/team-collaboration.jpg';
import chaosGameImage from '@/assets/chaos-game.jpg';
import drawingGameImage from '@/assets/word-description-new.jpg';
import triviaGameImage from '@/assets/trivia-game.jpg';
import speedGameImage from '@/assets/speed-game.jpg';
import facialExpressionsImage from '@/assets/facial-expressions.jpg';

export const games: Game[] = [
  {
    id: 'chaos-challenge',
    title: 'Chaos-Challenge',
    description: 'Interaktives Partyspiel mit Trinkregeln und überraschenden Aufgaben. Nur für Erwachsene ab 18 Jahren.',
    category: 'einzelspiel',
    playerCount: '3-12 Spieler',
    duration: '30-60 Minuten',
    image: chaosGameImage,
    rules: [
      'Nur für Personen ab 18 Jahren',
      'Es wird ausschließlich Wasser oder alkoholfreie Getränke getrunken',
      'Jeder Spieler ist der Reihe nach am Zug',
      'Beim Zug zieht der Spieler eine Aufgabe/Regel für die gesamte Runde',
      'Regel gilt bis der ursprüngliche Regelgeber wieder dran ist',
      'Trink-Regeln werden zufällig eingebaut',
      'Spieler bestimmen das Tempo selbst',
      'Verantwortungsvoller Umgang mit Getränken'
    ],
    interactive: {
      roundBased: true
    }
  },
  {
    id: 'der-duemmste-fliegt',
    title: 'Der Dümmste fliegt',
    description: 'Moderator stellt Wissensfragen - Spieler antworten mündlich. Schlechteste Antwort verliert ein Leben.',
    category: 'einzelspiel',
    playerCount: '3-10 Spieler',
    duration: '15-30 Minuten',
    image: quizGameImage,
    rules: [
      'Jeder Spieler startet mit einer einstellbaren Anzahl Leben (Standard: 3)',
      'Das Handy stellt Wissensfragen in einstellbaren Runden',
      'Alle Spieler schreiben ihre Antworten auf',
      'Am Ende jeder Runde wird die dümmste/falscheste Antwort gewählt',
      'Der Spieler mit der dümmsten Antwort verliert ein Leben',
      'Wer alle Leben verliert, scheidet aus',
      'Letzter Überlebender gewinnt'
    ],
    interactive: {
      hasTimer: true,
      hasScoring: true,
      roundBased: true
    }
  },
  {
    id: 'schnellantwort',
    title: 'Schnellantwort',
    description: 'Kategorie wird gezeigt - jeder muss in 3 Sekunden etwas nennen. Wer wiederholt oder zu spät ist, fliegt raus.',
    category: 'einzelspiel',
    playerCount: '3-8 Spieler',
    duration: '10-20 Minuten',
    image: speedGameImage,
    rules: [
      'Das Handy zeigt eine zufällige Kategorie (z.B. "Tiere mit 4 Buchstaben")',
      'Reihum muss jeder Spieler in 3 Sekunden eine passende Antwort nennen',
      'Wer eine bereits genannte Antwort wiederholt, scheidet aus',
      'Wer zu lange braucht (über 3 Sekunden), scheidet aus',
      'Wer eine falsche Antwort gibt, scheidet aus',
      'Letzter Überlebender gewinnt die Runde',
      'Mehrere Runden mit verschiedenen Kategorien möglich'
    ],
    interactive: {
      hasTimer: true,
      roundBased: true
    }
  },
  {
    id: 'mimik-master',
    title: 'Mimik-Master',
    description: 'Emotion oder Situation pantomimisch darstellen - andere raten mit.',
    category: 'einzelspiel',
    playerCount: '4-10 Spieler',
    duration: '15-25 Minuten',
    image: facialExpressionsImage,
    rules: [
      'Das Handy zeigt einem Spieler eine Emotion oder Situation',
      'Der Spieler stellt diese pantomimisch dar (ohne Worte)',
      'Die anderen Spieler raten, was dargestellt wird',
      'Wer richtig rät, bekommt einen Punkt',
      'Der Darsteller bekommt ebenfalls einen Punkt bei richtiger Lösung',
      'Reihum ist jeder einmal Darsteller',
      'Spieler mit den meisten Punkten gewinnt'
    ],
    interactive: {
      hasTimer: true,
      hasScoring: true,
      roundBased: true
    }
  },
  {
    id: 'team-quiz',
    title: 'Team-Quiz',
    description: 'Ein Moderator stellt seinem Team schnell Fragen - möglichst viele in der Zeit beantworten.',
    category: 'teamspiel',
    playerCount: '4-12 Spieler (2-4 Teams)',
    duration: '20-40 Minuten',
    image: teamGameImage,
    rules: [
      'Teams werden gebildet (2-4 Teams)',
      'Jedes Team bekommt einen Moderator aus einem anderen Team',
      'Moderator stellt seinem Team schnell Fragen aus der App',
      'Team muss möglichst viele Fragen in der Zeit beantworten',
      'Richtige Antwort = 1 Punkt, falsche = 0 Punkte',
      'Fragen können übersprungen werden',
      'Team mit den meisten Punkten gewinnt'
    ],
    interactive: {
      hasTimer: true,
      hasTeams: true,
      hasScoring: true,
      roundBased: true
    }
  },
  {
    id: 'begriff-beschreiben',
    title: 'Begriff-Beschreiben',
    description: 'Ein Teamspieler beschreibt einen Begriff, ohne bestimmte Wörter zu verwenden.',
    category: 'teamspiel',
    playerCount: '4-10 Spieler (2-3 Teams)',
    duration: '20-30 Minuten',
    image: drawingGameImage,
    rules: [
      'Ein Spieler aus dem Team bekommt einen Begriff gezeigt',
      'Er muss den Begriff umschreiben, ohne bestimmte Tabuwörter zu sagen',
      'Das eigene Team muss den Begriff erraten',
      'Pro erratenen Begriff gibt es einen Punkt',
      'Zeitlimit pro Runde (z.B. 60 Sekunden)',
      'Teams wechseln sich ab',
      'Team mit den meisten Punkten gewinnt'
    ],
    interactive: {
      hasTimer: true,
      hasTeams: true,
      hasScoring: true,
      roundBased: true
    }
  },
  {
    id: 'pantomime-raten',
    title: 'Pantomime-Raten',
    description: 'Ein Teamspieler stellt einen Begriff pantomimisch dar, das Team rät.',
    category: 'teamspiel',
    playerCount: '4-12 Spieler (2-4 Teams)',
    duration: '15-30 Minuten',
    image: charadesGameImage,
    rules: [
      'Das Handy zeigt einem Teamspieler einen Begriff',
      'Der Spieler stellt den Begriff pantomimisch dar',
      'Das eigene Team muss raten (ohne Worte des Darstellers)',
      'Zeitlimit pro Begriff (z.B. 90 Sekunden)',
      'Pro erratenen Begriff gibt es einen Punkt',
      'Alle Teams kommen gleich oft dran',
      'Team mit den meisten Punkten gewinnt'
    ],
    interactive: {
      hasTimer: true,
      hasTeams: true,
      hasScoring: true,
      roundBased: true
    }
  },
];

export const getGameById = (id: string): Game | undefined => {
  return games.find(game => game.id === id);
};

export const getGamesByCategory = (category: 'einzelspiel' | 'teamspiel' | 'alle'): Game[] => {
  if (category === 'alle') return games;
  return games.filter(game => game.category === category);
};