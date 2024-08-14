export interface TaskModel {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  start: Date;
  end: Date;
  uids: string[];
  color?: string;
  fileUrls: string[];
  attachments: Attachment[];

  progress?: number;
}

export interface Attachment {
  name: string;
  url: string;
  size: number;
  type?: string;
}
export interface SubTask {
  createdAt: number;
  description: string;
  id: string;
  isCompleted: boolean;
  taskId: string;
  title: string;
  updatedAt: number;
}
