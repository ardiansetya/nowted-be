import {  NewNote } from "@/types/note";

import { desc, eq } from "drizzle-orm";
import { db } from "./db";
import { folders, notes } from "./schema";
import { NewFolder } from "@/types/folder";

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

export const deleteNoteById = async (noteId: string) => {
  await db.delete(notes).where(eq(notes.id, noteId));
};

// folders
export const insertFolder = async (folder: NewFolder) => {
  const [insertedFolder] = await db.insert(folders).values(folder).returning();
  return insertedFolder;
};

export const getFoldersByUserId = async (userId: string) => {
  const foldersList = await db
    .select()
    .from(folders)
    .where(eq(folders.userId, userId))
    .orderBy(desc(folders.createdAt));
  return foldersList;
};

export const getFolderById = async (folderId: string) => {
  const [folder] = await db
    .select()
    .from(folders)
    .where(eq(folders.id, folderId))
    .limit(1);
  return folder;
};

export const deleteFolderById = async (folderId: string) => {
  await db.delete(folders).where(eq(folders.id, folderId));
};
