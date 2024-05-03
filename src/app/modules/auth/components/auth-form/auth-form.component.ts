import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent {
  public authForm: FormGroup

  @Output() loginEvent: EventEmitter<{email: string, password: string}> = new EventEmitter();
  @Output() registrationEvent: EventEmitter<{email: string, password: string, fio: string}> = new EventEmitter();
  @Input() formType: 'login' | 'registration' = 'login';


  constructor() {
    this.authForm = new FormGroup({
      fio: new FormControl<string>('', [Validators.minLength(2)]),
      email: new FormControl<string>('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(4)])
    });
  }

  onSubmit(): void {
    if (this.authForm.invalid) { return }

    switch (this.formType) {
      case 'login':
        this.loginEvent.emit({
          email: this.authForm.value.email,
          password: this.authForm.value.password
        });
        this.authForm.reset();
        break;
      case 'registration':
        if (!this.authForm.value.fio) {
          return
        }
        this.registrationEvent.emit({
          fio: this.authForm.value.fio,
          email: this.authForm.value.email,
          password: this.authForm.value.password
        });
        this.authForm.reset();
        break;
      default:
        break;
    }
  }
}
