import { createReducer, on } from "@ngrx/store";
import { UserState } from "./user";
import { UserActionTypes, addRoleUserApi, createUserApi, deleteUserApi, getAllRolesApi, getAllUsersApi, updateUserApi } from "./user.actions";
import { IRoles, IUser } from "../../../shared/models/user";
import { TypedAction } from "@ngrx/store/src/models";
import { IRole } from "../../../shared/models/role";

export const initialState: UserState = {
    users: [],
    roles: []
}

export const userReducer = createReducer(initialState,
    on(getAllUsersApi, (state: UserState, action: {
        users: IUser[] | null;
    } & TypedAction<UserActionTypes.requestAllUsersApi> & {
        type: UserActionTypes.requestAllUsersApi;
    }): UserState => {
        return {
            ...state,
            users: action.users
        }
    }),
    on(updateUserApi, (state: UserState, action: {
        user: IUser | null;
    } & TypedAction<UserActionTypes.updateUserApi> & {
        type: UserActionTypes.updateUserApi;
    }): UserState => {
        return {
            ...state,
            users: state.users!.map((user: IUser): IUser | { user: IUser; roles: IRoles[] | null | undefined; email: string; id: number; password?: string | undefined; fio?: string | undefined; } =>
                user.id === action.user!.id ? { ...user, user: action.user!, roles: user.roles } : user)
        }
    }),
    on(createUserApi, (state: UserState, action: {
        user: IUser | null;
    } & TypedAction<UserActionTypes.createUserApi> & {
        type: UserActionTypes.createUserApi;
    }): UserState => {
        return {
            ...state,
            users: [...state.users!, action.user!]
        }
    }),
    on(deleteUserApi, (state: UserState, action: {
        user: IUser | null;
    } & TypedAction<UserActionTypes.deleteUserApi> & {
        type: UserActionTypes.deleteUserApi;
    }): UserState => {
        return {
            ...state,
            users: state.users!.filter((user: IUser): boolean => user.id !== action.user!.id)
        }
    }),
    on(addRoleUserApi, (state: UserState, action: {
        role: IRole | null;
    } & TypedAction<UserActionTypes.addRoleUserApi> & {
        type: UserActionTypes.addRoleUserApi;
    }): UserState => {

        return {
            ...state,
            users: state.users!.map((user: IUser): IUser =>
                user.id === action.role?.userId ?
                    { ...user, roles: user.roles }
                    : user)
        }
    }),
    on(getAllRolesApi, (state: UserState, action: {
        roles: IRole[] | null;
    } & TypedAction<UserActionTypes.getAllRolesApi> & {
        type: UserActionTypes.getAllRolesApi;
    }): UserState => {
        return {
            ...state,
            roles: action.roles
        }
    }),
)