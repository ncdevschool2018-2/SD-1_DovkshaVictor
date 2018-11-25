import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";
import {TaskService} from "../service/task.service";
import {Task} from "../model/task";
import {Status} from "../model/enums/status";
import {AuthService} from "../service/auth.service";
import {Role} from "../model/enums/role";
import {UserService} from "../service/user.service";
import {User} from "../model/user";
import {Comment} from "../model/comment";
import {CommentService} from "../service/comment.service";

@Component({
  selector: 'app-taskcontrol',
  templateUrl: './taskcontrol.component.html',
  styleUrls: ['./taskcontrol.component.css']
})
export class TaskcontrolComponent implements OnInit {
  //link
  private task_id:number;
  public current_user: any;
  private task: Task;
  public comments: Comment[];
  public editableComment: Comment = new Comment();
  private subscriptions: Subscription[] = [];
  public users_to_assign: User[] = [];
  selected_username_to_assign:string;

  constructor(private activateRoute: ActivatedRoute, private taskService: TaskService, private authService: AuthService, private userService: UserService, private commentService: CommentService){
    this.subscriptions.push(activateRoute.params.subscribe(params=>{
      this.task_id = Number(params['task_id']);
    }));
    this.task = new Task();
    this.subscriptions.push(this.authService.getUser().subscribe(user=>{
      this.current_user = user;
    }));
  }

  ngOnInit() {
    this.loadTask();
  }

  private loadTask() : void{
    this.subscriptions.push(this.taskService.getTask(this.task_id).subscribe(task => {
      this.task = task as Task;
      this.udpateCommentsList();
    }));
  }

  private udpateCommentsList() : void{
    this.subscriptions.push(this.commentService.getCommentsByTaskId(this.task.id).subscribe(comments => {
      this.comments = comments as Comment[];
    }));
  }

  private changeTaskStatus(status : Status): void{
    this.task.status = Status[status];
    this.subscriptions.push(this.taskService.updateTask(this.task).subscribe( ()=>{
      this.loadTask();
    },error => {
      this.loadTask();
    }));
  }

  public sendMessage():void{
    this.subscriptions.push(this.commentService.addComment(this.task.id, this.editableComment).subscribe(() => {
      this.udpateCommentsList();
    }));
  }

  public _startTask(): void{
    this.changeTaskStatus(Status.IN_PROGRESS);
  }

  public _readyForTestTask(): void{
    this.changeTaskStatus(Status.READY_FOR_TEST);
  }

  public _reopenTask(): void{
    this.changeTaskStatus(Status.OPEN);
  }

  public _closeTask(): void{
    this.changeTaskStatus(Status.CLOSED);
  }

  public findUsers(username: string):void{
      this.subscriptions.push(this.userService.findUsers(username).subscribe( users =>{
        this.users_to_assign = users as User[];
      }));
      console.log(this.selected_username_to_assign);
      this.selected_username_to_assign = "";
  }

  public _assignUser():void{
    this.task.assigned= this.selected_username_to_assign;
    this.subscriptions.push(this.taskService.updateTask(this.task).subscribe( ()=>{
      this.loadTask();
    },error => {
      this.loadTask();
    }));
    this.selected_username_to_assign = "";
  }

  public _showDevelopersButton(){
    if(this.current_user==undefined) return false;
    let role : Role = Role[String(this.current_user.role)];
    if(role == Role.ADMIN|| role == Role.PROJECT_MANAGER ||role == Role.DEVELOPER){
      return true;
    }
    return false;
  }

  public _showTestersButton(){
    if(this.current_user==undefined) return false;
    let role : Role = Role[String(this.current_user.role)];
    if(role == Role.ADMIN|| role == Role.PROJECT_MANAGER ||role == Role.TESTER){
      return true;
    }
    return false;
  }

}
