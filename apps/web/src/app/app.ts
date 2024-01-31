import { Hono } from "hono";
import { cors } from "hono/cors";

import { chatController } from "./controller/chat";
import { documentController } from "./controller/document";

export const app = new Hono().basePath("/api");

app.use("*", cors({ origin: "*" }));
app.notFound(c => c.json({ error: "Not Found" }, 404));
app.route("/", chatController).route("/", documentController);
