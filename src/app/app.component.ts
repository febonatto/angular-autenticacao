import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from './services/user.service';
import { DatetimeService } from './services/datetime.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  authenticated: boolean = false;
  datetimeSubscription: Subscription | undefined;
  datetime: string = '';

  constructor(private userService: UserService,
    private datetimeService: DatetimeService,
    private route: Router) {
      this.userService.getAuthenticated().subscribe(value => this.authenticated = value);
  }

  ngOnInit(): void {
    this.datetimeSubscription = this.datetimeService.datetime
      .subscribe(
        datetime => this.datetime = datetime
      );
  }

  ngOnDestroy(): void {
    this.datetimeSubscription?.unsubscribe();
  }

  logout(): void {
    this.userService.setToken('');
    this.userService.setAuthenticated(false);
    localStorage.removeItem('data');

    const currentUrl: string = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => this.route.navigate([currentUrl]));
  }

}
