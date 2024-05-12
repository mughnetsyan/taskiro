import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { Project } from "modules/project";


@Table({tableName: 'tasks'})
export class Task extends Model<Task, unknown> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Project)
    projectId: number

    @Column({type: DataType.STRING, allowNull: false})
    text: string

    @Column({type: DataType.STRING, defaultValue: false})
    completed: boolean

    @BelongsTo(() => Project, 'projectId')
    project: Project
}