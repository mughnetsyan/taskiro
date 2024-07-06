import { cx } from 'class-variance-authority';

import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Column } from 'entities/column';

import styles from './sortable-column.module.css'


interface Props {
    id: number,
    name: string,
    className?: string,

    tasksId: string[],

    children?: React.ReactNode,
    
    deleteColumnSlot?: React.ReactNode,
    createTaskSlot?: React.ReactNode,
}


export const SortableColumn = ({id, name, className, children, tasksId, deleteColumnSlot, createTaskSlot}: Props) => {    
    const { setNodeRef, attributes, listeners, transition, transform, isDragging } = useSortable({
        id,
        data: {
            type: 'column',
            data: {
                id,
                name,
            }
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    
    return (    
        <Column 
            ref={setNodeRef}
            style={style}

            name={name}
            className={cx(className, isDragging && styles.column_dragging)}

            deleteColumnSlot={deleteColumnSlot}
            createTaskSlot={createTaskSlot}

            dragColumnSlot={<div style={{cursor: 'pointer'}} {...attributes} {...listeners}>Drag</div>}
        >
            <SortableContext items={tasksId}>
                {children}
            </SortableContext>
        </Column>
    )
}