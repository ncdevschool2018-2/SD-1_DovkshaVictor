import { Component, OnInit } from '@angular/core';
import {Project} from "../model/project";
import {User} from "../model/user";
import {Subscription} from 'rxjs';
import {ProjectService} from "../service/project.service";
import {UserService} from "../service/user.service";
import {Priority} from "../model/enums/priority";
import {Role} from "../model/enums/role";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public projects: Project[];
  keys_for_roles: any[];
  role_keys = Role;

  private subscriptions: Subscription[] = [];
  public editableProject: Project = new Project();
  public editableUser : User = new User();

  constructor(private projectService: ProjectService, private userService: UserService) {
    this.keys_for_roles = Object.keys(this.role_keys).filter(Number);
  }

  ngOnInit() {
    this.udpateProjectsList();
  }

  private udpateProjectsList(): void {
    this.subscriptions.push(this.projectService.getProjects().subscribe(projects => {
      this.projects = projects as Project[];
    }));
  }

  public _createProject(): void {
    this.subscriptions.push(this.projectService.createProject(this.editableProject).subscribe(() => {
      console.log("project created");
      this.editableProject = new Project();
      this.udpateProjectsList();
    }));
  }

  public _createUser(): void {
    this.subscriptions.push(this.userService.createUser(this.editableUser).subscribe(() => {
      console.log("user created");
      this.editableUser = new User();
    }));
  }
}
