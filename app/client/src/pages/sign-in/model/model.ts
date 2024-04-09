import { sample } from "effector"
import { createForm } from "effector-forms"

import { signInMutation } from "entities/session"


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