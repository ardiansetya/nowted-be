import { db } from "@/db/db";
import { folders } from "@/db/schema";
import { NewFolder } from "@/types/folder";
import { desc, eq } from "drizzle-orm";

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

export const updateFolderById = async (folderId: string, name: string) => {
  const [updatedFolder] = await db
    .update(folders)
    .set({ name })
    .where(eq(folders.id, folderId))
    .returning();
  return updatedFolder;
};

export const deleteFolderById = async (folderId: string) => {
  await db.delete(folders).where(eq(folders.id, folderId));
};
