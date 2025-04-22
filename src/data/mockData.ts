
import { Department, Letter, User } from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "data-entry",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "general-manager",
  },
  {
    id: "user-3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    role: "department-manager",
    department: "dept-1",
  },
  {
    id: "user-4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "department-manager",
    department: "dept-2",
  },
  {
    id: "user-5",
    name: "Robert Brown",
    email: "robert.brown@example.com",
    role: "subject-clerk",
    department: "dept-1",
  },
  {
    id: "user-6",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "subject-clerk",
    department: "dept-2",
  },
];

// Mock Departments
export const mockDepartments: Department[] = [
  {
    id: "dept-1",
    name: "Finance",
    managerId: "user-3",
  },
  {
    id: "dept-2",
    name: "Budget",
    managerId: "user-4",
  },
  {
    id: "dept-3",
    name: "Revenue", 
    managerId: "user-3",
  },
];

// Mock Letters
export const mockLetters: Letter[] = [
  {
    id: "LTR-001",
    referenceNumber: "REF/2025/001",
    letterDate: "2023-04-10",
    receivedDate: "2023-04-10",
    title: "Budget Approval Request",
    from: "Ministry of Finance",
    addressType: "direct",
    assignedTo: "user-5",
    assignedDepartment: "dept-1",
    status: "in-progress",
    percentComplete: 60,
    priority: "high",
    startDate: "2023-04-10",
    dueDate: "2023-04-20",
    completedDate: null,
    description: "Requesting approval for the annual budget allocation for the next fiscal year.",
    attachmentUrl: "/documents/budget-approval.pdf",
    createdAt: "2023-04-05",
    updatedAt: "2023-04-12",
  },
  {
    id: "LTR-002",
    referenceNumber: "REF/2025/002",
    letterDate: "2023-04-08",
    receivedDate: "2023-04-08",
    title: "Revenue Report Submission",
    from: "Tax Department",
    addressType: "copy",
    assignedTo: "user-6",
    assignedDepartment: "dept-2",
    status: "assigned-to-clerk",
    percentComplete: 25,
    priority: "medium",
    startDate: "2023-04-08",
    dueDate: "2023-04-25",
    completedDate: null,
    description: "Quarterly revenue report for Q1 2023.",
    attachmentUrl: "/documents/revenue-report.pdf",
    createdAt: "2023-04-07",
    updatedAt: "2023-04-09",
  },
  {
    id: "LTR-003",
    referenceNumber: "REF/2025/003",
    letterDate: "2023-04-12",
    receivedDate: "2023-04-12",
    title: "Infrastructure Project Proposal",
    from: "Department of Public Works",
    addressType: "direct",
    assignedTo: null,
    assignedDepartment: "dept-1",
    status: "assigned-to-department",
    percentComplete: 0,
    priority: "low",
    startDate: null,
    dueDate: "2023-05-15",
    completedDate: null,
    description: "Proposal for the new highway construction project in the northern region.",
    attachmentUrl: "/documents/infrastructure-proposal.pdf",
    createdAt: "2023-04-12",
    updatedAt: "2023-04-12",
  },
  {
    id: "LTR-004",
    referenceNumber: "REF/2025/004",
    letterDate: "2023-04-14",
    receivedDate: "2023-04-14",
    title: "Staff Training Request",
    from: "HR Department",
    addressType: "copy",
    assignedTo: null,
    assignedDepartment: null,
    status: "new",
    percentComplete: 0,
    priority: "medium",
    startDate: null,
    dueDate: "2023-04-30",
    completedDate: null,
    description: "Request for approval of staff training program on new financial management system.",
    attachmentUrl: null,
    createdAt: "2023-04-14",
    updatedAt: "2023-04-14",
  },
  {
    id: "LTR-005",
    referenceNumber: "REF/2025/005",
    letterDate: "2023-03-10",
    receivedDate: "2023-03-10",
    title: "Annual Audit Report",
    from: "Auditor General's Office",
    addressType: "direct",
    assignedTo: "user-5",
    assignedDepartment: "dept-1",
    status: "completed",
    percentComplete: 100,
    priority: "high",
    startDate: "2023-03-15",
    dueDate: "2023-04-01",
    completedDate: "2023-03-30",
    description: "Findings and recommendations from the annual audit of financial statements and processes.",
    attachmentUrl: "/documents/audit-report.pdf",
    createdAt: "2023-03-10",
    updatedAt: "2023-03-30",
  },
];

// Current logged-in user (for demo purposes)
export let currentUser: User = mockUsers[0];

export const setCurrentUser = (userId: string) => {
  const user = mockUsers.find((u) => u.id === userId);
  if (user) {
    currentUser = user;
    return true;
  }
  return false;
};
