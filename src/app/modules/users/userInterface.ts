export interface tUser{
    id: string,
    password: string,
    needsPassChange: boolean,
    role: 'admin' | 'student' | 'faculty',
    status: 'in-progress' | 'blocked',
    isDeleted: boolean
}