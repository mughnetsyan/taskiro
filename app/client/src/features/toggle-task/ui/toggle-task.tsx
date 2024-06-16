import { useUnit } from 'effector-react'
import * as Checkbox from '@radix-ui/react-checkbox'

import { toggleTaskFactory } from '../model'

import styles from './toggle-task.module.css'

import checkmarkImg from '../assets/checkmark.svg'

interface Props {
    model: ReturnType<typeof toggleTaskFactory>
    id: number,
    completed: boolean,
}


export const ToggleTask = ({model, id, completed}: Props) => {
    const toggleTask = useUnit(model.events.taskToggled)

    return (
        <Checkbox.Root checked={completed} onCheckedChange={() => toggleTask({id})} className={styles.checkbox}>
            <Checkbox.Indicator className={styles.checkboxIndicator} asChild>
                <img src={checkmarkImg} alt="Toggle task" />
            </Checkbox.Indicator>        
        </Checkbox.Root>
    )
}
