import { createEvent, sample } from "effector";
import { createFactory, invoke } from "@withease/factories";

import { deleteProjectMutationFactory, DeleteProjectMutationDto } from "entities/project";


export const deleteProjectFactory = createFactory(() => {
    const projectDeleted = createEvent<DeleteProjectMutationDto>()

    const deleteProjectMutation = invoke(deleteProjectMutationFactory)

    sample({
        clock: projectDeleted,
        target: deleteProjectMutation.start
    })

    return {
        events: {
            projectDeleted
        },

        deleteProjectMutation
    }
})