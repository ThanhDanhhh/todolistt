export interface TaskModel {
  title: string;
  description: string;
  dueDate: string;
  start: string;
  end: string;
  uids: string[];
  color?: string;
  fileUrls: string;
}
