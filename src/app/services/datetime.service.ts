import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  datetime: BehaviorSubject<string> = new BehaviorSubject<string>(new Date().toString());

  constructor() {
    const currentSeconds = new Date().getSeconds();

    setTimeout(() => {
      this.datetime.next(new Date().toString());
      setInterval(() => {
        this.datetime.next(new Date().toString());
      }, 60000)
    }, (60 - currentSeconds) * 1000);
  }
}
