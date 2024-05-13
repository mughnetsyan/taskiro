import { createEvent, sample } from "effector";

import { combineEvents } from "patronum";

import { chainRoute, RouteParamsAndQuery } from "atomic-router";
import { chainAuthorized } from "entities/session";
import { baseRoutes } from "shared/routing";
import { projectQuery, tasksQuery } from "./model";


const startProjectQuery = createEvent()
const startTasksQuery = createEvent()

const startQueries = createEvent<RouteParamsAndQuery<any>>()

export const projectRoute = chainRoute({
    route: chainAuthorized(baseRoutes.projects.project),
    beforeOpen: startQueries,
    openOn: combineEvents([projectQuery.finished.success, tasksQuery.finished.success])  
})

sample({
    clock: startQueries,
    target: [startProjectQuery, startTasksQuery]
})

sample({
    clock: startProjectQuery,
    source: baseRoutes.projects.project.$params,
    target: projectQuery.start
})

sample({
    clock: startTasksQuery,
    source: baseRoutes.projects.project.$params,
    fn: ({id}) => ({projectId: id}),
    target: tasksQuery.start
})