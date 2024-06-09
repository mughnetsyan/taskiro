import { useUnit } from 'effector-react'

import { columnDeleted } from '../model'

import styles from './column.module.css'

import deleteImg from './assets/delete.svg'
import { cx } from 'class-variance-authority'


interface Props {
    id: number,
    name: string,
    className?: string,
    children?: React.ReactNode,
    createNewTaskSlot?: React.ReactNode
}


export const Column = ({id, name, className, children, createNewTaskSlot}: Props) => {
    const deleteColumn = useUnit(columnDeleted)

    return (
        <div className={cx(styles.column, className)}>
            <div className={styles.header}>
                <h2 className={styles.name}>{name}</h2>

                <button className={styles.deleteButton} onClick={() => deleteColumn({id})}>
                    <img src={deleteImg} alt="" />
                </button>
            </div>


            <div className={styles.tasks}>
                {children}
                {createNewTaskSlot}
            </div>
        </div>
    )
}