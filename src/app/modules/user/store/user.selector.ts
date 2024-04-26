import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./user.state";

const getUsersState = createFeatureSelector<State>('user');

export const getUsers = createSelector(getUsersState, (state) => {
    return state.users;
});
export const getRolesSelector = createSelector(getUsersState, (state) => {
    return state.roles;
});
