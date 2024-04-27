import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IRole } from '../../../../shared/models/role';
import { IUser } from '../../../../shared/models/user';
import { PrizmIconsFullRegistry } from '@prizm-ui/icons/core';
import { prizmIconsCircleCheckEmpty, prizmIconsCircleXmark } from '@prizm-ui/icons/base/source';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {

  userForm!: FormGroup;
  public items: String[] = [];
  @Input() isCreate = false;
  @Input() roleList!: Observable<IRole[]>;
  @Input() user!: IUser;

  @Output() updateEvent = new EventEmitter();
  @Output() createUserEvent = new EventEmitter();
  @Output() closeFormEvent = new EventEmitter();
  private destroy: Subject<void> = new Subject();

  ngOnInit(): void {
    if (this.roleList) {
      this.roleList
        .pipe(
          takeUntil(this.destroy)
        )
        .subscribe((roles) => {
          this.items = roles.map(role => role.name)
        })
    }

    this.userForm = new FormGroup({
      fio: new FormControl<string>(this.user?.fio || '', [Validators.required, Validators.minLength(2)]),
      email: new FormControl<string>(this.user?.email || '', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.minLength(4)]),
      role: new FormControl<string>('USER')
    });
  }

  check(roleName: string) {
    return this.user.roles?.some(role => role.name === roleName);
  }
  closeForm() {
    this.closeFormEvent.emit(false)
  }

  onSubmit() {
    if (!this.isCreate) {
      this.submitEdit();
    } else {
      this.submitCreate();
    }
  }

  submitEdit() {
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
  submitCreate() {
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
