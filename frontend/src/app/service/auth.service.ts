import {Injectable} from '@angular/core';
import {UserService} from "./user.service";
import {Subscription, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {User} from "../model/user";


@Injectable({
  providedIn: 'root'
})

export class AuthService { //todo create interface
  private subscription: Subscription;
  private user: User;
  private user_observable: Observable<User> = new Observable((observer) => {
    if(this.user!= undefined) {
      observer.next(this.user);
      observer.complete();
    }else{
      this.subscription = this.userService.getYourself().subscribe(user=>{
        this.user = user as User;
        observer.next(this.user);
        observer.complete();
      })
    }
  });

  constructor(private userService : UserService, private router: Router) {
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.subscription = this.userService.getYourself().subscribe(user=>{
      this.user = user as User;
      this.router.navigate(['dashboard/1/1']);
    })
  }

  getUser(): Observable<User>{
    return this.user_observable;
  }
}
