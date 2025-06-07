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

export interface IProject {
    id: string,
    name: string,
    start_date: Date,
    end_date: Date,
    user_id: string,
    status?: string,
    completed_date?: Date
}

export type Strict<T> = {
    [P in keyof T]-?: NonNullable<T[P]>;
  };
  export interface ITask {
    id: number
    name: string
    description: string | null
    priority: string | null 
    type: string | null
    estimated_hours: number | null
    sprint_id: number | null
    project_id: string
    status: 'backlog' | 'todo' | 'inprogress' | 'done' | string
  }
  