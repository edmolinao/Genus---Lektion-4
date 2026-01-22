
import { GoogleGenAI, Type } from "@google/genai";
import { Noun, Gender } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const IMAGE_NOUNS: Noun[] = [
  { word: "Bett", gender: "das", translation: "Cama", category: "Möbel" },
  { word: "Bild", gender: "das", translation: "Cuadro", category: "Dekoration" },
  { word: "Stuhl", gender: "der", translation: "Silla", category: "Möbel" },
  { word: "Lampe", gender: "die", translation: "Lámpara", category: "Möbel" },
  { word: "Sessel", gender: "der", translation: "Sillón", category: "Möbel" },
  { word: "Sofa", gender: "das", translation: "Sofá", category: "Möbel" },
  { word: "Tisch", gender: "der", translation: "Mesa", category: "Möbel" },
  { word: "Schrank", gender: "der", translation: "Armario", category: "Möbel" },
  { word: "Teppich", gender: "der", translation: "Alfombra", category: "Dekoration" },
  { word: "Regal", gender: "das", translation: "Estantería", category: "Möbel" }
];

export async function fetchNouns(): Promise<Noun[]> {
  // Returns the static list from the images provided
  return IMAGE_NOUNS;
}

export async function getGenderExplanation(word: string, gender: Gender): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Erkläre kurz auf Deutsch, warum das Wort "${word}" den Artikel "${gender}" hat. Gibt es eine grammatikalische Regel oder eine semantische Gruppe? Antworte mit Humor und sei lehrreich.`,
  });

  return response.text || "Es gibt keine spezifische Regel, man muss es auswendig lernen!";
}
