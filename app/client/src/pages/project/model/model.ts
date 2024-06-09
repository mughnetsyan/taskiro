import { createStore, sample } from "effector";
import { applyBarrier } from "@farfetched/core";
import { invoke } from "@withease/factories";
import { spread } from "patronum";

import { createNewTaskMutation } from "features/create-new-task";
import { createColumnMutation } from "features/create-new-column";

import { authBarrier } from "entities/session";
import { deleteTaskMutation } from "entities/task";
import { createProjectQuery } from "entities/project";
import { createColumnsQuery, deleteColumnMutation } from "entities/column";


import { Column } from "shared/api";
import { baseRoutes } from "shared/routing";



export const projectQuery = invoke(createProjectQuery)
export const columnsQuery = invoke(createColumnsQuery)

applyBarrier([projectQuery, columnsQuery],  { barrier: authBarrier })

export const $name = createStore<string>('')
export const $columns = createStore<Column[]>([])

sample({
    clock: projectQuery.$data,
    filter: Boolean,
    target: spread({
        name: $name,
    })
})

sample({
    clock: columnsQuery.$data,
    filter: Boolean,
    target: $columns
})

sample({
    clock: [
        createNewTaskMutation.finished.success, 
        deleteTaskMutation.finished.success,
        createColumnMutation.finished.success,
        deleteColumnMutation.finished.success
    ],
    source: baseRoutes.projects.project.$params,
    fn: ({id}) => ({projectId: id}),
    target: columnsQuery.start
})
