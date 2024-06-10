import { createEvent, sample } from "effector";
import { createFactory, invoke } from "@withease/factories";

import { createDeleteColumnMutation } from "../api";
import { authBarrier } from "entities/session";
import { applyBarrier } from "@farfetched/core";

export const createColumnModel = createFactory(() => {
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


