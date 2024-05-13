import { Get, Injectable, Patch } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Task } from './task.model';
import { CreateTaskDto } from './dto';
import { GetTasksDto } from './dto';
import { ToggleTaskDto } from './dto';
import { DeleteTaskDto } from './dto/delete-task.dto';

@Injectable()
export class TaskService {
    constructor (
        @InjectModel(Task) private taskRepository: typeof Task
    ) {}

    async createTask(dto: CreateTaskDto) {
        const completed = false

        const task = await this.taskRepository.create({...dto, completed})

        return task
    }

    async getTasksByProjectId(dto: GetTasksDto) {
        const { projectId } = dto

        const tasks = await this.taskRepository.findAll({
            where: {
                projectId
            },
            order: [
                ['id', 'ASC']
            ]
        })

        return tasks
    }

    async toggleTask(dto: ToggleTaskDto) {
        const { id } = dto

        const task = await this.taskRepository.findByPk(id)

        task.completed = !task.completed

        task.save()

        return task
    }

    async deleteTask(dto: DeleteTaskDto) {
        const { id } = dto

        const task = await this.taskRepository.findByPk(id)

        task.destroy()

        return task
    }
}
