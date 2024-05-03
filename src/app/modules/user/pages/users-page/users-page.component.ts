import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { IRole } from '../../../../shared/models/role';
import { IUser } from '../../../../shared/models/user';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { addRoleUser, createUser, deleteUser, getAllRoles, getAllUsers, updateUser } from '../../store/user.actions';
import { getRolesSelector, getUsers } from '../../store/user.selector';
import { UserState } from '../../store/user';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent implements OnInit, OnDestroy {
  public tableTitles: string[] = ['Имя', 'Почта', 'Пароль', 'Роли', 'Действия'];
  public isEdit = false;
  public userList$!: Observable<IUser[] | null>;
  public roleList!: Observable<IRole[] | null>;
  private destroy: Subject<void> = new Subject();
  public currentPage = 1;

  constructor(
    public spinnerService: SpinnerService,
    private store: Store<{ meetup: UserState }>
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }
  getUsers(): void {
    this.store.dispatch(getAllUsers());
    this.userList$ = this.store.select(getUsers);
  }
  getRoles(): void {
    this.store.dispatch(getAllRoles());
    this.roleList = this.store.select(getRolesSelector);
  }
  update(value: { id: number, fio: string, email: string, password?: string, role: string }): void {
    this.updateUser(value.id, value.email, value.fio, value.password);
    this.addRole(value.role, value.id);
  }
  updateUser(id: number, email: string, fio: string, password?: string): void {
    this.store.dispatch(updateUser({ id, email, fio, password }));
  }
  createUser(value: { fio: string, email: string, password: string }): void {
    this.store.dispatch(createUser({ fio: value.fio, email: value.email, password: value.password }))
  }
  addRole(name: string, userId: number): void {
    this.store.dispatch(addRoleUser({name, userId}));
  }
  deleteUser(id: number): void {
    this.store.dispatch(deleteUser({id}));
  }
  closeUserForm(): void {
    this.isEdit = false;
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}

