export type FindUniqueOptions = {
  where: {
    user_id?: string;
    email?: string;
    project_id?: string
    task_id?: string
  };
  include?: object
};
