import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class AuthService { //todo create interface
  constructor() {
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
      localStorage.setItem('token', token);
  }
}
