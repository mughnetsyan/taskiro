import { createJsonMutation, createJsonQuery, declareParams } from "@farfetched/core";
import { createFactory } from "@withease/factories";

import { getRequestPath, undefinedContract } from "shared/api";

import { ColumnsQueryDto, CreateColumnsNewMutationDto, DeleteColumnDto } from "./dto";
import { columnsContract } from "./contracts";


export const createColumnsQuery = createFactory(() => (
    createJsonQuery({
        initialData: null,
        params: declareParams<ColumnsQueryDto>(),
        request: {
            method: 'GET',
            url: getRequestPath('columns'),
            query: ({projectId}) => ({projectId}),
            credentials: 'include'
        },
        response: {
            contract: columnsContract
        }
    })
))

export const createCreateNewColumnMutation = createFactory(() => (
    createJsonMutation({
        params: declareParams<CreateColumnsNewMutationDto>(),
        request: {
            method: 'POST',
            url: getRequestPath('columns'),
            body: ({name, projectId}) => ({name, projectId}),
            credentials: 'include'
        },
        response: {
            contract: undefinedContract
        }
    })
))

export const createDeleteColumnMutation = createFactory(() => (
    createJsonMutation({
        params: declareParams<DeleteColumnDto>(),
        request: {
            method: 'DELETE',
            url: getRequestPath('columns'),
            body: ({id}) => ({id}),
            credentials: 'include'
        },
        response: {
            contract: undefinedContract
        }
    })
))