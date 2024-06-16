import { Link } from 'atomic-router-react'

import { useList, useUnit } from 'effector-react'

import { CreateNewProject } from 'features/create-project'

import { SessionCard } from 'entities/session/'

import { baseRoutes } from 'shared/routing'

import { $links, $$createProjectModel } from '../model'

import { NavigationItem } from './navigation-item'
import { CurrentDate } from './current-date'

import styles from './sidebar.module.css'

import logo from '../assets/logo.svg'


export const Sidebar = () => {
    const navigation = useList($links, {
        getKey: (link) => link.label,
        fn(link) {
          const isActive = useUnit(link.active?.$isOpened ?? link.route.$isOpened)

          return (
            <NavigationItem route={link.route} isActive={isActive} src={link.iconSrc}>{link.label}</NavigationItem>
          )
        }
    })

    return (
        <aside className={styles.sidebar}>
            <section className={styles.body}>
                <Link className={styles.link} to={baseRoutes.dashboard}>
                    <img src={logo} alt="logo" />
                </Link>
                <SessionCard />
                <nav className={styles.navigation}>
                    {navigation}
                </nav>
            </section>
            <section className={styles.actions}>
                <CreateNewProject model={$$createProjectModel}/>
                <CurrentDate />
            </section>
        </aside>
    )
}