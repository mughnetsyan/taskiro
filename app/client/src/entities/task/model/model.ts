import { invoke } from "@withease/factories";
import { createEvent, sample } from "effector";

import { createDeleteTaskMutation, createToggleTaskMutation, DeleteTaskMutationDto } from "../api";
import { ToggleTaskMutationDto } from "../api";

export const taskToggled = createEvent<ToggleTaskMutationDto>()
export const taskDeleted = createEvent<DeleteTaskMutationDto>()

export const toggleTaskMutation = invoke(createToggleTaskMutation)
export const deleteTaskMutation = invoke(createDeleteTaskMutation)

sample({
    clock: taskToggled,
    target: toggleTaskMutation.start
})


sample({
    clock: taskDeleted,
    target:  deleteTaskMutation.start
})
