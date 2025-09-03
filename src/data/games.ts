import { Game } from '@/types/game';
import quizGameImage from '@/assets/quiz-game.webp';
import charadesGameImage from '@/assets/charades-game.webp';
import teamGameImage from '@/assets/team-game.webp';
import chaosGameImage from '@/assets/chaos-game.webp';
import drawingGameImage from '@/assets/drawing-game.webp';
import triviaGameImage from '@/assets/trivia-game.webp';
import speedGameImage from '@/assets/speed-game.webp';
import facialExpressionsImage from '@/assets/facial-expressions.jpg';
import truthOrDareImage from '@/assets/truth-or-dare-new.webp';

export const games: Game[] = [
  {
    id: 'chaos-challenge',
    title: 'Chaos-Challenge',
    description: 'Interaktives Partyspiel mit Trinkregeln und überraschenden Aufgaben. Nur für Erwachsene ab 18 Jahren.',
    category: 'teamspiel',
    playerCount: '3-12 Spieler',
    duration: '15-30 Minuten',
    image: chaosGameImage,
    rules: [
      'Nur für Personen ab 18 Jahren',
      'Es wird ausschließlich Wasser oder alkoholfreie Getränke getrunken',
      'Jeder Spieler ist der Reihe nach am Zug',
      'Beim Zug zieht der Spieler eine Aufgabe/Regel für die gesamte Runde',
      'Regeln gelten bis der ursprüngliche Regelgeber wieder dran ist (eine komplette Runde)',
      'Trink-Regeln werden zufällig eingebaut',
      'Spieler bestimmen das Tempo selbst',
      'Verantwortungsvoller Umgang mit Getränken'
    ],
    interactive: {
      roundBased: true,
      hasTimer: true,
      hasTeams: false,
      hasScoring: false
    }
  },
  {
    id: 'wahrheit-oder-pflicht',
    title: 'Wahrheit oder Pflicht',
    description: 'Das klassische Partyspiel mit prickelnden Wahrheitsfragen und mutigen Pflichtaufgaben.',
    category: 'teamspiel',
    playerCount: '2-12 Spieler',
    duration: '10-20 Minuten',
    image: truthOrDareImage,
    rules: [
      'Jeder Spieler ist abwechselnd am Zug',
      'Der Spieler am Zug wählt zwischen Wahrheit oder Pflicht',
      'Bei Wahrheit muss eine persönliche Frage ehrlich beantwortet werden',
      'Bei Pflicht muss eine Aufgabe erfüllt werden',
      'Die Intensität kann am Anfang gewählt werden (zahm, mittel, wild)',
      'Spielmodus wählbar: nur Wahrheit, nur Pflicht oder gemischt',
      'Wer die Aufgabe verweigert, kann eine alternative Strafe bekommen',
      'Respektvoller Umgang ist wichtig - niemand soll sich unwohl fühlen',
      'Das Spiel kann jederzeit beendet werden'
    ],
    interactive: {
      roundBased: true,
      hasTeams: false,
      hasScoring: false,
      hasTimer: false
    }
  },
  {
    id: 'der-duemmste-fliegt',
    title: 'Der Dümmste fliegt',
    description: 'Moderator stellt Wissensfragen - Spieler antworten mündlich. Schlechteste Antwort verliert ein Leben.',
    category: 'einzelspiel',
    playerCount: '3-10 Spieler',
    duration: '10-20 Minuten',
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
    duration: '5-15 Minuten',
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
    id: 'team-quiz',
    title: 'Team-Quiz',
    description: 'Ein Moderator stellt seinem Team schnell Fragen - möglichst viele in der Zeit beantworten.',
    category: 'teamspiel',
    playerCount: '4-12 Spieler (2-4 Teams)',
    duration: '15-25 Minuten',
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
    duration: '15-25 Minuten',
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
    duration: '10-20 Minuten',
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