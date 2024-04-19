import { Link } from 'atomic-router-react'

import { SessionCard } from 'entities/session/'

import { routes } from 'shared/routing'

import { NavigationItem } from './navigation-item'

import styles from './sidebar.module.css'

import logo from '../assets/logo.svg'
import dashobardImg from '../assets/dashboard.svg'
import projectsImg from '../assets/projects.svg'



interface Props {


}


export const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <section className={styles.body}>
                <Link className={styles.link} to={routes.dashboardRoute}>
                    <img src={logo} alt="logo" />
                </Link>
                <SessionCard />
                <nav className={styles.navigation}>
                    <NavigationItem route={routes.dashboardRoute} src={dashobardImg}>Dashboard</NavigationItem>
                    <NavigationItem route={routes.projectsRoute} src={projectsImg}>Projects</NavigationItem>
                </nav>
            </section>
            <section className={styles.actions}>

            </section>
        </aside>
    )
}