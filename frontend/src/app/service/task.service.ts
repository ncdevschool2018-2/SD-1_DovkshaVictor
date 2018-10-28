import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../model/task";

@Injectable({
  providedIn: 'root'
})
// Data service
export class TaskService { //todo create interface

  constructor(private http: HttpClient) {
  }

  getTasks(project_id: number): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks/project/'+ project_id);
  }

  createTask(project_id: number, project: Task): Observable<Task> {
    return this.http.post<Task>('/api/tasks/project/'+ project_id, project);
  }

  deleteTask(project: string): Observable<void> {
    return this.http.delete<void>('/api/tasks/' + project);
  }
}
