import { createStore, sample } from "effector";
import { applyBarrier } from "@farfetched/core";
import { invoke } from "@withease/factories";
import { spread } from "patronum";

import { createColumnFactory } from "features/create-column";
import { createTaskFactory } from "features/create-task";
import { deleteColumnFactory } from "features/delete-column";
import { deleteTaskFactory } from "features/delete-task";
import { toggleTaskFactory } from "features/toggle-task";

import { authBarrier } from "entities/session";
import { createProjectQuery } from "entities/project";
import { createColumnsQuery } from "entities/column";

import { Column } from "shared/api";
import { baseRoutes } from "shared/routing";



export const $$createTaskModel = invoke(createTaskFactory)
export const $$deleteTaskModel = invoke(deleteTaskFactory)
export const $$toggleTaskModel = invoke(toggleTaskFactory)

export const $$deleteColumnModel = invoke(deleteColumnFactory)
export const $$createColumnModel = invoke(createColumnFactory)

export const projectQuery = invoke(createProjectQuery)
export const columnsQuery = invoke(createColumnsQuery)

export const $name = createStore<string>('')
export const $columns = createStore<Column[]>([])


applyBarrier([projectQuery, columnsQuery],  { barrier: authBarrier })

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
        $$createTaskModel.createNewTaskMutation.finished.success, 
        $$createColumnModel.createNewColumnMutation.finished.success,
        $$deleteTaskModel.deleteTaskMutation.finished.success,
        $$deleteColumnModel.deleteColumnMutation.finished.success,
        $$toggleTaskModel.toggleTaskMutation.finished.success
    ],
    source: baseRoutes.projects.project.$params,
    fn: ({id}) => ({projectId: id}),
    target: columnsQuery.start
})
