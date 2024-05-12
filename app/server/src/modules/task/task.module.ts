import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './task.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    SequelizeModule.forFeature([Task])
  ]
})
export class TaskModule {}
