import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    //TODO: [fix auth] return true when auth is settled
    // return true;
    console.log('CanActivate called');
    let isLoggedIn$ = this.authService.isAuthenticated$();
    return isLoggedIn$.pipe(
      tap((data) => {
        if (data == false) {
          this.router.navigate(['login']);
        }
      })
    );
  }
}
