import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

import { User } from './../models/user.model';
import { environment as env } from 'src/environments/environment';
import { HttpService } from './http.service';
import { Release } from './../models/release.model';

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

  downloadCSV(releases: Array<Release>): void {
    const columns: string = 'ID,Data,Horário,Tipo,Localização\n';
    const lines: Array<string> = [];

    releases.forEach(
      release => {
        const date = new Date(release.data);
        const hour = release.data.split(' ')[1].substring(0, 5);
        const dateFormated = `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}/${date.getFullYear()}`;

        const line = `${release.id},${dateFormated},${hour},${release.tipo},"${release.localizacao}"`;
        lines.push(line);
      }
    );

    const blob = new Blob([columns + lines.join('\n')], { type: 'text/csv' });
    saveAs(blob, 'releases.csv');
  }

}
