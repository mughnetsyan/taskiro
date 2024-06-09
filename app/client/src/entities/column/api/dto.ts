export type ColumnsQueryDto = {
    projectId: number

}

export type CreateColumnsNewMutationDto = {
    projectId: number
    name: string
}

export type DeleteColumnDto = {
    id: number
}