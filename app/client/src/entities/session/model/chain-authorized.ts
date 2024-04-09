import { createEvent, sample } from "effector";
import { chainRoute, redirect, RouteInstance, RouteParamsAndQuery } from "atomic-router";

import { refreshSessionQuery, sessionQuery } from "entities/session"

import { routes } from "shared/routing";


export const chainAuthorized = (route: RouteInstance<any>) => {
    const authCheckStarted = createEvent<RouteParamsAndQuery<any>>()

    sample({
        clock: authCheckStarted,
        target: sessionQuery.start
    })

    redirect({
        clock: refreshSessionQuery.finished.failure,
        route: routes.signUpRoute
    })

    return chainRoute({ 
        route: route,
        beforeOpen: authCheckStarted,
        openOn: [sessionQuery.finished.success, refreshSessionQuery.finished.success]
    })
}