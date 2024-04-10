import { createStore, sample } from "effector"
import { redirect } from "atomic-router"
import { applyBarrier } from "@farfetched/core"
import { spread } from "patronum"

import { routes } from "shared/routing"
import { Session } from "shared/api"

import { sessionQuery, authBarrier, signInMutation, signUpMutation } from "../api"


applyBarrier(sessionQuery, { barrier: authBarrier })

redirect({
    clock: [signInMutation.finished.success, signUpMutation.finished.success],
    route: routes.dashboardRoute
})


export const $login = createStore<string>('')

sample({
    source: sessionQuery.$data,
    filter: (data): data is Session => data !== null,
    target: spread({
        login: $login
    })
})