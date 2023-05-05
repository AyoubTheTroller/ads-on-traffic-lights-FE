import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthenticationService) { }

  onLogin(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      (response) => {
        console.log('User logged in successfully', response);
        this.authService.setLoggedIn(true);
      },
      (error) => {
        console.error('Error logging in user', error);
      }
    );
  }
}
