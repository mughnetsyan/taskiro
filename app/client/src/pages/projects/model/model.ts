import { combine, createEvent, createStore, sample } from "effector";
import { debug, not, spread } from "patronum";
import { applyBarrier } from "@farfetched/core";
import { invoke } from "@withease/factories";

import { $$createProjectModel } from "widgets/sidebar";

import { deleteProjectFactory } from "features/delete-project";

import { authBarrier } from "entities/session";
import { createProjectsQuery } from "entities/project";

import { Project } from "shared/api";
import { baseRoutes } from "shared/routing";


import { LIMIT, OFFSET_STEP } from "../config";


export const $$deleteProjectModel = invoke(deleteProjectFactory)

export const $limit = createStore(LIMIT)

export const $offset = createStore(0)

export const projectsQuery = invoke(createProjectsQuery)

applyBarrier(projectsQuery, { barrier: authBarrier })

export const triggeredLoadingMoreProjects = createEvent()

export const loadedMoreProjects = createEvent()

export const $projects = createStore<Project[]>([])
export const $count = createStore(0)
export const $hasMore = combine($count, $limit, $offset, (count, limit, offset) => count >= Math.max(limit, offset))


sample({
    clock: projectsQuery.$data,
    source: $projects,
    fn: (projects, result) => ({
        projects: [...projects, ...result?.projects as Project[]],
        count: result?.count as number
    }),
    target: spread({
        projects: $projects,
        count: $count
    })
})

sample({
    clock: triggeredLoadingMoreProjects,
    source: $offset,
    filter: not(projectsQuery.$pending),
    fn: (offset) => offset + OFFSET_STEP,
    target: $offset
})

sample({
    clock: $offset,
    filter: baseRoutes.projects.overview.$isOpened,
    fn: () => {},
    target: loadedMoreProjects
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
    clock: $$createProjectModel.createNewProjectMutation.finished.success,
    source: $count,
    fn: (count) => ({
        limit: 1,
        offset: count
    }),
    target: projectsQuery.start
})

// implement optimistic later by effector-undo or custom API
sample({
    clock: $$deleteProjectModel.events.projectDeleted,
    source: $projects,
    fn: (projects, {id}) => projects.filter((project) => project.id !== id),
    target: $projects
})