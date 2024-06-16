import { createFactory, invoke } from "@withease/factories";
import { createEvent, sample } from "effector";
import { applyBarrier } from "@farfetched/core";

import { authBarrier } from "entities/session";

import { createDeleteTaskMutation, DeleteTaskMutationDto } from "entities/task";


export const deleteTaskFactory = createFactory(() => {
    const taskDeleted = createEvent<DeleteTaskMutationDto>()

    const deleteTaskMutation = invoke(createDeleteTaskMutation)

    applyBarrier(deleteTaskMutation, { barrier: authBarrier })

    sample({
        clock: taskDeleted,
        target: deleteTaskMutation.start
    })

    return {
        events: {
            taskDeleted,
        },

        deleteTaskMutation
    }
})
