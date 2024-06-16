import { createEvent, sample } from "effector";
import { createFactory, invoke } from "@withease/factories";
import { applyBarrier } from "@farfetched/core";

import { authBarrier } from "entities/session";
import { createDeleteColumnMutation } from "entities/column";



export const deleteColumnFactory = createFactory(() => {
    const columnDeleted = createEvent<{id: number}>()

    const deleteColumnMutation = invoke(createDeleteColumnMutation)

    applyBarrier(deleteColumnMutation, { barrier: authBarrier })

    sample({
        clock: columnDeleted,
        target: deleteColumnMutation.start
    })

    return {
        events: {
            columnDeleted
        },

        deleteColumnMutation
    }
})
