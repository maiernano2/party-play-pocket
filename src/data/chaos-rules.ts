interface ChaosRule {
  id: string;
  text: string;
  category: string;
  intensity: 'zahm' | 'mittel' | 'wild';
  requiresVoting?: boolean;
  isTeamGame?: boolean;
  duration?: string;
}

export const chaosRules: ChaosRule[] = [
  // Zahm - Wer würde eher... (Personal Questions)
  { id: '1', text: 'Wer würde eher... einen ganzen Tag lang schweigen?', category: 'wer-würde-eher', intensity: 'zahm', requiresVoting: true, duration: '1 Runde' },
  { id: '2', text: 'Wer würde eher... bei einer Zombie-Apokalypse überleben?', category: 'wer-würde-eher', intensity: 'zahm', requiresVoting: true, duration: '1 Runde' },
  { id: '201', text: 'Wer würde eher... heimlich Schokolade vor dem Fernseher essen?', category: 'wer-würde-eher', intensity: 'zahm', requiresVoting: true, duration: '1 Runde' },
  { id: '202', text: 'Wer würde eher... einen Monat ohne Internet überleben?', category: 'wer-würde-eher', intensity: 'zahm', requiresVoting: true, duration: '1 Runde' },
  { id: '203', text: 'Wer würde eher... ein Buch in einem Tag durchlesen?', category: 'wer-würde-eher', intensity: 'zahm', requiresVoting: true, duration: '1 Runde' },
  { id: '204', text: 'Wer würde eher... beim Horrorfilm wegschauen?', category: 'wer-würde-eher', intensity: 'zahm', requiresVoting: true, duration: '1 Runde' },
  { id: '205', text: 'Wer würde eher... als Einziger/Einzige weinen bei einem Film?', category: 'wer-würde-eher', intensity: 'zahm', requiresVoting: true, duration: '1 Runde' },
  { id: '206', text: 'Wer würde eher... eine Stunde zu früh zu einem Date kommen?', category: 'wer-würde-eher', intensity: 'zahm', requiresVoting: true, duration: '1 Runde' },

  // Fragen über andere - Zahm
  { id: '210', text: 'Wer in der Runde hat das schönste Lächeln?', category: 'fragen-über-andere', intensity: 'zahm', requiresVoting: true, duration: '1 Runde' },
  { id: '211', text: 'Wer in der Runde wäre der beste Lehrer?', category: 'fragen-über-andere', intensity: 'zahm', requiresVoting: true, duration: '1 Runde' },
  { id: '212', text: 'Wer in der Runde hat die beste Musik-Playlist?', category: 'fragen-über-andere', intensity: 'zahm', requiresVoting: true, duration: '1 Runde' },
  { id: '213', text: 'Wer in der Runde würde in einer Apokalypse am längsten überleben?', category: 'fragen-über-andere', intensity: 'zahm', requiresVoting: true, duration: '1 Runde' },
  { id: '214', text: 'Wer in der Runde ist am kreativsten?', category: 'fragen-über-andere', intensity: 'zahm', requiresVoting: true, duration: '1 Runde' },
  { id: '215', text: 'Wer in der Runde gibt die besten Ratschläge?', category: 'fragen-über-andere', intensity: 'zahm', requiresVoting: true, duration: '1 Runde' },

  // Team Spiele - Zahm
  { id: '220', text: 'TEAMSPIEL: Gemeinsam 20 Tiere aufzählen', category: 'team-game', intensity: 'zahm', isTeamGame: true, duration: '2 Minuten' },
  { id: '221', text: 'TEAMSPIEL: Beide Teams summen abwechselnd Lieder', category: 'team-game', intensity: 'zahm', isTeamGame: true, duration: '3 Minuten' },
  { id: '222', text: 'TEAMSPIEL: Stadt-Land-Fluss Duell', category: 'team-game', intensity: 'zahm', isTeamGame: true, duration: '1 Runde' },
  { id: '223', text: 'TEAMSPIEL: Wer kann mehr Filmtitel in 60 Sekunden nennen?', category: 'team-game', intensity: 'zahm', isTeamGame: true, duration: '1 Minute' },

  // Gruppenchallenges - Zahm
  { id: '225', text: 'Alle müssen stumm den Song "Happy Birthday" singen', category: 'group-challenge', intensity: 'zahm', duration: '30 Sekunden' },
  { id: '226', text: 'Alle erzählen ihren peinlichsten Moment aus der Schulzeit', category: 'group-challenge', intensity: 'zahm', duration: '3 Minuten' },
  { id: '227', text: 'Alle machen gleichzeitig Yoga-Posen', category: 'group-challenge', intensity: 'zahm', duration: '1 Minute' },
  { id: '228', text: 'Alle müssen ihr Lieblings-Kindheitslied summen', category: 'group-challenge', intensity: 'zahm', duration: '1 Minute' },

  // Challenges - Zahm
  { id: '230', text: 'Zeichne in 30 Sekunden einen Elefanten mit geschlossenen Augen', category: 'challenge', intensity: 'zahm', duration: '30 Sekunden' },
  { id: '231', text: 'Imitiere 30 Sekunden lang einen berühmten Politiker', category: 'challenge', intensity: 'zahm', duration: '30 Sekunden' },
  { id: '232', text: 'Sage einen Zungenbrecher 5x hintereinander fehlerfrei', category: 'challenge', intensity: 'zahm', duration: '1 Minute' },
  { id: '233', text: 'Imitiere 5 verschiedene Tiergeräusche', category: 'challenge', intensity: 'zahm', duration: '30 Sekunden' },
  { id: '234', text: 'Erzähle einen Witz, der niemanden zum Lachen bringt', category: 'challenge', intensity: 'zahm', duration: '1 Minute' },

  // Mittel - Spicier content
  { id: '300', text: 'Wer würde eher... nackt durch die Stadt laufen für 1000€?', category: 'wer-würde-eher', intensity: 'mittel', requiresVoting: true, duration: '1 Runde' },
  { id: '301', text: 'Wer würde eher... ihren Ex zurück nehmen?', category: 'wer-würde-eher', intensity: 'mittel', requiresVoting: true, duration: '1 Runde' },
  { id: '302', text: 'Wer würde eher... beim ersten Date schon über Zukunft sprechen?', category: 'wer-würde-eher', intensity: 'mittel', requiresVoting: true, duration: '1 Runde' },
  { id: '303', text: 'Wer würde eher... heimlich das Handy des Partners checken?', category: 'wer-würde-eher', intensity: 'mittel', requiresVoting: true, duration: '1 Runde' },

  // Fragen über andere - Mittel
  { id: '310', text: 'Wer in der Runde hat das beste Aussehen?', category: 'fragen-über-andere', intensity: 'mittel', requiresVoting: true, duration: '1 Runde' },
  { id: '311', text: 'Wer in der Runde würde am ehesten fremdgehen?', category: 'fragen-über-andere', intensity: 'mittel', requiresVoting: true, duration: '1 Runde' },
  { id: '312', text: 'Wer in der Runde ist am attraktivsten?', category: 'fragen-über-andere', intensity: 'mittel', requiresVoting: true, duration: '1 Runde' },
  { id: '313', text: 'Wer in der Runde würde in einer Beziehung am kontrolliertesten sein?', category: 'fragen-über-andere', intensity: 'mittel', requiresVoting: true, duration: '1 Runde' },
  { id: '314', text: 'Wer in der Runde hat den besten Körper?', category: 'fragen-über-andere', intensity: 'mittel', requiresVoting: true, duration: '1 Runde' },

  // Team Spiele - Mittel  
  { id: '320', text: 'TEAMSPIEL: Wahrheit oder Pflicht zwischen den Teams', category: 'team-game', intensity: 'mittel', isTeamGame: true, duration: '5 Minuten' },
  { id: '321', text: 'TEAMSPIEL: Körper-Pantomime Battle', category: 'team-game', intensity: 'mittel', isTeamGame: true, duration: '3 Minuten' },

  // Gruppenchallenges - Mittel
  { id: '325', text: 'Alle erzählen gleichzeitig ihre schlimmste Dating-Story', category: 'group-challenge', intensity: 'mittel', duration: '3 Minuten' },
  { id: '326', text: 'Alle müssen ihre erste große Liebe beschreiben', category: 'group-challenge', intensity: 'mittel', duration: '2 Minuten' },
  { id: '327', text: 'Alle erzählen ihre verrückteste Partynacht', category: 'group-challenge', intensity: 'mittel', duration: '3 Minuten' },

  // Challenges - Mittel
  { id: '330', text: 'Tanze 30 Sekunden zu imaginärer Musik als wärst du allein', category: 'challenge', intensity: 'mittel', duration: '30 Sekunden' },
  { id: '331', text: 'Erzähle dein peinlichstes Dating-Erlebnis', category: 'challenge', intensity: 'mittel', duration: '2 Minuten' },
  { id: '332', text: 'Imitiere deinen ersten Kuss (jugendfreie Version)', category: 'challenge', intensity: 'mittel', duration: '30 Sekunden' },

  // Wild - Most intense content
  { id: '400', text: 'Wer würde eher... einen Dreier haben?', category: 'wer-würde-eher', intensity: 'wild', requiresVoting: true, duration: '1 Runde' },
  { id: '401', text: 'Wer würde eher... beim Sex stöhnen wie ein Pornostar?', category: 'wer-würde-eher', intensity: 'wild', requiresVoting: true, duration: '1 Runde' },
  { id: '402', text: 'Wer würde eher... heimlich Sexspielzeug kaufen?', category: 'wer-würde-eher', intensity: 'wild', requiresVoting: true, duration: '1 Runde' },

  // Fragen über andere - Wild
  { id: '410', text: 'Wer in der Runde wäre am besten im Bett?', category: 'fragen-über-andere', intensity: 'wild', requiresVoting: true, duration: '1 Runde' },
  { id: '411', text: 'Wer in der Runde hat die meiste sexuelle Erfahrung?', category: 'fragen-über-andere', intensity: 'wild', requiresVoting: true, duration: '1 Runde' },
  { id: '412', text: 'Wer in der Runde würde am ehesten nackt baden gehen?', category: 'fragen-über-andere', intensity: 'wild', requiresVoting: true, duration: '1 Runde' },
  { id: '413', text: 'Wer in der Runde hat den sexiesten Gang?', category: 'fragen-über-andere', intensity: 'wild', requiresVoting: true, duration: '1 Runde' },

  // Team Spiele - Wild
  { id: '420', text: 'TEAMSPIEL: Sexy Rollenspiel Battle', category: 'team-game', intensity: 'wild', isTeamGame: true, duration: '5 Minuten' },
  { id: '421', text: 'TEAMSPIEL: Wer kann verführerischer sprechen?', category: 'team-game', intensity: 'wild', isTeamGame: true, duration: '3 Minuten' },

  // Gruppenchallenges - Wild
  { id: '425', text: 'Alle erzählen gleichzeitig ihr peinlichstes Sexerlebnis', category: 'group-challenge', intensity: 'wild', duration: '3 Minuten' },
  { id: '426', text: 'Alle müssen einen sexy Tanz für 30 Sekunden machen', category: 'group-challenge', intensity: 'wild', duration: '30 Sekunden' },

  // Challenges - Wild
  { id: '430', text: 'Erzähle eine erfundene Geschichte über dein erstes Mal', category: 'challenge', intensity: 'wild', duration: '2 Minuten' },
  { id: '431', text: 'Imitiere einen Orgasmus (jugendfreie Version)', category: 'challenge', intensity: 'wild', duration: '30 Sekunden' },
  { id: '432', text: 'Erzähle dein peinlichstes Sex-Erlebnis (oder erfinde eins)', category: 'challenge', intensity: 'wild', duration: '2 Minuten' },
  { id: '433', text: 'Mache 10 sexy Kniebeugen', category: 'challenge', intensity: 'wild', duration: '30 Sekunden' },
  { id: '434', text: 'Erzähle deine wildeste Sexfantasie (oder erfinde eine)', category: 'challenge', intensity: 'wild', duration: '2 Minuten' },

  // Speaking Rules - All intensities
  { id: '500', text: 'Du darfst nicht "Ja" oder "Nein" sagen', category: 'speaking-rule', intensity: 'zahm', duration: 'Bis du wieder dran bist' },
  { id: '501', text: 'Du musst jede Antwort mit "Meiner Meinung nach..." beginnen', category: 'speaking-rule', intensity: 'zahm', duration: 'Bis du wieder dran bist' },
  { id: '502', text: 'Sprich nur in Fragen, bis du wieder dran bist', category: 'speaking-rule', intensity: 'zahm', duration: 'Bis du wieder dran bist' },
  { id: '503', text: 'Du darfst nur flüstern, bis du wieder dran bist', category: 'speaking-rule', intensity: 'mittel', duration: 'Bis du wieder dran bist' },
  { id: '504', text: 'Du musst jeden Satz mit "Ehm..." beginnen', category: 'speaking-rule', intensity: 'mittel', duration: 'Bis du wieder dran bist' },
  { id: '505', text: 'Du darfst nicht das Wort "und" sagen', category: 'speaking-rule', intensity: 'mittel', duration: 'Bis du wieder dran bist' },
  { id: '506', text: 'Du musst bei jedem Satz "wie geil" am Ende sagen', category: 'speaking-rule', intensity: 'wild', duration: 'Bis du wieder dran bist' },

  // Individual Rules - All intensities
  { id: '510', text: 'Fingerspitzen müssen sich berühren, bis du wieder dran bist', category: 'individual-rule', intensity: 'zahm', duration: 'Bis du wieder dran bist' },
  { id: '511', text: 'Du musst bei jedem Satz mit den Händen gestikulieren', category: 'individual-rule', intensity: 'zahm', duration: 'Bis du wieder dran bist' },
  { id: '512', text: 'Du musst jedes Mal zwinkern wenn du sprichst', category: 'individual-rule', intensity: 'mittel', duration: 'Bis du wieder dran bist' },
  { id: '513', text: 'Du musst auf einem Bein stehen wenn du sprichst', category: 'individual-rule', intensity: 'mittel', duration: 'Bis du wieder dran bist' },

  // Drink Rules - All intensities (non-alcoholic)
  { id: '520', text: 'TRINKRUNDE: Alle trinken 2 Schlucke!', category: 'drink', intensity: 'zahm', duration: 'Sofort' },
  { id: '521', text: 'TRINKREGEL: Wer lacht, muss trinken', category: 'drink-rule', intensity: 'zahm', duration: 'Bis Ende der Runde' },
  { id: '522', text: 'TRINKREGEL: Wer "ich" sagt, muss trinken', category: 'drink-rule', intensity: 'mittel', duration: 'Bis Ende der Runde' },
  { id: '523', text: 'TRINKREGEL: Wer sein Handy berührt, muss trinken', category: 'drink-rule', intensity: 'mittel', duration: 'Bis Ende der Runde' },
  { id: '524', text: 'TRINKRUNDE: Alle die schon mal betrunken Sex hatten trinken 2 Schlucke', category: 'drink', intensity: 'wild', duration: 'Sofort' }
];

export const getRulesByIntensity = (intensity: 'zahm' | 'mittel' | 'wild'): ChaosRule[] => {
  return chaosRules.filter(rule => rule.intensity === intensity);
};

export const getRandomRule = (intensity: 'zahm' | 'mittel' | 'wild', excludeIds: string[] = []): ChaosRule => {
  const availableRules = chaosRules.filter(rule => 
    rule.intensity === intensity && !excludeIds.includes(rule.id)
  );
  
  if (availableRules.length === 0) {
    // Fallback to any rule of this intensity
    const fallbackRules = chaosRules.filter(rule => rule.intensity === intensity);
    return fallbackRules[Math.floor(Math.random() * fallbackRules.length)];
  }
  
  return availableRules[Math.floor(Math.random() * availableRules.length)];
};