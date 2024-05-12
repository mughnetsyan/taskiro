import { useUnit } from "effector-react"

import { BaseLayout } from "widgets/layouts"

import { ProjectCard } from "entities/project"

import { baseRoutes } from "shared/routing"
import { Section } from "shared/ui"

import { projectsQuery } from "../model"

import styles from './dashboard.module.css'
import { Link } from "atomic-router-react"

import arrowRight from '../assets/projects-arrow-right.svg'


export const Dashboard = () => {

    const data = useUnit(projectsQuery.$data)

    const projects = data?.projects || []
    const hasMore = data?.hasMore || false

    return (
        <BaseLayout title="Dashboard">
            <Section title="Projects">
                <div  className={styles.section}>
                    <div className={styles.projects}>
                        {
                            projects && 
                            projects.map(({id, name, description}) => <ProjectCard key={id} name={name} description={description}/>)
                        }
                    </div>
                    {
                        hasMore && (
                            <Link className={styles.more} to={baseRoutes.projects}>
                                <img src={arrowRight} alt="More" />
                            </Link>
                        )
                    }
                </div>
            </Section>
        </BaseLayout>
    ) 
}