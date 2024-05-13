import { combine, createStore, sample } from "effector";
import { invoke } from "@withease/factories";

import { createNewProjectMutation } from "features/create-new-project";

import { createProjectsQuery } from "entities/project";
import { applyBarrier } from "@farfetched/core";
import { authBarrier } from "entities/session";
import { baseRoutes } from "shared/routing";
import { Project } from "shared/api";
import { spread } from "patronum";


export const projectsQuery = invoke(createProjectsQuery)

applyBarrier(projectsQuery, { barrier: authBarrier })

export const $limit = createStore(6)
export const $offset = createStore(0)

export const $projects = createStore<Project[]>([])
export const $count = createStore(0)

export const $hasMore = combine($count, $limit, (count, limit) => count > limit)


sample({
    clock: projectsQuery.$data,
    filter: Boolean,
    target: spread({
        projects: $projects,
        count: $count
    })
})


sample({
    clock: createNewProjectMutation.finished.success,
    source: {
        limit: $limit,
        offset: $offset,
    },
    filter: baseRoutes.dashboard.$isOpened,
    target: projectsQuery.start
})