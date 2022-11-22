export type User = {
    id: number
    email: string
    username: string
}

export type State = {
    loading: boolean
    users: User[]
}

export const state: State = {
    loading: false,
    users: []
}