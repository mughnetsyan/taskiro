import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import { Project } from './project.model';

import { CreateProjectDto } from './dto/create-project.dto';


@Injectable()
export class ProjectService {
    constructor (
        @InjectModel(Project) private projectRepository: typeof Project
    ) {}

    async createProject(dto: CreateProjectDto) {
        const project = await this.projectRepository.create(dto)

        return dto
    }

    async getProjects(userId: number, limit: number, offset: number) {
        const projects = await this.projectRepository.findAll({
            where: {
                userId
            },
            limit, 
            offset,
            order: [
                ['id', 'ASC']
            ]
        })


        return projects
    }
}
