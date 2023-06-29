import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { StorageService } from './services/storage.service';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'planner';
  public globalService: GlobalService;
  public isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkIdentity();
    this.isAuthenticated$ = this.authService.isAuthenticated$();
    console.log('isAuthenticated', this.isAuthenticated$);
  }
}
