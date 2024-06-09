import { Body, Controller, Delete, Get, HttpCode, Patch, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, ToggleTaskDto } from './dto';
import { DeleteTaskDto } from './dto/delete-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(201)
  async createTask(@Body() body: CreateTaskDto) {
    const task = await this.taskService.createTask(body)

    return 
  }

  @Get()
  @HttpCode(200)
  async getTasksByColumnId(@Query('columnId') columnId: string) {
    const tasks = await this.taskService.getTasksByColumnId({columnId: parseInt(columnId)})

    return tasks
  }

  @Patch()
  @HttpCode(200)
  async toggleTask(@Body() body: ToggleTaskDto) {
    const task = await this.taskService.toggleTask(body)

    return
  }

  @Delete()
  @HttpCode(200)
  async deleteTask(@Body() body: DeleteTaskDto) {
    const task = await this.taskService.deleteTask(body)
    
    return 
  }
}
