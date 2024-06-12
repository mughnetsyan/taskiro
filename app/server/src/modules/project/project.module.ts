import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';

import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';

import { Project } from './project.model';
import { SessionModule } from 'modules/session/session.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [
    SequelizeModule.forFeature([Project]),
    
    SessionModule
  ],
})
export class ProjectModule {}
