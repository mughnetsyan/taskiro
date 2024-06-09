import { BelongsTo, Column as Col, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { Column } from "modules/column";


@Table({tableName: 'tasks'})
export class Task extends Model<Task, unknown> {

    @Col({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Column)
    columnId: number

    @Col({type: DataType.STRING, allowNull: false})
    text: string

    @Col({type: DataType.BOOLEAN, defaultValue: false})
    completed: boolean

    @BelongsTo(() => Column, 'columnId')
    column: Column
}