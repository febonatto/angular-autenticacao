import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  authenticated: boolean = false;

  constructor(private userService: UserService,
    private route: Router) {
      this.userService.getAuthenticated().subscribe(value => this.authenticated = value);
  }

  logout(): void {
    this.userService.setToken('');
    this.userService.setAuthenticated(false);
    localStorage.removeItem('data');

    const currentUrl: string = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => this.route.navigate([currentUrl]));
  }

}
