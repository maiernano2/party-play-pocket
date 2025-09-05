export const imposterWords = [
  // Essen & Trinken
  "Pizza", "Spaghetti", "Burger", "Sushi", "Salat", "Kuchen", "Eis", "Kaffee", "Bier", "Wein",
  "Schokolade", "Nudeln", "Reis", "Brot", "Käse", "Fleisch", "Fisch", "Obst", "Gemüse", "Suppe",
  
  // Tiere
  "Hund", "Katze", "Elefant", "Löwe", "Pinguin", "Delfin", "Adler", "Spinne", "Bär", "Wolf",
  "Pferd", "Kuh", "Schwein", "Huhn", "Fisch", "Vogel", "Schlange", "Frosch", "Maus", "Hase",
  
  // Gegenstände
  "Handy", "Auto", "Fahrrad", "Buch", "Stuhl", "Tisch", "Lampe", "Computer", "Fernseher", "Uhr",
  "Schlüssel", "Brille", "Schuhe", "Hut", "Regenschirm", "Tasche", "Kamera", "Gitarre", "Ball", "Messer",
  
  // Orte
  "Strand", "Berg", "Wald", "Stadt", "Dorf", "Schule", "Krankenhaus", "Restaurant", "Kino", "Park",
  "Museum", "Bibliothek", "Supermarkt", "Bahnhof", "Flughafen", "Hotel", "Kirche", "Theater", "Zoo", "Café",
  
  // Berufe
  "Arzt", "Lehrer", "Polizist", "Feuerwehrmann", "Koch", "Pilot", "Anwalt", "Ingenieur", "Künstler", "Musiker",
  "Verkäufer", "Friseur", "Mechaniker", "Bauer", "Fischer", "Journalist", "Fotograf", "Designer", "Programmierer", "Kellner",
  
  // Aktivitäten
  "Schwimmen", "Laufen", "Tanzen", "Singen", "Malen", "Lesen", "Schreiben", "Kochen", "Schlafen", "Träumen",
  "Spielen", "Arbeiten", "Lernen", "Reisen", "Wandern", "Klettern", "Surfen", "Ski fahren", "Radfahren", "Fliegen",
  
  // Farben & Eigenschaften
  "Rot", "Blau", "Grün", "Gelb", "Schwarz", "Weiß", "Groß", "Klein", "Heiß", "Kalt",
  "Schnell", "Langsam", "Laut", "Leise", "Hell", "Dunkel", "Weich", "Hart", "Süß", "Sauer",
  
  // Natur & Wetter
  "Sonne", "Mond", "Stern", "Wolke", "Regen", "Schnee", "Wind", "Blitz", "Regenbogen", "Feuer",
  "Wasser", "Erde", "Luft", "Baum", "Blume", "Gras", "Stein", "Sand", "Eis", "Nebel",
];

export const getRandomWord = (usedWords: Set<string> = new Set()): string | null => {
  const availableWords = imposterWords.filter(word => !usedWords.has(word));
  if (availableWords.length === 0) return null;
  return availableWords[Math.floor(Math.random() * availableWords.length)];
};