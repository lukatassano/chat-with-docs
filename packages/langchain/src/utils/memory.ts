import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { AIMessage, HumanMessage } from "langchain/schema";

export function createMemoryBuffer(history: (HumanMessage | AIMessage)[]) {
  return new BufferMemory({
    chatHistory: new ChatMessageHistory(history),
    memoryKey: "chat_history",
    inputKey: "question",
    outputKey: "text",
    returnMessages: true,
  });
}
