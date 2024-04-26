import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { IRole } from '../../../../shared/models/role';
import { IUser } from '../../../../shared/models/user';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { addRole, create, deleteUser, getAll, getRoles, update } from '../../store/user.actions';
import { getRolesSelector, getUsers } from '../../store/user.selector';
import { State } from '../../store/user.state';


@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent implements OnInit, OnDestroy {
  tableTitles: string[] = ['Имя', 'Почта', 'Пароль', 'Роли', 'Действия'];
  public isEdit: boolean = false;
  public userList$!: Observable<IUser[] | any>;
  public roleList!: Observable<IRole[] | any>;
  private destroy: Subject<void> = new Subject();
  currentPage = 1;

  constructor(
    public spinnerService: SpinnerService,
    private store: Store<{ meetup: State }>
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }
  getUsers() {
    this.store.dispatch(getAll());
    this.userList$ = this.store.select(getUsers);
  }
  getRoles() {
    this.store.dispatch(getRoles());
    this.roleList = this.store.select(getRolesSelector);
  }
  update(value: { id: number, fio: string, email: string, password: string, role: string }) {
    this.updateUser(value.id, value.email, value.fio, value.password);
    this.addRole(value.role, value.id);
  }
  updateUser(id: number, email: string, fio: string, password: string) {
    this.store.dispatch(update({ id, email, fio, password }));
  }
  createUser(value: { fio: string, email: string, password: string }) {
    this.store.dispatch(create({ fio: value.fio, email: value.email, password: value.password }))
  }
  addRole(name: string, userId: number) {
    this.store.dispatch(addRole({name, userId}));
  }
  deleteUser(id: number) {
    this.store.dispatch(deleteUser({id}));
  }
  closeUserForm() {
    this.isEdit = false;
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}

