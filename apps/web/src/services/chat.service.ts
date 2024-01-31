import { useAIApi } from "@ui/api/ai.api";
import { AxiosResponse } from "axios";

export type Metadata = {
  id: number;
  messageId: string;
  title: string;
  url: string;
};

export function useChatService() {
  const api = useAIApi();

  function getMetadata(question: string): Promise<AxiosResponse<Metadata[]>> {
    return api.post("chat/metadata", { question });
  }

  return {
    getMetadata,
  };
}
