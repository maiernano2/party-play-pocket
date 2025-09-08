export const assoziationTopics = [
  'Veraltete Technik',
  'Schulfach',
  'Farbe',
  'Obst',
  'Tier',
  'Land',
  'Stadt',
  'Getränk',
  'Beruf',
  'Sportart',
  'Kleidungsstück',
  'Möbelstück',
  'Musikinstrument',
  'Filmgenre',
  'Superheld',
  'Auto-Marke',
  'Urlaubsziel',
  'Jahreszeit',
  'Körperteil',
  'Sprache',
  'Computerspiel',
  'Social-Media-Plattform',
  'Gemüse',
  'Süßigkeit',
  'Sänger/in',
  'Cartoonfigur',
  'Haushaltsgerät',
  'Wetterlage',
  'Wissenschaftsfach',
  'Musikalbum'
];

export const getRandomTopic = (usedTopics: Set<string>): string | null => {
  const availableTopics = assoziationTopics.filter(topic => !usedTopics.has(topic));
  
  if (availableTopics.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * availableTopics.length);
  return availableTopics[randomIndex];
};