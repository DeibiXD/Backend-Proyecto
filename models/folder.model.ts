import mongoose from "mongoose";

export interface folder{
    _id?: mongoose.Types.ObjectId;
    folderName: string;
    snippets: Array<mongoose.Types.ObjectId | string>;
    owner: string;
}