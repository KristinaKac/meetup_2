import { ActionCreator, createAction, props } from "@ngrx/store";
import { IRole } from "../../../shared/models/role";
import { IUser } from "../../../shared/models/user";
import { TypedAction } from "@ngrx/store/src/models";

export const userFeatureKey = 'user';

export enum UserActionTypes {
    requestAllUsers = '[UserPage Component] get all users',
    requestAllUsersApi = '[UserPage Component] get all users api',
    updateUser = '[UserPage Component] update users',
    updateUserApi = '[UserPage Component] update users api',
    createUser = '[UserPage Component] create user',
    createUserApi = '[UserPage Component] create user api',
    deleteUser = '[UserPage Component] delete user',
    deleteUserApi = '[UserPage Component] delete user api',
    addRoleUser = '[UserPage Component] add role user',
    addRoleUserApi = '[UserPage Component] add role user api',
    getAllRoles = '[UserPage Component] get role user',
    getAllRolesApi = '[UserPage Component] get role user api',
}

export const getAllUsers = createAction(UserActionTypes.requestAllUsers);

export const getAllUsersApi:
    ActionCreator<UserActionTypes.requestAllUsersApi,
        (props: { users: IUser[] | null }) => {
            users: IUser[] | null;
        } & TypedAction<UserActionTypes.requestAllUsersApi>
    > = createAction(UserActionTypes.requestAllUsersApi, props<{ users: IUser[] | null }>());

export const updateUser:
    ActionCreator<UserActionTypes.updateUser,
        (props: { id: number, email: string, fio: string, password?: string }) => {
            id: number, email: string, fio: string, password?: string;
        } & TypedAction<UserActionTypes.updateUser>
    > = createAction(UserActionTypes.updateUser, props<{ id: number, email: string, fio: string, password?: string }>());

export const updateUserApi:
    ActionCreator<UserActionTypes.updateUserApi,
        (props: { user: IUser | null }) => {
            user: IUser | null;
        } & TypedAction<UserActionTypes.updateUserApi>
    > = createAction(UserActionTypes.updateUserApi, props<{ user: IUser | null }>());

export const createUser:
    ActionCreator<UserActionTypes.createUser,
        (props: { fio: string, email: string, password: string }) => {
            fio: string, email: string, password: string;
        } & TypedAction<UserActionTypes.createUser>
    > = createAction(UserActionTypes.createUser, props<{ fio: string, email: string, password: string }>());

export const createUserApi:
    ActionCreator<UserActionTypes.createUserApi,
        (props: { user: IUser | null }) => {
            user: IUser | null;
        } & TypedAction<UserActionTypes.createUserApi>
    > = createAction(UserActionTypes.createUserApi, props<{ user: IUser | null }>());

export const deleteUser:
    ActionCreator<UserActionTypes.deleteUser,
        (props: { id: number }) => {
            id: number;
        } & TypedAction<UserActionTypes.deleteUser>
    > = createAction(UserActionTypes.deleteUser, props<{ id: number }>());

export const deleteUserApi:
    ActionCreator<UserActionTypes.deleteUserApi,
        (props: { user: IUser | null }) => {
            user: IUser | null;
        } & TypedAction<UserActionTypes.deleteUserApi>
    > = createAction(UserActionTypes.deleteUserApi, props<{ user: IUser | null }>());

export const addRoleUser:
    ActionCreator<UserActionTypes.addRoleUser,
        (props: { name: string, userId: number }) => {
            name: string, userId: number;
        } & TypedAction<UserActionTypes.addRoleUser>
    > = createAction(UserActionTypes.addRoleUser, props<{ name: string, userId: number }>());

export const addRoleUserApi:
    ActionCreator<UserActionTypes.addRoleUserApi,
        (props: { role: IRole | null }) => {
            role: IRole | null;
        } & TypedAction<UserActionTypes.addRoleUserApi>
    > = createAction(UserActionTypes.addRoleUserApi, props<{ role: IRole | null }>());

export const getAllRoles = createAction(UserActionTypes.getAllRoles);

export const getAllRolesApi:
    ActionCreator<UserActionTypes.getAllRolesApi,
        (props: { roles: IRole[] | null }) => {
            roles: IRole[] | null;
        } & TypedAction<UserActionTypes.getAllRolesApi>
    > = createAction(UserActionTypes.getAllRolesApi, props<{ roles: IRole[] | null }>());