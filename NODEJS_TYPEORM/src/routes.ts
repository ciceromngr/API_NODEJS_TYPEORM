import { Router } from 'express'

const routes = Router()

routes.get("/", (req, res) => {
    res.json({ text: "hello world" })
})

export {routes}