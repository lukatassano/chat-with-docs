import { ChatOpenAI } from "langchain/chat_models/openai";

export function createLLM() {
  return new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
  });
}

export function createChatLLM(temperature: number) {
  return new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature,
    streaming: true,
  });
}
