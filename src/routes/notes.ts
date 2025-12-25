import { getNotesByUserId, insertNote } from "@/db/queries";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { HonoEnv } from "@/types/hono";
import { createNoteValidator } from "@/validators/createNoteValidator";
import { Hono } from "hono";

export const notes = new Hono<HonoEnv>();

notes.use(authMiddleware);

notes.get("/", async (c) => {
  const user = c.get("user");

  try {
    const notesList = await getNotesByUserId(user?.id!);
    return c.json(notesList, 200);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return c.json({ error: "Failed to fetch notes" }, 500);
  }
});

notes.post("/", createNoteValidator, async (c) => {
  const user = c.get("user");

  const newNoteData = await c.req.json();

  try {
    const insertedNote = await insertNote({
      ...newNoteData,
      userId: user?.id!,
    });
    return c.json(insertedNote, 201);
  } catch (error) {
    console.error("Error creating note:", error);
    return c.json({ error: "Failed to create note" }, 500);
  }
});
