import { ComponentProps, useCallback, useMemo } from 'react'
import { useList, useUnit } from 'effector-react'
import useEmblaCarousel from 'embla-carousel-react'

import { BaseLayout } from 'widgets/layouts'

import { CreateTask } from 'features/create-task'
import { CreateNewColumn } from 'features/create-column'
import { DeleteColumn } from 'features/delete-column'
import { DeleteTask } from 'features/delete-task'
import { ToggleTask } from 'features/toggle-task'

import { TaskCard } from 'entities/task'
import { Column } from 'entities/column'

import { $columns, $name, $$createColumnModel, $$deleteColumnModel, $$createTaskModel, $$deleteTaskModel, $$toggleTaskModel } from '../model'

import { Slider } from './slider'

import styles from './project.module.css'

//* You can avoid unnecessary re-rerenders by using slots like this:
//* useMemo(() => <Slot model={$$slotModel} />, [])
//* But this leads to dynamicly called hooks, so adding/deleting items from list will throw errors 
//* TODO: solve this
export const Project = () => {
    const name = useUnit($name)

    const columns = useList($columns, {
        fn({id, name, tasks}) {
            return (
                <Column 
                    id={id}
                    key={id}
                    name={name}
                    className={styles.column}

                    createTaskSlot={<CreateTask model={$$createTaskModel} columnId={id}/>}
                    deleteColumnSlot={<DeleteColumn model={$$deleteColumnModel} id={id}/>}
                >
                    {tasks.map(({id, text, completed}) => {

                        return (
                            <TaskCard 
                                key={id} 
                                text={text} 
                                completed={completed} 

                                deleteTaskSlot={<DeleteTask model={$$deleteTaskModel} id={id}/>}
                                toggleTaskSlot={<ToggleTask model={$$toggleTaskModel} id={id} completed={completed}/>}
                            />
                        )
                    })}
                </Column>
            )
        }
    })
    
    return (
        <BaseLayout title={name}>
            <Slider>
                {columns}
                <div className={styles.createNewColumnContainer}>
                    <CreateNewColumn model={$$createColumnModel}/>
                </div>
            </Slider>
        </BaseLayout>
    )
}