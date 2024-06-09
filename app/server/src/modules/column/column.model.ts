import { BelongsTo, Column as Col, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

import { Project } from "modules/project";
import { Task } from "modules/task";


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