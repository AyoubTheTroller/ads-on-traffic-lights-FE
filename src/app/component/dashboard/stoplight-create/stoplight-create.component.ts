// stoplight-create.component.ts
import { Component } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication.service';
import { StoplightService } from '../../../service/stoplight.service';

interface Stoplight {
  latitude: number | null;
  longitude: number | null;
  redColor: boolean;
  yellowColor: boolean;
  greenColor: boolean
}

@Component({
  selector: 'app-stoplight-create',
  templateUrl: './stoplight-create.component.html',
  styleUrls: ['./stoplight-create.component.scss']
})

export class StoplightCreateComponent {
  stoplight: Stoplight = {
    latitude: null,
    longitude: null,
    redColor: false,
    yellowColor: false,
    greenColor: false
  };

  constructor(private authService: AuthenticationService, private stoplightService: StoplightService) {
  }

  onSubmit(): void {
    if (this.authService.isLoggedIn()) {
      this.stoplightService.createStoplight(this.stoplight).subscribe(
        (response) => {
          console.log('Stoplight created:', response);
          // Handle successful creation of the stoplight
        },
        (error) => {
          console.log('Error creating stoplight:', error);
          // Handle errors while creating the stoplight
        }
      );
    } else {
      console.log('User is not logged in.');
    }
  }

}
