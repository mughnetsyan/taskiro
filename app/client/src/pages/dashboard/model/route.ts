import { chainRoute, RouteParamsAndQuery } from "atomic-router";

import { chainAuthorized } from "entities/session";

import { baseRoutes } from "shared/routing";

import { $limit, $offset, projectsQuery } from "./model";
import { createEvent, sample } from "effector";


export const startProjectsQuery = createEvent<RouteParamsAndQuery<any>>()


sample({
    clock: startProjectsQuery,
    source: {
        limit: $limit,
        offset: $offset
    },
    target: projectsQuery.start
})


export const dashboardRoute = chainRoute({
    route: chainAuthorized(baseRoutes.dashboard),
    beforeOpen: startProjectsQuery,
    openOn: projectsQuery.finished.success
})