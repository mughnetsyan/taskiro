import { createRoute } from "atomic-router"

export const baseRoutes = {
    dashboard: createRoute(),

    projects: {
        overview: createRoute(),
        project: createRoute<{id: number}>()
    },

    signIn: createRoute(),
    signUp: createRoute(),
}

export const sections = {
    dashboard: createRoute(),
    projects: createRoute(),
}

export const routesMap = [
    { 
        path: '/', 
        route: [baseRoutes.dashboard, sections.dashboard] 
    },
    { 
        path: '/projects', 
        route: [baseRoutes.projects.overview, sections.projects]
    },
    { 
        path: '/projects/:id', 
        route: [baseRoutes.projects.project, sections.projects] 
    },
    { 
        path: '/sign-in', 
        route: baseRoutes.signIn
    },
    { 
        path: '/sign-up', 
        route: baseRoutes.signUp 
    },
]
