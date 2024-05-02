import { createReducer, on } from "@ngrx/store";
import { UserState } from "./user";
import { addRoleUserApi, createUserApi, deleteUserApi, getAllRolesApi, getAllUsersApi, updateUserApi } from "./user.actions";

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
                user.id === action.user!.id ? { ...user, user: action.user!, roles: user.roles } : user)
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

        return {
            ...state,
            users: state.users!.map(user =>
                user.id === action.role?.userId ? 
                 {...user, roles: user.roles} 
                    : user)
        }
    }),
    on(getAllRolesApi, (state, action) => {
        return {
            ...state,
            roles: action.roles
        }
    }),
)