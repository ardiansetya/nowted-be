import { zValidator } from "@hono/zod-validator";
import z from "zod";

export const updateFolderSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  })
  .strict();

export const updateFolderValidator = zValidator(
  "json",
  updateFolderSchema,
  (result, c) => {
    if (!result.success) {
      return c.json(
        { error: result.error.issues.map((issue) => issue.message) },
        400
      );
    }
  }
);
