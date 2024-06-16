import { useRef } from "react"

import { useList, useUnit } from "effector-react"

import { triggeredLoadingMoreProjects, projectsQuery, $$deleteProjectModel } from "../model"

import { BaseLayout } from "widgets/layouts"
import { DeleteProject } from "features/delete-project"

import { ProjectCard } from "entities/project"

import { useObserver } from "shared/lib"

import { $projects } from "../model"

import styles from './projects.module.css'



export const Projects = () => {
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
    placeholder: "No projects here"
  })

  const loadingFinished = useUnit(projectsQuery.$finished)

  const loaderRef = useRef(null)
  const triggerLoadingMoreProjects = useUnit(triggeredLoadingMoreProjects)

  useObserver(loaderRef, triggerLoadingMoreProjects, [loadingFinished])

  return (
    <BaseLayout title="Projects">
        <div className={styles.projects}>
          {projects}
        </div>
        <div className={styles.loaderRef} ref={loaderRef}></div>
    </BaseLayout>
  ) 
}