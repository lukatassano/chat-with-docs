import { ChatBody } from "@chat-with-docs/types";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { StringOutputParser } from "langchain/schema/output_parser";
import { RunnableSequence } from "langchain/schema/runnable";
import { QdrantVectorStore } from "langchain/vectorstores/qdrant";

import { env } from "../env";
import { getContext } from "../utils/document";
import { createChatLLM } from "../utils/llm";
import { getChatHistory, getQuestion } from "../utils/message";
import { convertToDecimal } from "../utils/parameter";
import { createStream } from "../utils/stream";
import { getTemplate } from "../utils/template";

export function getChatService() {
  const vectorStore = new QdrantVectorStore(new OpenAIEmbeddings(), {
    collectionName: env.COLLECTION,
    url: env.VECTOR_DB_URL,
  });

  async function reply({
    prompt,
    temperature,
    similarity,
    messages,
  }: ChatBody) {
    const [convertedTemperature, convertedSimilarity] = [
      convertToDecimal(temperature),
      convertToDecimal(similarity),
    ];

    const llm = createChatLLM(convertedTemperature);
    const chatHistory = getChatHistory(messages);
    const question = getQuestion(messages);
    const questionPrompt = getTemplate(prompt);
    const { docs, serialized } = await getContext(
      vectorStore,
      convertedSimilarity,
      question,
    );

    const chain = RunnableSequence.from([
      {
        question: () => question,
        chatHistory: () => chatHistory,
        context: () => serialized,
      },
      questionPrompt,
      llm,
      new StringOutputParser(),
    ]);

    return createStream({
      chain,
      chatHistory,
      question,
      docs,
    });
  }

  return {
    reply,
  };
}
