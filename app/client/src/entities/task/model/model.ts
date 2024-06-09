import { invoke } from "@withease/factories";
import { createEvent, sample } from "effector";

import { createDeleteTaskMutation, createToggleTaskMutation, DeleteTaskMutationDto } from "../api";
import { ToggleTaskMutationDto } from "../api";
import { authBarrier } from "entities/session";
import { applyBarrier } from "@farfetched/core";

export const taskToggled = createEvent<ToggleTaskMutationDto>()
export const taskDeleted = createEvent<DeleteTaskMutationDto>()

export const toggleTaskMutation = invoke(createToggleTaskMutation)
export const deleteTaskMutation = invoke(createDeleteTaskMutation)

applyBarrier([toggleTaskMutation, deleteTaskMutation], { barrier: authBarrier })

sample({
    clock: taskToggled,
    target: toggleTaskMutation.start
})


sample({
    clock: taskDeleted,
    target: deleteTaskMutation.start
})
