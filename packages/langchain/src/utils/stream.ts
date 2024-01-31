import { LangChainStream, StreamingTextResponse } from "ai";
import { Document } from "langchain/document";
import { RunnableSequence } from "langchain/schema/runnable";

import { getSources } from "./document";

export function createStream({
  chain,
  question,
  chatHistory,
  docs,
}: {
  chain: RunnableSequence;
  question?: string;
  chatHistory: string;
  docs: Document<Record<string, any>>[];
}) {
  const { stream, handlers, writer } = LangChainStream();
  const sources: any[] = getSources(docs);

  const tokens =
    sources.length > 0 ? `${JSON.stringify(sources)}-==-` : "[]-==-";
  writer.write(tokens);

  chain.invoke({ chatHistory, question }, { callbacks: [handlers] });
  return new StreamingTextResponse(stream);
}
