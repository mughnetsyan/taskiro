import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';

import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';

import { Column } from './column.model';
import { TaskModule } from 'modules/task/task.module';

@Module({
  controllers: [ColumnController],
  providers: [ColumnService],
  imports: [
    SequelizeModule.forFeature([Column]),

    TaskModule
  ],
})
export class ColumnModule {}
