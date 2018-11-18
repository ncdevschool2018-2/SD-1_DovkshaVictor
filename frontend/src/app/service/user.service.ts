import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
// Data service
export class UserService { //todo create interface

  constructor(private http: HttpClient) {
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('/api/users/', user);
  }

  getYourself(): Observable<User> {
    return this.http.get<User>('/api/users/');
  }

  findUsers(username: string){
    return this.http.get<User[]>('api/users/find/'+username);
  }

  getUser(username: string){
    return this.http.get<User>('api/users/get/'+username);
  }
}
