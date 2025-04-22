
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Letter } from "@/types";
import { useState } from "react";

const mockLetters: Letter[] = [
  {
    id: "LTR001",
    title: "Budget Approval Request",
    from: "Finance Department",
    assignedTo: null,
    assignedDepartment: null,
    status: "new",
    percentComplete: 0,
    priority: "high",
    startDate: null,
    dueDate: "2025-05-15",
    completedDate: null,
    description: "Requesting approval for the annual budget allocation",
    attachmentUrl: null,
    createdAt: "2025-04-10",
    updatedAt: "2025-04-10"
  },
  {
    id: "LTR002",
    title: "Employee Hiring Request",
    from: "HR Department",
    assignedTo: null,
    assignedDepartment: null,
    status: "new",
    percentComplete: 0,
    priority: "medium",
    startDate: null,
    dueDate: "2025-04-30",
    completedDate: null,
    description: "Request to hire new employees for the IT department",
    attachmentUrl: null,
    createdAt: "2025-04-12",
    updatedAt: "2025-04-12"
  },
  {
    id: "LTR003",
    title: "Office Equipment Purchase",
    from: "Procurement Office",
    assignedTo: null,
    assignedDepartment: null,
    status: "new",
    percentComplete: 0,
    priority: "low",
    startDate: null,
    dueDate: "2025-05-20",
    completedDate: null,
    description: "Request for approval to purchase new office equipment",
    attachmentUrl: null,
    createdAt: "2025-04-15",
    updatedAt: "2025-04-15"
  }
];

const departments = ["Finance", "Budget", "HR", "IT", "Operations"];

export default function Assignments() {
  const [letters] = useState<Letter[]>(mockLetters);

  const handleAssign = (letterId: string, department: string) => {
    // In a real app, this would update the letter in the database
    console.log(`Assigning letter ${letterId} to department ${department}`);
  };

  return (
    <AppLayout requiredRole="general-manager">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Letter Assignments</h2>
          <p className="text-muted-foreground">
            Assign incoming letters to appropriate departments
          </p>
        </div>
        
        <div className="grid gap-6">
          {letters.map((letter) => (
            <Card key={letter.id}>
              <CardHeader>
                <CardTitle>{letter.title}</CardTitle>
                <CardDescription>From: {letter.from} | Priority: {letter.priority}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="text-sm">
                    {letter.description}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Due by: {letter.dueDate || 'Not specified'}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Select onValueChange={(value) => handleAssign(letter.id, value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Assign to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button size="sm">Assign</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
