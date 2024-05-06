import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from '../../../../shared/models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnDestroy {

  private destroy: Subject<void> = new Subject();
  formType: 'login' | 'registration' = 'login';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  login(value: { email: string, password: string }): void {
    this.authService.login(value.email, value.password).pipe(takeUntil(this.destroy)).subscribe((user: IUser | null): void => {
      if (!user) { return }
      this.router.navigate(['meetups']);
      this.authService.checkAdmin();
    })
  }
  registration(value: { fio: string, email: string, password: string }): void {
    this.authService.registration(value.fio, value.email, value.password).pipe(takeUntil(this.destroy)).subscribe((user: IUser | null): void => {
      if (!user) { return }
      this.router.navigate(['meetups']);
      this.authService.checkAdmin();
    })
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
