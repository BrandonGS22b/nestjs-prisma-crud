import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  // Implement CRUD operations here
  @Get()
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }
  @Get(':id')
  async getTasksById(@Param('id') id: number) {
    const taskFound = await this.taskService.getTasksById(id);
    if (!taskFound) throw new NotFoundException('Task not exist');
    return taskFound;
  }
  @Post()
  async createTasks(@Body() data: Task) {
    return this.taskService.createTasks(data);
  }
  @Put(':id')
  async updateTasks(@Param('id') id: string, @Body() data: Task) {
    return this.taskService.updateTasks(Number(id), data);
  }
  @Delete(':id')
  async deleteTasks(@Param('id') id: string) {
    try {
      return await this.taskService.deleteTasks(Number(id));
    } catch (error) {
      throw new NotFoundException('Task not exist o no existe');
    }
  }
}
