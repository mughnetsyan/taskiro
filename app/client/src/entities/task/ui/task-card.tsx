import { useUnit } from 'effector-react'

import *  as Checkbox from '@radix-ui/react-checkbox'

import styles from './task-card.module.css'

import checkmarkImg from '../assets/checkmark.svg'
import deleteImg from '../assets/delete.svg'

import { taskDeleted, taskToggled } from '../model'
import { useState } from 'react'
import { cx } from 'class-variance-authority'



interface Props {
    id: number,
    text: string,
    completed: boolean,
}


export const TaskCard = ({id, text, completed}: Props) => {
    const [checked, setChecked] = useState(completed)

    const toggleTask = useUnit(taskToggled)
    const deleteTask = useUnit(taskDeleted)

    function checkHandler() {
        toggleTask({id})

        setChecked((checked) => !checked)
    }

    return (    
        <div className={styles.card}>
            <p className={cx(styles.text, checked && styles.text_active)}>{text}</p>
            <div className={styles.group}>
                <button className={styles.deleteButton} onClick={() => deleteTask({id})}>
                    <img src={deleteImg} alt="" />
                </button>

                <Checkbox.Root checked={checked} onCheckedChange={checkHandler} className={styles.checkbox}>
                    <Checkbox.Indicator className={styles.checkboxIndicator} asChild>
                        <img src={checkmarkImg} alt="Toggle task" />
                    </Checkbox.Indicator>        
                </Checkbox.Root>
            </div>
        </div>
    )
}