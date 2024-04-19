import { createBarrier, isHttpErrorCode } from "@farfetched/core"

import { refreshSessionMutation } from "./api"


export const authBarrier = createBarrier({
    activateOn: {
        failure: isHttpErrorCode(401)
    },
    perform: [ refreshSessionMutation ]
})