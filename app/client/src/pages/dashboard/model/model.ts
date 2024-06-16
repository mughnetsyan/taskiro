import { combine, createStore, sample } from "effector";
import { spread } from "patronum";
import { applyBarrier } from "@farfetched/core";
import { invoke } from "@withease/factories";

import { $$createProjectModel } from "widgets/sidebar";

import { deleteProjectFactory } from "features/delete-project";


import { createProjectsQuery } from "entities/project";
import { projectFactory } from "entities/project/model";
import { authBarrier } from "entities/session";

import { baseRoutes } from "shared/routing";
import { Project } from "shared/api";


export const $$deleteProjectModel = invoke(deleteProjectFactory)

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
    clock: [
        $$createProjectModel.createNewProjectMutation.finished.success,
        $$deleteProjectModel.deleteProjectMutation.finished.success
    ],
    source: {
        limit: $limit,
        offset: $offset,
    },
    filter: baseRoutes.dashboard.$isOpened,
    target: projectsQuery.start
})