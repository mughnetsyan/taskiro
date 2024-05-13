export type TasksQueryDto = {
    projectId: number
}

export type CreateTaskDto = {
    projectId: number,
    text: string
}

export type ToggleTaskMutationDto = {
    id: number
}

export type DeleteTaskMutationDto = {
    id: number
}