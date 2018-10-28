import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../service/project.service";
import {Subscription} from "rxjs/internal/Subscription";
import {Project} from "../model/project";
import {User} from "../model/user";
import {UserService} from "../service/user.service";
import {Role} from "../model/enums/role";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  keys: any[];
  role_keys = Role;

  public projects: Project[];
  public editableProject: Project = new Project();
  public editableUser : User = new User();
  private subscriptions: Subscription[] = [];

  constructor(private projectService: ProjectService, private userService: UserService) {
    this.keys = Object.keys(this.role_keys).filter(Number);
  }

  ngOnInit() {
    this.loadProjects();
  }

  public _createProject(): void {
    this.subscriptions.push(this.projectService.createProject(this.editableProject).subscribe(() => {
      console.log("project created");
      this.editableProject = new Project();
      this.loadProjects();
    }));
  }

  public _createUser(): void {
    this.subscriptions.push(this.userService.createUser(this.editableUser).subscribe(() => {
      console.log("user created");
      this.editableUser = new User();
    }));
  }

  private loadProjects(): void {
    this.subscriptions.push(this.projectService.getProjects().subscribe(projects => {
      // Parse json response into local array
      this.projects = projects as Project[];
      // Check data in console
      console.log(this.projects);// don't use console.log in angular :)
    }));
  }
}
