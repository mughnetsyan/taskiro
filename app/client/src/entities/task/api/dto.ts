export type TasksQueryDto = {
    columnId: number
}

export type CreateTaskDto = {
    columnId: number,
    text: string
}

export type ToggleTaskMutationDto = {
    id: number
}

export type DeleteTaskMutationDto = {
    id: number
}