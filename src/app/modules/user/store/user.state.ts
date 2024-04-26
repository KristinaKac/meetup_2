import { IRole } from "../../../shared/models/role";
import { IUser } from "../../../shared/models/user";

export interface State {
    users: IUser[] | null,
    roles: IRole[] | null
}

export const initialState: State = {
    users: [],
    roles: []
}