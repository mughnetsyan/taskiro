import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { User } from "modules/user";


@Table({tableName: 'projects'})
export class Project extends Model<Project, unknown> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => User)
    // @Column({type: DataType.STRING, allowNull: false})
    userId: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.STRING, allowNull: true})
    description: string


    @BelongsTo(() => User, 'userId')
    user: User
}