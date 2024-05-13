export type ProjectsQueryDto = {
    limit: number,
    offset: number
}

export type CreateNewProjectDto = {
    name: string,
    description: string,
}

export type ProjectQueryDto = {
    id: number
}