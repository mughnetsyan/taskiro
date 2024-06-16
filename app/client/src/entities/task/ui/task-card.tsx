import { cx } from 'class-variance-authority'

import * as Popover from '@radix-ui/react-popover'

import styles from './task-card.module.css'

import moreActionsImg from '../assets/more-actions.svg'

interface Props {
    text: string,
    completed: boolean,

    deleteTaskSlot?: React.ReactNode,
    toggleTaskSlot?: React.ReactNode
}

export const TaskCard = ({text, completed, deleteTaskSlot, toggleTaskSlot}: Props) => {
    return (    
        <div className={styles.card}>
            <div className={styles.meta}>
                <p className={cx(styles.text, completed && styles.text_active)}>{text}</p>
                <div className={styles.toggleTask}>
                    {toggleTaskSlot}
                </div>
            </div>
            <div className={styles.details}>
                <Popover.Root>
                    <Popover.Trigger className={styles.moreActionsTrigger}>
                        <img src={moreActionsImg} alt="More actions"/>
                    </Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content className={styles.popoverContent} align="end">
                            <Popover.Arrow className={styles.arrow}/>

                            <div className={styles.moreActions}>
                                {deleteTaskSlot}
                            </div>
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>   
            </div>
        </div>
    )
}