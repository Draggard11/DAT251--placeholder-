export interface StudySessionItem {
  id: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  completed?: boolean;
  location: string;
  type: "personal" | "group";
  groupId?: string;
  groupName?: string;
}
