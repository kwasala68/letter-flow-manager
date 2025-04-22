
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Letter } from "@/types";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const mockLetters: Letter[] = [
  {
    id: "LTR001",
    referenceNumber: "REF/2025/001",
    letterDate: "2025-04-10",
    receivedDate: "2025-04-10",
    title: "Budget Approval Request",
    from: "Finance Department",
    addressType: "direct",
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
    referenceNumber: "REF/2025/002",
    letterDate: "2025-04-12",
    receivedDate: "2025-04-12",
    title: "Employee Hiring Request",
    from: "HR Department",
    addressType: "direct",
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
  }
];

const departments = ["Finance", "Budget", "HR", "IT", "Operations"];

export default function Assignments() {
  const { toast } = useToast();
  const [letters, setLetters] = useState<Letter[]>(mockLetters);
  const [selectedDepartments, setSelectedDepartments] = useState<{ [key: string]: string }>({});

  const handleAssign = (letterId: string) => {
    const department = selectedDepartments[letterId];
    if (!department) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a department first."
      });
      return;
    }

    // Update the letter status and department
    setLetters(prevLetters => 
      prevLetters.filter(letter => letter.id !== letterId)
    );

    toast({
      title: "Letter Assigned",
      description: `Letter ${letterId} has been assigned to ${department} department.`
    });
  };

  const pendingLetters = letters.filter(letter => letter.status === 'new');

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
          {pendingLetters.map((letter) => (
            <Card key={letter.id}>
              <CardHeader>
                <CardTitle>{letter.title}</CardTitle>
                <CardDescription>
                  From: {letter.from} | Reference: {letter.referenceNumber} | Priority: {letter.priority}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="text-sm">
                    {letter.description}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Letter Date: {letter.letterDate} | Received: {letter.receivedDate}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Select 
                  value={selectedDepartments[letter.id] || ''} 
                  onValueChange={(value) => setSelectedDepartments(prev => ({ ...prev, [letter.id]: value }))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Assign to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  size="sm" 
                  onClick={() => handleAssign(letter.id)}
                  disabled={!selectedDepartments[letter.id]}
                >
                  Assign
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {pendingLetters.length === 0 && (
            <div className="text-center p-8 bg-muted rounded-lg">
              <p className="text-muted-foreground">No pending letters to assign</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
