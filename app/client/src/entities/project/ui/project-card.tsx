import { Link } from 'atomic-router-react'
import * as Popover from '@radix-ui/react-popover'

import { baseRoutes } from 'shared/routing'

import styles from './project-card.module.css'

import moreActionsImg from '../assets/more-actions.svg'
import { memo, useEffect } from 'react'
import { arePropsEqual } from 'shared/lib'



interface Props {
    id: number,
    name: string,
    description: string,
    deleteProjectSlot: React.ReactNode
}


export const ProjectCard = memo(({id, name, description, deleteProjectSlot}: Props) => {
    return (
        <div className={styles.card} >
            <Link className={styles.link} to={baseRoutes.projects.project} params={{id}}/>

            <div className={styles.content}>
                <div className={styles.meta}>
                    <h1 className={styles.name}>{name}</h1>
                    <p className={styles.description}>{description}</p>
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
                                    {deleteProjectSlot}
                                </div>
                            </Popover.Content>
                        </Popover.Portal>
                    </Popover.Root>     
                </div>
            </div>
            
        </div>
    )
}, arePropsEqual)