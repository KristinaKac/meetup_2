import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { ADD_ROLE, CREATE, DELETE_USER, GET_ALL, GET_ROLES, UPDATE, addRoleApi, createApi, deleteUserApi, getAll, getAllApi, getRolesApi, updateApi } from './user.actions';
import { DELETE_MEETUP } from '../../meetup/store/meetup.actions';
import { RoleService } from '../services/role.service';

@Injectable()
export class UserEffects {

    getAll$ = createEffect(() => this.actions$.pipe(
        ofType(GET_ALL),
        mergeMap(() => this.userService.getAll()
            .pipe(
                map(users => { return getAllApi({ users }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    update$ = createEffect(() => this.actions$.pipe(
        ofType(UPDATE),
        mergeMap((value: { id: number, email: string, fio: string, password: string }) => 
            this.userService.update(value.id, value.email, value.fio, value.password)
            .pipe(
                map(user => {
                    return updateApi({ user }) 
                }),
                catchError(() => EMPTY)
            ))
    )
    );
    create$ = createEffect(() => this.actions$.pipe(
        ofType(CREATE),
        mergeMap((value: { fio: string, email: string, password: string }) => 
            this.userService.create( value.fio, value.email, value.password)
            .pipe(
                map(user => { return createApi({ user }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    delete$ = createEffect(() => this.actions$.pipe(
        ofType(DELETE_USER),
        mergeMap((value: { id: number }) => 
            this.userService.delete(value.id)
            .pipe(
                map(user => { return deleteUserApi({ user }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    addRole$ = createEffect(() => this.actions$.pipe(
        ofType(ADD_ROLE),
        mergeMap((value: { name: string, userId: number }) => 
            this.userService.addRole(value.name, value.userId)
            .pipe(
                map(role => { 
                    role?.name === 'ADMIN' ? role.id = 1 : role!.id = 2;
                    return addRoleApi({ role });
                }),
                catchError(() => EMPTY)
            ))
    )
    );
    getRoles$ = createEffect(() => this.actions$.pipe(
        ofType(GET_ROLES),
        mergeMap(() => 
            this.roleService.getAll()
            .pipe(
                map(roles => { return getRolesApi({ roles });}),
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