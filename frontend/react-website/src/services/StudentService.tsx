import type { StudyGroup } from './StudyGroupService.tsx';

export interface Student {
  name: string;
  email: string;
  dateOfBirth: string;
  enrollmentDate: string;
  ActiveSubjects: Subject[];
  completedSubjects: Subject[];
  studyGroups: StudyGroup[];
}

export interface Subject {
  subjectCode: string;
  studyGroups: StudyGroup[];
  students: Student[];
}
// students services
export const getStudents = async (): Promise<Student[]> => {
  const response = await fetch('http://localhost:8080/api/students');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const createStudent = async (student: Partial<Student>): Promise<Student> => {
  const response = await fetch('http://localhost:8080/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(student)
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const getStudentById = async (id: any): Promise<Student | null> => {
  const response = await fetch(`http://localhost:8080/api/students/${id}`);
  if (!response.ok && response.status !== 404) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// make function to update student paramater. this is a patch in the api to update specific fields of a student
export const updateStudent = async (id: string, updatedData: Partial<Student>): Promise<Student | null> => {
  const response = await fetch(`http://localhost:8080/api/students/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

// adding subjects
export const addSubjectToStudent = async (studentId: number, subjectId: number): Promise<Subject> => {
  const response = await fetch(`/api/students/${studentId}/subjects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ subject_id: subjectId })
  });

  if (!response.ok) {
    throw new Error(`Failed to add subject to student ${studentId}`);
  }

  return response.json();
};

// get the students studygroup
export const getStudyGroups = async (studentId: number): Promise<StudyGroup> => {
  const response = await fetch(`http://localhost:8080/api/stundents/${studentId}/studygroups`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

