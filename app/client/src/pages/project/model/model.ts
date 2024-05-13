import { createStore, sample } from "effector";
import { applyBarrier } from "@farfetched/core";
import { invoke } from "@withease/factories";

import { authBarrier } from "entities/session";

import { createProjectQuery } from "entities/project";
import { spread } from "patronum";
import { createTasksQuery, deleteTaskMutation } from "entities/task";
import { Task } from "shared/api";
import { baseRoutes } from "shared/routing";
import { createNewTaskMutation } from "features/create-new-task";


export const projectQuery = invoke(createProjectQuery)
export const tasksQuery = invoke(createTasksQuery)

applyBarrier([projectQuery, tasksQuery],  { barrier: authBarrier })

export const $tasks = createStore<Task[]>([])

$tasks
    .on(tasksQuery.$data, (_, tasks) => tasks ? tasks : [])

export const $name = createStore<string>('')


sample({
    clock: projectQuery.$data,
    filter: Boolean,
    target: spread({
        name: $name,
    })
})

sample({
    clock: [createNewTaskMutation.finished.success, deleteTaskMutation.finished.success],
    source: baseRoutes.projects.project.$params,
    fn: ({id}) => ({projectId: id}),
    target: tasksQuery.start
})
