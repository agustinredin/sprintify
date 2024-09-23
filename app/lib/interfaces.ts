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

export interface IEmail {
    from: string,
    to: string | Array<string>,
    subject: string,
    body: React.ReactNode | string
}