import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = '/api';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor(private http: HttpClient) { }

  getTimerSeconds(): Observable<number[]> {
    return this.http.get<number[]>(baseUrl + '/timers', {});
  }

  createTimer(data) {

    let body = JSON.stringify({
      "id": data.id,
      "minute": data.minute
    });
    const headers = { 'content-type': 'application/json' }
    return this.http.post(baseUrl + '/timer', JSON.parse(body), { 'headers': headers });
  }
}
