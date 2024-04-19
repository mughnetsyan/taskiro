import { chainRoute, RouteInstance, RouteParamsAndQuery } from "atomic-router";

import { sessionQuery } from "entities/session"
import { createEvent, sample } from "effector";


// use something like this, when the issue will be closed
// https://github.com/igorkamyshev/farfetched/issues/457
//
// export const chainAuthorized = (route: RouteInstance<any>) => {
//     return chainRoute({ 
//         route: chainRoute({
//             route,
//             ...startChain(sessionQuery)
//         }),
//         ...barrierChain(authBarrier)
//     })
// }
export const chainAuthorized = (route: RouteInstance<any>) => {
    const authCheckStarted = createEvent<RouteParamsAndQuery<any>>()

    sample({
        clock: authCheckStarted,
        target: sessionQuery.start
    })

    return chainRoute({ 
        route: route,
        beforeOpen: authCheckStarted,
        openOn: sessionQuery.finished.success
    })
}