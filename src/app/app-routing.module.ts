import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './modules/auth/pages/login-page/login-page.component';
import { MeetupsPageComponent } from './modules/meetup/pages/meetups-page/meetups-page.component';
import { UserMeetupsPageComponent } from './modules/meetup/pages/user-meetups-page/user-meetups-page.component';
import { UsersPageComponent } from './modules/user/pages/users-page/users-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { authGuard } from './shared/guards/auth.guard';
import { adminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  { path: '', component: AboutPageComponent, title: 'About' },
  { path: 'login', component: LoginPageComponent, title: 'Login' },
  { path: 'meetups', component: MeetupsPageComponent, title: 'All Meetups', canActivate: [authGuard]},
  { path: 'userMeetups', component: UserMeetupsPageComponent, title: 'My Meetups', canActivate: [authGuard]},
  { path: 'users', component: UsersPageComponent, title: 'Users', canActivate: [authGuard, adminGuard]},
  { path: '**', component: AboutPageComponent, redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
