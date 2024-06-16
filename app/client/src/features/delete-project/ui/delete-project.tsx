import { useUnit } from 'effector-react'
import { deleteProjectFactory } from '../model'

import { MoreActionsItem } from 'shared/ui/more-actions-item'

import styles from './delete-project.module.css'

import deleteImg from '../assets/delete.svg'

interface Props {
    model: ReturnType<typeof deleteProjectFactory>,
    id: number
}


export const DeleteProject = ({model, id}: Props) => {
    const deleteProject = useUnit(model.events.projectDeleted)

    return (
        <MoreActionsItem onClick={() => deleteProject({id})}>
            <img src={deleteImg} alt="Delete project"/>
            <span>Delete</span>
        </MoreActionsItem>
    )
}