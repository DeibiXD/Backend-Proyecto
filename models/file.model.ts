import mongoose from "mongoose";

export interface file{
    _id?: mongoose.Types.ObjectId;
    mode: number;
    code: string;
    name: string;
}

