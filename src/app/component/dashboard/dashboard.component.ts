// dashboard.component.ts
import { Component } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private authService: AuthenticationService) {
  }

  isProducer(): boolean {
    const userType = this.authService.getUserType();
    return userType !== null && userType === 'producer';
  }
}
