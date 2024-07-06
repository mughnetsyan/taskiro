import { cx } from 'class-variance-authority'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { TaskCard } from 'entities/task'

import styles from './sortable-task.module.css'


interface Props {
    id: string,
    text: string ,
    completed: boolean,
    columnId: number,

    deleteTaskSlot?: React.ReactNode,
    toggleTaskSlot?: React.ReactNode
}


export const SortableTask = ({id, text, completed, columnId, deleteTaskSlot, toggleTaskSlot}: Props) => {
    
    const { setNodeRef, attributes, listeners, transition, transform, isDragging } = useSortable({
        id,
        data: {
            type: 'task',
            data: {
                id,
                text,
                completed,
                columnId
            }
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <TaskCard 
            ref={setNodeRef}
            style={style}

            className={cx(isDragging && styles.task__dragging)}

            text={text}
            completed={completed}

            deleteTaskSlot={deleteTaskSlot}
            toggleTaskSlot={toggleTaskSlot}

            dragTaskSlot={<div style={{cursor: 'pointer'}} {...attributes} {...listeners}>Drag</div>}
        />
    )
}