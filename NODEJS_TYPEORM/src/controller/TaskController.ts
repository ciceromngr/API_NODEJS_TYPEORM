import { Request, Response } from "express";
import { TaskService } from "../service/TaskService";


class TaskController {
    async getAllTasks(request: Request, response: Response) {
        const taskService = new TaskService()

        const task = await taskService.getAllTasks()

        return response.json({
            message: "All Tasks",
            obj: task
        })
    }


    async getTaskById(request: Request, response: Response) {
        const taskService = new TaskService()
        const { id } = request.params
        const task = await taskService.getTaskById(id)

        return response.json(task)
    }

    async postTask(request: Request, response: Response) {
        const { title, description } = request.body
        const taskService = new TaskService()

        const newTask = await taskService.postTask({ title, description })

        return response.json({
            message: "Tasks adicionada",
            obj: newTask
        })
    }

    async patchStateOfTask(request: Request, response: Response) {
        const taskService = new TaskService()
        const { id } = request.params

        const newTask = await taskService.patchStateOfTask(id)

        return response.json(newTask)
    }

    async updateTaks(request: Request, response: Response) {
        const taskService = new TaskService()
        const { id } = request.params
        const { title, description } = request.body
        const task = await taskService.updateTaks(id, {title, description})

        return response.json(task)
    }

    async deleteTask(request: Request, response: Response) {
        const taskService = new TaskService()
        const { id } = request.params

        const task = await taskService.deleteTask(id)

        return response.json({
            message: task
        })
    }
}

export { TaskController }