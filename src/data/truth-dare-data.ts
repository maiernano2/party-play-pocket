export interface TruthDareItem {
  text: string;
  intensity: 'zahm' | 'mittel' | 'wild';
}

export const truthQuestions: TruthDareItem[] = [
  // Zahm
  { text: "Was war dein peinlichster Moment in der Schule?", intensity: "zahm" },
  { text: "Wer war dein erster Schwarm?", intensity: "zahm" },
  { text: "Was ist das Seltsamste, was du jemals gegessen hast?", intensity: "zahm" },
  { text: "Welche Lüge erzählst du am häufigsten?", intensity: "zahm" },
  { text: "Was war das Dümmste, was du als Kind gemacht hast?", intensity: "zahm" },
  { text: "Über welche deiner Eigenschaften bist du am meisten verlegen?", intensity: "zahm" },
  { text: "Welche Angewohnheit hast du, die andere nervig finden könnten?", intensity: "zahm" },
  { text: "Was ist das Merkwürdigste, was du sammelnst oder gesammelt hast?", intensity: "zahm" },
  
  // Mittel
  { text: "Was ist das Peinlichste, was deine Eltern über dich wissen?", intensity: "mittel" },
  { text: "Hast du schon mal in der Öffentlichkeit weinen müssen? Warum?", intensity: "mittel" },
  { text: "Was ist deine größte Angst in einer Beziehung?", intensity: "mittel" },
  { text: "Hast du schon mal etwas gestohlen? Was?", intensity: "mittel" },
  { text: "Welches Geheimnis hast du vor deinen besten Freunden?", intensity: "mittel" },
  { text: "Wann hast du das letzte Mal richtig gelogen und warum?", intensity: "mittel" },
  { text: "Was war dein größter Vertrauensbruch?", intensity: "mittel" },
  { text: "Bei wem hier im Raum warst du schon mal richtig eifersüchtig?", intensity: "mittel" },
  
  // Wild
  { text: "Was ist das Verrückteste, was du für Liebe getan hast?", intensity: "wild" },
  { text: "Hast du schon mal jemanden betrogen? Erzähl die Geschichte.", intensity: "wild" },
  { text: "Was ist dein peinlichstes Erlebnis beim Dating?", intensity: "wild" },
  { text: "Welche Person hier würdest du küssen, wenn du müsstest?", intensity: "wild" },
  { text: "Was ist das Wildeste, was du nachts um 3 Uhr gemacht hast?", intensity: "wild" },
  { text: "Hast du schon mal von jemandem hier im Raum geträumt? Von wem und was?", intensity: "wild" },
  { text: "Was ist dein größtes sexuelles Missgeschick?", intensity: "wild" },
  { text: "Welches dunkle Geheimnis würdest du mit ins Grab nehmen?", intensity: "wild" },
];

export const dareActions: TruthDareItem[] = [
  // Zahm
  { text: "Sing ein Kinderlied vor allen.", intensity: "zahm" },
  { text: "Mach 20 Liegestütze.", intensity: "zahm" },
  { text: "Rede 2 Minuten nur in Reimen.", intensity: "zahm" },
  { text: "Tanze 1 Minute ohne Musik.", intensity: "zahm" },
  { text: "Imitiere ein Tier deiner Wahl für 30 Sekunden.", intensity: "zahm" },
  { text: "Erzähle einen schlechten Witz.", intensity: "zahm" },
  { text: "Mach ein Selfie mit einem witzigen Gesichtsausdruck.", intensity: "zahm" },
  { text: "Sprich mit einem lustigen Akzent für die nächsten 3 Runden.", intensity: "zahm" },
  
  // Mittel
  { text: "Sag allen hier, was du an ihnen schätzt.", intensity: "mittel" },
  { text: "Schick eine süße Nachricht an jemanden aus deinen Kontakten.", intensity: "mittel" },
  { text: "Lass jemanden 30 Sekunden durch dein Handy scrollen.", intensity: "mittel" },
  { text: "Mach ein lustiges Foto von dir und zeig es der Gruppe.", intensity: "mittel" },
  { text: "Erzähle der Gruppe dein peinlichstes Erlebnis als Rap.", intensity: "mittel" },
  { text: "Lass dir die Augen verbinden und errate wer dich berührt.", intensity: "mittel" },
  { text: "Küsse jemanden auf die Wange (Person deiner Wahl).", intensity: "mittel" },
  { text: "Trinke etwas ohne deine Hände zu benutzen.", intensity: "mittel" },
  
  // Wild
  { text: "Gib jemandem hier eine 1-minütige Massage.", intensity: "wild" },
  { text: "Küsse die Person links von dir auf den Mund.", intensity: "wild" },
  { text: "Zeig allen deinen Browser-Verlauf der letzten 3 Tage.", intensity: "wild" },
  { text: "Lass jemanden ein peinliches Foto von dir machen und posten.", intensity: "wild" },
  { text: "Tausche für den Rest des Spiels die Kleidung mit jemandem.", intensity: "wild" },
  { text: "Erzähle dein größtes Geheimnis.", intensity: "wild" },
  { text: "Mach einen Lap Dance für 30 Sekunden (Person deiner Wahl).", intensity: "wild" },
  { text: "Küsse die attraktivste Person im Raum.", intensity: "wild" },
];

export const getRandomTruth = (intensity: 'zahm' | 'mittel' | 'wild', usedTasks: Set<string> = new Set()): string | null => {
  const filtered = truthQuestions.filter(q => q.intensity === intensity && !usedTasks.has(q.text));
  if (filtered.length === 0) return null;
  return filtered[Math.floor(Math.random() * filtered.length)].text;
};

export const getRandomDare = (intensity: 'zahm' | 'mittel' | 'wild', usedTasks: Set<string> = new Set()): string | null => {
  const filtered = dareActions.filter(d => d.intensity === intensity && !usedTasks.has(d.text));
  if (filtered.length === 0) return null;
  return filtered[Math.floor(Math.random() * filtered.length)].text;
};