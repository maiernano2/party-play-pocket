interface ChaosRule {
  id: string;
  text: string;
  category: string;
  intensity: 'zahm' | 'mittel' | 'wild';
  isTeamGame?: boolean;
  duration?: string;
}

export const chaosRules: ChaosRule[] = [
  // Zahm - Einfache Fragen und Aufgaben
  { id: '1', text: 'Erzähle deine peinlichste Kindheitserinnerung', category: 'individual-challenge', intensity: 'zahm', duration: '2 Minuten' },
  { id: '2', text: 'Imitiere 30 Sekunden lang einen berühmten Politiker', category: 'challenge', intensity: 'zahm', duration: '30 Sekunden' },
  { id: '3', text: 'Sage einen Zungenbrecher 5x hintereinander fehlerfrei', category: 'challenge', intensity: 'zahm', duration: '1 Minute' },
  { id: '4', text: 'Zeichne in 30 Sekunden einen Elefanten mit geschlossenen Augen', category: 'challenge', intensity: 'zahm', duration: '30 Sekunden' },
  { id: '5', text: 'Imitiere 5 verschiedene Tiergeräusche', category: 'challenge', intensity: 'zahm', duration: '30 Sekunden' },
  { id: '6', text: 'Erzähle einen Witz, der niemanden zum Lachen bringt', category: 'challenge', intensity: 'zahm', duration: '1 Minute' },
  { id: '7', text: 'Erkläre Quantenphysik in 30 Sekunden', category: 'challenge', intensity: 'zahm', duration: '30 Sekunden' },
  { id: '8', text: 'Mache eine Sportreporter-Kommentar über das aktuelle Geschehen', category: 'challenge', intensity: 'zahm', duration: '1 Minute' },

  // Persönliche Fragen - Zahm  
  { id: '210', text: 'Erzähle von deiner ersten Kindheitsliebe', category: 'personal-question', intensity: 'zahm', duration: '2 Minuten' },
  { id: '211', text: 'Was war dein peinlichster Moment in der Schule?', category: 'personal-question', intensity: 'zahm', duration: '2 Minuten' },
  { id: '212', text: 'Welches Lied beschreibt dein Leben am besten?', category: 'personal-question', intensity: 'zahm', duration: '1 Minute' },
  { id: '213', text: 'Was ist deine größte irrationale Angst?', category: 'personal-question', intensity: 'zahm', duration: '2 Minuten' },
  { id: '214', text: 'Erzähle von deinem verrücktesten Traum', category: 'personal-question', intensity: 'zahm', duration: '2 Minuten' },

  // Team Spiele - Zahm
  { id: '220', text: 'TEAMSPIEL: Begriffe raten - Ein Team erklärt, das andere rät', category: 'team-game', intensity: 'zahm', isTeamGame: true, duration: '3 Minuten' },
  { id: '221', text: 'TEAMSPIEL: Gemeinsam 20 Tiere aufzählen ohne Wiederholung', category: 'team-game', intensity: 'zahm', isTeamGame: true, duration: '2 Minuten' },
  { id: '222', text: 'TEAMSPIEL: Stadt-Land-Fluss Battle zwischen den Teams', category: 'team-game', intensity: 'zahm', isTeamGame: true, duration: '5 Minuten' },
  { id: '223', text: 'TEAMSPIEL: Filmtitel-Challenge - Wer nennt mehr in 60 Sekunden?', category: 'team-game', intensity: 'zahm', isTeamGame: true, duration: '2 Minuten' },

  // Gruppenchallenges - Zahm
  { id: '225', text: 'Alle müssen stumm "Happy Birthday" singen', category: 'group-challenge', intensity: 'zahm', duration: '30 Sekunden' },
  { id: '226', text: 'Alle erzählen gleichzeitig ihren Lieblings-Kinderfilm', category: 'group-challenge', intensity: 'zahm', duration: '2 Minuten' },
  { id: '227', text: 'Alle machen gleichzeitig verschiedene Yoga-Posen', category: 'group-challenge', intensity: 'zahm', duration: '1 Minute' },
  { id: '228', text: 'Alle summen ihr Lieblings-Kindheitslied', category: 'group-challenge', intensity: 'zahm', duration: '1 Minute' },

  // Mittel - Persönlichere Fragen
  { id: '300', text: 'Erzähle von deinem peinlichsten Date-Erlebnis', category: 'personal-question', intensity: 'mittel', duration: '3 Minuten' },
  { id: '301', text: 'Was ist das Verrückteste, was du für Liebe getan hast?', category: 'personal-question', intensity: 'mittel', duration: '3 Minuten' },
  { id: '302', text: 'Gestehe eine Lüge, die du mal erzählt hast', category: 'personal-question', intensity: 'mittel', duration: '2 Minuten' },
  { id: '303', text: 'Erzähle von deinem ersten Kuss in allen Details', category: 'personal-question', intensity: 'mittel', duration: '3 Minuten' },

  // Fragen über andere - Mittel
  { id: '310', text: 'Sage jemandem in der Runde ein ehrliches Kompliment über sein Aussehen', category: 'social-interaction', intensity: 'mittel', duration: '1 Minute' },
  { id: '311', text: 'Verrate, wen in der Runde du am attraktivsten findest', category: 'social-interaction', intensity: 'mittel', duration: '1 Minute' },
  { id: '312', text: 'Sage, wer in der Runde den besten Humor hat', category: 'social-interaction', intensity: 'mittel', duration: '1 Minute' },
  { id: '313', text: 'Verrate, mit wem in der Runde du gerne befreundet wärst', category: 'social-interaction', intensity: 'mittel', duration: '1 Minute' },

  // Team Spiele - Mittel  
  { id: '320', text: 'TEAMSPIEL: Pantomime-Battle - Abwechselnd Begriffe darstellen', category: 'team-game', intensity: 'mittel', isTeamGame: true, duration: '5 Minuten' },
  { id: '321', text: 'TEAMSPIEL: Wahrheit oder Pflicht zwischen den Teams', category: 'team-game', intensity: 'mittel', isTeamGame: true, duration: '10 Minuten' },

  // Challenges - Mittel
  { id: '330', text: 'Tanze 30 Sekunden zu imaginärer Musik als wärst du allein', category: 'challenge', intensity: 'mittel', duration: '30 Sekunden' },
  { id: '331', text: 'Imitiere jemanden in der Runde für 30 Sekunden', category: 'challenge', intensity: 'mittel', duration: '30 Sekunden' },
  { id: '332', text: 'Erzähle eine peinliche Geschichte über dich selbst', category: 'challenge', intensity: 'mittel', duration: '3 Minuten' },

  // Wild - Sehr persönliche Inhalte
  { id: '400', text: 'Erzähle von deiner wildesten Partynacht', category: 'personal-question', intensity: 'wild', duration: '5 Minuten' },
  { id: '401', text: 'Gestehe deine verrückteste Sexfantasie (oder erfinde eine)', category: 'personal-question', intensity: 'wild', duration: '3 Minuten' },
  { id: '402', text: 'Erzähle von deinem peinlichsten Sex-Erlebnis', category: 'personal-question', intensity: 'wild', duration: '3 Minuten' },

  // Fragen über andere - Wild
  { id: '410', text: 'Sage, wen in der Runde du am sexiesten findest', category: 'social-interaction', intensity: 'wild', duration: '1 Minute' },
  { id: '411', text: 'Verrate, mit wem in der Runde du gerne knutschen würdest', category: 'social-interaction', intensity: 'wild', duration: '1 Minute' },
  { id: '412', text: 'Sage, wer in der Runde vermutlich am besten im Bett ist', category: 'social-interaction', intensity: 'wild', duration: '1 Minute' },

  // Team Spiele - Wild
  { id: '420', text: 'TEAMSPIEL: Sexy Rollenspiel - Teams spielen verführerische Szenen', category: 'team-game', intensity: 'wild', isTeamGame: true, duration: '5 Minuten' },
  { id: '421', text: 'TEAMSPIEL: Wer kann verführerischer sprechen? Teams im Duell', category: 'team-game', intensity: 'wild', isTeamGame: true, duration: '3 Minuten' },

  // Challenges - Wild
  { id: '430', text: 'Führe einen 30-sekündigen Strip-Tease auf (nur Oberteil)', category: 'challenge', intensity: 'wild', duration: '30 Sekunden' },
  { id: '431', text: 'Imitiere einen Orgasmus (jugendfreie Version)', category: 'challenge', intensity: 'wild', duration: '30 Sekunden' },
  { id: '432', text: 'Mache 10 sexy Kniebeugen mit Geräuschen', category: 'challenge', intensity: 'wild', duration: '1 Minute' },
  { id: '433', text: 'Tanze einen langsamen, sinnlichen Tanz', category: 'challenge', intensity: 'wild', duration: '30 Sekunden' },

  // Speaking Rules - Alle Intensitäten
  { id: '500', text: 'Du darfst nicht "Ja" oder "Nein" sagen', category: 'speaking-rule', intensity: 'zahm', duration: 'Bis du wieder dran bist' },
  { id: '501', text: 'Du musst jede Antwort mit "Meiner Meinung nach..." beginnen', category: 'speaking-rule', intensity: 'zahm', duration: 'Bis du wieder dran bist' },
  { id: '502', text: 'Sprich nur in Fragen, bis du wieder dran bist', category: 'speaking-rule', intensity: 'zahm', duration: 'Bis du wieder dran bist' },
  { id: '503', text: 'Du darfst nur flüstern', category: 'speaking-rule', intensity: 'mittel', duration: 'Bis du wieder dran bist' },
  { id: '504', text: 'Du musst jeden Satz mit "Ehm..." beginnen', category: 'speaking-rule', intensity: 'mittel', duration: 'Bis du wieder dran bist' },
  { id: '505', text: 'Du darfst nicht das Wort "und" sagen', category: 'speaking-rule', intensity: 'mittel', duration: 'Bis du wieder dran bist' },
  { id: '506', text: 'Du musst bei jedem Satz "wie geil" am Ende sagen', category: 'speaking-rule', intensity: 'wild', duration: 'Bis du wieder dran bist' },

  // Individual Rules
  { id: '510', text: 'Fingerspitzen müssen sich berühren wenn du sprichst', category: 'individual-rule', intensity: 'zahm', duration: 'Bis du wieder dran bist' },
  { id: '511', text: 'Du musst bei jedem Satz mit den Händen gestikulieren', category: 'individual-rule', intensity: 'zahm', duration: 'Bis du wieder dran bist' },
  { id: '512', text: 'Du musst jedes Mal zwinkern wenn du sprichst', category: 'individual-rule', intensity: 'mittel', duration: 'Bis du wieder dran bist' },
  { id: '513', text: 'Du musst auf einem Bein stehen wenn du sprichst', category: 'individual-rule', intensity: 'mittel', duration: 'Bis du wieder dran bist' },

  // Drink Rules (non-alcoholic)
  { id: '520', text: 'TRINKRUNDE: Alle trinken 2 Schlucke Wasser!', category: 'drink', intensity: 'zahm', duration: 'Sofort' },
  { id: '521', text: 'TRINKREGEL: Wer lacht, muss trinken', category: 'drink-rule', intensity: 'zahm', duration: 'Bis Ende der Runde' },
  { id: '522', text: 'TRINKREGEL: Wer "ich" sagt, muss trinken', category: 'drink-rule', intensity: 'mittel', duration: 'Bis Ende der Runde' },
  { id: '523', text: 'TRINKREGEL: Wer sein Handy berührt, muss trinken', category: 'drink-rule', intensity: 'mittel', duration: 'Bis Ende der Runde' },
  { id: '524', text: 'TRINKRUNDE: Alle die schon mal verliebt waren trinken 2 Schlucke', category: 'drink', intensity: 'wild', duration: 'Sofort' }
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