import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';

import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';

import { Project } from './project.model';
import { SessionModule } from 'modules/session/session.module';
import { ColumnModule } from 'modules/column/column.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [
    SequelizeModule.forFeature([Project]),
    
    SessionModule,
    ColumnModule
  ],
})
export class ProjectModule {}
