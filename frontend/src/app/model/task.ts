import {Project} from "./project";
import {Priority} from "./enums/priority";
import {Status} from "./enums/status";

export class Task {
  id: number;
  project: Project;
  name: string;
  priority: string;
  status: string;
  created: Date;
  updated: Date;
  resolved: Date;
  closed: Date;
  due_date: string;
  estimation: string;
  assigned: string;
  description: string;
}
