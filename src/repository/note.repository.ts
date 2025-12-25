import { db } from "@/db/db";
import { notes } from "@/db/schema";
import { NewNote } from "@/types/note";

import { desc, eq } from "drizzle-orm";

export const getNotesByUserId = async (userId: string) => {
  const notesList = await db
    .select()
    .from(notes)
    .where(eq(notes.userId, userId))
    .orderBy(desc(notes.createdAt));
  return notesList;
};

export const insertNote = async (note: NewNote) => {
  const [insertedNote] = await db.insert(notes).values(note).returning();
  return insertedNote;
};

export const getNoteById = async (noteId: string) => {
  const [note] = await db
    .select()
    .from(notes)
    .where(eq(notes.id, noteId))
    .limit(1);
  return note;
};

export const updateNoteById = async (
  noteId: string,
  title: string,
  content: string,
  folderId: string
) => {
  const [updatedNote] = await db
    .update(notes)
    .set({ title, content, folderId })
    .where(eq(notes.id, noteId))
    .returning();
  return updatedNote;
};

export const deleteNoteById = async (noteId: string) => {
  await db.delete(notes).where(eq(notes.id, noteId));
};

// folders
