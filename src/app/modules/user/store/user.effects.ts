import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';
import {
    ADD_ROLE_USER, CREATE_USER, DELETE_USER, GET_ALL_ROLES,
    GET_ALL_USERS, UPDATE_USER, addRoleUserApi, createUserApi,
    deleteUserApi, getAllRolesApi, getAllUsersApi, updateUserApi
} from './user.actions';

@Injectable()
export class UserEffects {

    getAllUsers$ = createEffect(() => this.actions$.pipe(
        ofType(GET_ALL_USERS),
        mergeMap(() => this.userService.getAll()
            .pipe(
                map(users => { return getAllUsersApi({ users }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    updateUser$ = createEffect(() => this.actions$.pipe(
        ofType(UPDATE_USER),
        mergeMap((value: { id: number, email: string, fio: string, password: string }) =>
            this.userService.update(value.id, value.email, value.fio, value.password)
                .pipe(
                    map(user => {
                        return updateUserApi({ user })
                    }),
                    catchError(() => EMPTY)
                ))
    )
    );
    createUser$ = createEffect(() => this.actions$.pipe(
        ofType(CREATE_USER),
        mergeMap((value: { fio: string, email: string, password: string }) =>
            this.userService.create(value.fio, value.email, value.password)
                .pipe(
                    map(user => { return createUserApi({ user }) }),
                    catchError(() => EMPTY)
                ))
    )
    );
    deleteUser$ = createEffect(() => this.actions$.pipe(
        ofType(DELETE_USER),
        mergeMap((value: { id: number }) =>
            this.userService.delete(value.id)
                .pipe(
                    map(user => { return deleteUserApi({ user }) }),
                    catchError(() => EMPTY)
                ))
    )
    );
    addRoleUser$ = createEffect(() => this.actions$.pipe(
        ofType(ADD_ROLE_USER),
        mergeMap((value: { name: string, userId: number }) =>
            this.userService.addRole(value.name, value.userId)
                .pipe(
                    map(role => {
                        role?.name === 'ADMIN' ? role.id = 1 : role!.id = 2;
                        return addRoleUserApi({ role });
                    }),
                    catchError(() => EMPTY)
                ))
    )
    );
    getAllRoles$ = createEffect(() => this.actions$.pipe(
        ofType(GET_ALL_ROLES),
        mergeMap(() =>
            this.roleService.getAll()
                .pipe(
                    map(roles => { return getAllRolesApi({ roles }); }),
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