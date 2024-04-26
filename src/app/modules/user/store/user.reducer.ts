import { createReducer, on } from "@ngrx/store";
import { addRoleApi, createApi, deleteUserApi, getAllApi, getRolesApi, updateApi } from "./user.actions";
import { initialState } from "./user.state";
import { IRoles } from "../../../shared/models/user";

const _userReducer = createReducer(initialState,
    on(getAllApi, (state, action) => {
        return {
            ...state,
            users: action.users
        }
    }),
    on(updateApi, (state, action) => {
        return {
            ...state,
            users: state.users!.map(user =>
                user.id === action.user!.id ? action.user! : user)
        }
    }),
    on(createApi, (state, action) => {
        return {
            ...state,
            users: [...state.users!, action.user!]
        }
    }),
    on(deleteUserApi, (state, action) => {
        return {
            ...state,
            users: state.users!.filter((user) => user.id !== action.user!.id)
        }
    }),
    on(addRoleApi, (state, action) => {
        // доделать
        return {
            ...state,
        }
    }),
    on(getRolesApi, (state, action) => {
        return {
            ...state,
            roles: action.roles
        }
    }),
)

export function userReducer(state: any, action: any) {
    return _userReducer(state, action);
}