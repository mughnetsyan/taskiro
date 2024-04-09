import { applyBarrier, createBarrier, isHttpErrorCode } from "@farfetched/core"

import { refreshSessionQuery, sessionQuery } from "./api"


export const authBarrier = createBarrier({
    activateOn: {
        failure: isHttpErrorCode(401)
    },
    perform: [
        refreshSessionQuery
    ]
})