import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

interface DecodedToken {
  sub: string;
  role: { authority: string }[];
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'api/user';
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    // Check local storage for token and set loggedInSubject accordingly
    this.loggedInSubject = new BehaviorSubject<boolean>(this.getToken() !== null && !this.isTokenExpired());
    this.checkTokenExpiration();
  }  

  register(user: { username: string, password: string, userType: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      map((response: any) => {
        this.setLocalStorage(response);
        this.cookieService.set('token', response.token);
        this.setLoggedIn(true);
        // Navigate to the dashboard
        this.router.navigate(['/dashboard']);
        return response;
      })
    );
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        this.setLocalStorage(response);
        this.cookieService.set('token', response.token);

        this.setLoggedIn(true);
        // Navigate to the dashboard
        this.router.navigate(['/dashboard']);
        return response;
      })
    );
  }

  setLocalStorage(response: any): void{
    localStorage.setItem('userType', response.userType);
  }

  checkTokenExpiration(): void {
    // Check every minute if the token is expired
    interval(60000).subscribe(() => {
      if (this.isTokenExpired()) {
        this.logout();
      }
    });
  }
  
  logout(): void {
    // Remove user data from local storage
    this.cookieService.delete('token');
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
      const decodedToken = jwt_decode(token) as DecodedToken;
      return decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /*public getAuthHeader(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }*/

  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  setLoggedIn(loggedIn: boolean): void {
    this.loggedInSubject.next(loggedIn);
  }

  getUserType(): string | null{
    return localStorage.getItem('userType');
  }

  getToken(): string | null {
    return this.cookieService.get('token');
  }
    

}
