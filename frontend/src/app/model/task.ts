import {Project} from "./project";
import {Priority} from "./enums/priority";
import {Status} from "./enums/status";

export class Task {
  id: number;
  project: Project;
  name: string;
  priority: Priority;
  status: Status;
  created: Date;
  updated: Date;
  due_date: string;
  estimation: string;
  assigned: string;
  description: string;
}
