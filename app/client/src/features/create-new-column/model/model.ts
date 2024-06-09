import { applyBarrier } from "@farfetched/core";
import { invoke } from "@withease/factories";
import { createEvent, createStore, sample } from "effector";
import { createForm } from "effector-forms";

import { createCreateNewColumnMutation } from "entities/column";
import { authBarrier } from "entities/session";
import { baseRoutes } from "shared/routing";


export const $isModalOpened = createStore(false)

export const modalToggled = createEvent()

$isModalOpened
    .on(modalToggled, (opened) => !opened)


    
export const createColumnMutation = invoke(createCreateNewColumnMutation)

applyBarrier(createColumnMutation, { barrier: authBarrier })


export const $createNewColumnForm = createForm({
    fields: {
        name:  {
            init: ""
        }
    }
})

sample({
    clock: $createNewColumnForm.formValidated,
    source: baseRoutes.projects.project.$params,
    fn: ({id}, {name}) => ({projectId: id, name}),
    target: [
        createColumnMutation.start,
        modalToggled
    ]
})


sample({
    clock: modalToggled,
    target: $createNewColumnForm.reset
})