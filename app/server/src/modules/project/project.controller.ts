import { BadRequestException, Controller, Get, Query, Req, UnauthorizedException } from '@nestjs/common';
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

    const { projects, count } = await this.projectService.getProjectsAndCount(userId, parseInt(limit), parseInt(offset))

    const hasMore = count > parseInt(offset)

    return {
      projects,
      hasMore
    }
  }
}

