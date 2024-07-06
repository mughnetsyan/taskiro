export type Task = {
    id: number,
    columnId: number,
    text: string,
    completed: boolean,
    order: number
}

export type Project = {
    id: number,
    userId: number,
    name: string,
    description: string,
}

export type Column = {
    id: number,
    projectId: number,
    name: string,
    order: number,
}

export type Session = {
    name: string,
    login: string,
    bio: string,
}