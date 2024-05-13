import { createEvent, sample } from "effector";

import { chainRoute, RouteParamsAndQuery } from "atomic-router";

import { chainAuthorized } from "entities/session";

import { baseRoutes } from "shared/routing";
import { $limit, $offset, $projects, projectsQuery } from "./model";
import { reset } from "patronum";


export const startProjectsQuery = createEvent<RouteParamsAndQuery<any>>()


export const projectsRoute = chainRoute({
    route: chainAuthorized(baseRoutes.projects),
    beforeOpen: startProjectsQuery,
    openOn: projectsQuery.finished.success
})

sample({
    clock: startProjectsQuery,
    source: {
        limit: $limit,
        offset: $offset
    },
    target: projectsQuery.start
})

reset({
    clock: [
        projectsRoute.closed,
    ],
    target: [
        $offset,
        $projects,
    ]
})