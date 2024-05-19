import { BadRequestException, Controller, Get, HttpCode, Param, Post, Query, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { SessionService } from 'modules/session';

import { ProjectService } from './project.service';


@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
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
  @HttpCode(200)
  async createNewProject(@Req() request: Request) {
    const { name, description } = request.body

    console.log(name, description)

    if(!name || !description) throw new BadRequestException()

    const { accessToken } = request.cookies

    const decodedAccessToken = await this.sessionService.verifyToken(accessToken)

    if(!decodedAccessToken) throw new UnauthorizedException()

    const { userId } = decodedAccessToken

    const project = await this.projectService.createProject({userId, name, description })

    return project
  }
}

