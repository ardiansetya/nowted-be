import { Hono } from "hono";
import { auth } from "../lib/auth";

export const authRoute = new Hono().on(["GET", "POST"], "/*", (c) =>
  auth.handler(c.req.raw)
);
