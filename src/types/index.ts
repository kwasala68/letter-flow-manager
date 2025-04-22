
// User role types
export type UserRole = 'data-entry' | 'general-manager' | 'department-manager' | 'subject-clerk';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
}

// Letter priority types
export type LetterPriority = 'low' | 'medium' | 'high';

// Letter status types
export type LetterStatus = 'new' | 'assigned-to-department' | 'assigned-to-clerk' | 'in-progress' | 'completed';

// Letter interface
export interface Letter {
  id: string;
  title: string;
  from: string;
  assignedTo: string | null;
  assignedDepartment: string | null;
  status: LetterStatus;
  percentComplete: number;
  priority: LetterPriority;
  startDate: string | null;
  dueDate: string | null;
  completedDate: string | null;
  description: string;
  attachmentUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

// Department interface
export interface Department {
  id: string;
  name: string;
  managerId: string;
}
