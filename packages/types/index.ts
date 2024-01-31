import { Message } from "ai";

export type DocumentType = {
  payload: string;
  metadata: Record<string, any>;
};

export type ChatBody = {
  prompt: string;
  temperature: number;
  similarity: number;
  messages: Message[];
};
