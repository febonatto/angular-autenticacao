import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

import { User } from './../models/user.model';
import { environment as env } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ReleasesService {

  constructor(private http: HttpClient,
    private userService: UserService,
    private httpService: HttpService) { }

  readReleases(): Observable<any> {
    const { id }: User = this.userService.getUser();
    return this.http.get(
      env.apiBaseUrl + 'api/lancamentos/funcionario/' + id,
      this.httpService.headers()
    );
  }

}
