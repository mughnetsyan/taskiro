import { cx } from 'class-variance-authority'
import * as Popover from '@radix-ui/react-popover'


import styles from './column.module.css'

import moreActionsImg from '../assets/more-actions.svg'


interface Props {
    id: number,
    name: string,
    className?: string,
    children?: React.ReactNode,
    deleteColumnSlot?: React.ReactNode,
    createTaskSlot?: React.ReactNode,
}


export const Column = ({name, className, children, deleteColumnSlot, createTaskSlot}: Props) => {
    return (
        <div className={cx(styles.column, className)}>
            <div className={styles.header}>
                <div className={styles.meta}>
                    <h2 className={styles.name}>{name}</h2>
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
                                    {deleteColumnSlot}
                                </div>
                            </Popover.Content>
                        </Popover.Portal>
                    </Popover.Root>     
                </div>
            </div>


            <div className={styles.tasks}>
                {children}
                {createTaskSlot}
            </div>
        </div>
    )
}