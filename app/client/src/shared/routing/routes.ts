import { createRoute } from "atomic-router"

export const routes = {
    dashboardRoute: createRoute(),

    signInRoute: createRoute(),
    signUpRoute: createRoute(),
}

export const routesMap = [
    { path: '/', route: routes.dashboardRoute },
    { path: '/sign-in', route: routes.signInRoute },
    { path: '/sign-up', route: routes.signUpRoute }
]