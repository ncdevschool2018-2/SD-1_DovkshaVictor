import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../model/project";

@Injectable({
  providedIn: 'root'
})
// Data service
export class ProjectService { //todo create interface

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost:8080/projects/');
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>('http://localhost:8080/projects/', project);
  }

  deleteProject(project: string): Observable<void> {
    return this.http.delete<void>('http://localhost:8080/projects/' + project);
  }
}
