import React from 'react';
import type { Student } from './StudentService.tsx';
import type { StudySession } from './StudySessionService.tsx';


export interface StudyGroup {
  name: string;
  description: string;
  members: Student[];
  studySessions: StudySession[];
}
