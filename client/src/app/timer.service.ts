import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = '/api';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor( private http: HttpClient) { }

  getTimerSeconds() {
    return this.http.get(baseUrl + '/timers',{});
  }

  createTimer(data) {
    
    let body = JSON.stringify({
      "id": data.id,
      "minute" : data.minute
    });
    console.log('data',JSON.parse(body))
    const headers = { 'content-type': 'application/json'}
    return this.http.post(baseUrl + '/timer', JSON.parse(body), {'headers':headers});
  }
}
