import { useList, useUnit } from "effector-react"

import { BaseLayout } from "widgets/layouts"

import { ProjectCard } from "entities/project"

import { baseRoutes } from "shared/routing"
import { Section } from "shared/ui"

import { $hasMore, $projects  } from "../model"

import styles from './dashboard.module.css'
import { Link } from "atomic-router-react"

import arrowRight from '../assets/projects-arrow-right.svg'


export const Dashboard = () => {
    const projects = useList($projects, {
        fn: ({id, name, description}) => (
          <ProjectCard key={id} id={id} name={name} description={description} />
        ),
        // make separate component for placeholder later
        placeholder: <ProjectCard id={999999} key='placeholder' name="No projects here!" description="Create new ones!"/>
      })
    
    const hasMore = useUnit($hasMore)

    return (
        <BaseLayout title="Dashboard">
            <Section title="Projects">
                <div  className={styles.section}>
                    <div className={styles.projects}>
                        { projects }
                    </div>
                    {hasMore && (
                        <Link className={styles.more} to={baseRoutes.projects.overview}>
                            <img src={arrowRight} alt="More" />
                        </Link>
                    )}
                </div>
            </Section>
        </BaseLayout>
    ) 
}