import { PromptTemplate } from "langchain/prompts";

export function getTemplate(prompt: string) {
  return PromptTemplate.fromTemplate(
    `${prompt}.
    ----------------
    CONTEXT: {context}
    ----------------
    CHAT HISTORY: {chatHistory}
    ----------------
    QUESTION: {question}
    ----------------
    Answer:`,
  );
}
