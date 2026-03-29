export interface StudySessionItem {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  location: string;
  type: "personal" | "group";
  groupId?: string;
  groupName?: string;
}
