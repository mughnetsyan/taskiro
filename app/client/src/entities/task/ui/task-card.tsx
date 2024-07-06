import { cx } from 'class-variance-authority'

import * as Popover from '@radix-ui/react-popover'

import styles from './task-card.module.css'

import moreActionsImg from '../assets/more-actions.svg'
import { DetailedHTMLProps, forwardRef, HTMLAttributes, memo } from 'react'
import { arePropsEqual } from 'shared/lib'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
    text: string,
    completed: boolean,

    deleteTaskSlot?: React.ReactNode,
    toggleTaskSlot?: React.ReactNode,

    dragTaskSlot?: React.ReactNode
}

type Ref = HTMLDivElement

export const TaskCard = memo(forwardRef<Ref, Props>(({text, completed, className, deleteTaskSlot, toggleTaskSlot, dragTaskSlot, ...props}, ref) => {
    return (    
        <div className={cx(styles.card, className)} ref={ref} {...props}>
            <div className={styles.meta}>
                <p className={cx(styles.text, completed && styles.text_active)}>{text}</p>
                <div className={styles.toggleTask}>
                    {toggleTaskSlot}
                    {dragTaskSlot}
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
}), arePropsEqual())