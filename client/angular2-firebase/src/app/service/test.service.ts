import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()
export class TestService {

  constructor(private http: Http) { }

  sampleApi(): Observable<any> {
    return this.http.get('/api/sampleApi');
  }
}
