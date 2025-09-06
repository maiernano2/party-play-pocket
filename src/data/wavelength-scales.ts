export const wavelengthScales = [
  "lustig – langweilig",
  "billig – teuer",
  "heiß – kalt",
  "schnell – langsam",
  "laut – leise",
  "groß – klein",
  "neu – alt",
  "süß – bitter",
  "hell – dunkel",
  "weich – hart",
  "einfach – schwierig",
  "nass – trocken",
  "schwer – leicht",
  "rund – eckig",
  "glatt – rau",
  "gesund – ungesund",
  "bekannt – unbekannt",
  "modern – altmodisch",
  "mutig – ängstlich",
  "schön – hässlich",
  "reich – arm",
  "intelligent – dumm",
  "friedlich – aggressiv",
  "entspannt – stressig",
  "romantisch – unromantisch",
  "sportlich – unsportlich",
  "kreativ – langweilig",
  "exotisch – gewöhnlich",
  "luxuriös – spartanisch",
  "pünktlich – unpünktlich"
];

export const getRandomScale = (usedScales: Set<string> = new Set()): string | null => {
  const availableScales = wavelengthScales.filter(scale => !usedScales.has(scale));
  
  if (availableScales.length === 0) {
    return null;
  }
  
  return availableScales[Math.floor(Math.random() * availableScales.length)];
};