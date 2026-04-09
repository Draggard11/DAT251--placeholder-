import type { Student, Subject } from './StudentService.tsx';
import type { StudyGroup } from './StudyGroupService';

export interface StudySession {
  subject: Subject;
  startTime: Date;
  endTime: Date;
  completed: boolean;
  studyGroup: StudyGroup;
  attendance: Student[];
}


