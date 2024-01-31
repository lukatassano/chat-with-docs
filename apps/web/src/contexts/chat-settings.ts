import { atomWithStorage } from "jotai/utils";

export const promptAtom = atomWithStorage(
  "prompt",
  `
Você responde perguntas sobre módulos de um software chamado Syonet CRM.
Use o conteúdo dos documentos abaixo para responder a pergunta do usuário.
Se a resposta não for encontrada nos documentos, responda que você não sabe,
não tente inventar uma resposta.`,
);
export const temperatureAtom = atomWithStorage("temperature", 20);
export const similarityAtom = atomWithStorage("similarity", 80);
