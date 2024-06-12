import { User } from "modules/user/user.model";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";



@Table({tableName: 'projects'})
export class Project extends Model<Project, unknown> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => User)
    userId: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.STRING, allowNull: true})
    description: string

    @BelongsTo(() => User, 'userId')
    user: User
}