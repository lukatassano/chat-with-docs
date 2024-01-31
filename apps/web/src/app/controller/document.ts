import { getDocumentService } from "@chat-with-docs/langchain";
import { DocumentType } from "@chat-with-docs/types";
import { Hono } from "hono";

export const documentController = new Hono();
const documentService = getDocumentService();

documentController.post("/document", async c => {
  const body = (await c.req.json()) as DocumentType;
  await documentService.save(body);

  return new Response(null, {
    status: 201,
  });
});

documentController.delete("/document/:id", async c => {
  const id = c.req.param("id");
  await documentService.remove(id);

  return new Response(null, {
    status: 200,
  });
});
