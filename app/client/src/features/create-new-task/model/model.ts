import { createEvent, createStore, sample } from "effector"
import { createForm } from "effector-forms"

import { invoke } from "@withease/factories"
import { createCreateNewTaskMutation } from "entities/task"
import { baseRoutes } from "shared/routing"

export const $isModalOpened = createStore(false)

export const modalToggled = createEvent()

$isModalOpened
    .on(modalToggled, (opened) => !opened)


export const createNewTaskMutation = invoke(createCreateNewTaskMutation)


export const $createNewTaskForm = createForm({
    fields: {
        text: {
            init: ""
        }
    }
})

sample({
    clock: $createNewTaskForm.formValidated,
    source: baseRoutes.projects.project.$params,
    fn: (params, formData) => ({...formData, projectId: params.id}), 
    target: [
        createNewTaskMutation.start,
        modalToggled
    ],
})

sample({
    clock: modalToggled,
    target: $createNewTaskForm.reset
})