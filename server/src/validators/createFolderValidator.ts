import { zValidator } from "@hono/zod-validator";
import z from "zod";

export const createFolderSchema = z
  .object({
    name: z
      .string()
      .min(1, "Folder name is required")
      .max(255, "Folder name is too long"),
  })
  .strict();

export const createFolderValidator = zValidator(
  "json",
  createFolderSchema,
  (result, c) => {
    if (!result.success) {
      return c.json(
        { error: result.error.issues.map((issue) => issue.message) },
        400
      );
    }
  }
);
