import { notes } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";



export type Note = InferSelectModel<typeof notes>;
export type NewNote = InferInsertModel<typeof notes>;
