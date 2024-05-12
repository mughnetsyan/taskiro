import { useRef } from "react"

import { useList, useUnit } from "effector-react"

import { loadedMoreProjects, projectsQuery } from "../model"

import { BaseLayout } from "widgets/layouts"

import { ProjectCard } from "entities/project"

import { useObserver } from "shared/lib"

import { $projects } from "../model"

import styles from './projects.module.css'


export const Projects = () => {
  const projects = useList($projects, ({id, name, description}) => (
    <ProjectCard key={id} name={name} description={description} />
  ))

  const loadingFinished = useUnit(projectsQuery.$finished)

  const loaderRef = useRef(null)
  const loadMoreProjects = useUnit(loadedMoreProjects)

  useObserver(loaderRef, loadMoreProjects, [loadingFinished])

  return (
    <BaseLayout title="Projects">
        <div className={styles.projects}>
          {projects}
        </div>
        <div className={styles.loaderRef} ref={loaderRef}></div>
    </BaseLayout>
  ) 
}