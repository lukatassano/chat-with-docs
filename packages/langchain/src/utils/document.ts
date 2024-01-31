import { Document } from "langchain/document";
import { ScoreThresholdRetriever } from "langchain/retrievers/score_threshold";
import { formatDocumentsAsString } from "langchain/util/document";
import { QdrantVectorStore } from "langchain/vectorstores/qdrant";

export function getSources(docs: Document<Record<string, any>>[]) {
  return (
    docs?.map((doc: any) => {
      return {
        id: doc.metadata.id,
        title: doc.metadata.title,
        url: doc.metadata.url,
      };
    }) || []
  );
}

export async function getContext(
  vectorStore: QdrantVectorStore,
  minSimilarityScore: number,
  question: string,
) {
  const retriever = ScoreThresholdRetriever.fromVectorStore(vectorStore, {
    minSimilarityScore,
  });

  const docs = await retriever.getRelevantDocuments(question);
  const serialized = formatDocumentsAsString(docs);

  return { docs, serialized };
}
