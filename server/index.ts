import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { authRoute } from "./routes/auth";
import { folder } from "./routes/folder";
import { notes } from "./routes/notes";

const app = new Hono()
  .use( '*', logger())
  .use(
    cors({
      origin: "http://localhost:3001",
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      credentials: true,
    })
  )
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .route("/api/auth", authRoute)
  .route("/api/notes", notes)
  .route("/api/folder", folder)
  

export type AppType = typeof app;
export default app;
