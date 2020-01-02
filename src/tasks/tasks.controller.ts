import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  // Dependency injection in NestJS is done within a class' constructor
  constructor(private tasksService: TasksService) {}
}
