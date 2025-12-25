import { folders } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Folder = InferSelectModel<typeof folders>;
export type NewFolder = InferInsertModel<typeof folders>;
