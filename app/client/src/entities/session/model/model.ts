import { createStore, sample } from "effector"
import { redirect } from "atomic-router"
import { applyBarrier } from "@farfetched/core"
import { debug, spread } from "patronum"

import { routes } from "shared/routing"
import { Session } from "shared/api"

import { sessionQuery, authBarrier, signInMutation, signUpMutation, refreshSessionMutation } from "../api"


applyBarrier(sessionQuery, { barrier: authBarrier })


export const $login = createStore<string>('')
export const $name = createStore<string>('')
export const $bio = createStore<string>('')

sample({
    source: sessionQuery.$data,
    filter: (data): data is Session => data !== null,
    target: spread({
        login: $login,
        name: $name,
        bio: $bio
    })
})

redirect({
    clock: refreshSessionMutation.finished.failure,
    route: routes.signUpRoute
})