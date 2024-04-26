export interface IUser {
    email: string;
    id: number;
    password?: string,
    fio?: string,
    roles?: Array<IRoles> | null;
}

export interface IRoles {
    id: number,
    name: string,
    UserRole?: {
        id: number,
        userId: number,
        roleId: number
    }
}