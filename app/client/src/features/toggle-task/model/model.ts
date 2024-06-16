import { createFactory, invoke } from "@withease/factories";
import { createEvent, sample } from "effector";
import { applyBarrier } from "@farfetched/core";

import { authBarrier } from "entities/session";

import { createToggleTaskMutation, ToggleTaskMutationDto } from "entities/task";


export const toggleTaskFactory = createFactory(() => {
    const taskToggled = createEvent<ToggleTaskMutationDto>()

    const toggleTaskMutation = invoke(createToggleTaskMutation)

    applyBarrier(toggleTaskMutation, { barrier: authBarrier })

    sample({
        clock: taskToggled,
        target: toggleTaskMutation.start
    })

    return {
        events: {
            taskToggled,
        },

        toggleTaskMutation,
    }
})