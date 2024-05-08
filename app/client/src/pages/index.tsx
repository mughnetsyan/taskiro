import { createRoutesView } from "atomic-router-react"

import { baseRoutes } from "shared/routing/routes"

import { dashboardRoute, Dashboard } from "./dashboard"
import { projectsRoute, Projects } from "./projects"
import { signInRoute, SignIn } from "./sign-in"
import { SignUp } from "./sign-up"


export const Pages = createRoutesView({
    routes: [
        { route: dashboardRoute, view: Dashboard },
        { route: projectsRoute, view: Projects },

        { route: signInRoute, view: SignIn },
        { route: baseRoutes.signUp, view: SignUp },
    ] 
})
