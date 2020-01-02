import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';

@Controller('tasks')
export class TasksController {
  // Dependency injection in NestJS is done within a class' constructor
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return await this.tasksService.getAllTasks();
  }

  @Post()
  async createTask(
    // @Body decorator gets entire request body
    // You can extract specific keys from the body by passing them in as args
    @Body('title') title: string,
    @Body('description') description: string,
  ): Promise<Task> {
    return await this.tasksService.createTask(title, description);
  }
}
