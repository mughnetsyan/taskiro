import { applyBarrier } from "@farfetched/core";
import { invoke } from "@withease/factories";
import { createEvent, createStore, sample } from "effector";
import { createForm } from "effector-forms";

import { createCreateNewProjectMutation } from "entities/project";
import { authBarrier } from "entities/session";


export const $isModalOpened = createStore(false)

export const modalToggled = createEvent()

$isModalOpened
    .on(modalToggled, (opened) => !opened)


export const createNewProjectMutation = invoke(createCreateNewProjectMutation)

applyBarrier(createNewProjectMutation, { barrier: authBarrier })


export const $createNewProjectForm = createForm({
    fields: {
        name:  {
            init: ""
        },
        description: {
            init: ""
        }
    }
})

sample({
    clock: $createNewProjectForm.formValidated,
    target: [
        createNewProjectMutation.start,
        modalToggled
    ]
})

sample({
    clock: modalToggled,
    target: $createNewProjectForm.reset
})