export type TaskModel = {
  task_id: string;
  name: string;
  description?: string;
  expiration_date: Date;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  user_id?: string;
  project_id?: string;
};
