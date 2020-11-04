import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor( private http: HttpClient) { }

  getTimerSeconds() {
    return this.http.request('get', baseUrl + '/timers',{});
  }

  createTimer(data) {
    
    let body = JSON.stringify({
      "id": data.id,
      "minute" : data.minute
    });
    console.log('data',body)
    const headers = { 'content-type': 'application/json'}
    return this.http.post(baseUrl + '/timer', body, {'headers':headers});
  }
}
