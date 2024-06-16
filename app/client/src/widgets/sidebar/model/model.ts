import { createStore } from "effector"
import { invoke } from "@withease/factories"
import { RouteInstance } from "atomic-router"

import { createProjectFactory } from "features/create-project"

import { baseRoutes, sections } from "shared/routing"

import dashobardImg from '../assets/dashboard.svg'
import projectsImg from '../assets/projects.svg'



type Link = {
    label: string,
    route: RouteInstance<any>,
    active: RouteInstance<any>,
    iconSrc: string
}

export const $links = createStore<Link[]>([
    {
        label: "Dashboard",
        route: baseRoutes.dashboard,
        active: sections.dashboard,
        iconSrc: dashobardImg
    },
    {
        label: "Projects",
        route: baseRoutes.projects.overview,
        active: sections.projects,
        iconSrc: projectsImg
    }
])


export const $$createProjectModel = invoke(createProjectFactory)