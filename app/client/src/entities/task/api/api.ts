import { createJsonMutation, createJsonQuery, declareParams } from "@farfetched/core";

import { createFactory } from "@withease/factories";

import { getRequestPath, undefinedContract } from "shared/api";

import { CreateTaskDto, DeleteTaskMutationDto, TasksQueryDto, ToggleTaskMutationDto } from "./dto";
import { tasksContract } from "./contracts";


export const createTasksQuery = createFactory(() => (
    createJsonQuery({
        initialData: null,
        params: declareParams<TasksQueryDto>(),
        request: {
            method: 'GET',
            url: getRequestPath('tasks'),
            query: ({columnId}) => ({columnId}),
            credentials: 'include',
        },
        response: {
            contract: tasksContract
        }
    })
)) 

export const createCreateNewTaskMutation = createFactory(() => (
    createJsonMutation({
        params: declareParams<CreateTaskDto>(),
        request: {
            method: "POST",
            url: getRequestPath('tasks'),
            body: (body) => body,
            credentials: 'include'
        },
        response: {
            contract: undefinedContract
        }
    })
))

export const createToggleTaskMutation = createFactory(() => (
    createJsonMutation({
        params: declareParams<ToggleTaskMutationDto>(),
        request: {
            method: 'PATCH',
            url: getRequestPath('tasks'),
            body: ({id}) => ({id}),
            credentials: 'include',
        },
        response: {
            contract: undefinedContract
        }
    })
))


export const createDeleteTaskMutation = createFactory(() => (
    createJsonMutation({
        params: declareParams<DeleteTaskMutationDto>(),
        request: {
            method: 'DELETE',
            url: getRequestPath('tasks'),
            body: ({id}) => ({id}),
            credentials: 'include',
        },
        response: {
            contract: undefinedContract
        }
    })
))