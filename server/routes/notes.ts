import { authMiddleware } from "@/middlewares/authMiddleware";
import {
  deleteNoteById,
  getNotesByUserId,
  insertNote,
  updateNoteById,
} from "@/repository/note.repository";
import { HonoEnv } from "@/types/hono";
import { createNoteValidator } from "@/validators/createNoteValidator";
import { updateNoteValidator } from "@/validators/updateNoteValidator";
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

notes.patch("/:id", updateNoteValidator, async (c) => {
  const id = c.req.param("id");
  const updateNoteData = await c.req.json();

  try {
    const updatedNote = await updateNoteById(
      id,
      updateNoteData.title,
      updateNoteData.content,
      updateNoteData.folderId
    );
    return c.json(updatedNote, 200);
  } catch (error) {
    console.error("Error updating note:", error);
    return c.json({ error: "Failed to update note" }, 500);
  }
});

notes.delete("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    await deleteNoteById(id);
    return c.json({ message: "Note deleted successfully" }, 200);
  } catch (error) {
    console.error("Error deleting note:", error);
    return c.json({ error: "Failed to delete note" }, 500);
  }
});
