"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./utils/database");
const file_router_1 = __importDefault(require("./routers/file.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const folder_router_1 = __importDefault(require("./routers/folder.router"));
dotenv_1.default.config();
const db = new database_1.Database(); // Connects to the database
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use('/user', user_router_1.default);
app.use('/file', file_router_1.default);
app.use('/folder', folder_router_1.default);
app.get('/', (request, response) => {
    response.send('Backend projecto');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//Me estan ignorando guey
