import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  username = '';
  password = '';
  userType = 'producer';

  constructor(private authService: AuthenticationService) { }

  onRegister(): void {
    this.authService.register({ username: this.username, password: this.password, userType: this.userType }).subscribe(
      (response) => {
        console.log('User registered successfully', response);
      },
      (error) => {
        console.error('Error registering user', error);
      }
    );
  }
}
