import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly AUTH_COLLECTION = 'auth/';

  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Observable<any> {
    return this.http.post(
      env.apiBaseUrl + this.AUTH_COLLECTION,
      {
        email,
        senha
      }
    );
  }
}
