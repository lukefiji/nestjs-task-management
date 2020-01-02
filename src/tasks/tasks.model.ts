// You can define a model as a class or an interface
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN,
  IN_PROGRESS,
  DONE,
}
