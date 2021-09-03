import { getCustomRepository } from "typeorm"
import { Tasks } from "../entity/Tasks"
import { TaskRepository } from "../repository/TaskRepository"

export interface ITaskRequest {
    title: string,
    description: string
}

class TaskService {
    async getAllTasks() {
        const taskRepository = getCustomRepository(TaskRepository)

        const tasks = await taskRepository.find()

        if (!tasks) throw new Error("Ops! tasks vazias!")

        return tasks

    }

    async getTaskById(id: string) {
        const taskRepository = getCustomRepository(TaskRepository)

        const task = await taskRepository.findOne(id)

        if (!task) throw new Error("Tasks não encotrada!")

        return task
    }

    async postTask({ title, description }: ITaskRequest) {
        const taskRepository = getCustomRepository(TaskRepository)

        if (!title && !description) throw new Error("Preencha os campos!")

        const taskExist = await taskRepository.findOne({ title })

        if (taskExist) throw new Error("Task already exist!")

        const newTask = taskRepository.create({
            title,
            description
        })

        await taskRepository.save(newTask)

        return newTask
    }

    async patchStateOfTask(id: string) {
        const taskRepository = getCustomRepository(TaskRepository)

        const recuperarTask = await taskRepository.findOne(id)

        if (!recuperarTask) throw new Error("Tasks não encotrada!")

        const task = await taskRepository.createQueryBuilder()
            .update(Tasks).set({ finished: !recuperarTask.finished })
            .where("id = :id", { id })
            .execute();

        if (task.affected === 1) return await taskRepository.findOne(id)
    }

    async updateTaks(id: string, { title, description }: ITaskRequest) {
        const taskRepository = getCustomRepository(TaskRepository)

        const recuperarTask = await taskRepository.findOne(id)

        if (!recuperarTask) throw new Error("Tasks não encotrada!")

        const task = await taskRepository.createQueryBuilder()
            .update(Tasks).set({
                ...recuperarTask,
                title: !title ? recuperarTask.title : title,
                description: !description ? recuperarTask.description : description
            })
            .where("id = :id", { id })
            .execute();

        if (task.affected === 1) return await taskRepository.findOne(id)
    }

    async deleteTask(id: string) {
        const taskRepository = getCustomRepository(TaskRepository)

        const task = await taskRepository.findOne(id)

        if (!task) throw new Error("Tasks não encotrada!")

        const deleted = await taskRepository.delete(id)

        if (deleted.affected === 1) return "task deleted"
    }
}

export { TaskService }