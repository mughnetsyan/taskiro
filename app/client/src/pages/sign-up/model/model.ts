import { redirect } from "atomic-router"
import { sample } from "effector"
import { createForm } from "effector-forms"

import { signUpMutation } from "entities/session"

import { baseRoutes } from "shared/routing"


export const $signUpForm = createForm({
    fields: {
        login: {
            init: "",
        },
        name: {
            init: ""
        },
        bio: {
            init: ""
        },
        password: {
            init: "",
        }
    },
})

sample({
    clock: $signUpForm.formValidated,
    target: signUpMutation.start
})

redirect({
    clock: signUpMutation.finished.success,
    route: baseRoutes.dashboard
})