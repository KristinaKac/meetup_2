import { createAction, props } from "@ngrx/store";
import { IRole } from "../../../shared/models/role";
import { IUser } from "../../../shared/models/user";

export const userFeatureKey = 'user';

export const GET_ALL_USERS = '[UserPage Component] get all users';
export const GET_ALL_USERS_API = '[UserPage Component] get all users api';

export const UPDATE_USER = '[UserPage Component] update users';
export const UPDATE_USER_API = '[UserPage Component] update users api';

export const CREATE_USER = '[UserPage Component] create user';
export const CREATE_USER_API = '[UserPage Component] create user api';

export const DELETE_USER = '[UserPage Component] delete user';
export const DELETE_USER_API = '[UserPage Component] delete user api';

export const ADD_ROLE_USER = '[UserPage Component] add role user';
export const ADD_ROLE_USER_API = '[UserPage Component] add role user api';

export const GET_ALL_ROLES = '[UserPage Component] get role user';
export const GET_ALL_ROLES_API = '[UserPage Component] get role user api';

export const getAllUsers = createAction(GET_ALL_USERS);
export const getAllUsersApi = createAction(GET_ALL_USERS_API, props<{ users: IUser[] | null }>());

export const updateUser = createAction(UPDATE_USER, props<{ id: number, email: string, fio: string, password: string }>());
export const updateUserApi = createAction(UPDATE_USER_API, props<{ user: IUser | null }>());

export const createUser = createAction(CREATE_USER, props<{ fio: string, email: string, password: string }>());
export const createUserApi = createAction(CREATE_USER_API, props<{ user: IUser | null }>());

export const deleteUser = createAction(DELETE_USER, props<{ id: number }>());
export const deleteUserApi = createAction(DELETE_USER_API, props<{ user: IUser | null }>());

export const addRoleUser = createAction(ADD_ROLE_USER, props<{ name: string, userId: number }>());
export const addRoleUserApi = createAction(ADD_ROLE_USER_API, props<{ role: IRole | null }>());

export const getAllRoles = createAction(GET_ALL_ROLES);
export const getAllRolesApi = createAction(GET_ALL_ROLES_API, props<{ roles: IRole[] | null }>());