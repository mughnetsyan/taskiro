import { createEvent, sample } from "effector";
import { invoke } from "@withease/factories";

import { createDeleteColumnMutation } from "../api";
import { authBarrier } from "entities/session";
import { applyBarrier } from "@farfetched/core";

export const columnDeleted = createEvent<{id: number}>()

export const deleteColumnMutation = invoke(createDeleteColumnMutation)

applyBarrier(deleteColumnMutation, { barrier: authBarrier })

sample({
    clock: columnDeleted,
    target: deleteColumnMutation.start
})