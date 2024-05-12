import { createJsonMutation, createJsonQuery, declareParams, unknownContract } from "@farfetched/core";
import { createFactory } from "@withease/factories";

import { getRequestPath } from "shared/api";

import { projectsContract } from "./contracts";
import { CreateNewProjectDto, ProjectsQueryDto } from "./dto";


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