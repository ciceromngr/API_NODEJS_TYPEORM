import { Router } from 'express'
import { TaskController } from './controller/TaskController'

const routes = Router()
const taskController = new TaskController()

routes.get("/tasks", taskController.getAllTasks)
routes.get("/tasks/:id", taskController.getTaskById)
routes.patch("/tasks/fineshed/:id", taskController.patchStateOfTask)
routes.post("/tasks", taskController.postTask)
routes.put("/tasks/:id", taskController.updateTaks)
routes.delete("/tasks/:id", taskController.deleteTask)

export {routes}