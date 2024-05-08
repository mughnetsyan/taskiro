import { createRoute } from "atomic-router"

export const baseRoutes = {
    dashboard: createRoute(),
    projects: createRoute(),

    signIn: createRoute(),
    signUp: createRoute(),
}

export const routesMap = [
    { path: '/', route: baseRoutes.dashboard },
    { path: '/projects', route: baseRoutes.projects },
    { path: '/sign-in', route: baseRoutes.signIn },
    { path: '/sign-up', route: baseRoutes.signUp },
]