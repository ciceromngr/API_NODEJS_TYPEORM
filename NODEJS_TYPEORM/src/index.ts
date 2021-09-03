import "reflect-metadata";
import "express-async-errors"
import {createConnection} from "typeorm";
import * as express from "express";
import { routes } from './routes'


createConnection()

const app = express()

app.use(express.json())
app.use(routes)

app.use((err: Error, req: express.Request, resp: express.Response, next: express.NextFunction) => {
    if(err instanceof Error) return resp.status(400).json({ error: err.message})

    return resp.status(500).json({ message: "Internal Server Error!" })
})

app.listen(3333, () => console.log('Server is Running'))