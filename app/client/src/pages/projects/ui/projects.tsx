import { useEffect, useRef } from "react"

import { useUnit } from "effector-react"

import { loadedMoreProjects, projectsQuery } from "../model"

import { BaseLayout } from "widgets/layouts"

import { ProjectCard } from "entities/project"

import { $projects } from "../model"

import styles from './projects.module.css'



export const Projects = () => {

    const projects = useUnit($projects)
    const isLoading = useUnit(projectsQuery.$pending)

    const loadMoreProjects = useUnit(loadedMoreProjects)

    const loaderRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
          const target = entries[0]
          if (target.isIntersecting) {
            loadMoreProjects()
          }
        });
    
        if (loaderRef.current) {
          observer.observe(loaderRef.current)
        }
    
        return () => {
          if (loaderRef.current) {
            observer.unobserve(loaderRef.current)
          }
        };
      }, []);

    return (
        <BaseLayout title="Projects" className={styles.projects}>
            {
              projects && projects.map(({id, name, description}) => <ProjectCard key={id} name={name} description={description} />)
            }
            <div ref={loaderRef}></div>
        </BaseLayout>
    )
}