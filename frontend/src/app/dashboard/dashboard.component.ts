import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {TaskService} from "../service/task.service";
import {Priority} from "../model/enums/priority";
import {Role} from "../model/enums/role";
import {Task} from "../model/task";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //link variables
  private project_id: number;
  private page: number;

  private prev_page:number;
  private next_page:number;

  private subscriptions: Subscription[] = [];
  private filter : string;

  public page_count: number;
  public task_count:number;
  public tasks: Task[];
  public editableTask: Task = new Task;

  keys_for_priority: any[];
  priority_keys = Priority;

  constructor(private activateRoute: ActivatedRoute, private taskService: TaskService, private router: Router) {
    this.keys_for_priority = Object.keys(this.priority_keys).filter(Number);
    this.subscriptions.push(activateRoute.params.subscribe(params=>{
      this.project_id = Number(params['project_id']);
      this.page = Number(params['page']);
      this.udpateTasksList();
      if(this.page>2) {
        this.prev_page = this.page - 1;
      }else{
        this.prev_page = 1;
      }
    }));
  }

  ngOnInit() {
    this.udpateTasksList();
  }



  private udpateTasksList() : void{
    this.subscriptions.push(this.taskService.getTasks(this.project_id, this.page, this.filter).subscribe(tasks => {
      this.task_count = tasks.count;
      this.page_count = Math.ceil(tasks.count/5);
      if(this.page_count<1)
        this.page_count=1;
      if(this.page<this.page_count) {
        this.next_page = this.page + 1;
      }else {
        this.next_page = this.page_count;
      }
      this.tasks = tasks.tasks as Task[];
    }));
  }

  public _createTask(): void {
    console.log(this.editableTask);
    this.subscriptions.push(this.taskService.createTask(this.project_id, this.editableTask).subscribe(() => {
      console.log("task created");
      this.editableTask = new Task();
      this.udpateTasksList();
    }));
  }

  public _filterTasks(filter:string):void{
    this.filter = filter;
    this.router.navigate(['/', this.project_id, 1]);
    this.udpateTasksList();
  }
}
