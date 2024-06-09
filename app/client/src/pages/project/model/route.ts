import { createEvent, sample } from "effector";

import { combineEvents } from "patronum";

import { chainRoute, RouteParamsAndQuery } from "atomic-router";
import { chainAuthorized } from "entities/session";
import { baseRoutes } from "shared/routing";
import { projectQuery, columnsQuery } from "./model";


const startProjectQuery = createEvent()
const startColumnsQuery = createEvent()

const startQueries = createEvent<RouteParamsAndQuery<any>>()

export const projectRoute = chainRoute({
    route: chainAuthorized(baseRoutes.projects.project),
    beforeOpen: startQueries,
    openOn: combineEvents([projectQuery.finished.success, columnsQuery.finished.success])  
})

sample({
    clock: startQueries,
    target: [startProjectQuery, startColumnsQuery]
})

sample({
    clock: startProjectQuery,
    source: baseRoutes.projects.project.$params,
    target: projectQuery.start
})

sample({
    clock: startColumnsQuery,
    source: baseRoutes.projects.project.$params,
    fn: ({id}) => ({projectId: id}),
    target: columnsQuery.start
})