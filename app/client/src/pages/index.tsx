import { createRoutesView } from "atomic-router-react"

import { BaseLayout } from "widgets/layouts"

import { chainAuthorized } from "entities/session/"

import { routes } from "shared/routing/routes"

import { Dashboard } from "./dashboard"
import { SignIn } from "./sign-in"
import { SignUp } from "./sign-up"
import { Projects } from "./projects"



export const Pages = createRoutesView({
    routes: [
        { route: chainAuthorized(routes.dashboardRoute), view: Dashboard, layout: BaseLayout},
        { route: chainAuthorized(routes.projectsRoute), view: Projects, layout: BaseLayout },

        { route: routes.signInRoute, view: SignIn },
        { route: routes.signUpRoute, view: SignUp },
    ] 
})
