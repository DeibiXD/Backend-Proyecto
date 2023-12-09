"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    tier: Number,
    snippets: (Array),
    folders: (Array)
});
exports.userSchema = mongoose_1.default.model('user', schema);
