import { createRoute } from "atomic-router"

export const baseRoutes = {
    dashboard: createRoute(),

    projects: {
        overview: createRoute(),
        project: createRoute<{projectId: string}>()
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
        path: '/projects/:projectId', 
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
