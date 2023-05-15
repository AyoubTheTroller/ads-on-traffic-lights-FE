import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoplightService {
  private apiUrl = '/api/stoplight';

  constructor(private http: HttpClient) {}

  createStoplight(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);
    return this.http.post(`${this.apiUrl}/create`, data, { headers });
  }
}
