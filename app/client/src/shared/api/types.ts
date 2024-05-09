export type Task = {
    id: number,
    body: string,
    completed: boolean,
}

export type Project = {
    id: number,
    userId: number,
    name: string,
    description: string,
}

export type Session = {
    name: string,
    login: string,
    bio: string,
}