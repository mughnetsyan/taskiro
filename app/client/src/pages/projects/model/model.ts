import { createEvent, createStore, sample } from "effector";

import { applyBarrier } from "@farfetched/core";

import { invoke } from "@withease/factories";

import { createNewProjectMutation } from "features/create-new-entity";

import { authBarrier } from "entities/session";
import { createProjectsQuery } from "entities/project";

import { Project } from "shared/api";

import { LIMIT, OFFSET_STEP } from "../config";
import { baseRoutes } from "shared/routing";
import { debug } from "patronum";



export const loadedMoreProjects = createEvent()



export const $limit = createStore(LIMIT)

export const $offset = createStore(0)

export const $hasMore = createStore<boolean>(false)

export const $projects = createStore<Project[]>([])


export const projectsQuery = invoke(createProjectsQuery)

applyBarrier(projectsQuery, { barrier: authBarrier })


$offset
    .on(loadedMoreProjects, (offset) => offset + OFFSET_STEP)

debug({"query started": projectsQuery.finished.finally, "hasMore": $hasMore})

sample({
    clock: projectsQuery.$data,
    source: $projects,
    filter: (_, result) => result?.projects !== null,
    fn: (projects, result) => [...projects, ...result?.projects as Project[]],
    target: $projects
})

sample({
    clock: projectsQuery.$data,
    fn: (result) => result?.hasMore as boolean,
    target: $hasMore
})

sample({
    clock: loadedMoreProjects,
    source: {
        limit: $limit,
        offset: $offset,
    },
    filter: $hasMore,
    target: projectsQuery.start
})

sample({
    clock: createNewProjectMutation.finished.success,
    source: {
        limit: $limit,
        offset: $offset
    },
    target: [
        projectsQuery.start
    ]
})