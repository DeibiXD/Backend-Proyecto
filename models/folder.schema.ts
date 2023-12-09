import mongoose from "mongoose";
import { folder } from "./folder.model";

const schema= new mongoose.Schema<folder>({
    folderName: String,
    snippets: Array<mongoose.Types.ObjectId>,
    owner: String
})

export const folderSchema =mongoose.model('folders',schema)