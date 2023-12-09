import mongoose, { mongo } from "mongoose";
import { file } from "./file.model";

const schema= new mongoose.Schema<file>({
    mode: Number,
    code: String,
    name: String
});

export const fileSchema= mongoose.model('file', schema)