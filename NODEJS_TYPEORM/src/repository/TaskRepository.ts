import { EntityRepository, Repository } from 'typeorm'
import { Tasks } from '../entity/Tasks'

@EntityRepository(Tasks)
class TaskRepository extends Repository<Tasks>{ }

export { TaskRepository }