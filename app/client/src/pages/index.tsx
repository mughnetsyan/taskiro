import { createRoutesView } from "atomic-router-react"

import { chainAuthorized } from "entities/session/"

import { routes } from "shared/routing/routes"

import { Dashboard } from "./dashboard"
import { SignIn } from "./sign-in"
import { SignUp } from "./sign-up"


export const Pages = createRoutesView({
    routes: [
        { route: chainAuthorized(routes.dashboardRoute), view: Dashboard },
        { route: routes.signInRoute, view: SignIn },
        { route: routes.signUpRoute, view: SignUp },
    ] 
})
