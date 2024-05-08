import { createEvent, createStore, sample } from "effector";
import { invoke } from "@withease/factories";

import { createProjectsQuery } from "entities/project";

import { Project } from "shared/api";

import { LIMIT, OFFSET_STEP } from "../config";


export const loadedMoreProjects = createEvent()


export const $limit = createStore(LIMIT)

export const $offset = createStore(0)

export const $projects = createStore<Project[]>([])


export const projectsQuery = invoke(createProjectsQuery)


$offset
    .on(loadedMoreProjects, (offset) => offset + OFFSET_STEP)


sample({
    clock: projectsQuery.finished.success,
    source: {
        projects: $projects,
        result: projectsQuery.$data
    },
    filter: ({result}) => result !== null,
    fn: ({projects, result}) => [...projects, ...result as Project[]],
    target: $projects
})

sample({
    clock: loadedMoreProjects,
    source: {
        limit: $limit,
        offset: $offset,
    },
    target: projectsQuery.start
})