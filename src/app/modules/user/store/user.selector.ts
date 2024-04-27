import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user";
import { userFeatureKey } from "./user.actions";

const getUsersState = createFeatureSelector<UserState>(userFeatureKey);

export const getUsers = createSelector(getUsersState, (state: UserState) => {
    return state.users;
});
export const getRolesSelector = createSelector(getUsersState, (state: UserState) => {
    return state.roles;
});
