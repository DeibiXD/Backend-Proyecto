import express from 'express';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Database } from './utils/database';

dotenv.config();
const db: Database = new Database(); // Connects to the database
const app = express();
const port: string | undefined = process.env.PORT;

app.use(express.json());

app.get('/', (request: Request, response: Response) => {
    response.send('Backend pinterest');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

//Me estan ignorando guey
