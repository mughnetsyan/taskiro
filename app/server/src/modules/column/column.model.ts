import { Project } from "modules/project/project.model";
import { Task } from "modules/task/task.model";
import { BelongsTo, Column as Col, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";



@Table({tableName: 'columns'})
export class Column extends Model<Column, unknown> {

    @Col({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Project)
    projectId: number

    @Col({type: DataType.STRING, allowNull: false})
    name: string

    @BelongsTo(() => Project, 'projectId')
    project: Project

    @HasMany((() => Task))
    tasks: Task[]
}