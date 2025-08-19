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
  { id: '1', text: 'Erzähle deine peinlichste Kindheitserinnerung', category: 'personal-question', intensity: 'zahm' },
  { id: '2', text: 'Imitiere einen berühmten Politiker für 30 Sekunden', category: 'challenge', intensity: 'zahm' },
  { id: '3', text: 'Sage einen Zungenbrecher 5x hintereinander fehlerfrei', category: 'challenge', intensity: 'zahm' },
  { id: '4', text: 'Zeichne einen Elefanten mit geschlossenen Augen für 30 Sekunden', category: 'challenge', intensity: 'zahm' },
  { id: '5', text: 'Imitiere 5 verschiedene Tiergeräusche für 30 Sekunden', category: 'challenge', intensity: 'zahm' },
  { id: '6', text: 'Erzähle einen Witz, der niemanden zum Lachen bringen soll für 1 Minute', category: 'challenge', intensity: 'zahm' },
  { id: '7', text: 'Erkläre Quantenphysik für 30 Sekunden', category: 'challenge', intensity: 'zahm' },
  { id: '8', text: 'Mache einen Sportreporter-Kommentar über das aktuelle Geschehen für 1 Minute', category: 'challenge', intensity: 'zahm' },
  { id: '9', text: 'Was war dein größter Kindheitstraum?', category: 'personal-question', intensity: 'zahm' },
  { id: '10', text: 'Beschreibe deinen perfekten Tag', category: 'personal-question', intensity: 'zahm' },
  { id: '11', text: 'Erzähle von deinem lustigsten Urlaubserlebnis', category: 'personal-question', intensity: 'zahm' },
  { id: '12', text: 'Welche 3 Dinge würdest du auf eine einsame Insel mitnehmen?', category: 'personal-question', intensity: 'zahm' },
  { id: '13', text: 'Erzähle von deinem ersten Schultag', category: 'personal-question', intensity: 'zahm' },
  { id: '14', text: 'Beschreibe dein Lieblings-Kindheitsspielzeug', category: 'personal-question', intensity: 'zahm' },
  { id: '15', text: 'Was magst du an dir selbst am meisten?', category: 'personal-question', intensity: 'zahm' },
  { id: '16', text: 'Erzähle von deinem verrücktesten Traum', category: 'personal-question', intensity: 'zahm' },
  { id: '17', text: 'Beschreibe deinen Traumjob', category: 'personal-question', intensity: 'zahm' },
  { id: '18', text: 'Welches Lied beschreibt dein Leben am besten?', category: 'personal-question', intensity: 'zahm' },
  { id: '19', text: 'Erzähle von deiner ersten Haustier-Erinnerung', category: 'personal-question', intensity: 'zahm' },
  { id: '20', text: 'Beschreibe deine größte irrationale Angst', category: 'personal-question', intensity: 'zahm' },


  // Gruppenchallenges - Zahm
  { id: '225', text: 'Alle müssen stumm "Happy Birthday" singen für 30 Sekunden', category: 'group-challenge', intensity: 'zahm' },
  { id: '226', text: 'Alle erzählen gleichzeitig ihren Lieblings-Kinderfilm für 2 Minuten', category: 'group-challenge', intensity: 'zahm' },
  { id: '227', text: 'Alle machen gleichzeitig verschiedene Yoga-Posen für 1 Minute', category: 'group-challenge', intensity: 'zahm' },
  { id: '228', text: 'Alle summen ihr Lieblings-Kindheitslied für 1 Minute', category: 'group-challenge', intensity: 'zahm' },

  // Mittel - Persönlichere Fragen
  { id: '300', text: 'Erzähle von deinem peinlichsten Date-Erlebnis', category: 'personal-question', intensity: 'mittel' },
  { id: '301', text: 'Was war das Verrückteste, was du für Liebe getan hast?', category: 'personal-question', intensity: 'mittel' },
  { id: '302', text: 'Gestehe eine Lüge, die du mal erzählt hast', category: 'personal-question', intensity: 'mittel' },
  { id: '303', text: 'Erzähle von deinem ersten Kuss in allen Details', category: 'personal-question', intensity: 'mittel' },
  { id: '304', text: 'Beschreibe deine erste große Liebe', category: 'personal-question', intensity: 'mittel' },
  { id: '305', text: 'Erzähle von deinem peinlichsten Moment vor Freunden', category: 'personal-question', intensity: 'mittel' },
  { id: '306', text: 'Wovon träumst du heimlich?', category: 'personal-question', intensity: 'mittel' },
  { id: '307', text: 'Beschreibe deinen schlimmsten Kater', category: 'personal-question', intensity: 'mittel' },
  { id: '308', text: 'Erzähle von deinem verrücktesten Partyerlebnis', category: 'personal-question', intensity: 'mittel' },
  { id: '309', text: 'Was ist dein größtes Geheimnis?', category: 'personal-question', intensity: 'mittel' },
  { id: '310', text: 'Erzähle von deinem ersten Alkoholrausch', category: 'personal-question', intensity: 'mittel' },
  { id: '311', text: 'Beschreibe deine peinlichste Begegnung mit deinen Eltern', category: 'personal-question', intensity: 'mittel' },
  { id: '312', text: 'Was hasst du heimlich an dir selbst?', category: 'personal-question', intensity: 'mittel' },
  { id: '313', text: 'Erzähle von deinem größten Regelbruch', category: 'personal-question', intensity: 'mittel' },
  { id: '314', text: 'Beschreibe deine verrückteste Spontanaktion', category: 'personal-question', intensity: 'mittel' },

  // Normale Fragen - Mittel 
  { id: '350', text: 'Was war dein schönster Moment in diesem Jahr?', category: 'normal-question', intensity: 'mittel' },
  { id: '351', text: 'Welche Eigenschaft bewunderst du am meisten an anderen?', category: 'normal-question', intensity: 'mittel' },
  { id: '352', text: 'Was würdest du anders machen, wenn du nochmal 16 wärst?', category: 'normal-question', intensity: 'mittel' },
  { id: '353', text: 'Welcher Ort auf der Welt fasziniert dich am meisten?', category: 'normal-question', intensity: 'mittel' },
  { id: '354', text: 'Was ist das Mutigste, was du je getan hast?', category: 'normal-question', intensity: 'mittel' },
  { id: '355', text: 'Welche Lebenserfahrung hat dich am meisten geprägt?', category: 'normal-question', intensity: 'mittel' },
  { id: '356', text: 'Was machst du, wenn du richtig gestresst bist?', category: 'normal-question', intensity: 'mittel' },
  { id: '357', text: 'Welche drei Werte sind dir im Leben am wichtigsten?', category: 'normal-question', intensity: 'mittel' },
  { id: '358', text: 'Was war dein größter Lernmoment im letzten Jahr?', category: 'normal-question', intensity: 'mittel' },
  { id: '359', text: 'Welche Tradition findest du besonders wertvoll?', category: 'normal-question', intensity: 'mittel' },

  // Fragen über andere - Mittel
  { id: '320', text: 'Sage jemandem in der Runde ein ehrliches Kompliment über sein Aussehen', category: 'social-interaction', intensity: 'mittel' },
  { id: '321', text: 'Verrate, wen in der Runde du am attraktivsten findest und warum', category: 'social-interaction', intensity: 'mittel' },
  { id: '322', text: 'Wer in der Runde hat den besten Humor?', category: 'social-interaction', intensity: 'mittel' },
  { id: '323', text: 'Verrate, mit wem in der Runde du gerne befreundet wärst', category: 'social-interaction', intensity: 'mittel' },
  { id: '324', text: 'Wer in der Runde wirkt am vertrauenswürdigsten?', category: 'social-interaction', intensity: 'mittel' },
  { id: '325', text: 'Beschreibe, wen in der Runde du gerne besser kennenlernen würdest', category: 'social-interaction', intensity: 'mittel' },
  { id: '326', text: 'Verrate, wer in der Runde am besten küssen könnte', category: 'social-interaction', intensity: 'mittel' },
  { id: '327', text: 'Mit wem in der Runde würdest du gerne einen Abend verbringen?', category: 'social-interaction', intensity: 'mittel' },


  // Challenges - Mittel
  { id: '340', text: 'Tanze zu imaginärer Musik als wärst du allein für 30 Sekunden', category: 'challenge', intensity: 'mittel' },
  { id: '341', text: 'Imitiere jemanden in der Runde für 30 Sekunden', category: 'challenge', intensity: 'mittel' },
  { id: '342', text: 'Erzähle eine peinliche Geschichte über dich selbst', category: 'challenge', intensity: 'mittel' },

  // Wild - Sehr persönliche Inhalte
  { id: '400', text: 'Erzähle von deiner wildesten Partynacht', category: 'personal-question', intensity: 'wild' },
  { id: '401', text: 'Gestehe deine verrückteste Sexfantasie (oder erfinde eine)', category: 'personal-question', intensity: 'wild' },
  { id: '402', text: 'Erzähle von deinem peinlichsten Sex-Erlebnis', category: 'personal-question', intensity: 'wild' },
  { id: '403', text: 'Beschreibe dein erstes Mal in allen Details', category: 'personal-question', intensity: 'wild' },
  { id: '404', text: 'Erzähle von deinem verrücktesten One-Night-Stand', category: 'personal-question', intensity: 'wild' },
  { id: '405', text: 'Was ist deine heimlichste sexuelle Fantasie?', category: 'personal-question', intensity: 'wild' },
  { id: '406', text: 'Beschreibe deine krasseste Erfahrung mit Drogen', category: 'personal-question', intensity: 'wild' },
  { id: '407', text: 'Erzähle von deinem größten sexuellen Versagen', category: 'personal-question', intensity: 'wild' },
  { id: '408', text: 'Gestehe deine perverseste Fantasie', category: 'personal-question', intensity: 'wild' },
  { id: '409', text: 'Mit wem wolltest du heimlich schon mal Sex haben?', category: 'personal-question', intensity: 'wild' },
  { id: '410', text: 'Erzähle von deinem peinlichsten Orgasmus', category: 'personal-question', intensity: 'wild' },
  { id: '411', text: 'Beschreibe deine verrückteste Sexstellung', category: 'personal-question', intensity: 'wild' },
  { id: '412', text: 'Gestehe deine schmutzigsten Gedanken', category: 'personal-question', intensity: 'wild' },
  { id: '413', text: 'Erzähle von deinem wildesten Dreier-Erlebnis (oder Fantasie)', category: 'personal-question', intensity: 'wild' },
  { id: '414', text: 'Was ist dein größter Turn-On?', category: 'personal-question', intensity: 'wild' },

  // Fragen über andere - Wild
  { id: '420', text: 'Wen in der Runde findest du am sexiesten?', category: 'social-interaction', intensity: 'wild' },
  { id: '421', text: 'Verrate, mit wem in der Runde du gerne knutschen würdest', category: 'social-interaction', intensity: 'wild' },
  { id: '422', text: 'Wer in der Runde ist vermutlich am besten im Bett?', category: 'social-interaction', intensity: 'wild' },
  { id: '423', text: 'Beschreibe, was du mit jemandem in der Runde machen würdest', category: 'social-interaction', intensity: 'wild' },
  { id: '424', text: 'Verrate, wer in der Runde die heißeste Ausstrahlung hat', category: 'social-interaction', intensity: 'wild' },
  { id: '425', text: 'Mit wem in der Runde würdest du gerne eine Nacht verbringen?', category: 'social-interaction', intensity: 'wild' },
  { id: '426', text: 'Wer in der Runde ist am verführerischsten?', category: 'social-interaction', intensity: 'wild' },


  // Challenges - Wild
  { id: '440', text: 'Führe einen Strip-Tease auf (nur Oberteil) für 30 Sekunden', category: 'challenge', intensity: 'wild' },
  { id: '441', text: 'Imitiere einen Orgasmus (jugendfreie Version) für 30 Sekunden', category: 'challenge', intensity: 'wild' },
  { id: '442', text: 'Mache 10 sexy Kniebeugen mit Geräuschen für 1 Minute', category: 'challenge', intensity: 'wild' },
  { id: '443', text: 'Tanze einen langsamen, sinnlichen Tanz für 30 Sekunden', category: 'challenge', intensity: 'wild' },

  // Speaking Rules - Alle Intensitäten
  { id: '500', text: 'Du darfst nicht "Ja" oder "Nein" sagen (bis du wieder dran bist)', category: 'speaking-rule', intensity: 'zahm' },
  { id: '501', text: 'Du musst jede Antwort mit "Meiner Meinung nach..." beginnen (bis du wieder dran bist)', category: 'speaking-rule', intensity: 'zahm' },
  { id: '502', text: 'Sprich nur in Fragen (bis du wieder dran bist)', category: 'speaking-rule', intensity: 'zahm' },
  { id: '503', text: 'Du darfst nur flüstern (bis du wieder dran bist)', category: 'speaking-rule', intensity: 'mittel' },
  { id: '504', text: 'Du musst jeden Satz mit "Ehm..." beginnen (bis du wieder dran bist)', category: 'speaking-rule', intensity: 'mittel' },
  { id: '505', text: 'Du darfst nicht das Wort "und" sagen (bis du wieder dran bist)', category: 'speaking-rule', intensity: 'mittel' },
  { id: '506', text: 'Du musst bei jedem Satz "wie geil" am Ende sagen für 1 Minute', category: 'speaking-rule', intensity: 'wild' },

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