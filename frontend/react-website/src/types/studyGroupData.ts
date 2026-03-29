export interface StudyGroupData {
  subject: string;
  groupName: string;
  description: string;
  link: string;
}

export interface StudyGroupItem extends StudyGroupData {
  id: string;
}
