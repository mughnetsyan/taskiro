import { sample } from "effector"
import { createForm } from "effector-forms"

import { signUpMutation } from "entities/session"


export const $signUpForm = createForm({
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
    clock: $signUpForm.formValidated,
    target: signUpMutation.start
})