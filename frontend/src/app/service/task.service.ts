import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../model/task";
import {Tasks} from "../model/tasks";

@Injectable({
  providedIn: 'root'
})
// Data service
export class TaskService { //todo create interface

  constructor(private http: HttpClient) {
  }

  getTasks(project_id: number, page: number, filter?:string): Observable<Tasks> {
    if(filter==undefined){
      return this.http.get<Tasks>('/api/tasks/?project_id='+ project_id+'&page='+page);
    }
    return this.http.get<Tasks>('/api/tasks/?project_id='+ project_id+'&page='+page+'&filter='+filter);
  }


  getTask(task_id: number): Observable<Task> {
    return this.http.get<Task>('/api/tasks/' + task_id);
  }

  createTask(project_id: number, task: Task): Observable<Task> {
    return this.http.put<Task>('/api/tasks/project/'+ project_id, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.post<Task>('/api/tasks/', task);
  }

  deleteTask(project: string): Observable<void> {
    return this.http.delete<void>('/api/tasks/' + project);
  }
}
