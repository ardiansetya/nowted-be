import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { auth } from './lib/auth';
import { notes } from './routes/notes';

const app = new Hono()

app.use(logger());
app.use(cors());

app
.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))
.route('/api/notes', notes)
.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
