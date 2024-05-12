export type CreateProjectDto = {
    userId: number,
    name: string,
    description: string
}

export type GetProjectsAndCountDto = {
    userId: number,
    limit: number,
    offset: number
}