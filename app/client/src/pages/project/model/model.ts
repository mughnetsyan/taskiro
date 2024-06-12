import { createStore, sample } from "effector";
import { applyBarrier } from "@farfetched/core";
import { invoke } from "@withease/factories";
import { spread } from "patronum";

import { createNewColumnFactory } from "features/create-new-column";

import { authBarrier } from "entities/session";
import { createProjectQuery } from "entities/project";
import { createColumnModel, createColumnsQuery } from "entities/column";

import { Column } from "shared/api";
import { baseRoutes } from "shared/routing";
import { createTaskModel } from "entities/task";
import { createCreateNewTaskModel } from "features/create-new-task";


export const $$taskModel = invoke(createTaskModel)
export const $$columnModel = invoke(createColumnModel)
export const $$createNewTaskModel = invoke(createCreateNewTaskModel)
export const $$createNewColumnModel = invoke(createNewColumnFactory)

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
        $$createNewTaskModel.createNewTaskMutation.finished.success, 
        $$createNewColumnModel.createNewColumnMutation.finished.success,
        $$taskModel.deleteTaskMutation.finished.success,
        $$columnModel.deleteColumnMutation.finished.success
    ],
    source: baseRoutes.projects.project.$params,
    fn: ({id}) => ({projectId: id}),
    target: columnsQuery.start
})
