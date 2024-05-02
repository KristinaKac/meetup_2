import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit(): void {
    this.authService.checkAdmin();
  }

  logout(): void {
    this.authService.logout();
    this.authService.checkAdmin();
  }
}
