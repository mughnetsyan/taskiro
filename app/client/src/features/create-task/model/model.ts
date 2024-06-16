import { createEvent, createStore, sample } from "effector"
import { createForm } from "effector-forms"

import { createFactory, invoke } from "@withease/factories"
import { createCreateNewTaskMutation } from "entities/task"
import { authBarrier } from "entities/session"
import { applyBarrier } from "@farfetched/core"


export const createTaskFactory = createFactory(() => {
    const $currentColumnId = createStore<number | null>(null)

    const currentColumnIdSet = createEvent<{columnId: number}>()

    const createNewTaskMutation = invoke(createCreateNewTaskMutation)

    applyBarrier(createNewTaskMutation, { barrier: authBarrier })

    const $createNewTaskForm = createForm({
        fields: {
            text: {
                init: ""
            }
        }
    })

    sample({
        clock: $createNewTaskForm.formValidated,
        source: $currentColumnId,
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
            $currentColumnId,
            $createNewTaskForm.reset
        ]
    })

    return {
        events: {
            currentColumnIdSet,
        },

        form: $createNewTaskForm,
        createNewTaskMutation
    }
})

