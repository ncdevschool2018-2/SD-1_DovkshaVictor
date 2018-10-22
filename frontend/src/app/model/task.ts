import {Project} from "./project";

export class Task {
  id: number;
  project: Project;
  task: string;
  priority: string;
  status: string;
  created: string;
  updated: string;
  due_date: string;
  estimation: string;
  assigned: string;
  description: string;
}
