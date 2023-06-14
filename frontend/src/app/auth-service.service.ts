import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<User>(
        'http://localhost:3000/api/login',
        { email, password },
        { withCredentials: true }
      )
      .pipe(shareReplay());
  }

  validate(){
    return this.http
    .get<User>(
      'http://localhost:3000/api/validate',  
      { withCredentials: true }
    )
    .pipe(shareReplay());

  }
}
