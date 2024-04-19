import { redirect } from "atomic-router"
import { sample } from "effector"
import { createForm } from "effector-forms"

import { signInMutation } from "entities/session"

import { routes } from "shared/routing"


export const $signInForm = createForm({
    fields: {
        login: {
            init: "",
        },
        password: {
            init: "",
        }
    },
})


sample({
    clock: $signInForm.formValidated,
    target: signInMutation.start
})

redirect({
    clock: signInMutation.finished.success,
    route: routes.dashboardRoute
})