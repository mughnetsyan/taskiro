import { createStore } from "effector";
import { invoke } from "@withease/factories";

import { createProjectsQuery } from "entities/project";


export const $limit = createStore(6)
export const $offset = createStore(0)

export const projectsQuery = invoke(createProjectsQuery)