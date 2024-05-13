import { createJsonMutation, createJsonQuery, declareParams, unknownContract } from "@farfetched/core";
import { createFactory } from "@withease/factories";

import { getRequestPath } from "shared/api";

import { projectContract, projectsContract } from "./contracts";
import { CreateNewProjectDto, ProjectQueryDto, ProjectsQueryDto } from "./dto";


export const createProjectsQuery = createFactory(() => 
    createJsonQuery({
        initialData: null,
        params: declareParams<ProjectsQueryDto>(),
        request: {
            method: 'GET',
            url: getRequestPath('projects'),
            credentials: 'include',
            query: ({limit, offset}) => ({limit, offset})
        },
        response: {
            contract: projectsContract
        }
    }
))

export const createProjectQuery = createFactory(() => 
    createJsonQuery({
        initialData: null,
        params: declareParams<ProjectQueryDto>(),
        request: {
            method: 'GET',
            url: ({id}) => getRequestPath(`projects/${id}`),
            credentials: 'include'
        },
        response: {
            contract: projectContract
        }
    })
)

export const createCreateNewProjectMutation = createFactory(() => 
    createJsonMutation({
        params: declareParams<CreateNewProjectDto>(),
        request: {
            method: 'POST',
            url: getRequestPath('projects'),
            credentials: 'include',
            body: ({name, description}) => ({name, description})
        },
        response: {
            contract: unknownContract
        }
    })
)