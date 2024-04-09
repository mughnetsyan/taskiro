export type Task = {
    id: number,
    body: string,
    completed: boolean,
}

export type Project = {
    id: number
    name: string,
    description: string,
}

export type Session = {
    login: string,
}

// export type Session = {
//     name: string,
//     login: string,
//     bio: string,
//     experience: number,
//     avatarUrl: string,
//     projects: Project[]
// }
