import mongoose from "mongoose";

export interface user {
    _id?: mongoose.Types.ObjectId;
    username: string;
    password: string;
    tier: number;
    snippets: Array<mongoose.Types.ObjectId>;
    folders: Array<mongoose.Types.ObjectId>;
}