import { applyBarrier } from "@farfetched/core";
import { invoke, createFactory } from "@withease/factories";
import { createEvent, createStore, sample } from "effector";
import { createForm } from "effector-forms";

import { createCreateNewColumnMutation } from "entities/column";
import { authBarrier } from "entities/session";
import { baseRoutes } from "shared/routing";

export const createNewColumnFactory = createFactory(() => {
    const $isModalOpened = createStore(false)

    const modalToggled = createEvent()

    $isModalOpened
        .on(modalToggled, (opened) => !opened)


    const createNewColumnMutation = invoke(createCreateNewColumnMutation)

    applyBarrier(createNewColumnMutation, { barrier: authBarrier })


    const $createNewColumnForm = createForm({
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
            createNewColumnMutation.start,
            modalToggled
        ]
    })


    sample({
        clock: modalToggled,
        target: $createNewColumnForm.reset
    })

    return {
        events: {
            modalToggled
        },
        form: $createNewColumnForm,
        $isModalOpened,

        createNewColumnMutation
    }
})