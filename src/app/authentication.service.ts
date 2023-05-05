import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = '/api/user';
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  register(user: { username: string, password: string, userType: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  setLoggedIn(loggedIn: boolean): void {
    this.loggedInSubject.next(loggedIn);
  }
}
