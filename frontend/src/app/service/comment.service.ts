import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../model/comment";

@Injectable({
  providedIn: 'root'
})
// Data service
export class CommentService { //todo create interface

  constructor(private http: HttpClient) {
  }

  getCommentsByTaskId(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>('/api/comments/task/'+ id);
  }

  addComment(id: number, comment : Comment): Observable<Comment>{
    return this.http.post<Comment>('api/comments/task/'+id, comment);
  }
}
