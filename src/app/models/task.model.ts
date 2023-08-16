// src/app/task.model.ts
export interface Task {
  id?: number;
  title: string;
  completed: boolean;
  description: string;
  priority_name: string;
  creation_date: string;
}
