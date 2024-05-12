import { createStore, sample } from "effector";
import { invoke } from "@withease/factories";

import { createNewProjectMutation } from "features/create-new-entity";

import { createProjectsQuery } from "entities/project";
import { applyBarrier } from "@farfetched/core";import { authBarrier } from "entities/session";
import { baseRoutes } from "shared/routing";



export const $limit = createStore(6)
export const $offset = createStore(0)

export const projectsQuery = invoke(createProjectsQuery)

applyBarrier(projectsQuery, { barrier: authBarrier })

sample({
    clock: createNewProjectMutation.finished.success,
    source: {
        limit: $limit,
        offset: $offset
    },
    filter: baseRoutes.dashboard.$isOpened,
    target: projectsQuery.start
})