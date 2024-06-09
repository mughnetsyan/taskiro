import { createEvent, createStore, sample } from "effector"
import { createForm } from "effector-forms"

import { invoke } from "@withease/factories"
import { createCreateNewTaskMutation } from "entities/task"
import { authBarrier } from "entities/session"
import { applyBarrier } from "@farfetched/core"


export const $columnId = createStore<number | null>(null)

export const currentColumnIdSet = createEvent<{columnId: number}>()

export const submitCreateNewTaskForm = createEvent()


export const createNewTaskMutation = invoke(createCreateNewTaskMutation)

applyBarrier(createNewTaskMutation, { barrier: authBarrier })

export const $createNewTaskForm = createForm({
    fields: {
        text: {
            init: ""
        }
    }
})

sample({
    clock: $createNewTaskForm.formValidated,
    source: $columnId,
    filter: Boolean,
    fn: (columnId, formData) => ({...formData, columnId}), 
    target: [
        createNewTaskMutation.start,
    ]
})


sample({
    clock: currentColumnIdSet,
    fn: ({columnId}) => columnId,
    target: [
        $columnId,
        $createNewTaskForm.reset
    ]
})