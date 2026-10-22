import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatIconModule],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class LoginComponent {
  loginWithGoogle() {
    window.location.href = '/oauth2/authorization/google';
  }

  loginWithKeycloak() {
    window.location.href = '/oauth2/authorization/keycloak';
  }
}
