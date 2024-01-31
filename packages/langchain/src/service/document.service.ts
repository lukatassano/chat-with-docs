import { DocumentType } from "@chat-with-docs/types";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { QdrantVectorStore } from "langchain/vectorstores/qdrant";

import { env } from "../env";

export function getDocumentService() {
  const vectorStore = new QdrantVectorStore(new OpenAIEmbeddings(), {
    url: env.VECTOR_DB_URL,
    collectionName: env.COLLECTION,
  });

  async function save({ payload, metadata }: DocumentType) {
    const doc = {
      pageContent: payload,
      metadata,
    };

    const splitter = new CharacterTextSplitter({
      separator: "\n",
      chunkSize: 400,
      chunkOverlap: 10,
    });

    if (metadata.id) await remove(metadata.id);

    const splittedDocs = await splitter.splitDocuments([doc]);
    return vectorStore.addDocuments(splittedDocs);
  }

  function remove(id: number | string) {
    return vectorStore.client.delete(vectorStore.collectionName, {
      filter: {
        must: [
          {
            key: "metadata.id",
            match: {
              value: id,
            },
          },
        ],
      },
    });
  }

  return {
    save,
    remove,
  };
}
