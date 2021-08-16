import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private userService: UserService) { }

  headers(): { headers: HttpHeaders } {
    let headers = new HttpHeaders();
    if(this.userService.getToken()) {
      headers = headers.set(
        "Authorization", `Bearer ${this.userService.getToken()}`
      );
    }

    return { headers };
  }
}
