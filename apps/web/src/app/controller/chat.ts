import { getChatService } from "@chat-with-docs/langchain";
import { ChatBody } from "@chat-with-docs/types";
import { Hono } from "hono";

export const chatController = new Hono();
const chatService = getChatService();

chatController.post("/chat", async c => {
  const body = (await c.req.json()) as ChatBody;
  return chatService.reply(body);
});
