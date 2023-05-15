import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StoplightService {
  private apiUrl = '/api/stoplight';

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    
  }

  createStoplight(data: any): Observable<any> {
    const headers = this.authService.getAuthHeader(); 
    return this.http.post(`${this.apiUrl}/create`, data, { headers });
  }

  getAllStoplights(): Observable<any> {
    const headers = this.authService.getAuthHeader(); 
    return this.http.get(`${this.apiUrl}/all`, { headers });
  }


}
