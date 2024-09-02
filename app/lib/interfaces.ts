export interface IResponse<T> {
    response?: T,
    code?: 'success' | 'pending' | 'error',
    error?: string
}

export interface IUser {
    id: string,
    name: string,
    email: string,
    password: string
}