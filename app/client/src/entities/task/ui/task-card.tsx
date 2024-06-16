import { memo, useEffect } from 'react'

import { cx } from 'class-variance-authority'

import styles from './task-card.module.css'


interface Props {
    text: string,
    completed: boolean,

    deleteTaskSlot?: React.ReactNode,
    toggleTaskSlot?: React.ReactNode
}

export const TaskCard = ({text, completed, deleteTaskSlot, toggleTaskSlot}: Props) => {
    return (    
        <div className={styles.card}>
            <p className={cx(styles.text, completed && styles.text_active)}>{text}</p>
            <div className={styles.group}>
                {deleteTaskSlot}
                {toggleTaskSlot}
            </div>
        </div>
    )
}