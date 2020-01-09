import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';

// Tells TypeORM, this repository is for Tasks
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}
