import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import { Project } from './project.model';

import { CreateProjectDto, GetProjectsAndCountDto } from './dto/create-project.dto';


@Injectable()
export class ProjectService {
    constructor (
        @InjectModel(Project) private projectRepository: typeof Project
    ) {}

    async createProject(dto: CreateProjectDto) {
        const project = await this.projectRepository.create(dto)

        return project
    }

    async getProjectsAndCount({userId, limit, offset}: GetProjectsAndCountDto) {
        const { rows: projects, count } = await this.projectRepository.findAndCountAll({
            where: {
                userId
            },
            limit, 
            offset,
            order: [
                ['id', 'ASC']
            ]
        })


        return {
            projects,
            count
        }
    }
}
