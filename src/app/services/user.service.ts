import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private token: string = '';
  private user: User = new User('', '', '', '', '', '');

  constructor() {
    const { token } = JSON.parse(localStorage.getItem('data') || '{ "token": "" }');

    this.token = token;
    this.authenticate();
  }

  getUser(): User {
    return this.user;
  }

  getAuthenticated(): BehaviorSubject<boolean> {
    return this.authenticated;
  }

  getToken(): string {
    return this.token;
  }

  setAuthenticated(authenticated: boolean): void {
    this.authenticated.next(authenticated);
  }

  setToken(token: string): void {
    this.token = token;
    this.authenticate();
  }

  authenticate(): void {
    try {
      const userData: User = JSON.parse(atob(this.token.split('.')[1]));
      if (userData && parseInt(userData.id || '0') > 0) {
        this.user = userData;
        this.setAuthenticated(true);
        return;
      }
      this.setAuthenticated(false);
    } catch {
      this.setAuthenticated(false);
    }
  }

}
