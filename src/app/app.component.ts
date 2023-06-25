import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'planner';
  public isAuthenticated$: Observable<boolean>;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.checkIdentity();
    this.isAuthenticated$ = this.authService.isAuthenticated$();
  }
}
