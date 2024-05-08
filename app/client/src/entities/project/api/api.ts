import { createJsonQuery, declareParams } from "@farfetched/core";
import { createFactory } from "@withease/factories";

import { getRequestPath } from "shared/api";

import { projectsContract } from "./contracts";
import { ProjectsQueryDto } from "./dto";


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