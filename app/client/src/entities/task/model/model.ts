import { createFactory, invoke } from "@withease/factories";
import { createEvent, sample } from "effector";
import { applyBarrier } from "@farfetched/core";

import { authBarrier } from "entities/session";

import { createDeleteTaskMutation, createToggleTaskMutation, DeleteTaskMutationDto, ToggleTaskMutationDto } from "../api";


export const createTaskModel = createFactory(() => {
    const taskToggled = createEvent<ToggleTaskMutationDto>()
    const taskDeleted = createEvent<DeleteTaskMutationDto>()

    const toggleTaskMutation = invoke(createToggleTaskMutation)
    const deleteTaskMutation = invoke(createDeleteTaskMutation)

    applyBarrier([toggleTaskMutation, deleteTaskMutation], { barrier: authBarrier })

    sample({
        clock: taskToggled,
        target: toggleTaskMutation.start
    })

    sample({
        clock: taskDeleted,
        target: deleteTaskMutation.start
    })

    return {
        events: {
            taskToggled,
            taskDeleted,
        },

        toggleTaskMutation,
        deleteTaskMutation
    }
})
