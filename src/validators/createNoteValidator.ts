import { zValidator } from "@hono/zod-validator";
import z from "zod";

export const createNoteSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(255, "Title is too long"),
    content: z.string().optional(),
    folderId: z.string().optional(),
  })
  .strict();

export const createNoteValidator = zValidator(
  "json",
  createNoteSchema,
  (result, c) => {
    if (!result.success) {
      return c.json(
        { error: result.error.issues.map((issue) => issue.message) },
        400
      );
    }
  }
);
