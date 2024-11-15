export interface IResponse<T> {
    response?: T,
    code?: 'success' | 'pending' | 'error' | 'info',
    error?: string
}

export interface IUser {
    id: string,
    name: string,
    email: string,
    password: string,
    role_id?: string,
    admin_id?: string,
    verified?: boolean
}

export interface IEmail {
    from: string,
    to: string | Array<string>,
    subject: string,
    body: React.ReactNode | string
}