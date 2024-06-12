import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';

import { ColumnService } from './column.service';
import { CreateColumnDto, DeleteColumnDto } from './dto';
import { TaskService } from 'modules/task/task.service';


@Controller('columns')
export class ColumnController {
  constructor(
    private readonly columnService: ColumnService,
    private readonly taskService: TaskService
  ) {}

  @Get()
  async getColumns(@Query('projectId') projectId: string) {
    const columns = await this.columnService.getColumns({projectId: parseInt(projectId)})

    return columns
  }

  @Post()
  async createColumn(@Body() body: CreateColumnDto) {
    const column = await this.columnService.createColumn(body)

    return
  }

  @Delete()
  async deleteColumn(@Body() body: DeleteColumnDto) {
    const column = await this.columnService.deleteColumn(body)

    return
  }
}
