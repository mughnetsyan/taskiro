import { ReactNode } from 'react'

import { RouteInstance } from 'atomic-router'
import { Link } from 'atomic-router-react'
import { cx } from 'class-variance-authority'

import styles from './navigation-item.module.css'
import { useUnit } from 'effector-react'



interface Props {
    route: RouteInstance<any>
    children?: ReactNode
    src?: string
}


export const NavigationItem = ({route, children, src}: Props) => {
    const active = useUnit(route.$isOpened)

    return (
        <Link className={cx(styles.link,active && styles.link__active )} to={route}>
            <img className={styles.img} src={src} alt="icon"/>
            {children}
        </Link>
    )
}