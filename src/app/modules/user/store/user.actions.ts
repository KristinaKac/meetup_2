import { createAction, props } from "@ngrx/store";
import { IRoles, IUser } from "../../../shared/models/user";
import { IRole } from "../../../shared/models/role";

export const GET_ALL = '[UserPage Component] get all users';
export const GET_ALL_API = '[UserPage Component] get all users api';

export const UPDATE = '[UserPage Component] update users';
export const UPDATE_API = '[UserPage Component] update users api';

export const CREATE = '[UserPage Component] create user';
export const CREATE_API = '[UserPage Component] create user api';

export const DELETE_USER = '[UserPage Component] delete user';
export const DELETE_USER_API = '[UserPage Component] delete user api';

export const ADD_ROLE = '[UserPage Component] add role user';
export const ADD_ROLE_API = '[UserPage Component] add role user api';

export const GET_ROLES = '[UserPage Component] get role user';
export const GET_ROLES_API = '[UserPage Component] get role user api';

export const getAll = createAction(GET_ALL);
export const getAllApi = createAction(GET_ALL_API, props<{ users: IUser[] | null }>());

export const update = createAction(UPDATE, props<{ id: number, email: string, fio: string, password: string }>());
export const updateApi = createAction(UPDATE_API, props<{ user: IUser | null }>());

export const create = createAction(CREATE, props<{ fio: string, email: string, password: string }>());
export const createApi = createAction(CREATE_API, props<{ user: IUser | null }>());

export const deleteUser = createAction(DELETE_USER, props<{ id: number }>());
export const deleteUserApi = createAction(DELETE_USER_API, props<{ user: IUser | null }>());

export const addRole = createAction(ADD_ROLE, props<{ name: string, userId: number }>());
export const addRoleApi = createAction(ADD_ROLE_API, props<{ role: IRole | null }>());

export const getRoles = createAction(GET_ROLES);
export const getRolesApi = createAction(GET_ROLES_API, props<{ roles: IRole[] | null }>());