import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import {
  NotFoundException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

// Tells TypeORM, this repository is for Tasks
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger();

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    // Get all tasks from this user ID
    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    try {
      const tasks = query.getMany();
      return tasks;
    } catch (err) {
      this.logger.error(
        `Failde to get tasks for user "${
          user.username
        }", Filters: ${JSON.stringify(filterDto)}`,
        err.stack,
      );
      // Since we're catching here, NestJS doesn't catch it and return a 500
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    try {
      await task.save();
    } catch (err) {
      this.logger.error(
        `Failed to create a task for user ${
          user.username
        }. Data: ${(JSON.stringify(createTaskDto), err.stack)}`,
      );
      throw new InternalServerErrorException();
    }

    // Delete user object from response
    delete task.user;

    return task;
  }
}
