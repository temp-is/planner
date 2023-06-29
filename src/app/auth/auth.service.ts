import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthAPI } from '../core/http/authAPI';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //TODO: [fix auth] return true when auth is settled
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService
  ) {}

  public isAuthenticated$(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  public checkIdentity(): void {
    const route = AuthAPI['checkIdentity'];
    const formData = new FormData();
    this.http.post(route, formData).subscribe(
      (data: any) => {
        console.log('login success!!!!', data);
        if (data.valid) {
          this.isLoggedIn$.next(true);
          // this.router.navigate(['/']);
          //document.cookie = 'PHPSESSID=' + data.sessionId;
        } else {
          this.isLoggedIn$.next(false);
          this.router.navigate(['login']);
        }
      },
      (error) => {
        throw new Error(error);
      }
    );
  }

  public login(user: string, password: string): void {
    const formData = new FormData();
    formData.append('username', user);
    formData.append('password', password);
    const route = AuthAPI['login'];

    this.http.post(route, formData).subscribe(
      (data: any) => {
        console.log('login success', data);
        if (data.success) {
          this.isLoggedIn$.next(true);
          this.router.navigate(['/']);
          //document.cookie = 'PHPSESSID=' + data.sessionId;
        }
      },
      (error) => {
        throw new Error(error);
      }
    );
  }

  public logout(): void {
    localStorage.removeItem('workCenter');
    this.isLoggedIn$.next(false);
    const route = AuthAPI['logout'];
    const formData = new FormData();
    const myheader = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );

    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    this.http
      .post(route, formData, { headers, responseType: 'text' })
      .subscribe(
        (data: any) => {
          this.router.navigate(['/login']);
          console.log('logout success!!!!', data);
        },
        (error) => {
          console.log('logout error!!!!');
          throw new Error(error);
        }
      );
  }
}
