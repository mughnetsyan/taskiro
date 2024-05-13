import { createEvent, createStore, sample } from "effector";

import { applyBarrier } from "@farfetched/core";

import { invoke } from "@withease/factories";

import { createNewProjectMutation } from "features/create-new-entity";

import { authBarrier } from "entities/session";
import { createProjectsQuery } from "entities/project";

import { Project } from "shared/api";

import { LIMIT, OFFSET_STEP } from "../config";
import { baseRoutes } from "shared/routing";
import { debug, not } from "patronum";


export const loadedMoreProjects = createEvent()



export const $limit = createStore(LIMIT)

export const $offset = createStore(0)

export const $hasMore = createStore<boolean>(false)

export const $projects = createStore<Project[]>([])


export const projectsQuery = invoke(createProjectsQuery)

applyBarrier(projectsQuery, { barrier: authBarrier })

// TODO: FIX THIS LATER

sample({
    clock: sample({
        clock: loadedMoreProjects,
        filter: not(projectsQuery.$pending)
    }),
    source: $offset,
    filter: $hasMore,
    fn: (offset) => offset + OFFSET_STEP,
    target: $offset
})


sample({
    clock: sample({
        clock: $offset,
        filter: baseRoutes.projects.$isOpened,
    }),
    source: {
        limit: $limit,
        offset: $offset,
    },
    target: projectsQuery.start
})

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
    clock: createNewProjectMutation.finished.success,
    source: $offset,
    fn: (offset) => offset + 1,
    target: $offset
})