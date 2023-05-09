import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = '/api/user';
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  register(user: { username: string, password: string, userType: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        // Replace the 'your-jwt-token' string with the generated JWT token
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VyVHlwZSI6InByb2R1Y2VyIiwiaWF0IjoxNjE3MzM4NDAwLCJleHAiOjIyNzc0MjQ4MDB9.JMc5SLtF5S1Sjl0F36zNrZ9oEhQzKg4m4Pf86Gzp8Hw';

        localStorage.setItem('token', token);
  
        // Decode the token to get user information
        const decodedToken = this.parseJwt(token);
        if (decodedToken) {
          localStorage.setItem('userId', decodedToken.id);
          localStorage.setItem('userType', response.userType);
        }
        
        this.setLoggedIn(true);
  
        // Navigate to the dashboard
        this.router.navigate(['/dashboard']);
  
        return response;
      })
    );
  }
  
  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');

    // Redirect to the login page
    this.router.navigate(['/login']);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }
    const decodedToken: any = jwt_decode(token); // Use jwt-decode library to decode the token
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);

    return expirationDate.valueOf() < new Date().valueOf();
  }

  // auth.service.ts

  parseJwt(token: string | null): any {
    if (!token) {
      console.error('Token is undefined or empty');
      return null;
    }

    try {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }


  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  setLoggedIn(loggedIn: boolean): void {
    this.loggedInSubject.next(loggedIn);
  }

  getUserType(): string | null{
    return localStorage.getItem('userType');
  }

  getUserId(): string | null{
    return localStorage.getItem('userId');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }  

}
