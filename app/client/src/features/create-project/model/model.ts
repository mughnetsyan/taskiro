import { applyBarrier } from "@farfetched/core";
import { createFactory, invoke } from "@withease/factories";
import { createEvent, createStore, sample } from "effector";
import { createForm } from "effector-forms";

import { createCreateNewProjectMutation } from "entities/project";
import { authBarrier } from "entities/session";


export const createProjectFactory = createFactory(() => {
    const $isModalOpened = createStore(false)

    const modalToggled = createEvent()

    $isModalOpened
        .on(modalToggled, (opened) => !opened)


    const createNewProjectMutation = invoke(createCreateNewProjectMutation)

    applyBarrier(createNewProjectMutation, { barrier: authBarrier })


    const $createNewProjectForm = createForm({
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

    return {
        events: {
            modalToggled,
        },
        form: $createNewProjectForm,

        $isModalOpened,
        createNewProjectMutation
    }
})