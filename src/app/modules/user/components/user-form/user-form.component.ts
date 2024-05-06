import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IRole } from '../../../../shared/models/role';
import { IRoles, IUser } from '../../../../shared/models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit, OnDestroy {

  public userForm!: FormGroup;
  public items = [''];
  @Input() isCreate = false;
  @Input() roleList!: Observable<IRole[] | null>;
  @Input() user!: IUser;

  @Output() updateEvent: EventEmitter<
    { id: number, fio: string, email: string, password?: string, role: string }
  > = new EventEmitter();
  @Output() createUserEvent: EventEmitter<{ fio: string, email: string, password: string }> = new EventEmitter();
  @Output() closeFormEvent: EventEmitter<boolean> = new EventEmitter();
  private destroy: Subject<void> = new Subject();

  ngOnInit(): void {
    if (this.roleList) {
      this.roleList
        .pipe(
          takeUntil(this.destroy)
        )
        .subscribe((roles: IRole[] | null): void => {
          this.items = roles!.map((role: IRole): string => role.name)
        })
    }

    this.userForm = new FormGroup({
      fio: new FormControl<string>(this.user?.fio || '', [Validators.required, Validators.minLength(2)]),
      email: new FormControl<string>(this.user?.email || '', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.minLength(4)]),
      role: new FormControl<string>('USER')
    });
  }

  check(roleName: string): boolean | undefined {
    return this.user.roles?.some((role: IRoles): boolean => role.name === roleName);
  }
  closeForm(): void {
    this.closeFormEvent.emit(false)
  }

  onSubmit(): void {
    if (!this.isCreate) {
      this.submitEdit();
    } else {
      this.submitCreate();
    }
  }

  submitEdit(): void {
    if (this.userForm.value.password === '') {
      this.updateEvent.emit({
        id: this.user.id,
        fio: this.userForm.value.fio,
        email: this.userForm.value.email,
        role: this.userForm.value.role
      })
      this.closeForm()
    } else if (this.userForm.value.password.length < 4) {
      return;
    } else if (this.userForm.value.password.length >= 4) {
      this.updateEvent.emit({
        id: this.user.id,
        fio: this.userForm.value.fio,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        role: this.userForm.value.role
      });
      this.closeForm()
    }
  }
  submitCreate(): void {
    if (this.userForm.value.password.length < 4) {
      return;
    }
    this.createUserEvent.emit({
      fio: this.userForm.value.fio,
      email: this.userForm.value.email,
      password: this.userForm.value.password
    });
    this.closeForm();
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
