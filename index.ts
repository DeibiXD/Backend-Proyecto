import express from 'express';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Database } from './utils/database';
import routerSnippets from './routers/file.router';
import routerUsers from './routers/user.router';
import routerFolders from './routers/folder.router';

dotenv.config();
const db: Database = new Database(); // Connects to the database
const app = express();
const port: string | undefined = process.env.PORT;

app.use(express.json());
app.use('/user', routerUsers);
app.use('/file', routerSnippets);
app.use('/folder', routerFolders)

app.get('/', (request: Request, response: Response) => {
    response.send('Backend projecto');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

//Me estan ignorando guey
