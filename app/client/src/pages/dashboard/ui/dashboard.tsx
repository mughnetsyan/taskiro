import { useList, useUnit } from "effector-react"

import { BaseLayout } from "widgets/layouts"

import { DeleteProject } from "features/delete-project"

import { ProjectCard } from "entities/project"

import { baseRoutes } from "shared/routing"
import { Section } from "shared/ui"

import { $$deleteProjectModel, $hasMore, $projects  } from "../model"

import styles from './dashboard.module.css'
import { Link } from "atomic-router-react"

import arrowRight from '../assets/projects-arrow-right.svg'


export const Dashboard = () => {
    const projects = useList($projects, {
        fn: ({id, name, description}) => (
            <ProjectCard 
                key={id} 
                id={id} 
                name={name}
                description={description} 

                deleteProjectSlot={<DeleteProject model={$$deleteProjectModel} id={id}/>}
            />
        ),
        // make separate component for placeholder later
        placeholder: "No projects here"
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