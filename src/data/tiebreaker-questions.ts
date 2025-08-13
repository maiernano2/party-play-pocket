export const tiebreakerQuestions = [
  {
    question: "Wie viel ist Apple Inc. wert? (in Billionen USD)",
    answer: "ca. 3 Billionen"
  },
  {
    question: "Wie viele Einwohner hat Berlin?",
    answer: "ca. 3,7 Millionen"
  },
  {
    question: "Wie weit ist die Sonne von der Erde entfernt? (in Millionen km)",
    answer: "ca. 150 Millionen km"
  },
  {
    question: "Wie viele YouTube-Videos werden pro Minute hochgeladen?",
    answer: "ca. 500 Stunden"
  },
  {
    question: "Wie hoch ist der Mount Everest? (in Metern)",
    answer: "8.849 Meter"
  },
  {
    question: "Wie viele Herzschläge hat ein Mensch pro Tag?",
    answer: "ca. 100.000"
  },
  {
    question: "Wie viele Apps gibt es im Google Play Store?",
    answer: "ca. 3,5 Millionen"
  },
  {
    question: "Wie schnell dreht sich die Erde? (km/h am Äquator)",
    answer: "ca. 1.670 km/h"
  },
  {
    question: "Wie viele Knochen hat ein erwachsener Mensch?",
    answer: "206 Knochen"
  },
  {
    question: "Wie tief ist der Marianengraben? (in Metern)",
    answer: "ca. 11.000 Meter"
  },
  {
    question: "Wie viele Pizzen werden täglich in Deutschland gegessen?",
    answer: "ca. 3,2 Millionen"
  },
  {
    question: "Wie lang ist die Chinesische Mauer? (in km)",
    answer: "ca. 21.200 km"
  },
  {
    question: "Wie viele Liter Blut hat ein erwachsener Mensch?",
    answer: "ca. 5-6 Liter"
  },
  {
    question: "Wie viele Tonnen wiegt der Eiffelturm?",
    answer: "ca. 10.000 Tonnen"
  },
  {
    question: "Wie viele Sprachen gibt es auf der Welt?",
    answer: "ca. 7.000"
  }
];

export const getRandomTiebreakerQuestion = () => {
  return tiebreakerQuestions[Math.floor(Math.random() * tiebreakerQuestions.length)];
};