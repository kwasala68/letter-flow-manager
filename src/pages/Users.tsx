
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types";
import { useState } from "react";

const mockUsers: User[] = [
  { 
    id: "1", 
    name: "John Smith", 
    email: "john.smith@example.com", 
    role: "data-entry" 
  },
  { 
    id: "2", 
    name: "Sarah Johnson", 
    email: "sarah.johnson@example.com", 
    role: "general-manager" 
  },
  { 
    id: "3", 
    name: "Michael Brown", 
    email: "michael.brown@example.com", 
    role: "department-manager",
    department: "Finance" 
  },
  { 
    id: "4", 
    name: "Jessica Davis", 
    email: "jessica.davis@example.com", 
    role: "subject-clerk",
    department: "Finance" 
  },
  { 
    id: "5", 
    name: "David Wilson", 
    email: "david.wilson@example.com", 
    role: "department-manager",
    department: "Budget" 
  }
];

export default function Users() {
  const [users] = useState<User[]>(mockUsers);

  return (
    <AppLayout requiredRole="general-manager">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage user accounts and roles in the system
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Role:</span>
                    <span className="text-sm capitalize">{user.role.replace('-', ' ')}</span>
                  </div>
                  {user.department && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Department:</span>
                      <span className="text-sm">{user.department}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
