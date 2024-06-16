export type ProjectsQueryDto = {
    limit: number,
    offset: number
}

export type ProjectQueryDto = {
    id: number
}

export type CreateNewProjectMutationDto = {
    name: string,
    description: string,
}

export type DeleteProjectMutationDto = {
    id: number
}