import { authMiddleware } from "@/middlewares/authMiddleware";
import { getFoldersByUserId, insertFolder } from "@/repository/folder.repository";
import { HonoEnv } from "@/types/hono";
import { createFolderValidator } from "@/validators/createFolderValidator";
import { Hono } from "hono";

export const folder = new Hono<HonoEnv>();

folder.use(authMiddleware);

folder.get("/", async (c) => {
  const user = c.get("user");

  try {
    const folderList = await getFoldersByUserId(user?.id!);
    return c.json(folderList, 200);
  } catch (error) {
    console.error("Error fetching folder:", error);
    return c.json({ error: "Failed to fetch folder" }, 500);
  }
});

folder.post("/", createFolderValidator, async (c) => {
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
});
