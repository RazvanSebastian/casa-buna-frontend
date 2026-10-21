import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class LoginComponent {
  loginWithGoogle() {
    window.location.href = '/oauth2/authorization/google';
  }
}
