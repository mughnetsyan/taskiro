import { createRoutesView } from "atomic-router-react"

import { dashboardRoute, Dashboard } from "./dashboard"
import { projectsRoute, Projects } from "./projects"

import { signInRoute, SignIn } from "./sign-in"
import { signUpRoute, SignUp } from "./sign-up"
import { projectRoute, Project } from "./project"


export const Pages = createRoutesView({
    routes: [
        { route: dashboardRoute, view: Dashboard },

        { route: projectsRoute, view: Projects },
        { route: projectRoute, view: Project },

        { route: signInRoute, view: SignIn },
        { route: signUpRoute, view: SignUp },
    ] 
})
