import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";
import {UserService} from "../service/user.service";
import {User} from "../model/user";

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})

export class UserpageComponent implements OnInit {
  //link
  private username:string;
  private user: User;
  private subscriptions: Subscription[] = [];

  constructor(private activateRoute: ActivatedRoute, private userService: UserService){
    this.subscriptions.push(activateRoute.params.subscribe(params=>{
      this.username = params['username'];
    }));
    this.user = new User();
  }

  ngOnInit() {
    this.loadUser();
  }

  private loadUser() : void{
    this.subscriptions.push(this.userService.getUser(this.username).subscribe(user => {
      this.user = user as User;
    }));
  }
}
