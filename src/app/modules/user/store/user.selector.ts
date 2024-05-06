import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IRole } from "../../../shared/models/role";
import { IUser } from "../../../shared/models/user";
import { UserState } from "./user";
import { userFeatureKey } from "./user.actions";

const getUsersState = createFeatureSelector<UserState>(userFeatureKey);

export const getUsers = createSelector(getUsersState, (state: UserState): IUser[] | null => {
    return state.users;
});
export const getRolesSelector = createSelector(getUsersState, (state: UserState): IRole[] | null => {
    return state.roles;
});
