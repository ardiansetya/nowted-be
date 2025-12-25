import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { auth } from "./lib/auth";
import { folder } from "./routes/folder";
import { notes } from "./routes/notes";

const app = new Hono();

app.use(logger());

app.use(
  cors({
    origin: "http://localhost:3001",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    credentials: true,
  })
);

app
  .on(
    ["POST", "GET"],
    "/api/auth/*",
    (c) => auth.handler(c.req.raw)
  )
  .route("/api/notes", notes)
  .route("/api/folder", folder)
  .get("/", (c) => {
    return c.text("Hello Hono!");
  });

export default app;
