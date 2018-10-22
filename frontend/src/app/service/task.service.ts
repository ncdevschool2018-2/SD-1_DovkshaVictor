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

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:8080/tasks/');
  }

  createTask(project: Task): Observable<Task> {
    return this.http.post<Task>('http://localhost:8080/tasks/', project);
  }

  deleteTask(project: string): Observable<void> {
    return this.http.delete<void>('http://localhost:8080/tasks/' + project);
  }
}
