import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import { routes } from './routes'

createConnection()

const app = express()

app.use(express.json())
app.use(routes)

app.listen(3333, () => console.log('Server is Running'))