import { useList, useUnit } from 'effector-react'
import useEmblaCarousel from 'embla-carousel-react'

import { BaseLayout } from 'widgets/layouts'

import { CreateNewTask } from 'features/create-new-task'
import { CreateNewColumn } from 'features/create-new-column'

import { TaskCard } from 'entities/task'
import { Column } from 'entities/column'

import { Section } from 'shared/ui'
import { useSliderControls } from 'shared/lib/embla'

import { SliderControl } from './slider-control'

import { $columns, $name, $$taskModel, $$columnModel, $$createNewTaskModel, $$createNewColumnModel } from '../model'
import { carouselOptions } from '../config'

import styles from './project.module.css'
import { useMemo } from 'react'

export const Project = () => {
    const [carouselRef, carouselApi] = useEmblaCarousel(carouselOptions)

    const sliderControlsApi = useSliderControls(carouselApi)

    const name = useUnit($name)

    const taskModel = useMemo(() => $$taskModel, [])

    const columns = useList($columns, {
        fn({id, name, tasks}) {
            return (
                <Column 
                    model={$$columnModel}
                    id={id}
                    key={id}
                    name={name}
                    className={styles.column}
                    createNewTaskSlot={<CreateNewTask model={$$createNewTaskModel} columnId={id}/>}
                >
                    {tasks.map(({id, text, completed}) => {
                        return <TaskCard model={taskModel} id={id} key={id} text={text} completed={completed} />
                    })}
                </Column>
            )
        }
    })
    
    return (
        <BaseLayout title={name}>
            <Section className={styles.slider} onMouseMove={e => e.stopPropagation()}>
                <div className={styles.sliderControlsGroup}>
                    <SliderControl sliderControlsApi={sliderControlsApi} mode='prev'/>
                    <SliderControl sliderControlsApi={sliderControlsApi} mode='next'/>
                </div>

                <div className={styles.sliderViewport} ref={carouselRef}>
                    <div className={styles.columns}>
                        {columns}
                        <div className={styles.createNewColumnContainer}>
                            <CreateNewColumn model={$$createNewColumnModel}/>
                        </div>
                    </div>
                </div>
            </Section>
        </BaseLayout>
    )
}