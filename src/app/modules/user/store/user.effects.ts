import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';
import {
    UserActionTypes,
    addRoleUserApi, createUserApi,
    deleteUserApi, getAllRolesApi, getAllUsersApi, updateUserApi
} from './user.actions';
import { IUser } from '../../../shared/models/user';
import { IRole } from '../../../shared/models/role';
import { TypedAction } from '@ngrx/store/src/models';

@Injectable()
export class UserEffects {

    getAllUsers$ = createEffect((): Observable<{ users: IUser[] | null; } & TypedAction<UserActionTypes.requestAllUsersApi>> =>
        this.actions$.pipe(
            ofType(UserActionTypes.requestAllUsers),
            mergeMap((): Observable<{ users: IUser[] | null; } & TypedAction<UserActionTypes.requestAllUsersApi>> => this.userService.getAll()
                .pipe(
                    map((users: IUser[] | null): { users: IUser[] | null; } & TypedAction<UserActionTypes.requestAllUsersApi> => { return getAllUsersApi({ users }) }),
                    catchError((): Observable<never> => EMPTY)
                ))
        )
    );
    updateUser$ = createEffect((): Observable<{ user: IUser | null; } & TypedAction<UserActionTypes.updateUserApi>> => this.actions$.pipe(
        ofType(UserActionTypes.updateUser),
        mergeMap((value: { id: number, email: string, fio: string, password: string }): Observable<{ user: IUser | null; } & TypedAction<UserActionTypes.updateUserApi>> =>
            this.userService.update(value.id, value.email, value.fio, value.password)
                .pipe(
                    map((user: IUser | null): { user: IUser | null; } & TypedAction<UserActionTypes.updateUserApi> => {
                        return updateUserApi({ user })
                    }),
                    catchError((): Observable<never> => EMPTY)
                ))
    )
    );
    createUser$ = createEffect((): Observable<{ user: IUser | null; } & TypedAction<UserActionTypes.createUserApi>> => this.actions$.pipe(
        ofType(UserActionTypes.createUser),
        mergeMap((value: { fio: string, email: string, password: string }): Observable<{ user: IUser | null; } & TypedAction<UserActionTypes.createUserApi>> =>
            this.userService.create(value.fio, value.email, value.password)
                .pipe(
                    map((user: IUser | null): { user: IUser | null; } & TypedAction<UserActionTypes.createUserApi> => { return createUserApi({ user }) }),
                    catchError((): Observable<never> => EMPTY)
                ))
    )
    );
    deleteUser$ = createEffect((): Observable<{ user: IUser | null; } & TypedAction<UserActionTypes.deleteUserApi>> => this.actions$.pipe(
        ofType(UserActionTypes.deleteUser),
        mergeMap((value: { id: number }): Observable<{ user: IUser | null; } & TypedAction<UserActionTypes.deleteUserApi>> =>
            this.userService.delete(value.id)
                .pipe(
                    map((user: IUser | null): { user: IUser | null; } & TypedAction<UserActionTypes.deleteUserApi> => { return deleteUserApi({ user }) }),
                    catchError((): Observable<never> => EMPTY)
                ))
    )
    );
    addRoleUser$ = createEffect((): Observable<{ role: IRole | null; } & TypedAction<UserActionTypes.addRoleUserApi>> => this.actions$.pipe(
        ofType(UserActionTypes.addRoleUser),
        mergeMap((value: { name: string, userId: number }): Observable<{ role: IRole | null; } & TypedAction<UserActionTypes.addRoleUserApi>> =>
            this.userService.addRole(value.name, value.userId)
                .pipe(
                    map((role: IRole | null): { role: IRole | null; } & TypedAction<UserActionTypes.addRoleUserApi> => {
                        role?.name === 'ADMIN' ? role.id = 1 : role?.name === 'USER' ? role!.id = 2 : role!.id = 215;
                        return addRoleUserApi({ role });
                    }),
                    catchError((): Observable<never> => EMPTY)
                ))
    )
    );
    getAllRoles$ = createEffect((): Observable<{ roles: IRole[] | null; } & TypedAction<UserActionTypes.getAllRolesApi>> => this.actions$.pipe(
        ofType(UserActionTypes.getAllRoles),
        mergeMap((): Observable<{ roles: IRole[] | null; } & TypedAction<UserActionTypes.getAllRolesApi>> =>
            this.roleService.getAll()
                .pipe(
                    map((roles: IRole[] | null): { roles: IRole[] | null; } & TypedAction<UserActionTypes.getAllRolesApi> => { return getAllRolesApi({ roles }); }),
                    catchError((): Observable<never> => EMPTY)
                ))
    )
    );

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private roleService: RoleService
    ) { }
}