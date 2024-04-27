import { IRole } from "../../../shared/models/role";
import { IUser } from "../../../shared/models/user";

export interface UserState {
    users: IUser[] | null,
    roles: IRole[] | null
}

export const initialState: UserState = {
    users: [],
    roles: []
}