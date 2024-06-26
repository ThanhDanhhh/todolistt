export interface TaskModel {
  title: string;
  description: string;
  dueDate: Date;
  start: Date;
  end: Date;
  uids: string[];
  color?: string;
  fileUrls: string[];
}
