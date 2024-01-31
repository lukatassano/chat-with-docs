import { Message } from "ai";

export function getChatHistory(messages: Message[]): string {
  return messages
    .slice(0, -1)
    .map(message => message.content)
    .join("\n");
}

export function getQuestion(messages: Message[]) {
  const question = messages.at(-1)?.content;
  return question || "";
}
