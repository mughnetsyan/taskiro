import { useRef } from "react"

import { useList, useUnit } from "effector-react"

import { triggeredLoadingMoreProjects, projectsQuery } from "../model"

import { BaseLayout } from "widgets/layouts"

import { ProjectCard } from "entities/project"

import { useObserver } from "shared/lib"

import { $projects } from "../model"

import styles from './projects.module.css'


export const Projects = () => {
  const projects = useList($projects, {
    fn: ({id, name, description}) => (
      <ProjectCard key={id} id={id} name={name} description={description} />
    ),
    placeholder: <ProjectCard key='placeholder' id={99999999} name="No projects here!" description="Create new ones!" />
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