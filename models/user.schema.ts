import mongoose from "mongoose";
import { user } from "./user.model";

const schema= new mongoose.Schema<user>({
    username: String,
    password: String,
    tier: Number,
    snippets: Array<mongoose.Types.ObjectId>,
    folders: Array<mongoose.Types.ObjectId>
})

export const userSchema =mongoose.model('user',schema)