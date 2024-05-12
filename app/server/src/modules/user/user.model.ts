import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

import { CreateUserDto } from "./dto";

import { Project } from "modules/project/project.model";


@Table({tableName: 'users'})
export class User extends Model<User, CreateUserDto> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.STRING, allowNull: true})
    bio: string

    @Column({type: DataType.STRING, allowNull: false})
    password: string
}