import { BadRequestException, Controller, Delete, ForbiddenException, Get, HttpCode, Param, Post, Query, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { ProjectService } from './project.service';
import { SessionService } from 'modules/session/session.service';
import { ColumnService } from 'modules/column/column.service';
import { request } from 'http';


@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly columnService: ColumnService,
    private readonly sessionService: SessionService
  ) {}

  @Get()
  async getProjects(@Req() request: Request, @Query('limit') limit: string, @Query('offset') offset: string) {
    if(!limit) throw new BadRequestException()

    const { accessToken } = request.cookies

    const decodedAccessToken = await this.sessionService.verifyToken(accessToken)

    if(!decodedAccessToken) throw new UnauthorizedException()

    const { userId } = decodedAccessToken

    const { projects, count } = await this.projectService.getProjectsAndCount({userId, limit: parseInt(limit), offset: parseInt(offset)})
    
    return {
      projects,
      count
    }
  }

  @Get('/:id')
  async getProject(@Param('id') id: string) {
    const project = await this.projectService.getProject(parseInt(id))

    return project
  }

  @Post()
  async createNewProject(@Req() request: Request) {
    const { name, description } = request.body

    if(!name || !description) throw new BadRequestException()

    const { accessToken } = request.cookies

    const decodedAccessToken = await this.sessionService.verifyToken(accessToken)

    if(!decodedAccessToken) throw new UnauthorizedException()

    const { userId } = decodedAccessToken

    const project = await this.projectService.createProject({userId, name, description })
    const defaultColumn = await this.columnService.createColumn({projectId: project.id, name: 'Tasks'})

    return
  }

  @Delete('/:id')
  async deleteProject(@Req() request: Request, @Param('id') id: string) {
    if(!id) throw new BadRequestException()

    const { accessToken } = request.cookies

    const decodedAccessToken = await this.sessionService.verifyToken(accessToken)

    if(!decodedAccessToken) throw new UnauthorizedException()

    const { userId } = decodedAccessToken

    const project = await this.projectService.getProject(parseInt(id))

    if(project.userId !== userId) throw new ForbiddenException()

    project.destroy()

    return
  }
}

