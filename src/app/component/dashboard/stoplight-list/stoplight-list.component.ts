import { Component, OnInit } from '@angular/core';
import { StoplightService } from '../../../service/stoplight.service';

interface Stoplight {
  id: number;
  latitude: number | null;
  longitude: number | null;
  redColor: boolean;
  yellowColor: boolean;
  greenColor: boolean;
  showDetails?: boolean;  // Add this line
}

@Component({
  selector: 'app-stoplight-list',
  templateUrl: './stoplight-list.component.html',
  styleUrls: ['./stoplight-list.component.scss']
})
export class StoplightListComponent implements OnInit {
  stoplights: Stoplight[] = [];

  constructor(private stoplightService: StoplightService) { }

  ngOnInit(): void {
    this.stoplightService.getAllStoplights().subscribe(
      (response: Stoplight[]) => {
        this.stoplights = response.map(stoplight => ({ ...stoplight, showDetails: false }));
      },
      (error) => {
        console.log('Error getting stoplights:', error);
      }
    );
  }
}
