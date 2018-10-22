import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../service/project.service";
import {Subscription} from "rxjs/internal/Subscription";
import {Project} from "../model/project";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public projects: Project[];
  public editableProject: Project = new Project();
  private subscriptions: Subscription[] = [];

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.loadProjects();
  }

  public _createProject(): void {
    this.subscriptions.push(this.projectService.createProject(this.editableProject).subscribe(() => {
      console.log("project created");
      this.loadProjects();
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
