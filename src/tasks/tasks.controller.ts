import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  // Dependency injection in NestJS is done within a class' constructor
  constructor(private tasksService: TasksService) {}

  // @Get()
  // async getTasks(
  //   @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  // ): Promise<Task[]> {
  //   // If there are filters applied
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   }

  //   // Return all tasks if no filters pplied
  //   return this.tasksService.getAllTasks();
  // }

  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // async createTask(
  //   // @Body decorator gets entire request body
  //   @Body() createTaskDto: CreateTaskDto,
  // ): Promise<Task> {
  //   return await this.tasksService.createTask(createTaskDto);
  // }

  // @Delete('/:id')
  // async deleteTaskById(@Param('id') id: string): Promise<Task> {
  //   return this.tasksService.deleteTaskById(id);
  // }

  // @Patch('/:id/status')
  // async updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): Promise<Task> {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
