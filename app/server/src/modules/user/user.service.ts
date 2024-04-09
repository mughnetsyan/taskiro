import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { User } from './user.model'

import { CreateUserDto } from './dto/create-user.dto'


@Injectable()
export class UserService {
    constructor (
        @InjectModel(User) private userRepository: typeof User
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto, {
            raw: true
        })

        return user
    } 

    async findUserById(id: number) {
        const user = await this.userRepository.findOne({ raw: true, where: { id }})

        return user
    }

    async findUserByLogin(login: string) {
        const user = await this.userRepository.findOne({ raw: true, where: { login }})

        return user
    }
}
