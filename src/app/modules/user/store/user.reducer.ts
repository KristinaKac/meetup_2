import { createReducer, on } from "@ngrx/store";
import { addRoleUserApi, createUserApi, deleteUserApi, getAllRolesApi, getAllUsersApi, updateUserApi } from "./user.actions";
import { UserState } from "./user";

export const initialState: UserState = {
    users: [],
    roles: []
}

export const userReducer = createReducer(initialState,
    on(getAllUsersApi, (state, action) => {
        return {
            ...state,
            users: action.users
        }
    }),
    on(updateUserApi, (state, action) => {
        return {
            ...state,
            users: state.users!.map(user =>
                user.id === action.user!.id ? action.user! : user)
        }
    }),
    on(createUserApi, (state, action) => {
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
    on(addRoleUserApi, (state, action) => {
        // доделать
        return {
            ...state,
        }
    }),
    on(getAllRolesApi, (state, action) => {
        return {
            ...state,
            roles: action.roles
        }
    }),
)