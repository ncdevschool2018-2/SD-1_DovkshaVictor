import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import {Subscription} from "rxjs/internal/Subscription";
import {TaskService} from "../service/task.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  public tasks: Task[];
  public editableTask: Task = new Task;
  private subscriptions: Subscription[] = [];

/*  tasks: Task[] = [
    {
      project: "Project 1",
      task: "Task 1",
      priority: "Normal",
      status: "In progress",
      created: "10.10.2018 9:56",
      updated: "10.10.2018 17:14",
      due_date: "25.12.2018 12:00",
      estimation: "27 days",
      assigned: "user",
      description: "Simple example"
    }
  ];*/
  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() : void{
    this.subscriptions.push(this.taskService.getTasks().subscribe(tasks => {
      // Parse json response into local array
      this.tasks = tasks as Task[];
      // Check data in console
      console.log(this.tasks);// don't use console.log in angular :)
    }));
  }

  public _createTask(): void {
    console.log(this.editableTask);
    this.subscriptions.push(this.taskService.createTask(this.editableTask).subscribe(() => {
      console.log("task created");
      this.loadTasks();
    }));
  }
}
