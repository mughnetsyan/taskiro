import { useUnit } from 'effector-react'

import { deleteTaskFactory } from '../model'

import styles from './delete-task.module.css'

import deleteImg from '../assets/delete.svg'



interface Props {
    model: ReturnType<typeof deleteTaskFactory>
    id: number
}


export const DeleteTask = ({model, id}: Props) => {
    const deleteTask = useUnit(model.events.taskDeleted)

    return (
        <button className={styles.deleteButton} onClick={() => deleteTask({id})}>
            <img src={deleteImg} alt="Delete task" />
        </button>
    )
}
