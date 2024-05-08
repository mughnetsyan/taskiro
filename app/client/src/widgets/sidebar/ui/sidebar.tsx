import { Link } from 'atomic-router-react'

import { SessionCard } from 'entities/session/'

import { baseRoutes } from 'shared/routing'

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
                <Link className={styles.link} to={baseRoutes.dashboard}>
                    <img src={logo} alt="logo" />
                </Link>
                <SessionCard />
                <nav className={styles.navigation}>
                    <NavigationItem route={baseRoutes.dashboard} src={dashobardImg}>Dashboard</NavigationItem>
                    <NavigationItem route={baseRoutes.projects} src={projectsImg}>Projects</NavigationItem>
                </nav>
            </section>
            <section className={styles.actions}>

            </section>
        </aside>
    )
}