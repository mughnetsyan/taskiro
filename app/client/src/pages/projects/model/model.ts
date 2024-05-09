import { createEvent, createStore, sample } from "effector";
import { invoke } from "@withease/factories";

import { createProjectsQuery } from "entities/project";

import { Project } from "shared/api";

import { LIMIT, OFFSET_STEP } from "../config";
import { debug } from "patronum";


export const loadedMoreProjects = createEvent()


export const $limit = createStore(LIMIT)

export const $offset = createStore(0)

export const $hasMore = createStore<boolean>(false)

export const $projects = createStore<Project[]>([])


export const projectsQuery = invoke(createProjectsQuery)


$offset
    .on(loadedMoreProjects, (offset) => offset + OFFSET_STEP)


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