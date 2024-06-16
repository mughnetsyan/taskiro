import { useUnit } from 'effector-react'

import { MoreActionsItem } from 'shared/ui/more-actions-item'

import { deleteColumnFactory } from '../model'

import styles from './delete-column.module.css'

import deleteImg from '../assets/delete.svg'

interface Props {
    model: ReturnType<typeof deleteColumnFactory>,
    id: number
}


export const DeleteColumn = ({model, id}: Props) => {
    const deleteColumn = useUnit(model.events.columnDeleted)

    return (
        <MoreActionsItem className={styles.deleteButton} onClick={() => deleteColumn({id})}>
            <img src={deleteImg} alt="" />
            <span>Delete</span>
        </MoreActionsItem>
    )
}