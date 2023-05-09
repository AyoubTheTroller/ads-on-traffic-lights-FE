import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log('AuthGuard canActivate called');
    return this.authService.isLoggedIn().pipe(
      take(1),
      map((loggedIn) => {
        console.log('AuthGuard loggedIn:', loggedIn); 
        if (loggedIn && !this.authService.isTokenExpired()) {
          console.log('AuthGuard: Token is valid');
          return true;
        } else {
          console.log('AuthGuard: Token is expired');
          this.authService.logout(); // Clear user data and redirect to the login page
          return false;
        }
      })
    );
  }
}
