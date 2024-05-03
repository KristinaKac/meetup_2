import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
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

@Injectable()
export class UserEffects {

    getAllUsers$ = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.requestAllUsers),
        mergeMap(() => this.userService.getAll()
            .pipe(
                map((users: IUser[] | null) => { return getAllUsersApi({ users }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    updateUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.updateUser),
        mergeMap((value: { id: number, email: string, fio: string, password: string }) =>
            this.userService.update(value.id, value.email, value.fio, value.password)
                .pipe(
                    map((user: IUser | null) => {
                        return updateUserApi({ user })
                    }),
                    catchError(() => EMPTY)
                ))
    )
    );
    createUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.createUser),
        mergeMap((value: { fio: string, email: string, password: string }) =>
            this.userService.create(value.fio, value.email, value.password)
                .pipe(
                    map((user: IUser | null) => { return createUserApi({ user }) }),
                    catchError(() => EMPTY)
                ))
    )
    );
    deleteUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.deleteUser),
        mergeMap((value: { id: number }) =>
            this.userService.delete(value.id)
                .pipe(
                    map((user: IUser | null) => { return deleteUserApi({ user }) }),
                    catchError(() => EMPTY)
                ))
    )
    );
    addRoleUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.addRoleUser),
        mergeMap((value: { name: string, userId: number }) =>
            this.userService.addRole(value.name, value.userId)
                .pipe(
                    map((role: IRole | null) => {
                        role?.name === 'ADMIN' ? role.id = 1 : role?.name === 'USER' ? role!.id = 2 : role!.id = 215;
                        return addRoleUserApi({ role });
                    }),
                    catchError(() => EMPTY)
                ))
    )
    );
    getAllRoles$ = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.getAllRoles),
        mergeMap(() =>
            this.roleService.getAll()
                .pipe(
                    map((roles: IRole[] | null) => { return getAllRolesApi({ roles }); }),
                    catchError(() => EMPTY)
                ))
    )
    );

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private roleService: RoleService
    ) { }
}