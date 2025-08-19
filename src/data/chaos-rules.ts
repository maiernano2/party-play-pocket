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
  { id: '1', text: 'Erzähle für 2 Minuten deine peinlichste Kindheitserinnerung', category: 'personal-question', intensity: 'zahm' },
  { id: '2', text: 'Imitiere 30 Sekunden lang einen berühmten Politiker', category: 'challenge', intensity: 'zahm' },
  { id: '3', text: 'Sage einen Zungenbrecher 5x hintereinander fehlerfrei', category: 'challenge', intensity: 'zahm' },
  { id: '4', text: 'Zeichne in 30 Sekunden einen Elefanten mit geschlossenen Augen', category: 'challenge', intensity: 'zahm' },
  { id: '5', text: 'Imitiere 5 verschiedene Tiergeräusche in 30 Sekunden', category: 'challenge', intensity: 'zahm' },
  { id: '6', text: 'Erzähle für 1 Minute einen Witz, der niemanden zum Lachen bringen soll', category: 'challenge', intensity: 'zahm' },
  { id: '7', text: 'Erkläre Quantenphysik in 30 Sekunden', category: 'challenge', intensity: 'zahm' },
  { id: '8', text: 'Mache für 1 Minute einen Sportreporter-Kommentar über das aktuelle Geschehen', category: 'challenge', intensity: 'zahm' },
  { id: '9', text: 'Sage für 1 Minute, was dein größter Kindheitstraum war', category: 'personal-question', intensity: 'zahm' },
  { id: '10', text: 'Beschreibe für 2 Minuten deinen perfekten Tag', category: 'personal-question', intensity: 'zahm' },
  { id: '11', text: 'Erzähle für 2 Minuten von deinem lustigsten Urlaubserlebnis', category: 'personal-question', intensity: 'zahm' },
  { id: '12', text: 'Sage für 1 Minute, welche 3 Dinge du auf eine einsame Insel mitnehmen würdest', category: 'personal-question', intensity: 'zahm' },
  { id: '13', text: 'Erzähle für 2 Minuten von deinem ersten Schultag', category: 'personal-question', intensity: 'zahm' },
  { id: '14', text: 'Beschreibe für 1 Minute dein Lieblings-Kindheitsspielzeug', category: 'personal-question', intensity: 'zahm' },
  { id: '15', text: 'Sage für 2 Minuten, was du an dir selbst am meisten magst', category: 'personal-question', intensity: 'zahm' },
  { id: '16', text: 'Erzähle für 1 Minute von deinem verrücktesten Traum', category: 'personal-question', intensity: 'zahm' },
  { id: '17', text: 'Beschreibe für 2 Minuten deinen Traumjob', category: 'personal-question', intensity: 'zahm' },
  { id: '18', text: 'Sage für 1 Minute, welches Lied dein Leben am besten beschreibt', category: 'personal-question', intensity: 'zahm' },
  { id: '19', text: 'Erzähle für 2 Minuten von deiner ersten Haustier-Erinnerung', category: 'personal-question', intensity: 'zahm' },
  { id: '20', text: 'Beschreibe für 1 Minute deine größte irrationale Angst', category: 'personal-question', intensity: 'zahm' },

  // Team Spiele - Zahm (nur sinnvolle)
  { id: '220', text: 'TEAMSPIEL für 3 Minuten: Ein Team erklärt Begriffe, das andere rät', category: 'team-game', intensity: 'zahm', isTeamGame: true },
  { id: '221', text: 'TEAMSPIEL für 2 Minuten: Teams zählen abwechselnd Länder auf, ohne Wiederholung', category: 'team-game', intensity: 'zahm', isTeamGame: true },
  { id: '222', text: 'TEAMSPIEL für 5 Minuten: Stadt-Land-Fluss Battle zwischen den Teams', category: 'team-game', intensity: 'zahm', isTeamGame: true },
  { id: '223', text: 'TEAMSPIEL für 2 Minuten: Wer nennt mehr Disney-Charaktere?', category: 'team-game', intensity: 'zahm', isTeamGame: true },
  { id: '224', text: 'TEAMSPIEL für 3 Minuten: Teams bilden abwechselnd Reimwörter', category: 'team-game', intensity: 'zahm', isTeamGame: true },

  // Gruppenchallenges - Zahm
  { id: '225', text: 'Alle müssen 30 Sekunden stumm "Happy Birthday" singen', category: 'group-challenge', intensity: 'zahm' },
  { id: '226', text: 'Alle erzählen 2 Minuten gleichzeitig ihren Lieblings-Kinderfilm', category: 'group-challenge', intensity: 'zahm' },
  { id: '227', text: 'Alle machen 1 Minute gleichzeitig verschiedene Yoga-Posen', category: 'group-challenge', intensity: 'zahm' },
  { id: '228', text: 'Alle summen 1 Minute ihr Lieblings-Kindheitslied', category: 'group-challenge', intensity: 'zahm' },

  // Mittel - Persönlichere Fragen
  { id: '300', text: 'Erzähle für 3 Minuten von deinem peinlichsten Date-Erlebnis', category: 'personal-question', intensity: 'mittel' },
  { id: '301', text: 'Sage für 3 Minuten, was das Verrückteste war, was du für Liebe getan hast', category: 'personal-question', intensity: 'mittel' },
  { id: '302', text: 'Gestehe für 2 Minuten eine Lüge, die du mal erzählt hast', category: 'personal-question', intensity: 'mittel' },
  { id: '303', text: 'Erzähle für 3 Minuten von deinem ersten Kuss in allen Details', category: 'personal-question', intensity: 'mittel' },
  { id: '304', text: 'Beschreibe für 2 Minuten deine erste große Liebe', category: 'personal-question', intensity: 'mittel' },
  { id: '305', text: 'Erzähle für 3 Minuten von deinem peinlichsten Moment vor Freunden', category: 'personal-question', intensity: 'mittel' },
  { id: '306', text: 'Sage für 2 Minuten, wovon du heimlich träumst', category: 'personal-question', intensity: 'mittel' },
  { id: '307', text: 'Beschreibe für 3 Minuten deinen schlimmsten Kater', category: 'personal-question', intensity: 'mittel' },
  { id: '308', text: 'Erzähle für 2 Minuten von deinem verrücktesten Partyerlebnis', category: 'personal-question', intensity: 'mittel' },
  { id: '309', text: 'Sage für 3 Minuten, was dein größtes Geheimnis ist', category: 'personal-question', intensity: 'mittel' },
  { id: '310', text: 'Erzähle für 2 Minuten von deinem ersten Alkoholrausch', category: 'personal-question', intensity: 'mittel' },
  { id: '311', text: 'Beschreibe für 3 Minuten deine peinlichste Begegnung mit deinen Eltern', category: 'personal-question', intensity: 'mittel' },
  { id: '312', text: 'Sage für 2 Minuten, was du heimlich an dir selbst hasst', category: 'personal-question', intensity: 'mittel' },
  { id: '313', text: 'Erzähle für 3 Minuten von deinem größten Regelbruch', category: 'personal-question', intensity: 'mittel' },
  { id: '314', text: 'Beschreibe für 2 Minuten deine verrückteste Spontanaktion', category: 'personal-question', intensity: 'mittel' },

  // Fragen über andere - Mittel
  { id: '320', text: 'Sage für 1 Minute jemandem in der Runde ein ehrliches Kompliment über sein Aussehen', category: 'social-interaction', intensity: 'mittel' },
  { id: '321', text: 'Verrate für 1 Minute, wen in der Runde du am attraktivsten findest und warum', category: 'social-interaction', intensity: 'mittel' },
  { id: '322', text: 'Sage für 1 Minute, wer in der Runde den besten Humor hat', category: 'social-interaction', intensity: 'mittel' },
  { id: '323', text: 'Verrate für 1 Minute, mit wem in der Runde du gerne befreundet wärst', category: 'social-interaction', intensity: 'mittel' },
  { id: '324', text: 'Sage für 1 Minute, wer in der Runde am vertrauenswürdigsten wirkt', category: 'social-interaction', intensity: 'mittel' },
  { id: '325', text: 'Beschreibe für 2 Minuten, wen in der Runde du gerne besser kennenlernen würdest', category: 'social-interaction', intensity: 'mittel' },
  { id: '326', text: 'Verrate für 1 Minute, wer in der Runde am besten küssen könnte', category: 'social-interaction', intensity: 'mittel' },
  { id: '327', text: 'Sage für 2 Minuten, mit wem in der Runde du gerne einen Abend verbringen würdest', category: 'social-interaction', intensity: 'mittel' },

  // Team Spiele - Mittel  
  { id: '330', text: 'TEAMSPIEL für 5 Minuten: Pantomime-Battle - Teams stellen abwechselnd Begriffe dar', category: 'team-game', intensity: 'mittel', isTeamGame: true },
  { id: '331', text: 'TEAMSPIEL für 10 Minuten: Wahrheit oder Pflicht zwischen den Teams', category: 'team-game', intensity: 'mittel', isTeamGame: true },
  { id: '332', text: 'TEAMSPIEL für 5 Minuten: Teams erfinden abwechselnd peinliche Geschichten übereinander', category: 'team-game', intensity: 'mittel', isTeamGame: true },

  // Challenges - Mittel
  { id: '340', text: 'Tanze 30 Sekunden zu imaginärer Musik als wärst du allein', category: 'challenge', intensity: 'mittel' },
  { id: '341', text: 'Imitiere 30 Sekunden jemanden in der Runde', category: 'challenge', intensity: 'mittel' },
  { id: '342', text: 'Erzähle für 3 Minuten eine peinliche Geschichte über dich selbst', category: 'challenge', intensity: 'mittel' },

  // Wild - Sehr persönliche Inhalte
  { id: '400', text: 'Erzähle für 5 Minuten von deiner wildesten Partynacht', category: 'personal-question', intensity: 'wild' },
  { id: '401', text: 'Gestehe für 3 Minuten deine verrückteste Sexfantasie (oder erfinde eine)', category: 'personal-question', intensity: 'wild' },
  { id: '402', text: 'Erzähle für 3 Minuten von deinem peinlichsten Sex-Erlebnis', category: 'personal-question', intensity: 'wild' },
  { id: '403', text: 'Beschreibe für 4 Minuten dein erstes Mal in allen Details', category: 'personal-question', intensity: 'wild' },
  { id: '404', text: 'Erzähle für 3 Minuten von deinem verrücktesten One-Night-Stand', category: 'personal-question', intensity: 'wild' },
  { id: '405', text: 'Sage für 2 Minuten, was deine heimlichste sexuelle Fantasie ist', category: 'personal-question', intensity: 'wild' },
  { id: '406', text: 'Beschreibe für 3 Minuten deine krasseste Erfahrung mit Drogen', category: 'personal-question', intensity: 'wild' },
  { id: '407', text: 'Erzähle für 4 Minuten von deinem größten sexuellen Versagen', category: 'personal-question', intensity: 'wild' },
  { id: '408', text: 'Gestehe für 3 Minuten deine perverseste Fantasie', category: 'personal-question', intensity: 'wild' },
  { id: '409', text: 'Sage für 2 Minuten, mit wem du heimlich schon mal Sex haben wolltest', category: 'personal-question', intensity: 'wild' },
  { id: '410', text: 'Erzähle für 3 Minuten von deinem peinlichsten Orgasmus', category: 'personal-question', intensity: 'wild' },
  { id: '411', text: 'Beschreibe für 4 Minuten deine verrückteste Sexstellung', category: 'personal-question', intensity: 'wild' },
  { id: '412', text: 'Gestehe für 2 Minuten deine schmutzigsten Gedanken', category: 'personal-question', intensity: 'wild' },
  { id: '413', text: 'Erzähle für 3 Minuten von deinem wildesten Dreier-Erlebnis (oder Fantasie)', category: 'personal-question', intensity: 'wild' },
  { id: '414', text: 'Sage für 2 Minuten, was dein größter Turn-On ist', category: 'personal-question', intensity: 'wild' },

  // Fragen über andere - Wild
  { id: '420', text: 'Sage für 1 Minute, wen in der Runde du am sexiesten findest', category: 'social-interaction', intensity: 'wild' },
  { id: '421', text: 'Verrate für 1 Minute, mit wem in der Runde du gerne knutschen würdest', category: 'social-interaction', intensity: 'wild' },
  { id: '422', text: 'Sage für 1 Minute, wer in der Runde vermutlich am besten im Bett ist', category: 'social-interaction', intensity: 'wild' },
  { id: '423', text: 'Beschreibe für 2 Minuten, was du mit jemandem in der Runde machen würdest', category: 'social-interaction', intensity: 'wild' },
  { id: '424', text: 'Verrate für 1 Minute, wer in der Runde die heißeste Ausstrahlung hat', category: 'social-interaction', intensity: 'wild' },
  { id: '425', text: 'Sage für 2 Minuten, mit wem in der Runde du gerne eine Nacht verbringen würdest', category: 'social-interaction', intensity: 'wild' },
  { id: '426', text: 'Beschreibe für 1 Minute, wer in der Runde am verführerischsten ist', category: 'social-interaction', intensity: 'wild' },

  // Team Spiele - Wild
  { id: '430', text: 'TEAMSPIEL für 5 Minuten: Teams spielen verführerische Rollenspiele gegeneinander', category: 'team-game', intensity: 'wild', isTeamGame: true },
  { id: '431', text: 'TEAMSPIEL für 3 Minuten: Welches Team kann verführerischer sprechen?', category: 'team-game', intensity: 'wild', isTeamGame: true },

  // Challenges - Wild
  { id: '440', text: 'Führe 30 Sekunden einen Strip-Tease auf (nur Oberteil)', category: 'challenge', intensity: 'wild' },
  { id: '441', text: 'Imitiere 30 Sekunden einen Orgasmus (jugendfreie Version)', category: 'challenge', intensity: 'wild' },
  { id: '442', text: 'Mache 1 Minute 10 sexy Kniebeugen mit Geräuschen', category: 'challenge', intensity: 'wild' },
  { id: '443', text: 'Tanze 30 Sekunden einen langsamen, sinnlichen Tanz', category: 'challenge', intensity: 'wild' },

  // Speaking Rules - Alle Intensitäten
  { id: '500', text: 'Du darfst nicht "Ja" oder "Nein" sagen (bis du wieder dran bist)', category: 'speaking-rule', intensity: 'zahm' },
  { id: '501', text: 'Du musst jede Antwort mit "Meiner Meinung nach..." beginnen (bis du wieder dran bist)', category: 'speaking-rule', intensity: 'zahm' },
  { id: '502', text: 'Sprich nur in Fragen (bis du wieder dran bist)', category: 'speaking-rule', intensity: 'zahm' },
  { id: '503', text: 'Du darfst nur flüstern (bis du wieder dran bist)', category: 'speaking-rule', intensity: 'mittel' },
  { id: '504', text: 'Du musst jeden Satz mit "Ehm..." beginnen (bis du wieder dran bist)', category: 'speaking-rule', intensity: 'mittel' },
  { id: '505', text: 'Du darfst nicht das Wort "und" sagen (bis du wieder dran bist)', category: 'speaking-rule', intensity: 'mittel' },
  { id: '506', text: 'Du musst bei jedem Satz "wie geil" am Ende sagen (bis du wieder dran bist)', category: 'speaking-rule', intensity: 'wild' },

  // Individual Rules
  { id: '510', text: 'Deine Fingerspitzen müssen sich berühren wenn du sprichst (bis du wieder dran bist)', category: 'individual-rule', intensity: 'zahm' },
  { id: '511', text: 'Du musst bei jedem Satz mit den Händen gestikulieren (bis du wieder dran bist)', category: 'individual-rule', intensity: 'zahm' },
  { id: '512', text: 'Du musst jedes Mal zwinkern wenn du sprichst (bis du wieder dran bist)', category: 'individual-rule', intensity: 'mittel' },
  { id: '513', text: 'Du musst auf einem Bein stehen wenn du sprichst (bis du wieder dran bist)', category: 'individual-rule', intensity: 'mittel' },

  // Drink Rules (non-alcoholic)
  { id: '520', text: 'TRINKRUNDE: Alle trinken sofort 2 Schlucke Wasser!', category: 'drink', intensity: 'zahm' },
  { id: '521', text: 'TRINKREGEL: Wer lacht, muss trinken (bis Ende der Runde)', category: 'drink-rule', intensity: 'zahm' },
  { id: '522', text: 'TRINKREGEL: Wer "ich" sagt, muss trinken (bis Ende der Runde)', category: 'drink-rule', intensity: 'mittel' },
  { id: '523', text: 'TRINKREGEL: Wer sein Handy berührt, muss trinken (bis Ende der Runde)', category: 'drink-rule', intensity: 'mittel' },
  { id: '524', text: 'TRINKRUNDE: Alle die schon mal verliebt waren trinken sofort 2 Schlucke', category: 'drink', intensity: 'wild' }
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