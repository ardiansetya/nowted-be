import { authMiddleware } from "@/middlewares/authMiddleware";
import {
  deleteFolderById,
  getFoldersByUserId,
  insertFolder,
  updateFolderById,
} from "@/repository/folder.repository";
import { HonoEnv } from "@/types/hono";
import { createFolderValidator } from "@/validators/createFolderValidator";
import { updateFolderValidator } from "@/validators/updateFolderValidator";
import { Hono } from "hono";

export const folder = new Hono<HonoEnv>()

  .use(authMiddleware)

  .get("/", async (c) => {
    const user = c.get("user");

    try {
      const folderList = await getFoldersByUserId(user?.id!);
      return c.json(folderList, 200);
    } catch (error) {
      console.error("Error fetching folder:", error);
      return c.json({ error: "Failed to fetch folder" }, 500);
    }
  })
  .post("/", createFolderValidator, async (c) => {
    const user = c.get("user");

    const newfolderData = await c.req.json();

    try {
      const insertedfolder = await insertFolder({
        ...newfolderData,
        userId: user?.id!,
      });
      return c.json(insertedfolder, 201);
    } catch (error) {
      console.error("Error creating folder:", error);
      return c.json({ error: "Failed to create folder" }, 500);
    }
  })
  .patch("/:id", updateFolderValidator, async (c) => {
    const id = c.req.param("id");

    try {
      const updateFolderData = await c.req.json();

      try {
        const updatedFolder = await updateFolderById(id, updateFolderData.name);
        return c.json(updatedFolder, 200);
      } catch (error) {
        console.error("Error updating folder:", error);
        return c.json({ error: "Failed to update folder" }, 500);
      }
    } catch (error) {}
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");

    try {
      await deleteFolderById(id);
      return c.json({ message: "Folder deleted successfully" }, 200);
    } catch (error) {
      console.error("Error deleting folder:", error);
      return c.json({ error: "Failed to delete folder" }, 500);
    }
  });
