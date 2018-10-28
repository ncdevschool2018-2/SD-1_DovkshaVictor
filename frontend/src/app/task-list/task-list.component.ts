import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../model/task';
import {Subscription} from "rxjs/internal/Subscription";
import {TaskService} from "../service/task.service";
import {Priority} from "../model/enums/priority";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnChanges{
  @Input()
  project_id: number;

  public tasks: Task[];
  public editableTask: Task = new Task;
  private subscriptions: Subscription[] = [];
  keys: any[];
  priority_keys = Priority;

  constructor(private taskService: TaskService) {
    this.keys = Object.keys(this.priority_keys).filter(Number);
  }

  ngOnInit() {
    this.loadTasks();
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.project_id.currentValue!=changes.project_id.previousValue) {
      this.project_id = changes.project_id.currentValue;
      this.loadTasks();
    }
  }


  private loadTasks() : void{
    this.subscriptions.push(this.taskService.getTasks(this.project_id).subscribe(tasks => {
      // Parse json response into local array
      this.tasks = tasks as Task[];
      // Check data in console
      console.log(this.tasks);// don't use console.log in angular :)
    }));
  }

  public _createTask(): void {
    console.log(this.editableTask);
    this.subscriptions.push(this.taskService.createTask(this.project_id, this.editableTask).subscribe(() => {
      console.log("task created");
      this.loadTasks();
    }));
  }
}
