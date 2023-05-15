// stoplight-details.component.ts
import { Component, Input } from '@angular/core';

interface Stoplight {
  latitude: number | null;
  longitude: number | null;
  redColor: boolean;
  yellowColor: boolean;
  greenColor: boolean
}

@Component({
  selector: 'app-stoplight-details',
  templateUrl: './stoplight-details.component.html',
  styleUrls: ['./stoplight-details.component.scss']
})
export class StoplightDetailsComponent {
  @Input() stoplight: Stoplight | null = null;
}
