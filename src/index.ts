import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { auth } from './lib/auth';
import { notes } from './routes/notes';

const app = new Hono()

app.use(logger());

app
  .on(
    ["POST", "GET"],
    "/api/auth/*",
    cors({
      origin: "http://localhost:3001", // replace with your origin
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
    (c) => auth.handler(c.req.raw)
  )
  .route("/api/notes", notes)
  .get("/", (c) => {
    return c.text("Hello Hono!");
  });

export default app
