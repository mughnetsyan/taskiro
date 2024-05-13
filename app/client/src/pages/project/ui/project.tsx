import { BaseLayout } from 'widgets/layouts'

import { useList, useUnit } from 'effector-react'

import { TaskCard } from 'entities/task'
import { Section } from 'shared/ui'

import { $name, $tasks } from '../model'


import styles from './project.module.css'
import { CreateNewTask } from 'features/create-new-task'



export const Project = () => {
    const name = useUnit($name)

    const tasks = useList($tasks, {
        fn({id, text, completed}) {
            return <TaskCard id={id} text={text} completed={completed} />
        }
    })

    return (
        <BaseLayout title={name}>
            <Section title='Tasks'>
                <div className={styles.section}>
                    {tasks}
                    <CreateNewTask />
                </div>
            </Section>
        </BaseLayout>
    )
}